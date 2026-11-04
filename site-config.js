/**
 * Ryan & Abby Wedding Website — Single Source of Truth Configuration
 * Custom Vibecoded Edition for https://www.ryan-abby.com/
 *
 * Edit anything in this file (copy, dates, venues, links, colors, fonts,
 * or flip `enabled: true` on `registry` / `rsvp`) and the site updates automatically.
 */
window.WEDDING_CONFIG = {
  meta: {
    title: "Abigail Jin and Ryan Leong's Wedding Website",
    description:
      "Welcome to Abigail and Ryan's Wedding Website! View photos, directions, registry details and more.",
    monogram: "The Leongs",
    contactEmail: "leongs2027@gmail.com",
    weddingDateISO: "2027-08-14T15:30:00-07:00",
    ogImage: "https://www.ryan-abby.com/_images/6142927f27da606c3d76c886cad3e786.webp",
  },

  // Guest Last-Name Password Gate (matches any invited guest's last name from Guest List / Guest List v2)
  // Last names are stored as SHA-256 hashes of normalized surnames so the guest list isn't exposed in plain text.
  passwordGate: {
    enabled: true,
    monogram: "The Leongs",
    title: "ABIGAIL & RYAN",
    subtitle: "August 14, 2027 · San Luis Obispo, CA",
    prompt: "Please enter your last name (or full name) to view our wedding website",
    placeholder: "Enter your last name or full name",
    buttonText: "Enter Website",
    errorText:
      "We couldn't find that name on our guest list. Please check the spelling, try your partner's name, or reach out to leongs2027@gmail.com if you are unable to access the website.",
    allowedLastNameHashes: [
      "c39d6d8c0d23dda456613a8c62046021f6b2e4337c7a2b52a096081c2c7a1e22",
      "637fda1a194fe96d474f2f3ecffacda52a0a75e67c06480c4e5a0ef08ddc9095",
      "5394b59343f56c48532bffad9f1b4665864827b5c5ee75046773e2e7052ecc0f",
      "c38640a4e6f22c4a09c50d31ba17c08ff024348af985334dee5b6dece607e6dc",
      "632cd2fea71dcde005af4e07f14b8bc1f68b63d9c1b373dc6048fb87e90af22b",
      "c1779aaecdf479bc812ab49aef87169ad97d93149bc52a22a5d8602484279707",
      "f1a56ff3ac9f2f997985e93d54361977c4aba9248cc72f4c1b122d63c6234e86",
      "9d3881d5a804cb718a50ed272dd5bb9f6ad381a23b1e013359e3df5e0568ac74",
      "f90caad753e66639c230e2defc9c9a2eca06340fb8ecb2a564a5c2a59f7c4ed9",
      "41ad57d43929d86c345b3a367487aa334d6027e9ee81e3cc09c17df3e0830b59",
      "48dab5687b49e102adeab84246bdbc5d077ee7d8af2daa960316aba21e73ee24",
      "e16e594c2c24d0bd5b16b397b5b8fea0b69c8d55fb23043a0b6785c721371573",
      "6d1e698119ccd175bd3b9e0d6be8783e837e8447c726ab1a68d827fa86eb6954",
      "d2d1f3eb629c82b61cd71de84e674476843512f86649186b716ff3e13f5a87bd",
      "606abffd621bf5883beda6c1982abb8fe530d3e247066dd21586f57b07ec323e",
      "8ed300323a36c10c0538007cd96de6ddbe66835ae3d76623687acb76ba5e59f5",
      "a7fe9dcbcafa8559ea3617a3a21af7b8aa06c2badf7322c67c5ee6b6f880cdb1",
      "d3e91f6aacb8b27c0aaa0605182ceccdea4565d992965a0005b8e24a9dd15cc6",
      "df2287903aba95f142a25de3759ec3df494d3fe5e470b9d219e92e763d52340e",
      "3abd72ec6352d6085d85e34f0478dca7d14ef8048f3c1986e28106d654713946",
      "211c963a9272a1405a2ae77464235dd515f0fb086fed0cf785e0ce5c13c07477",
      "67a1609e1e9c8e80856644128a084295f732581f9ee05710d9601a5eee45b04c",
      "4beeb72de58b9de8213c730346b36e2e10a794533f4b58b439ca3b76ecfbd18f",
      "d79f78d58f89d73b450e15c150d3af2673043591889575b00dc5c62ebdec137d",
      "334f42af4ffa09bfd927867579673de3396cd5dbf32b30f52b01954edb804b2f",
      "7781113a99f177280ad3e89bcf631f03acb8fa8e626082dd9158eeee0bdd5674",
      "fc4c9038dc043cf98fbe2572b0c150d86cf07317e6dfce774fd684c5cf80e745",
      "d4316cee443748b71bc9de99ce79a1a0c0438b9aac0ac4b45a4cec583bf15d5f",
      "ac0b52a2ae6ef99999bc08fb31e19188bf0085a4614204068e677e140e1458be",
      "1ff69c405a41cda970cf36c6c8192247650ea952227fa1df8048e707bf7e8d7a",
      "35d3789d4f8633b26a634f3345c216754fdcb7b1787289831787a02c104bd05c",
      "f39889eb42412593927c5136480e66f4ff0b813e071f2e5ddab70c14154692e4",
      "21b5d62444736672de7530a48155d19d8d2eb2406f168dc9c31afe4058d85b99",
      "960f984285701c6d8dba5dc71c35c55c0397ff276b06423146dde88741ddf1af",
      "844c445735c0274db9fe3fb73300d757c3555df2704b991643f7a128f8cd6c68",
      "6237566f7d19759ddc615c3d1d50f7a2c31a5399669ba63820c511418492b5d6",
      "1aedac41cf160ca5b45faf3e3ff702a84482db37416af707ac055fef2584cdd9",
      "4c2c99819a510dbb94a2b592b7217574dd6bc376b1f679312057a1c0d2c6b4cb",
      "a4d0ef23161b5b7c6a8d5b287543fd74e16b3bf313d71aa187c24cdd728a7b1e",
      "cb37790a8586667fe9d52fbf3749dbbbdf05a5e6eab4152a8af7330c10ea60f5",
      "26dcbaddde6eeb068c28f506befdc84bc54ea380f8a82c3eb5690c1a487a4000",
      "b59a2aa4cfb38f4a6dfb1ebe4ef42c1b321afb7543086910c06e8c74f115d1e9",
      "298bab1136dcde8c0157190fa5374cbf36c33f79b13a7597da8027c5afe8dc31",
      "e7d3685715939842749cc27b38d0ccb9706d4d14a5304ef9eee093780eab5df9",
      "ee0c851ebe3e7a40ad92505d80f8e897932c86ea33a8010b9845079f95126e73",
      "dac6c7705f4a5ada4b6164e9ca4b6ea033cefa7975a6277378277820f368d5b0",
      "9ae7f067a901600f595e9dc85e3db05d87116a2e9f846983558ddac3061220fd",
      "75239d03c9a8bd9381c16b0d78a21a1493b1d2ab982da8824ef068471ff96020",
      "e28b2895f6b3dc27a9009b3fe6838aac56b5e1472e755209ced81b72bca1dbfb",
      "a0efab21c064407a0f1a74aadb42000ed5ec324b14026a828d95c30480688178",
      "c967438655d31b8dbde28016a60a843c0888b176564d084ce28aaf2ba3f45fb1",
      "4102b7c87b16b30cee51e3cd881034b5b2ccd6ef7af31fafbfe8091764146f72",
      "55566188e549e72ba5986274a15c24eb85490a73edb28400f46406da24e2b6b5",
      "5558136d52baf7e823b79da2d31a90b2a114a9ca84535f66dfcc13904f316fd6",
      "c35d6aaf3b3885dfc9f36cddf48a65e93a919e13165fbbcfc0f9de5636279559",
      "6440ffe3880cb3d68f0fbc829be7f94790d421a8b8cbb2c91104a185cdea305c",
      "b84f668759dba06a4b2cb78e326cfaba0718589a81beed76a4b0085998445652",
      "4e766f099e980c1ed89164271b470d32d330563ac6f866f3a46146bb429bb71f",
      "78675cc176081372c43abab3ea9fb70c74381eb02dc6e93fb6d44d161da6eeb3",
      "3a05b49df4c6c05875cda0a75d521e17611bdc86ec782634ffb6e368b5bee10b",
      "b736fac97c6b363fb738211e46fca6ea7d120fdea6c1a0ecc41c39d2986a8b7c",
      "26ae784d194a5760464348329af4eb9fca2b27bbf823742c968a61543e3a1153",
      "5f8db09094ca29f1eee9e2fdb5c46d307ccc49fa52b5003df91fb57d5bd5dd05",
      "7f1b55b860590406f84f9394f4e73356902dad022a8cd6f43221086d3c70699e",
      "1f866d986ecb0367af29aaeab9c870a063f50043ac05ed4b1a8fad9d6fc895cd",
      "1508b697895abf03d55c3841f59236ab92c9ba6ba89795c8337fcf392fdee8b4",
      "7d296c79bdb526d6baadda6cfbd308fc809c1eb9d376fdba2b9ab153f3870d45",
      "b49d59a620552847f2bdc1f6c8acf01ece534d40b37dfcc019fce7f4426ba8a2",
      "00a9e4255a5b63067b76cbfb9fd67f26bdb91be802d5ffcb177ec1b7a8d4c623",
      "2f48b881ea7073f1c6f083b296a360bd4c9cf51edaacba1cd9c34d8ae3d994ec",
      "eb9e5c2a708dd6c4b57088c96553de8303cf431b5e42a0630625fa08d8dd6d6b",
      "77c1f88eddd5adee36f2b0996d5f286ada89b661c5ecfbee6bc4076da42ede71",
      "23f0f3f7384d583727fbdb5ade5dba7de508503c42045f68534599e5a61a5075",
      "8fa487cc5c1e37f4e92fa5c4dfc72d19f12bda8e30caf8b243a48f367ffcab63",
      "d2b6d7cc5ab186292ac06ce2f749dbec93f21fb3fef4888d843bd9f8db744573",
      "86d625ecfd684082637fae24012f5cf86b8af2d6d724280822a30ff91d37f017",
      "57d8477b60690edc2225f70dba9c40fde840c8f264c7f47c3d80ea593ab11dcd",
      "cc505d3f030573e25853fea5a7bb4605722b3d14e0fabd615e09627d07f02301",
      "aef400263f2bd7f2268185db73fc9021f0d92ab9a022f43f52914d6b5a1f5ff8",
      "d2641888ed6426afd3d3649066cf3614ec2eb63d3ec90ba2e3a54ba2dffa61ca",
      "8529ab6899015263573df683e57a9de269d60d38f9a5493152e1f53e8c5c2730",
      "59c7c5666f25ef377a52939a0a4f621eb0d66f7f88d936096a9aeb46bd22a71c",
      "220f1e4c0e77994f2ea19d4c6cc469f555ee8fe98b3d34da733534ee3359f86f",
      "7c4b515e60bd7ff0ca76a87579ed2c31db803edaba82b9e545c5f384ea38bb38",
      "04db248bd13040d52df9ada78044e23e9826953c783597340bfad2577de9aa0e",
      "ec5048c09bb398bf13c44cc9c6c0625bf82742ea3758bca063a1701c88d73ab9",
      "3883da3ba1ba77b3f267753093bbab71e8c4d95f9b8c176cb10f5e0d7e3dfd99",
      "7b9b3f99471f4126cbccf18e6c9a6e670aaa1d6da20d04c4ed15622f64908027",
      "69467032773f893dcd508378c93cde8eca8a2f03a3f96c48500265e3b5a35c15",
      "33c35f8c8515b13ce15324718eccea7fb10e0c8848df3e3e0a7c0e529303828d",
      "683b531f41ec88a2f345b727afe59757b73162a340a65c86bba62866f8fe556c",
      "7baa68f2418ba82d2545a780c00d7a8778249bbcdaf7369114534874ea6d3bd6",
      "e67664f8ad564a12ab9ba11cafb5f4bc0fee6cabad0087aa09ff04445a4a6c8d",
      "7908308e44e8414cfab5cfabf025f64d1d9c4159232ad7ed24eb112186d3b6db",
      "8734faac10a4b0293ba965be6ce09fa58d9950f8d3887c1c612b6d7eaee826e2",
      "af51a62edc4cb9936787de487e4dcd271c945ba7c975823284056d9ed9c550d5",
      "cbebc8d58b12e37c93e7e1a12385621ddaeaa07b0b358f6e7145086c96efd2ce",
      "71ccfc0f254460782484beeb8309a65db37b991a134d5dd4c7214c4283705585",
      "03cf7169248303e6db384bed8a38e079b55fe4572efc4bf4dd6428cd05b4c736",
      "39106116d8a2659047dd3e8089ed5d80adfd4ea51450a0b20515972f92953f43",
      "78f463ea8e299e86d0a7a36e29217daf86692c2ae19347651daa67996395f172",
      "c6d312a8ab6bbcabb650f11480f314bb9b168172f6cda60baf16e2c329e5267a",
      "98aa6675482552881925fe70d82559692d811b3bcd33f53b9a702c24d5322696",
      "63f75c890b05405e6e1f047072642b40949dab5912aa9c0ae6f2e654dff943dd",
      "01df2cc6fa6f8098a687eb5c5ad5f4186bffcd18f75f87fba9735daede10108c",
      "5a184a890a9c34c199d4e32e4384697914b5cb722eb6664b021a51319876c8ae",
      "cbbb2b64949871442de2ccfe4fa432460dfb5df8069e88027ce69c3c4eb56c64",
      "e95d9ac2303e661af0f7a49e7fc413cffc2828532633d99ece863c1cbaf5fc50",
      "943d1bc92edd3c8f98a8370f4ccf6ce4c4298ef83bc8b6c4b7c20a91e9e97307",
      "440ef330e4f22a6b7824525fc1fb22b88065eb707dbe17546228c5f391696d0b",
      "51de041bc17f0ea5d5176fa7e9933006495cae9366cd3d1f979af0d5cb1db424",
      "cefaf5dfe26e7f6878b5eeb13f92eb92fc000ba481513803358e1cd56b9b7670",
      "2ac81299578013795576682809a4a16d1ecca67118a797ea576c113c41786849",
      "3ed58504bfc045320e24aaca78ed83508f961fdd7a2dd561ce85799fb357a2db",
      "cf4e39ae462a0f95b17df439ce97a49187cbbdda9c658129ff5f5cd27a2884bc",
      "28cc570073da858ad7d33f685cf9d547e46cf2541aa91981f7f23cdd14233f76",
      "63af6aeff3d1f29be88aa7ddbb77bb3ff7ace85d3590bf91c2a938db6a842de3",
      "802c038af88b868653c8905b8efd030c6c95341feeddfa795764265a60834af8",
      "14bbfb46cb710ab5cf477269d856fc79d4d5b31cfbe466a37a43b1537e0693a4",
      "3399a0e651ad104cd1f53cd0c44d08b70c6c2e8e1eba56f2d244368264322118",
      "02866e5967eaec7381ce427bd72412d28a214f1e95c4840e89b9a545c92b8dce",
      "17f208ba1986d948daef0d751bfc0561554eebc1ca1d539b054918b710dd736d",
      "1ee51b6fe1d3547ec12c2e4153bcb8f98b382879efeb2d9053d759db7b4cb0f9",
      "0b7fd68bf4bf27c0ea0c4a0160ce51c632876c04ca26890bde2e5cfdbd2f429b",
      "7a0ce1c932b2ef13f903bd1221773248acb659c84309b7f54e3fca52a9e3e292",
      "e02bd6e478b6bb2d3224b8b081b139a3a2c55596204676cad6b97446f5db260b"
    ],
  },

  theme: {
    colors: {
      primary: "#9c0a0d",      // Signature Crimson Red
      background: "#FFFAF1",   // Warm Cream Ivory
      blush: "#FFE0E0",        // Soft Blush Pink (split cards & FAQs)
      white: "#FFFFFF",
      muted: "#9a9490",
    },
    // Font families for each typographic role.
    // Built-in embedded fonts: "BirthstoneBounce-Regular", "Alpas-Italic", "Merriweather-LightItalic", "PermanentMarker-Regular"
    // Preloaded Google Fonts you can swap in anytime (or test live in Vibe Controls):
    //   Monogram: "BirthstoneBounce-Regular" | "Great Vibes" | "Pinyon Script" | "Alex Brush" | "Cormorant Garamond"
    //   Display:  "Alpas-Italic" | "Cormorant Garamond" | "Playfair Display" | "Instrument Serif" | "Bodoni Moda"
    //   Subhead:  "Merriweather-LightItalic" | "Lora" | "Cormorant Garamond" | "Libre Baskerville" | "Montserrat"
    //   Body:     "PermanentMarker-Regular" | "Lora" | "Cormorant Garamond" | "Plus Jakarta Sans" | "Caveat"
    fonts: {
      monogram: '"BirthstoneBounce-Regular", cursive',
      display: '"Alpas-Italic", serif',
      subhead: '"Merriweather-LightItalic", serif',
      body: '"PermanentMarker-Regular", sans-serif',
    },
    // "multi-page" matches ryan-abby.com's exact tab-switching behavior.
    // Switch to "single-page" for a continuous vertical scroll experience.
    navigationMode: "multi-page",
    showCountdownOnHome: false,
    showVibeStudio: false, // Hidden for guests; press Cmd/Ctrl + . anytime to open Vibe Controls
  },

  // Navigation items & page visibility toggles
  // Note: Both human-readable hashes (#wedding-day) and legacy hashes (#p746571) work!
  navigation: [
    { id: "home", legacyId: "home", label: "HOME", enabled: true },
    { id: "wedding-day", legacyId: "p746571", label: "WEDDING DAY", enabled: true },
    { id: "weekend-events", legacyId: "p746572", label: "WEEKEND EVENTS", enabled: true },
    { id: "our-story", legacyId: "p800595", label: "OUR STORY", enabled: true },
    { id: "details", legacyId: "p746573", label: "DETAILS", enabled: true },
    { id: "faqs", legacyId: "p746578", label: "FAQs", enabled: true },
    { id: "registry", legacyId: "p746574", label: "REGISTRY", enabled: false }, // Hidden on live site right now; flip to true when ready!
    { id: "rsvp", legacyId: "p746576", label: "RSVP", enabled: false },         // Hidden on live site right now; flip to true in early 2027!
    { id: "gallery", legacyId: "p747140", label: "Gallery", enabled: true },
  ],

  // 1. HOME (Coverpage)
  home: {
    headline: "WE'RE GETTING MARRIED!",
    dateText: "August 14, 2027",
    heroImage: "_images/6142927f27da606c3d76c886cad3e786.webp",
  },

  // 2. WEDDING DAY (p746571)
  weddingDay: {
    topIcon: {
      src: "_images/p-746571-pp_graphic_swan-lake-53.svg",
      height: 210,
    },
    headline: "We invite you to join us in celebrating!",
    dateSubhead: "SATURDAY, AUGUST 14, 2027",
    ceremonyLines: [
      "Ceremony at Three Thirty in the Afternoon",
      "Villa Loriana",
      "San Luis Obispo, California",
    ],
    welcomeLines: [
      "Welcome drinks begin at Three PM",
      "Cocktail Hour, Reception, & After-Party to Follow",
    ],
    dressCode: {
      icon: {
        src: "_images/p-746571-pp_graphic_whimsy-26.svg",
        height: 90,
      },
      title: "Dress Code: Black Tie Optional",
      description:
        "We request that male guests appear in black tuxedos or black suits and female guests don evening formal, floor-length gowns.",
    },
  },

  // 3. WEEKEND EVENTS (p746572)
  weekendEvents: {
    bannerTitle: "WELCOME TO OUR WEDDING WEEKEND",
    bannerSubtitle: "SCROLL FOR DETAILS",
    events: [
      {
        day: "Saturday",
        title: "CEREMONY, COCKTAIL HOUR & RECEPTION",
        descriptionLines: [
          "Please join us for welcome drinks and mingling at 3:00 pm ",
          "before the ceremony begins at 3:30 pm.",
          "",
          "Villa Loriana",
          "August 14",
          "3:00 pm-10:00 pm",
        ],
        attire: "Black Tie Optional",
        button: {
          label: "View in Maps",
          url: "https://maps.app.goo.gl/Lh2NVbRpBh1efvqU7",
        },
        bg: "#FFE0E0",
        layout: "text-left",
        icon: {
          src: "_images/p-746572-pp_graphic_whimsy-20.svg",
          height: 180,
        },
      },
      {
        day: "Saturday",
        title: "AFTERPARTY",
        descriptionLines: [
          "Continuous shuttle service connecting Villa Loriana, our afterparty, and our suggested accommodations (Hotel SLO & Hilton Garden Inn) will be available until 2:00 am.",
          "",
          "TBD",
          "August 14",
          "10:00 pm-2:00 am",
          "Black Tie Optional",
        ],
        bg: "#FFFAF1",
        layout: "icon-left",
        icon: {
          src: "_images/p-746572-pp_graphic_whimsy-59.svg",
          height: 180,
        },
      },
      {
        day: "Sunday",
        title: "SENDOFF BRUNCH",
        descriptionLines: [
          "We'd love to see you on your way out of SLO! Drop in for a coffee + pastry to continue the celebrations.",
          "",
          "TBD in Downtown SLO",
          "August 15",
          "10:00 am-1:00 pm",
          "Casual Attire",
        ],
        bg: "#FFE0E0",
        layout: "text-left",
        icon: {
          src: "_images/p-746572-pp_graphic_dolce-vita-coffee-tea-5.svg",
          height: 180,
        },
      },
    ],
    closing: {
      icon: {
        src: "_images/p-746572-pp_graphic_dolce-vita-drink-14.svg",
        height: 180,
      },
      title: "WE CAN'T WAIT TO CELEBRATE  WITH YOU!",
      bg: "#FFFAF1",
    },
  },

  // 4. OUR STORY (p800595)
  ourStory: {
    heading: "OUR STORY",
    chapters: [
      {
        title: "The College Connection",
        paragraphs: [
          "We met at UC San Diego through our business club, Phi Beta Lambda, back when college life was happening mostly through Zoom screens. Abby was the club president, running the show and deep in interview prep, while Ryan was busy teaching himself how to play Disney songs on the ukulele. Naturally, Abby adopted Ryan as her club mentee.",
          "What started as quick mentorship catch-ups over brunch in La Jolla quickly turned into spending entire afternoons losing track of time. Between regular drives up and down the I-5 and meeting each other’s families—mirror image crews of four kids (four boys and four girls total across both broods)—we fit right into the mutual chaos. When Abby moved to Seattle for the summer, we ended up Facetiming almost every night until 5:00 AM, and by the end of that summer, neither of us was pretending we were just friends.",
        ],
        image: "_images/5bf8b9e4f30686be827dcaa509107aae.webp",
        bg: "#FFE0E0",
        layout: "text-left",
      },
      {
        title: "Pacific Northwest Adventures",
        paragraphs: [
          "After graduation, Ryan followed Abby up to Seattle, where we ended up as coworkers at the same firm. When we weren't working long hours, we spent our free time outdoors: kayaking on Lake Washington, picking wild blackberries for homemade jam, and clocking 30+ days a season on the slopes at Whistler and Mammoth. We also spent plenty of vacation days methodically crossing off international Disney parks—checking off Paris, Hong Kong, and Tokyo along the way.",
        ],
        image: "_images/470ec9d654638a17cd4a10e22653c544.webp",
        bg: "#FFFAF1",
        layout: "image-left",
      },
      {
        title: "The New York Plot Twist",
        paragraphs: [
          "Anyone who knows us knows we are unapologetic suburbanites who love a weekend Costco run, easy parking, and the comfort of our own cars. So, moving to New York City was never part of the plan.\nYet when an unexpected career move brought Ryan to the city and Abby was admitted to Columbia Business School, we traded hiking boots for subway stairs and made it work. We've tackled city living in our own predictable ways: Ryan eating his way through over 100 pizza places and scoring every single slice on a meticulous spreadsheet, while Abby pins hundreds of other restaurants on Google Maps.",
        ],
        image: "_images/450ca6bd3313cd14d2f15027efae3a63.webp",
        bg: "#FFE0E0",
        layout: "text-left",
      },
      {
        title: "The Italian Heist",
        paragraphs: [
          "Before officially packing for New York, Ryan spent months quietly putting together a surprise. Knowing how much Abby loved Florence from her college study abroad, he planned a proposal in Tuscany—throwing her completely off the trail by having an entire decoy trip booked to Hawaii.\nWhile staying in Florence with Ryan’s family, Abby answered a morning knock at the Airbnb door to find her own parents and siblings standing on the other side, flown halfway across the world. Thanks to Ryan’s parents, who secretly smuggled Abby’s dress and curling iron across the Atlantic, we got engaged that afternoon at a winery framed by classic Tuscan cypress trees.",
        ],
        image: "_images/6af0d42451dc0c253c91a3aa820f53e0.webp",
        bg: "#FFFAF1",
        layout: "image-left",
      },
    ],
    closingBanner: {
      title: "Coming Home to Celebrate",
      paragraphs: [
        'If you\'ve spent any time with us as a couple, you know how well we complement each other. Ryan’s constant search for "good vibes" keeps Abby’s fast-paced mind grounded, while Abby’s love for good food keep Ryan from turning into an overly frugal carb-consuming machine.',
        "Now, after a two-year engagement, the wait is finally over. California has always been home, and we can’t wait to gather our favorite people from Seattle, New York, and everywhere in between to celebrate with all of you.",
      ],
      bg: "#FFE0E0",
    },
  },

  // 5. DETAILS (p746573)
  details: {
    bannerTitle: "THE DETAILS",
    bannerSubtitle: "Hotels, Parking, & Travel",
    accommodations: {
      icon: {
        src: "_images/p-746573-pp_graphic-country-club-34.svg",
        height: 90,
      },
      title: "Suggested Accommodations",
      subtitle:
        "We strongly recommend booking one of our suggested hotels, as our Saturday evening shuttles can drop you off directly at the end of the night.",
      hotels: [
        {
          name: "HOTEL SLO",
          descriptionLines: [
            "10 minutes from SLO County Airport and ",
            "15 minutes from Villa Loriana.",
            "15% Discount Code: IDO2U",
          ],
          buttonLabel: "Book Hotel SLO (Code: IDO2U for 15% Off)",
          buttonUrl: "https://hotel-slo.com/",
        },
        {
          name: "Hilton Garden Inn",
          descriptionLines: [
            "15 minutes from SLO County Airport and ",
            "10 minutes from Villa Loriana.",
          ],
          buttonLabel: "Book Here for the Best Price",
          buttonUrl:
            "https://www.hilton.com/en/book/reservation/flexibledates/?ctyhocn=SLOPBGI&arrivalDate=2027-08-13&departureDate=2027-08-15&room1NumAdults=2",
        },
      ],
    },
    shuttles: {
      icon: {
        src: "_images/p-746573-pp_graphic_z-good-things-99.svg",
        height: 90,
      },
      title: "Saturday Evening Shuttles",
      subtitle:
        "We will provide shuttles to our after party and suggested accommodations.",
      items: [
        {
          heading: "SHUTTLE ROUTE",
          body: "Shuttles will run every 30 minutes from 10:00 pm until 2:00 am connecting Villa Loriana (wedding), our afterparty, Hotel SLO and Hilton Garden Inn.",
        },
        {
          heading: "UBERS",
          body: "We suggest guests Uber or rideshare to Villa Loriana. Ubers will be available when the evening concludes should you choose not to take our provided shuttle.",
        },
      ],
    },
    cars: {
      icon: {
        src: "_images/p-746573-pp_graphic-country-club-11.svg",
        height: 90,
      },
      title: "Cars & Venue Parking",
      subtitle:
        "If you plan to explore SLO over the weekend, we recommend booking with one of the following out of SLO County Airport.",
      heading: "RENTAL CARS",
      buttons: [
        {
          label: "Hertz",
          url: "https://www.hertz.com/us/en/book/vehicles?pid=SBPT10&pdate=2027-08-13T12%3A00%3A00&did=SBPT10&ddate=2027-08-15T12%3A00%3A00&CDP=1336178&travelType=LEISURE&pCountryCode=US&ownershipType=LICENSEE&age=25",
        },
        {
          label: "Avis",
          url: "https://www.avis.com/en/locations/nam/us/ca/san-luis-obispo/sbp?utm_source=google&utm_medium=gbp&utm_campaign=avis_gbp",
        },
      ],
    },
    flights: {
      icon: {
        src: "_images/p-746573-pp_graphic_z-good-things-29.svg",
        height: 90,
      },
      title: "Flights",
      subtitleLines: ["We recommend flying in and out", "of SLO County Airport."],
      routes: [
        {
          heading: "SEATTLE TO SLO",
          body: "Flights from SEA to SLO run regularly with most round-trips around $350.",
        },
        {
          heading: "NYC TO SLO",
          body: "Flights from JFK/LGA/EWR to SLO run regularly with most round-trips around $400.",
        },
      ],
    },
    questionsBanner: {
      title: "More Questions?",
      subtitle: "Feel free to email us at leongs2027@gmail.com",
    },
  },

  // 6. FAQs (p746578)
  faqs: {
    icon: {
      src: "_images/p-746578-pp_graphic_dolce-vita-food-7.svg",
      height: 210,
    },
    title: "FAQs",
    items: [
      {
        question: "What is the dress code?",
        answerParagraphs: [
          'Our dress code is black tie optional. Please visit our "Wedding Day" page for more information, including a style gallery and color palette (coming soon).',
          "We recognize that some of our male guests may not own tuxedos. In this case, please do not feel obligated to purchase one; a black suit with a black tie would more than suffice! Our female guests are welcome to wear black.",
        ],
      },
      {
        question: "How do I RSVP?",
        answerParagraphs: [
          "After you receive a formal invitation in early 2027, please complete the RSVP form on our website for each guest in your party.",
        ],
      },
      {
        question: "Can I bring a +1?",
        answerParagraphs: [
          "All +1s will be designated in your formal invitation, sent closer to the wedding date.",
        ],
      },
      {
        question: "Will allergy-friendly food options be available?",
        answerParagraphs: [
          "Our dinner will be served buffet style with an array of vegetarian, dairy-free, and gluten-free options.",
          "If you have additional food sensitivities or severe allergies, please let us know in your RSVP so we can prepare a separate plate for you.",
        ],
      },
      {
        question: "How will transportation to and from the afterparty work?",
        answerParagraphs: [
          "We have reserved shuttle service to run a continuous loop connecting Villa Loriana, our afterparty, and our recommended accommodations (Hotel SLO and Hilton Garden Inn). Shuttles will run continuously every 30 minutes from 10:00 pm until 2:00 am. This means you can stop by the afterparty and still be back at your hotel by midnight or even 11:00 pm!",
        ],
      },
      {
        question: "Have any other questions?",
        answerParagraphs: [
          "Feel free to reach out to us anytime at leongs2027@gmail.com — we'd love to hear from you!",
        ],
      },
    ],
  },

  // 7. REGISTRY (p746574 — Hidden by default; toggle `enabled: true` in navigation to display)
  registry: {
    title: "REGISTRY",
    links: [
      {
        label: "Williams Sonoma",
        url: "https://www.williams-sonoma.com/registry/g2fkbkwbh9/registry-list.html",
      },
      {
        label: "Sur La Table",
        url: "https://www.surlatable.com/",
      },
      {
        label: "Crate & Barrel",
        url: "https://www.crateandbarrel.com/",
      },
      {
        label: "Cash Registry",
        url: "#registry",
      },
    ],
  },

  // 8. RSVP (p746576 — Hidden by default; toggle `enabled: true` in navigation to display)
  rsvp: {
    bannerImage: "_images/1517402a16ef8cc503da72961d900004.jpeg",
    title: "kindly respond",
    subtitle: "Please RSVP invited guests by June 14",
    // Optional Google Apps Script Web App URL or custom webhook to save RSVPs directly to a Google Sheet!
    // When empty, RSVPs are saved in browser localStorage and downloadable as CSV from the Vibe Studio drawer.
    webhookUrl: "",
    events: [
      {
        key: "event1",
        title: "THE WEDDING",
        options: [
          { value: "", label: "Will you be joining us?" },
          { value: "1", label: "Can't wait to attend" },
          { value: "0", label: "Will sadly miss out" },
        ],
        hasDietaryField: true,
        dietaryPlaceholder: "List any dietary restrictions",
      },
      {
        key: "event4",
        title: "THE WEDDING AFTERPARTY",
        options: [
          { value: "", label: "Will you be joining us?" },
          { value: "1", label: "Of course, the party will die without me" },
          { value: "0", label: "No, I sleep at grandma hours" },
        ],
        hasTransportationField: true,
        transportationOptions: [
          {
            value: "",
            label:
              "Will you be using our provided transportation? (your best guess!)",
          },
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
        ],
      },
      {
        key: "event3",
        title: "SUNDAY BRUNCH",
        options: [
          { value: "", label: "Will you be joining us?" },
          { value: "1", label: "Yes, I have no responsibilities" },
          { value: "0", label: "No, I'll be halfway home by then" },
        ],
      },
    ],
  },

  // 9. GALLERY (p747140)
  gallery: {
    credit: "",
    images: [
      { src: "_images/4577563d6cc196f90d3edb46b21ccdd6.jpeg", width: 672, height: 1007, alt: "Ryan and Abby engagement portrait 1" },
      { src: "_images/fb804f7aa4cee0decb4c8a18663326d4.jpeg", width: 672, height: 1007, alt: "Ryan and Abby engagement portrait 2" },
      { src: "_images/ab6d3e262b24d524c66b63b47c4f4d3d.jpeg", width: 672, height: 1007, alt: "Ryan and Abby engagement portrait 3" },
      { src: "_images/243cd098819db766c1de1be563486bcb.jpeg", width: 672, height: 448,  alt: "Ryan and Abby engagement portrait 4" },
      { src: "_images/56f3107358a8ad13256691721404397a.jpeg", width: 672, height: 1007, alt: "Ryan and Abby engagement portrait 5" },
      { src: "_images/0cb28fd24cae46ac8a2a9b7b497afa12.jpeg", width: 672, height: 448,  alt: "Ryan and Abby engagement portrait 6" },
      { src: "_images/88fe711ce0d51b16e71bf4ee678aa3b6.jpeg", width: 672, height: 448,  alt: "Ryan and Abby engagement portrait 7" },
      { src: "_images/deec6bb1dfb99ba016a45601d9796584.jpeg", width: 672, height: 448,  alt: "Ryan and Abby engagement portrait 8" },
      { src: "_images/4f70c5c76e33bf2fedb60c3720e5f181.jpeg", width: 672, height: 1007, alt: "Ryan and Abby engagement portrait 9" },
      { src: "_images/3e32adfbc274f6f446e6cb508e25e38c.jpeg", width: 672, height: 448,  alt: "Ryan and Abby engagement portrait 10" },
    ],
  },
};
