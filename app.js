/**
 * Ryan & Abby Wedding Website — Vibecoded Application Logic (Vanilla JS)
 * Faithfully replicates all interactions from https://www.ryan-abby.com/
 * while binding to `window.WEDDING_CONFIG` (site-config.js) for total flexibility.
 */
(function () {
  "use strict";

  const cfg = window.WEDDING_CONFIG || {};
  const PAGE_MAP = {
    home: "home",
    "wedding-day": "wedding-day",
    p746571: "wedding-day",
    "weekend-events": "weekend-events",
    p746572: "weekend-events",
    "our-story": "our-story",
    p800595: "our-story",
    details: "details",
    p746573: "details",
    faqs: "faqs",
    p746578: "faqs",
    registry: "registry",
    p746574: "registry",
    rsvp: "rsvp",
    p746576: "rsvp",
    gallery: "gallery",
    p747140: "gallery",
  };

  let currentPage = "home";
  let navOpen = false;
  let isSinglePage = cfg.theme && cfg.theme.navigationMode === "single-page";
  let lightboxIndex = 0;

  // Safe storage wrapper that works seamlessly even inside sandboxed iframes/x20web
  // where `Content-Security-Policy: sandbox` (without allow-same-origin) blocks `localStorage`.
  const memoryStorage = {};
  function safeStorageGet(key) {
    try {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    } catch (_) {}
    try {
      if (window.name && window.name.startsWith("{")) {
        const parsed = JSON.parse(window.name);
        if (parsed && parsed[key] !== undefined) return parsed[key];
      }
    } catch (_) {}
    return Object.prototype.hasOwnProperty.call(memoryStorage, key) ? memoryStorage[key] : null;
  }

  function safeStorageSet(key, val) {
    memoryStorage[key] = val;
    try {
      window.localStorage.setItem(key, val);
    } catch (_) {}
    try {
      let parsed = {};
      if (window.name && window.name.startsWith("{")) {
        parsed = JSON.parse(window.name) || {};
      }
      parsed[key] = val;
      window.name = JSON.stringify(parsed);
    } catch (_) {}
  }

  function safeStorageRemove(key) {
    delete memoryStorage[key];
    try {
      window.localStorage.removeItem(key);
    } catch (_) {}
    try {
      if (window.name && window.name.startsWith("{")) {
        const parsed = JSON.parse(window.name) || {};
        delete parsed[key];
        window.name = JSON.stringify(parsed);
      }
    } catch (_) {}
  }

  // =========================================================================
  // 1. Hydrate DOM from site-config.js
  // =========================================================================
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyThemeColors(colors) {
    if (!colors) return;
    const root = document.documentElement;
    if (colors.primary) root.style.setProperty("--color-primary", colors.primary);
    if (colors.background) root.style.setProperty("--color-bg", colors.background);
    if (colors.blush) root.style.setProperty("--color-blush", colors.blush);
    if (colors.white) root.style.setProperty("--color-white", colors.white);
    if (colors.muted) root.style.setProperty("--color-muted", colors.muted);
    colorAllSvgObjects(colors.primary || "#9c0a0d");
  }

  function applyThemeFonts(fonts) {
    if (!fonts) return;
    const root = document.documentElement;
    if (fonts.monogram) root.style.setProperty("--font-monogram", fonts.monogram);
    if (fonts.display) root.style.setProperty("--font-display", fonts.display);
    if (fonts.subhead) root.style.setProperty("--font-subhead", fonts.subhead);
    if (fonts.body) root.style.setProperty("--font-body", fonts.body);
  }

  function colorSvgObject(objEl, hexColor) {
    try {
      const doc = objEl.contentDocument;
      if (!doc) return;
      const cleanHex = hexColor.startsWith("#") ? hexColor : "#" + hexColor;
      const primary = doc.getElementById("primary");
      if (primary) {
        primary.setAttribute("fill", cleanHex);
      }
    } catch (_) {
      // Cross-origin or not yet loaded; SVG files already have #9c0a0d baked in as default.
    }
  }

  function colorAllSvgObjects(hexColor) {
    const targetColor =
      hexColor ||
      getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() ||
      "#9c0a0d";
    document.querySelectorAll(".iconImage object").forEach((obj) => {
      colorSvgObject(obj, targetColor);
    });
  }

  function hydrateFromConfig() {
    if (!cfg || !cfg.meta) return;

    // Meta & Header
    document.title = cfg.meta.title || document.title;
    const monogramEl = document.getElementById("headerMonogram");
    if (monogramEl && cfg.meta.monogram) {
      monogramEl.textContent = cfg.meta.monogram;
    }

    // Theme
    if (cfg.theme && cfg.theme.colors) {
      applyThemeColors(cfg.theme.colors);
    }
    if (cfg.theme && cfg.theme.fonts) {
      applyThemeFonts(cfg.theme.fonts);
    }

    // Navigation visibility & clean URL hrefs
    const basePath = getSiteBasePath();
    if (monogramEl) {
      monogramEl.setAttribute("href", `${basePath}/`);
    }
    if (Array.isArray(cfg.navigation)) {
      cfg.navigation.forEach((item) => {
        const navLink = document.querySelector(`#navScrollList a[data-page="${item.id}"]`);
        if (navLink) {
          navLink.textContent = item.label;
          navLink.style.display = item.enabled ? "block" : "none";
          navLink.setAttribute("href", item.id === "home" ? `${basePath}/` : `${basePath}/${item.id}`);
        }
      });
    }

    // 1. Home
    if (cfg.home) {
      const hl = document.getElementById("homeHeadlineText");
      const dt = document.getElementById("homeDateText");
      const bg = document.getElementById("homeHeroBg");
      if (hl && cfg.home.headline) hl.textContent = cfg.home.headline;
      if (dt && cfg.home.dateText) dt.textContent = cfg.home.dateText;
      if (bg && cfg.home.heroImage) {
        bg.style.backgroundImage = `url('${cfg.home.heroImage}')`;
      }
    }

    // 2. Wedding Day
    if (cfg.weddingDay) {
      const wdHeadline = document.getElementById("wdHeadline");
      const wdDateSubhead = document.getElementById("wdDateSubhead");
      const wdCeremonyLines = document.getElementById("wdCeremonyLines");
      const wdWelcomeLines = document.getElementById("wdWelcomeLines");
      const wdDressCodeTitle = document.getElementById("wdDressCodeTitle");
      const wdDressCodeDesc = document.getElementById("wdDressCodeDesc");

      if (wdHeadline && cfg.weddingDay.headline) wdHeadline.textContent = cfg.weddingDay.headline;
      if (wdDateSubhead && cfg.weddingDay.dateSubhead) wdDateSubhead.textContent = cfg.weddingDay.dateSubhead;
      if (wdCeremonyLines && Array.isArray(cfg.weddingDay.ceremonyLines)) {
        wdCeremonyLines.innerHTML = cfg.weddingDay.ceremonyLines.map(escapeHtml).join("<br />");
      }
      if (wdWelcomeLines && Array.isArray(cfg.weddingDay.welcomeLines)) {
        wdWelcomeLines.innerHTML = cfg.weddingDay.welcomeLines.map(escapeHtml).join("<br />");
      }
      if (cfg.weddingDay.dressCode) {
        if (wdDressCodeTitle) wdDressCodeTitle.textContent = cfg.weddingDay.dressCode.title;
        if (wdDressCodeDesc) wdDressCodeDesc.textContent = cfg.weddingDay.dressCode.description;
      }
    }

    // 6. FAQs (rebuild if edited in site-config.js)
    if (cfg.faqs && Array.isArray(cfg.faqs.items)) {
      const faqList = document.getElementById("faqAccordionList");
      if (faqList) {
        faqList.innerHTML = cfg.faqs.items
          .map(
            (item) => `
          <div class="subsection">
            <h3><span>${escapeHtml(item.question)}</span><span class="plus"></span></h3>
            <div class="nestedCont">
              <h4>${(item.answerParagraphs || []).map(escapeHtml).join("<br /><br />")}</h4>
            </div>
          </div>`
          )
          .join("");
      }
    }

    // 7. Registry links
    if (cfg.registry && Array.isArray(cfg.registry.links)) {
      const regList = document.getElementById("registryButtonList");
      if (regList) {
        regList.innerHTML = cfg.registry.links
          .map(
            (link) =>
              `<a href="${escapeHtml(link.url)}" class="button outline" target="_blank" rel="noopener"><span style="color: var(--color-primary); border-color: var(--color-primary)">${escapeHtml(
                link.label
              )}</span></a>`
          )
          .join("");
      }
    }
  }

  // =========================================================================
  // 2. Layout, Header Height, & Masonry Gallery Calculations
  // =========================================================================
  function getHeaderHeight() {
    const header = document.getElementById("siteHeader");
    if (!header) return 99;
    return header.getBoundingClientRect().height;
  }

  function getFooterHeight() {
    const footer = document.getElementById("siteFooter");
    if (!footer || getComputedStyle(footer).display === "none") return 0;
    return footer.getBoundingClientRect().height;
  }

  function setMinHeight(hh, fh) {
    const pageHeight = `min-height: calc(100vh - ${hh + fh}px);`;
    let styleEl = document.getElementById("secMinHeight");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "secMinHeight";
      document.head.appendChild(styleEl);
    }
    const main = document.getElementById("siteMain");
    if (main && main.classList.contains("singlePage")) {
      styleEl.textContent = `main.singlePage { ${pageHeight} }`;
    } else {
      styleEl.textContent = `main section { ${pageHeight} }`;
    }
  }

  function calculateSpace() {
    const winH = window.innerHeight;
    const headerH = getHeaderHeight();

    document.querySelectorAll("main > section").forEach((sec) => {
      sec.style.marginTop = headerH + "px";
    });

    document.querySelectorAll(".coverpage.header .bgBox").forEach((bg) => {
      bg.style.height = Math.max(320, winH - headerH) + "px";
    });

    const mmCont = document.getElementById("MMlinkCont");
    if (mmCont) {
      mmCont.style.height = headerH + "px";
    }
  }

  function positionGalleryCollage(galleryEl) {
    if (!galleryEl || getComputedStyle(galleryEl).display === "none") return;
    const w = galleryEl.clientWidth;
    const items = Array.from(galleryEl.querySelectorAll(":scope > .section"));
    if (!items.length) return;

    // Reset margins first before measuring natural heights
    items.forEach((item) => {
      item.style.marginTop = "0px";
    });

    if (w <= 768 || document.body.classList.contains("mobile-preview-mode")) {
      return;
    }

    const heights = items.map((item) => item.getBoundingClientRect().height);
    const margins = heights.map(() => 0);
    const cols = w >= 1018 ? [0, 0, 0] : [0, 0];
    let multi = 0;

    heights.forEach((height, i) => {
      cols[multi] += height;
      multi++;
      if ((i + 1) % cols.length === 0) {
        const maxH = Math.max.apply(null, cols);
        for (let m = 1; m <= cols.length && i + m < heights.length; m++) {
          margins[i + m] = -maxH + cols[m - 1];
        }
        multi = 0;
      }
    });

    items.forEach((item, i) => {
      item.style.marginTop = margins[i] + "px";
    });
  }

  function updateLayout() {
    calculateSpace();
    setMinHeight(getHeaderHeight(), getFooterHeight());
    const gallery = document.getElementById("sec-gallery");
    if (gallery && getComputedStyle(gallery).display !== "none") {
      positionGalleryCollage(gallery);
    }
  }

  // =========================================================================
  // 3. Navigation & Routing (Multi-Page Tab Mode + Single-Page Scroll Mode)
  // =========================================================================
  function getSiteBasePath() {
    const path = window.location.pathname || "/";
    const match = path.match(/^(.*\/ryan-abby-wedding)(?:\/.*)?$/);
    return match ? match[1] : "";
  }

  function getCurrentLocationTarget() {
    if (window.history && window.history.state && window.history.state.set) {
      return window.history.state.set;
    }
    if (window.location.hash && window.location.hash.length > 1) {
      return window.location.hash.slice(1);
    }
    const initialAttr = document.documentElement.getAttribute("data-initial-page");
    if (initialAttr) {
      return initialAttr;
    }
    return window.location.pathname || "home";
  }

  function resolvePageSlug(raw) {
    if (!raw) return "home";
    let cleaned = String(raw).trim();
    if (cleaned.includes("#")) {
      cleaned = cleaned.split("#").pop();
    } else {
      cleaned = cleaned.split("?")[0];
      const segments = cleaned.split("/").filter(Boolean);
      cleaned = segments.length ? segments[segments.length - 1] : "home";
    }
    cleaned = cleaned.replace(/\.html$/i, "").toLowerCase();
    return PAGE_MAP[cleaned] || "home";
  }

  function updateActiveNavLink(slug) {
    document.querySelectorAll("#navContent .navItem").forEach((a) => {
      if (a.getAttribute("data-page") === slug) {
        a.classList.add("select");
      } else {
        a.classList.remove("select");
      }
    });
  }

  function loadPage(rawTarget, skipHistory) {
    const targetSlug = resolvePageSlug(rawTarget);
    updateActiveNavLink(targetSlug);

    const navLink = document.querySelector(`#navContent .navItem[data-page="${targetSlug}"]`);
    const pageTitleLabel = navLink ? navLink.textContent.trim() : "";
    const baseTitle = (cfg.meta && cfg.meta.title) || "Abigail Jin and Ryan Leong's Wedding Website";

    const header = document.getElementById("siteHeader");
    const footer = document.getElementById("siteFooter");
    const main = document.getElementById("siteMain");

    if (isSinglePage) {
      main.classList.add("singlePage");
      header.classList.remove("coverpage");
      footer.classList.remove("coverpage");
      document.querySelectorAll("main > section").forEach((sec) => {
        const slug = sec.getAttribute("data-page");
        const navCfg = (cfg.navigation || []).find((n) => n.id === slug);
        const enabled = navCfg ? navCfg.enabled : true;
        if (enabled) {
          sec.style.display = slug === "gallery" ? "flex" : "block";
        } else {
          sec.style.display = "none";
        }
      });
      document.documentElement.removeAttribute("data-initial-page");
      updateLayout();
      const targetSec = document.querySelector(`main > section[data-page="${targetSlug}"]`);
      if (targetSec) {
        const dest = Math.max(0, targetSec.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight());
        window.scrollTo({ top: dest, behavior: skipHistory ? "auto" : "smooth" });
      }
    } else {
      main.classList.remove("singlePage");
      document.querySelectorAll("main > section").forEach((sec) => {
        const slug = sec.getAttribute("data-page");
        if (slug === targetSlug) {
          sec.style.display = slug === "gallery" ? "flex" : "block";
        } else {
          sec.style.display = "none";
        }
      });
      document.documentElement.removeAttribute("data-initial-page");

      const targetSec = document.querySelector(`main > section[data-page="${targetSlug}"]`);
      const isCover = targetSec && targetSec.classList.contains("coverpage");

      header.className = isCover ? `${targetSlug} coverpage header` : targetSlug;
      footer.className = isCover ? `${targetSlug} coverpage` : targetSlug;

      updateLayout();
      window.scrollTo({ top: 0, behavior: skipHistory ? "auto" : "smooth" });
    }

    const fullTitle = targetSlug !== "home" && pageTitleLabel ? `${baseTitle} | ${pageTitleLabel}` : baseTitle;
    const basePath = getSiteBasePath();
    const cleanPath = targetSlug !== "home" ? `${basePath}/${targetSlug}` : `${basePath}/`;
    const targetUrl = cleanPath + window.location.search;
    document.title = fullTitle;

    if (!skipHistory) {
      try {
        window.history.pushState({ set: targetSlug, title: fullTitle }, fullTitle, targetUrl);
      } catch (_) {}
    } else if (window.location.hash || window.location.pathname !== cleanPath) {
      try {
        window.history.replaceState({ set: targetSlug, title: fullTitle }, fullTitle, targetUrl);
      } catch (_) {}
    }

    currentPage = targetSlug;
  }

  function openNav() {
    const navContent = document.getElementById("navContent");
    const mm = document.getElementById("mm");
    const links = Array.from(navContent.querySelectorAll("nav a")).filter(
      (a) => getComputedStyle(a).display !== "none"
    );
    const isMobileView =
      window.innerWidth <= 768 || document.body.classList.contains("mobile-preview-mode");

    navContent.style.display = isSinglePage || isMobileView ? "block" : "flex";
    requestAnimationFrame(() => {
      navContent.classList.add("active");
      mm.classList.add("closeNav");
      setTimeout(() => {
        links.forEach((el, i) => {
          setTimeout(() => el.classList.add("active"), i * 85);
        });
      }, 150);
      navOpen = true;
    });
  }

  function closeNav() {
    const navContent = document.getElementById("navContent");
    const mm = document.getElementById("mm");
    const links = Array.from(navContent.querySelectorAll("nav a"));

    links
      .slice()
      .reverse()
      .forEach((el, i) => {
        setTimeout(() => el.classList.remove("active"), i * 50);
      });

    setTimeout(() => {
      navContent.classList.remove("active");
      setTimeout(() => {
        navContent.style.display = "none";
        mm.classList.remove("closeNav");
        navOpen = false;
      }, 250);
    }, links.length * 40);
  }

  // =========================================================================
  // 4. Interactive FAQ Accordions
  // =========================================================================
  function initFaqAccordions() {
    const faqContainer = document.getElementById("sec-faqs");
    if (!faqContainer) return;

    faqContainer.addEventListener("click", (e) => {
      const h3 = e.target.closest(".subsection h3");
      if (!h3) return;
      const isOpen = h3.classList.contains("open");
      const nestedCont = h3.nextElementSibling;
      if (isOpen) {
        h3.classList.remove("open");
        if (nestedCont) nestedCont.style.display = "none";
      } else {
        h3.classList.add("open");
        if (nestedCont) nestedCont.style.display = "block";
      }
      setMinHeight(getHeaderHeight(), getFooterHeight());
    });
  }

  // =========================================================================
  // 5. Dynamic Multi-Guest RSVP Form
  // =========================================================================
  function bindGuestBlockEvents(groupEl) {
    const selects = groupEl.querySelectorAll("select");
    selects.forEach((sel) => {
      const updatePlaceholderClass = () => {
        if (!sel.value) {
          sel.classList.add("hasPlaceholder");
        } else {
          sel.classList.remove("hasPlaceholder");
          sel.classList.remove("error");
        }
      };
      sel.addEventListener("change", updatePlaceholderClass);
      updatePlaceholderClass();
    });

    const responseSelects = groupEl.querySelectorAll(".rsvpResponse");
    responseSelects.forEach((sel) => {
      sel.addEventListener("change", () => {
        const eventDiv = sel.closest(".event");
        if (!eventDiv) return;
        const conditionals = eventDiv.querySelectorAll(".conditional-field");
        const attending = sel.value === "1";
        conditionals.forEach((field) => {
          field.style.display = attending ? "block" : "none";
          const innerSelect = field.tagName === "SELECT" ? field : field.querySelector("select");
          if (innerSelect) {
            innerSelect.required = attending;
          }
        });
      });
    });

    const nameInput = groupEl.querySelector(".guestName");
    if (nameInput) {
      nameInput.addEventListener("focus", () => {
        nameInput.classList.remove("error");
      });
    }
  }

  function initRsvpForm() {
    const form = document.getElementById("rsvp2746576");
    const guestsContainer = document.getElementById("rsvpGuestsContainer");
    const btnAddGuest = document.getElementById("btnAddGuest");
    const btnRemoveGuest = document.getElementById("btnRemoveGuest");
    const formFields = document.getElementById("rsvpFormFields");
    const confirmBox = document.getElementById("rsvpConfirmBox");
    const btnChangeRsvp = document.getElementById("btnChangeRsvp");

    if (!form || !guestsContainer) return;

    const firstGroup = guestsContainer.querySelector(".group.guest");
    const templateGroupHtml = firstGroup.outerHTML;
    bindGuestBlockEvents(firstGroup);

    let guestCount = 1;

    btnAddGuest.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = guestCount;
      guestCount++;
      const wrapper = document.createElement("div");
      wrapper.innerHTML = templateGroupHtml.replace(/guests\[0\]/g, `guests[${idx}]`);
      const newGroup = wrapper.firstElementChild;
      newGroup.setAttribute("data-guest-index", String(idx));
      guestsContainer.appendChild(newGroup);
      bindGuestBlockEvents(newGroup);
      if (guestCount > 1) {
        btnRemoveGuest.classList.add("on");
      }
    });

    btnRemoveGuest.addEventListener("click", (e) => {
      e.preventDefault();
      if (guestCount <= 1) return;
      const groups = guestsContainer.querySelectorAll(".group.guest");
      const lastGroup = groups[groups.length - 1];
      if (lastGroup) lastGroup.remove();
      guestCount--;
      if (guestCount <= 1) {
        btnRemoveGuest.classList.remove("on");
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let firstInvalid = null;

      form.querySelectorAll("[required]").forEach((field) => {
        if (field.offsetParent === null) return; // hidden field
        if (!field.value || !field.value.trim()) {
          field.classList.add("error");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.classList.remove("error");
        }
      });

      if (firstInvalid) {
        const dest = Math.max(0, firstInvalid.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight() - 20);
        window.scrollTo({ top: dest, behavior: "smooth" });
        return;
      }

      // Collect submission payload
      const formData = new FormData(form);
      const entry = {
        submittedAt: new Date().toISOString(),
        fields: Object.fromEntries(formData.entries()),
      };

      const stored = JSON.parse(safeStorageGet("ryan_abby_rsvps") || "[]");
      stored.push(entry);
      safeStorageSet("ryan_abby_rsvps", JSON.stringify(stored));
      updateExportRsvpButtonCount();

      if (cfg.rsvp && cfg.rsvp.webhookUrl) {
        try {
          await fetch(cfg.rsvp.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
          });
        } catch (err) {
          console.warn("Webhook submission error (saved locally):", err);
        }
      }

      formFields.style.display = "none";
      confirmBox.style.display = "block";
    });

    if (btnChangeRsvp) {
      btnChangeRsvp.addEventListener("click", (e) => {
        e.preventDefault();
        confirmBox.style.display = "none";
        formFields.style.display = "block";
      });
    }
  }

  // =========================================================================
  // 6. Gallery Lightbox Viewer
  // =========================================================================
  function initGalleryLightbox() {
    const gallery = document.getElementById("sec-gallery");
    const lightbox = document.getElementById("galleryLightbox");
    const lbImg = document.getElementById("lightboxImage");
    const lbCounter = document.getElementById("lightboxCounter");
    const lbClose = document.getElementById("lightboxClose");
    const lbPrev = document.getElementById("lightboxPrev");
    const lbNext = document.getElementById("lightboxNext");

    if (!gallery || !lightbox) return;

    const getImages = () => Array.from(gallery.querySelectorAll(".imgCont img"));

    function showPhoto(idx) {
      const imgs = getImages();
      if (!imgs.length) return;
      lightboxIndex = (idx + imgs.length) % imgs.length;
      lbImg.src = imgs[lightboxIndex].getAttribute("src");
      lbImg.alt = imgs[lightboxIndex].getAttribute("alt") || "";
      lbCounter.textContent = `${lightboxIndex + 1} / ${imgs.length}`;
      lightbox.classList.add("open");
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
    }

    gallery.addEventListener("click", (e) => {
      const imgCont = e.target.closest(".imgCont");
      if (!imgCont) return;
      const img = imgCont.querySelector("img");
      const imgs = getImages();
      const idx = imgs.indexOf(img);
      if (idx >= 0) showPhoto(idx);
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      showPhoto(lightboxIndex - 1);
    });
    lbNext.addEventListener("click", (e) => {
      e.stopPropagation();
      showPhoto(lightboxIndex + 1);
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPhoto(lightboxIndex - 1);
      if (e.key === "ArrowRight") showPhoto(lightboxIndex + 1);
    });
  }

  // =========================================================================
  // 7. Live Wedding Countdown & Vibe Studio Drawer
  // =========================================================================
  function updateCountdown() {
    const target = new Date((cfg.meta && cfg.meta.weddingDateISO) || "2027-08-14T15:30:00-07:00").getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    const elDays = document.getElementById("cdDays");
    const elHours = document.getElementById("cdHours");
    const elMins = document.getElementById("cdMinutes");
    if (elDays) elDays.textContent = days.toLocaleString();
    if (elHours) elHours.textContent = String(hours).padStart(2, "0");
    if (elMins) elMins.textContent = String(mins).padStart(2, "0");
  }

  function updateExportRsvpButtonCount() {
    const btn = document.getElementById("btnExportRsvps");
    if (!btn) return;
    const stored = JSON.parse(safeStorageGet("ryan_abby_rsvps") || "[]");
    btn.textContent = `Export RSVPs (${stored.length})`;
  }

  function initVibeStudio() {
    const studio = document.getElementById("vibeStudio");
    const panel = document.getElementById("vibePanel");
    const toggleBtn = document.getElementById("vibeToggleBtn");
    const closeBtn = document.getElementById("vibeCloseBtn");

    if (!studio) return;
    if (cfg.theme && cfg.theme.showVibeStudio === false) {
      studio.style.display = "none";
    }

    toggleBtn.addEventListener("click", () => {
      panel.classList.toggle("open");
    });
    closeBtn.addEventListener("click", () => {
      panel.classList.remove("open");
    });

    // Keyboard shortcut: Ctrl/Cmd + . toggles Vibe Studio
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ".") {
        e.preventDefault();
        studio.style.display = "block";
        panel.classList.toggle("open");
      }
    });

    const toggleMobilePreview = document.getElementById("toggleMobilePreview");
    const vibeMobileQuickBtn = document.getElementById("vibeMobileQuickBtn");
    const vibeMobileQuickLabel = document.getElementById("vibeMobileQuickLabel");
    const toggleSinglePage = document.getElementById("toggleSinglePage");
    const toggleRsvpNav = document.getElementById("toggleRsvpNav");
    const toggleRegistryNav = document.getElementById("toggleRegistryNav");
    const toggleCountdown = document.getElementById("toggleCountdown");
    const selectFontMonogram = document.getElementById("selectFontMonogram");
    const selectFontDisplay = document.getElementById("selectFontDisplay");
    const selectFontSubhead = document.getElementById("selectFontSubhead");
    const selectFontBody = document.getElementById("selectFontBody");
    const pickerPrimary = document.getElementById("pickerPrimary");
    const pickerBg = document.getElementById("pickerBg");
    const pickerBlush = document.getElementById("pickerBlush");
    const btnResetVibe = document.getElementById("btnResetVibe");
    const btnExportRsvps = document.getElementById("btnExportRsvps");

    function setMobilePreview(active) {
      const isMobile = Boolean(active);
      document.body.classList.toggle("mobile-preview-mode", isMobile);
      if (toggleMobilePreview) toggleMobilePreview.checked = isMobile;
      if (vibeMobileQuickBtn) vibeMobileQuickBtn.classList.toggle("active", isMobile);
      if (vibeMobileQuickLabel) {
        vibeMobileQuickLabel.textContent = isMobile ? "Desktop View" : "Mobile View";
      }
      setTimeout(updateLayout, 60);
    }

    if (toggleMobilePreview) {
      toggleMobilePreview.addEventListener("change", () => {
        setMobilePreview(toggleMobilePreview.checked);
      });
    }
    if (vibeMobileQuickBtn) {
      vibeMobileQuickBtn.addEventListener("click", () => {
        const nextState = !document.body.classList.contains("mobile-preview-mode");
        setMobilePreview(nextState);
      });
    }

    // Support ?mobile=1 in URL to open directly in 390px iPhone simulator mode on desktop
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mobile") === "1") {
        setMobilePreview(true);
      }
    } catch (_) {}

    // Initialize controls from config
    toggleSinglePage.checked = isSinglePage;
    const rsvpCfg = (cfg.navigation || []).find((n) => n.id === "rsvp");
    const regCfg = (cfg.navigation || []).find((n) => n.id === "registry");
    toggleRsvpNav.checked = Boolean(rsvpCfg && rsvpCfg.enabled);
    toggleRegistryNav.checked = Boolean(regCfg && regCfg.enabled);
    toggleCountdown.checked = Boolean(cfg.theme && cfg.theme.showCountdownOnHome);

    if (cfg.theme && cfg.theme.fonts) {
      if (selectFontMonogram && cfg.theme.fonts.monogram) {
        selectFontMonogram.value = cfg.theme.fonts.monogram;
      }
      if (selectFontDisplay && cfg.theme.fonts.display) {
        selectFontDisplay.value = cfg.theme.fonts.display;
      }
      if (selectFontSubhead && cfg.theme.fonts.subhead) {
        selectFontSubhead.value = cfg.theme.fonts.subhead;
      }
      if (selectFontBody && cfg.theme.fonts.body) {
        selectFontBody.value = cfg.theme.fonts.body;
      }
    }

    if (selectFontMonogram) {
      selectFontMonogram.addEventListener("change", () => {
        applyThemeFonts({ monogram: selectFontMonogram.value });
        setTimeout(updateLayout, 50);
      });
    }
    if (selectFontDisplay) {
      selectFontDisplay.addEventListener("change", () => {
        applyThemeFonts({ display: selectFontDisplay.value });
        setTimeout(updateLayout, 50);
      });
    }
    if (selectFontSubhead) {
      selectFontSubhead.addEventListener("change", () => {
        applyThemeFonts({ subhead: selectFontSubhead.value });
        setTimeout(updateLayout, 50);
      });
    }
    if (selectFontBody) {
      selectFontBody.addEventListener("change", () => {
        applyThemeFonts({ body: selectFontBody.value });
        setTimeout(updateLayout, 50);
      });
    }

    toggleSinglePage.addEventListener("change", () => {
      isSinglePage = toggleSinglePage.checked;
      loadPage(currentPage, true);
    });

    toggleRsvpNav.addEventListener("change", () => {
      if (rsvpCfg) rsvpCfg.enabled = toggleRsvpNav.checked;
      const link = document.querySelector('#navScrollList a[data-page="rsvp"]');
      if (link) link.style.display = toggleRsvpNav.checked ? "block" : "none";
      if (toggleRsvpNav.checked) {
        loadPage("rsvp");
      } else if (currentPage === "rsvp") {
        loadPage("home");
      }
    });

    toggleRegistryNav.addEventListener("change", () => {
      if (regCfg) regCfg.enabled = toggleRegistryNav.checked;
      const link = document.querySelector('#navScrollList a[data-page="registry"]');
      if (link) link.style.display = toggleRegistryNav.checked ? "block" : "none";
      if (toggleRegistryNav.checked) {
        loadPage("registry");
      } else if (currentPage === "registry") {
        loadPage("home");
      }
    });

    toggleCountdown.addEventListener("change", () => {
      const cd = document.getElementById("homeCountdown");
      if (cd) cd.classList.toggle("visible", toggleCountdown.checked);
    });

    pickerPrimary.addEventListener("input", () => {
      applyThemeColors({ primary: pickerPrimary.value });
    });
    pickerBg.addEventListener("input", () => {
      applyThemeColors({ background: pickerBg.value });
    });
    pickerBlush.addEventListener("input", () => {
      applyThemeColors({ blush: pickerBlush.value });
    });

    btnResetVibe.addEventListener("click", () => {
      pickerPrimary.value = "#9c0a0d";
      pickerBg.value = "#FFFAF1";
      pickerBlush.value = "#FFE0E0";
      applyThemeColors({
        primary: "#9c0a0d",
        background: "#FFFAF1",
        blush: "#FFE0E0",
      });
      if (selectFontMonogram) selectFontMonogram.selectedIndex = 0;
      if (selectFontDisplay) selectFontDisplay.selectedIndex = 0;
      if (selectFontSubhead) selectFontSubhead.selectedIndex = 0;
      if (selectFontBody) selectFontBody.selectedIndex = 0;
      applyThemeFonts({
        monogram: "'BirthstoneBounce-Regular', cursive",
        display: "'Alpas-Italic', Georgia, serif",
        subhead: "'Merriweather-LightItalic', Georgia, serif",
        body: "'PermanentMarker-Regular', sans-serif",
      });
      setMobilePreview(false);
      toggleSinglePage.checked = false;
      isSinglePage = false;
      toggleRsvpNav.checked = false;
      toggleRegistryNav.checked = false;
      if (rsvpCfg) rsvpCfg.enabled = false;
      if (regCfg) regCfg.enabled = false;
      document.querySelector('#navScrollList a[data-page="rsvp"]').style.display = "none";
      document.querySelector('#navScrollList a[data-page="registry"]').style.display = "none";
      toggleCountdown.checked = false;
      document.getElementById("homeCountdown").classList.remove("visible");
      loadPage("home");
    });

    btnExportRsvps.addEventListener("click", () => {
      const stored = JSON.parse(safeStorageGet("ryan_abby_rsvps") || "[]");
      if (!stored.length) {
        alert("No RSVPs stored locally yet. Enable the RSVP page and submit a test response!");
        return;
      }
      const blob = new Blob([JSON.stringify(stored, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ryan-abby-rsvps.json";
      a.click();
      URL.revokeObjectURL(url);
    });

    const btnLockGate = document.getElementById("btnLockGate");
    if (btnLockGate) {
      btnLockGate.addEventListener("click", () => {
        safeStorageRemove("ryan_abby_unlocked_guest");
        safeStorageRemove("ryan_abby_unlocked_guest_v2");
        safeStorageRemove("ryan_abby_unlocked_guest_v3");
        document.documentElement.classList.remove("guest-pre-unlocked", "guest-unlocked-live");
        const gate = document.getElementById("guestPasswordGate");
        const input = document.getElementById("guestLastNameInput");
        const err = document.getElementById("guestGateError");
        if (gate) {
          gate.style.display = "flex";
          gate.classList.remove("unlocked");
        }
        if (input) {
          input.value = "";
          input.classList.remove("error");
          setTimeout(() => input.focus(), 50);
        }
        if (err) {
          err.textContent = "";
          err.classList.remove("visible");
        }
        const rickRoll = document.getElementById("guestGateRickRoll");
        const rickRollVid = document.getElementById("guestGateRickRollVideo");
        if (rickRollVid) {
          try {
            rickRollVid.pause();
            rickRollVid.currentTime = 0;
          } catch (_) {}
        }
        if (rickRoll) {
          rickRoll.classList.remove("visible");
        }
        panel.classList.remove("open");
      });
    }

    updateExportRsvpButtonCount();
  }

  // =========================================================================
  // 7B. Guest Full-Name Password Gate (SHA-256 Verified against Guest List)
  // =========================================================================
  function sha256Hex(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let result = "";
    const words = [];
    const utf8 = unescape(encodeURIComponent(ascii));
    const asciiBitLength = utf8.length * 8;

    let hash = sha256Hex.h = sha256Hex.h || [];
    const k = sha256Hex.k = sha256Hex.k || [];
    let primeCounter = k.length;

    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (let i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    hash = hash.slice(0, 8);
    let str = utf8 + "\x80";
    while ((str.length % 64) - 56) str += "\x00";
    for (let i = 0; i < str.length; i++) {
      const j = str.charCodeAt(i);
      words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (let j = 0; j < words.length; ) {
      const w = words.slice(j, (j += 16));
      const oldHash = hash.slice(0);
      for (let i = 0; i < 64; i++) {
        const w15 = w[i - 15];
        const w2 = w[i - 2];
        const a = hash[0];
        const e = hash[4];
        const temp1 =
          hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);
        const temp2 =
          (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
        hash.pop();
      }
      for (let i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (let i = 0; i < 8; i++) {
      for (let j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? 0 : "") + b.toString(16);
      }
    }
    return result;
  }

  function normalizeNamePart(raw) {
    return String(raw || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u4e00-\u9fff]/g, "");
  }

  const IGNORED_NAME_TITLES = new Set([
    "mr",
    "mrs",
    "ms",
    "miss",
    "mx",
    "dr",
    "prof",
    "and",
    "the",
    "family",
    "jr",
    "sr",
    "ii",
    "iii",
    "iv",
  ]);

  const BLOCKED_COUPLE_FIRSTS = new Set([
    "ryan",
    "rya",
    "abby",
    "abb",
    "abigail",
    "abi",
    "abig",
  ]);
  const BLOCKED_COUPLE_LASTS = new Set(["leong", "jin"]);

  function isBlockedCoupleName(first, last) {
    if (!first || !last) return false;
    const f3 = first.slice(0, 3);
    const l3 = last.slice(0, 3);
    if (
      (BLOCKED_COUPLE_FIRSTS.has(first) || BLOCKED_COUPLE_FIRSTS.has(f3)) &&
      BLOCKED_COUPLE_LASTS.has(last)
    ) {
      return true;
    }
    if (
      (BLOCKED_COUPLE_FIRSTS.has(last) || BLOCKED_COUPLE_FIRSTS.has(l3)) &&
      BLOCKED_COUPLE_LASTS.has(first)
    ) {
      return true;
    }
    return false;
  }

  function isCoupleNameAttempt(rawInput) {
    const trimmed = String(rawInput || "").trim();
    if (!trimmed) return false;
    const rawWords = trimmed
      .split(/[\s,&/+.;:()'"-]+/)
      .map(normalizeNamePart)
      .filter((w) => w && !IGNORED_NAME_TITLES.has(w));
    if (rawWords.length >= 2) {
      for (let i = 0; i < rawWords.length; i++) {
        for (let j = 0; j < rawWords.length; j++) {
          if (i !== j && isBlockedCoupleName(rawWords[i], rawWords[j])) {
            return true;
          }
        }
      }
    }
    const compact = normalizeNamePart(trimmed);
    return (
      compact === "ryanleong" ||
      compact === "abbyjin" ||
      compact === "abigailjin" ||
      compact === "abbyleong" ||
      compact === "abigailleong" ||
      compact === "ryanjin"
    );
  }

  function findMatchingGuestHash(rawInput, allowedSet) {
    const trimmed = String(rawInput || "").trim();
    if (!trimmed) return null;

    // 0. Check for admin password (e.g. "samoyed")
    const adminNorm = normalizeNamePart(trimmed);
    if (adminNorm) {
      const adminHash = sha256Hex("admin:" + adminNorm);
      if (allowedSet.has(adminHash)) return adminHash;
    }

    // 1. Check for full Chinese (CJK) guest names (e.g., 王桂香, 王桂珍, 靳守拙, 袁肇平)
    const cjkMatches = trimmed.match(/[\u4e00-\u9fff]{2,}/g);
    if (cjkMatches) {
      for (const cjk of cjkMatches) {
        const h = sha256Hex("cjk:" + normalizeNamePart(cjk));
        if (allowedSet.has(h)) return h;
      }
    }

    // 2. Tokenize into individual words, stripping titles/connectors
    //    Requires at least First Name + Last Name (2+ name tokens); last-name-only is rejected.
    const rawWords = trimmed
      .split(/[\s,&/+.;:()'"-]+/)
      .map(normalizeNamePart)
      .filter((w) => w && !IGNORED_NAME_TITLES.has(w));

    if (rawWords.length < 2) {
      return null;
    }

    // Build candidate tokens including adjacent 2-word combinations for hyphenated/compound
    // first or last names (e.g., "Lu-lin Leong", "Bao Yi Lei", "Joanna Felix-Mendez", "Rachel Mendoza Cabral")
    const candidatePairs = [];
    for (let i = 0; i < rawWords.length; i++) {
      for (let j = 0; j < rawWords.length; j++) {
        if (i !== j) {
          candidatePairs.push([rawWords[i], rawWords[j]]);
        }
      }
    }
    if (rawWords.length >= 3) {
      for (let i = 0; i < rawWords.length - 1; i++) {
        const joined = rawWords[i] + rawWords[i + 1];
        for (let k = 0; k < rawWords.length; k++) {
          if (k !== i && k !== i + 1) {
            candidatePairs.push([joined, rawWords[k]]);
            candidatePairs.push([rawWords[k], joined]);
          }
        }
      }
    }

    const testFirstLast = (first, last) => {
      if (!first || !last || isBlockedCoupleName(first, last)) return null;
      const exactHash = sha256Hex(`${first}:${last}`);
      if (allowedSet.has(exactHash)) return exactHash;

      // Also check 4-letter and 3-letter first-name prefixes paired with exact surname
      // so natural nickname variations (e.g., "Johnny Yoon" for "John Yoon") work seamlessly
      if (first.length >= 4) {
        const p4Hash = sha256Hex(`p4:${first.slice(0, 4)}:${last}`);
        if (allowedSet.has(p4Hash)) return p4Hash;
      }
      if (first.length >= 3) {
        const p3Hash = sha256Hex(`p3:${first.slice(0, 3)}:${last}`);
        if (allowedSet.has(p3Hash)) return p3Hash;
      }
      return null;
    };

    for (const [first, last] of candidatePairs) {
      const matched = testFirstLast(first, last);
      if (matched) return matched;
      // Also support pluralized surname if someone types e.g. "John Yoons"
      if (last.length > 3 && last.endsWith("s")) {
        const matchedSingular = testFirstLast(first, last.slice(0, -1));
        if (matchedSingular) return matchedSingular;
      }
    }

    return null;
  }

  function trackGuestLogin(rowNum, rawCode, matchedHash, endpoint) {
    if (!endpoint) return;
    try {
      const payload = JSON.stringify({
        v: 1,
        row: rowNum,
        code: String(rawCode || "").trim(),
        hash: String(matchedHash || "").slice(0, 12),
        ts: new Date().toISOString(),
      });
      fetch(endpoint, {
        method: "POST",
        mode: "cors",
        keepalive: true,
        body: payload,
      }).catch(() => {});
    } catch (_) {}
  }

  function initPasswordGate() {
    const gate = document.getElementById("guestPasswordGate");
    if (!gate) return;

    const gateCfg = cfg.passwordGate || {};
    if (gateCfg.enabled === false) {
      document.documentElement.classList.add("guest-pre-unlocked");
      gate.classList.add("unlocked");
      gate.style.display = "none";
      return;
    }

    // Hydrate gate text from config
    const monoEl = document.getElementById("guestGateMonogram");
    const titleEl = document.getElementById("guestGateTitle");
    const subEl = document.getElementById("guestGateSubtitle");
    const promptEl = document.getElementById("guestGatePrompt");
    const inputEl = document.getElementById("guestLastNameInput");
    const btnEl = document.getElementById("guestGateSubmitBtn");
    const btnTextEl = document.getElementById("guestGateBtnText");
    const errEl = document.getElementById("guestGateError");
    const rickRollEl = document.getElementById("guestGateRickRoll");
    const rickRollVideoEl = document.getElementById("guestGateRickRollVideo");
    const formEl = document.getElementById("guestGateForm");

    const clearRickRoll = () => {
      if (rickRollVideoEl) {
        try {
          rickRollVideoEl.pause();
          rickRollVideoEl.currentTime = 0;
        } catch (_) {}
      }
      if (rickRollEl) {
        rickRollEl.classList.remove("visible");
      }
    };

    if (monoEl && gateCfg.monogram) monoEl.textContent = gateCfg.monogram;
    if (titleEl && gateCfg.title) titleEl.textContent = gateCfg.title;
    if (subEl && gateCfg.subtitle) subEl.textContent = gateCfg.subtitle;
    if (promptEl && gateCfg.prompt) promptEl.textContent = gateCfg.prompt;
    if (inputEl && gateCfg.placeholder) inputEl.placeholder = gateCfg.placeholder;
    if (btnTextEl && gateCfg.buttonText) btnTextEl.textContent = gateCfg.buttonText;

    // Support ?lock=1 to force re-locking for testing
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("lock") === "1") {
        safeStorageRemove("ryan_abby_unlocked_guest");
        safeStorageRemove("ryan_abby_unlocked_guest_v2");
        safeStorageRemove("ryan_abby_unlocked_guest_v3");
        document.documentElement.classList.remove("guest-pre-unlocked", "guest-unlocked-live");
      }
    } catch (_) {}

    const hashToRow = gateCfg.guestHashToRow || {};
    const allowedSet = new Set(
      (gateCfg.allowedGuestNameHashes || []).concat(Object.keys(hashToRow))
    );
    if (Array.isArray(gateCfg.extraAllowedFullNames)) {
      gateCfg.extraAllowedFullNames.forEach((extra) => {
        const parts = String(extra || "")
          .trim()
          .split(/\s+/)
          .map(normalizeNamePart)
          .filter(Boolean);
        if (parts.length >= 2) {
          const f = parts[0];
          const l = parts[parts.length - 1];
          if (!isBlockedCoupleName(f, l)) {
            allowedSet.add(sha256Hex(`${f}:${l}`));
            if (f.length >= 3) allowedSet.add(sha256Hex(`p3:${f.slice(0, 3)}:${l}`));
            if (f.length >= 4) allowedSet.add(sha256Hex(`p4:${f.slice(0, 4)}:${l}`));
          }
        }
      });
    }

    const savedUnlock = safeStorageGet("ryan_abby_unlocked_guest_v3");
    if (savedUnlock && allowedSet.has(savedUnlock)) {
      document.documentElement.classList.add("guest-pre-unlocked");
      gate.classList.add("unlocked");
      gate.style.display = "none";
      return;
    }

    // Not unlocked (or stored hash is invalid): clean up any stale token and ensure gate is visible
    if (savedUnlock) {
      safeStorageRemove("ryan_abby_unlocked_guest_v3");
    }
    document.documentElement.classList.remove("guest-pre-unlocked", "guest-unlocked-live");
    gate.classList.remove("unlocked");
    gate.style.display = "flex";

    const attemptUnlock = (e) => {
      if (e) e.preventDefault();
      const val = inputEl ? inputEl.value : "";
      const matchedHash = findMatchingGuestHash(val, allowedSet);
      if (matchedHash) {
        clearRickRoll();
        safeStorageSet("ryan_abby_unlocked_guest_v3", matchedHash);
        const rowNum = hashToRow[matchedHash] || 127;
        trackGuestLogin(rowNum, val, matchedHash, gateCfg.trackerEndpoint);
        document.documentElement.classList.add("guest-unlocked-live");
        gate.classList.add("unlocked");
        if (inputEl) inputEl.blur();
        setTimeout(() => {
          document.documentElement.classList.add("guest-pre-unlocked");
          gate.style.display = "none";
        }, 420);
      } else {
        if (inputEl) inputEl.classList.add("error");
        if (isCoupleNameAttempt(val)) {
          trackGuestLogin(
            127,
            "[Rickrolled] " + String(val || "").trim(),
            "rickroll",
            gateCfg.trackerEndpoint
          );
          if (errEl) {
            errEl.innerHTML = `Nice try! Please enter <strong>your own</strong> first and last name &#128521;`;
            errEl.classList.add("visible");
          }
          if (rickRollEl) {
            rickRollEl.classList.add("visible");
          }
          if (rickRollVideoEl) {
            try {
              rickRollVideoEl.muted = false;
              rickRollVideoEl.volume = 1.0;
              rickRollVideoEl.currentTime = 0;
              const playPromise = rickRollVideoEl.play();
              if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {
                  rickRollVideoEl.muted = true;
                  rickRollVideoEl.play().catch(() => {});
                });
              }
            } catch (_) {}
          }
          return;
        }
        clearRickRoll();
        if (errEl) {
          const email = (cfg.meta && cfg.meta.contactEmail) || "leongs2027@gmail.com";
          const rawTokens = String(val || "")
            .trim()
            .split(/[\s,&/+.;:()'"-]+/)
            .map(normalizeNamePart)
            .filter((w) => w && !IGNORED_NAME_TITLES.has(w));
          if (rawTokens.length === 1 && !/[\u4e00-\u9fff]{2,}/.test(val)) {
            errEl.innerHTML = `Please enter both your <strong>first and last name</strong> (e.g., John Yoon). Having trouble? Reach out to <a href="mailto:${escapeHtml(
              email
            )}">${escapeHtml(email)}</a>.`;
          } else {
            errEl.innerHTML = `We couldn't find that name on our guest list. Please enter your first and last name, try your partner's name, or reach out to <a href="mailto:${escapeHtml(
              email
            )}">${escapeHtml(email)}</a> if you are unable to access the website.`;
          }
          errEl.classList.add("visible");
        }
      }
    };

    if (inputEl) {
      inputEl.addEventListener("input", () => {
        inputEl.classList.remove("error");
        if (errEl) {
          errEl.textContent = "";
          errEl.classList.remove("visible");
        }
      });
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          attemptUnlock(e);
        }
      });
    }

    if (formEl) {
      formEl.addEventListener("submit", attemptUnlock);
    }
    if (btnEl) {
      btnEl.addEventListener("click", attemptUnlock);
    }
  }

  // =========================================================================
  // 8. Initialization
  // =========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    hydrateFromConfig();

    // Bind SVG object load listeners to apply primary color
    document.querySelectorAll(".iconImage object").forEach((obj) => {
      obj.addEventListener("load", () => {
        const primary =
          getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() ||
          "#9c0a0d";
        colorSvgObject(obj, primary);
      });
    });

    // Menu button & overlay click handlers
    const mm = document.getElementById("mm");
    const navContent = document.getElementById("navContent");
    if (mm) {
      mm.addEventListener("click", () => {
        if (navOpen) closeNav();
        else openNav();
      });
    }
    if (navContent) {
      navContent.addEventListener("click", () => {
        if (navOpen) closeNav();
      });
    }

    // Internal navigation links
    document.querySelectorAll(".navItem").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-page") || link.getAttribute("href");
        loadPage(target);
      });
    });

    // Browser back/forward navigation
    window.addEventListener("popstate", (e) => {
      const stateSet = e.state && e.state.set ? e.state.set : getCurrentLocationTarget();
      loadPage(stateSet, true);
    });

    // Gallery image load listeners for masonry layout
    const gallery = document.getElementById("sec-gallery");
    if (gallery) {
      gallery.querySelectorAll("img").forEach((img) => {
        img.addEventListener("load", () => positionGalleryCollage(gallery));
      });
    }

    // Window resize listener
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateLayout, 100);
    });

    initPasswordGate();
    initFaqAccordions();
    initRsvpForm();
    initGalleryLightbox();
    initVibeStudio();

    updateCountdown();
    setInterval(updateCountdown, 30000);
    if (cfg.theme && cfg.theme.showCountdownOnHome) {
      const cd = document.getElementById("homeCountdown");
      if (cd) cd.classList.add("visible");
    }

    // Initial route load
    const initialTarget = getCurrentLocationTarget();
    loadPage(initialTarget, true);
  });

  window.addEventListener("load", () => {
    colorAllSvgObjects();
    updateLayout();
  });
})();
