# Ryan & Abby Wedding Website (`ryan-abby.com` Vibecoded Edition)

A 1:1 visual and functional custom codebase for [ryan-abby.com](https://www.ryan-abby.com/), built in clean, zero-dependency HTML5, Vanilla CSS, and Vanilla JS with a single-source-of-truth configuration file (`site-config.js`) and all custom fonts (embedded inline as Base64 `.woff2`), hand-drawn SVG illustrations, and engagement photos hosted locally.

## Project Structure

- [`site-config.js`](./site-config.js) — **Single Source of Truth**. Edit all copy, event times, hotel links, Our Story chapters, FAQs, Registry links, RSVP form fields, colors, fonts, and page visibility flags (`enabled: true/false`) in one place.
- [`index.html`](./index.html) — Clean semantic HTML5 markup for all 9 sections (`HOME`, `WEDDING DAY`, `WEEKEND EVENTS`, `OUR STORY`, `DETAILS`, `FAQs`, `REGISTRY`, `RSVP`, and `Gallery`), plus the fullscreen photo Lightbox, **📱 Mobile View (`390px` iPhone preview)** button, and interactive **Vibe Controls** drawer.
- [`styles.css`](./styles.css) — Inline Base64 `@font-face` declarations for all 4 original `.woff2` typefaces (`BirthstoneBounce-Regular`, `Alpas-Italic`, `Merriweather-LightItalic`, `PermanentMarker-Regular`), CSS Custom Properties (`--color-primary`, `--color-bg`, `--color-blush`, `--font-monogram`, `--font-display`, `--font-subhead`, `--font-body`), oval pill buttons, split-screen menu transition, 50/50 checkerboard sections, and full mobile responsive breakpoints (`<= 1012px`, `<= 768px`, `<= 480px`, `<= 360px` + `body.mobile-preview-mode`).
- [`app.js`](./app.js) — Zero-jQuery Vanilla JS handling multi-page tab routing (`#wedding-day` and legacy `#p746571` hashes), optional single-page scroll mode, live font & color switching, dynamic SVG recoloring, FAQ accordions, 3-column masonry gallery layout + Lightbox, and the multi-guest RSVP form.
- [`_fonts/`](./_fonts/) — All 4 original `.woff2` typefaces (`BirthstoneBounce-Regular`, `Alpas-Italic`, `Merriweather-LightItalic`, `PermanentMarker-Regular`).
- [`_images/`](./_images/) — All 11 hand-drawn crimson SVG illustrations and 16 high-resolution `.webp` / `.jpeg` engagement photos.
- [`reference/`](./reference/) — Untouched raw HTML, CSS, and JS exported from the original live site for reference.

## Quick Customization Recipes

1. **Preview the Mobile Layout on Desktop**:
   - Click the **📱 Mobile View** pill in the bottom-right corner (or toggle `"Mobile Preview (390px iPhone)"` inside **Vibe Controls**).
2. **Adjust Fonts Live or in Config**:
   - Open **Vibe Controls** (bottom-right button) and use the **Typography & Fonts** dropdowns (`Monogram ("A & R")`, `Display Headings (H1)`, `Subheadings / Menu (H2/H3)`, `Body Copy & Buttons (H4/H5)`) to switch between the original wedding fonts and 12 curated Google Fonts (`Cormorant Garamond`, `Playfair Display`, `Instrument Serif`, `Bodoni Moda`, `Great Vibes`, `Pinyon Script`, `Lora`, `Montserrat`, `Plus Jakarta Sans`, etc.), or set `theme.fonts` permanently in [`site-config.js`](./site-config.js).
3. **Enable the `RSVP` or `REGISTRY` pages in the navigation menu**:
   - In [`site-config.js`](./site-config.js), under `navigation`, flip `enabled: false` to `enabled: true` on `registry` or `rsvp` (or toggle them live using the **Vibe Controls** button in the bottom-right corner).
4. **Switch between Multi-Page Tab Mode and Single-Page Scroll Mode**:
   - In [`site-config.js`](./site-config.js), change `theme.navigationMode` from `"multi-page"` to `"single-page"`.
5. **Update Afterparty or Sendoff Brunch venue (`TBD`)**:
   - In [`site-config.js`](./site-config.js), edit `weekendEvents.events[1].descriptionLines` (e.g., replace `"TBD"` with `"Rod & Hammer's SLO Stills"`).
6. **Connect RSVP submissions to Google Sheets**:
   - Set `rsvp.webhookUrl` in [`site-config.js`](./site-config.js) to a Google Apps Script Web App URL (or export test RSVPs directly from the Vibe Controls drawer).
7. **Hide the Vibe Controls button before deploying to production**:
   - Set `theme.showVibeStudio: false` in [`site-config.js`](./site-config.js) (you can still open it anytime with `Cmd/Ctrl + .`).
