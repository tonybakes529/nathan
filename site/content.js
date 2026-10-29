/* ============================================================================
   YOUR PORTFOLIO — edit this file to make the site yours.

   Everything on the page comes from here: your name, words, links, photos
   and videos. You never need to touch index.html.

   A few rules that keep things working:
   • Text goes inside straight double quotes: "like this". Apostrophes are
     fine inside them. To quote someone, use curly quotes: “like this”.
   • Items in a list are separated by commas.
   • File paths start with assets/ — e.g. "assets/photos/me.jpg".
   • Leave a photo or video as null and the page shows a labelled grey box
     telling you exactly what to put there.
   • Don't have something yet (case studies, thumbnails…)? Delete the items
     or set show: false. That section disappears and the menu updates itself.

   After saving, refresh the page (npm run dev) to see your changes.
   ============================================================================ */

window.PORTFOLIO = {

  /* -------------------------------------------------------------------------
     THE BASICS
     ------------------------------------------------------------------------- */
  site: {
    name: "Your Name",
    role: "UGC Creator & Creative Strategist",
    logo: null,          // optional, e.g. "assets/logo.png" — appears next to your name in the top bar

    // How the site looks in Google and when someone shares your link.
    url: "",             // your live address, e.g. "https://yourname.vercel.app"
    title: "",           // blank = "Your Name — Your Role"
    description: "UGC creator and creative strategist making native, scroll-stopping videos for brands.",
    shareImage: null,    // 1200×630 image shown in link previews, e.g. "assets/share.jpg"
    favicon: null        // browser-tab icon; blank = a letter icon in your accent colour
  },

  /* -------------------------------------------------------------------------
     LOOK & FEEL
     preset: "warm" (cream + orange), "clean" (white + blue) or "dark".
     accent: any colour for buttons, links and labels. Find one at coolors.co.
     googleFont: any family name from fonts.google.com, e.g. "Inter" or
                 "DM Sans". Leave blank for the Apple/system font.
     ------------------------------------------------------------------------- */
  theme: {
    preset: "warm",
    accent: "#FF5A1F",
    googleFont: ""
  },

  /* -------------------------------------------------------------------------
     CONTACT — every "Let’s Connect" button uses this.
     bookingUrl: paste a Calendly / Cal.com link to send buttons there instead
                 of opening an email.
     ------------------------------------------------------------------------- */
  contact: {
    email: "hello@yourname.com",
    bookingUrl: "",
    buttonLabel: "Let’s Connect",
    socials: [
      { label: "Instagram", url: "https://instagram.com/yourhandle" },
      { label: "TikTok",    url: "https://tiktok.com/@yourhandle" },
      { label: "LinkedIn",  url: "https://linkedin.com/in/yourhandle" },
      { label: "YouTube",   url: "https://youtube.com/@yourhandle" }
      // Delete any you don't use. Add more with the same shape.
    ]
  },

  /* -------------------------------------------------------------------------
     TOP OF THE PAGE
     headline: each line in the list is its own line on the page.
     ------------------------------------------------------------------------- */
  hero: {
    eyebrow: "Your Name — UGC Creator & Creative Strategist",   // small grey line above the headline
    headline: [
      "Scroll-Stopping UGC",
      "Built to Convert"
    ],
    intro: "I create native, story-driven videos that feel like content — not ads — and give your product a clear reason to matter.",
    workButtonLabel: "View My Work"
  },

  /* -------------------------------------------------------------------------
     BRANDS YOU'VE WORKED WITH — the scrolling logo strip under the intro.
     shape: "wide"   = normal horizontal logo (default)
            "tall"   = stacked / taller logo
            "square" = logo with its own background block (app-icon style)
     No logo file yet? Leave logo as null and the brand name shows as text.
     Tip: transparent PNGs or SVGs look best. Aim for 6+ brands.
     ------------------------------------------------------------------------- */
  brands: {
    label: "Past Collaborations",
    scrollSeconds: 64,           // lower = faster
    logos: [
      { name: "Brand One",   logo: null },
      { name: "Brand Two",   logo: null },
      { name: "Brand Three", logo: null },
      { name: "Brand Four",  logo: null },
      { name: "Brand Five",  logo: null },
      { name: "Brand Six",   logo: null }
      // e.g. { name: "Replit", logo: "assets/logos/replit.png", shape: "wide" }
    ]
  },

  /* -------------------------------------------------------------------------
     ABOUT
     ------------------------------------------------------------------------- */
  about: {
    show: true,
    navLabel: "About",           // name in the top menu ("" hides it from the menu)
    heading: "The Person Behind the Content.",
    paragraphs: [
      "I’m Your Name. Start with a short line about who you are and how you got into creating.",
      "Then tell brands what you’re great at — the kind of content you make, the results it gets, and what working with you is like.",
      "Finish with what you’re looking for: the brands, products or projects you want more of."
    ],
    photo: { src: null, alt: "Your Name" },   // a 4:5 portrait, e.g. "assets/photos/about.jpg"
    specialties: ["UGC", "Product Demos", "Talking Head", "Green Screen", "Hooks & Scripting", "Creative Strategy"]
  },

  /* -------------------------------------------------------------------------
     RESULTS — big numbers, plus optional case studies.
     Numbers that start with a digit ("250M+", "5+") count up on scroll.
     Each case study becomes a tab; each panel is one result card.
     ------------------------------------------------------------------------- */
  results: {
    show: true,
    navLabel: "Results",
    heading: [
      "The Work Is Creative.",
      "The Results Are Measurable."
    ],
    stats: [
      { value: "250M+", label: "Total Views" },
      { value: "5+",    label: "Years Creating" },
      { value: "400+",  label: "Videos Produced" },
      { value: "30+",   label: "Brands Served" }
    ],
    caseStudiesLabel: "Case Studies",
    caseStudies: [
      {
        client: "Example Brand",
        panels: [
          { platform: "TikTok", stat: "Views: 4.2M", image: null,
            description: "What you did and what happened — e.g. grew views from 300K to 4.2M in eight weeks." },
          { platform: "Instagram", stat: "Reach: 1.8M", image: null,
            description: "Keep it to one or two sentences with a number in it." },
          { platform: "YouTube", stat: "", image: null,
            description: "Screenshots of your analytics work great here (16:10 crop)." }
        ]
      }
      // Add another client with the same shape and a new tab appears:
      // ,{ client: "Another Brand", panels: [ { platform: "TikTok", stat: "", image: "assets/results/another.jpg", description: "…" } ] }
      //
      // Screenshot with a dark background? Add  fit: "contain", imageBackground: "#1E1F22"  to that panel.
    ]
  },

  /* -------------------------------------------------------------------------
     UGC VIDEOS — the main grid. Order here = order on the page.
     videoUrl: an MP4 in assets/videos/ (run `npm run videos` to make them)
     poster:   the thumbnail image (made for you by `npm run videos`)
     category: filter buttons are built from the categories you use.
     link:     the public post (shows a "View Original" button), or null.
     ------------------------------------------------------------------------- */
  ugc: {
    show: true,
    navLabel: "UGC Work",
    heading: "Featured UGC Work",
    subheading: "Content designed to feel native, hold attention, and give the product a clear reason to matter.",
    buttonLabel: "Let’s Create Something",
    videos: [
      { title: "Unboxing + First Impressions", brand: "Brand One",   category: "Product Demos", platform: "TikTok",
        videoUrl: null, poster: null, link: null, description: "", results: "" },
      { title: "3 Reasons I Switched",        brand: "Brand Two",   category: "Talking Head",  platform: "Instagram",
        videoUrl: null, poster: null, link: null, description: "", results: "" },
      { title: "The App That Saves Me Hours", brand: "Brand Three", category: "SaaS & AI",     platform: "TikTok",
        videoUrl: null, poster: null, link: null, description: "", results: "" },
      { title: "Why This Went Viral",         brand: "",            category: "Green Screen",  platform: "YouTube",
        videoUrl: null, poster: null, link: null, description: "", results: "" },
      { title: "Morning Routine Feature",     brand: "Brand Four",  category: "Lifestyle",     platform: "Instagram",
        videoUrl: null, poster: null, link: null, description: "", results: "" }
      // Copy a line to add another video. Example of a finished one:
      // ,{ title: "Day 42 Food Review", brand: "Carnivore Crisps", category: "Product Demos", platform: "Instagram",
      //    videoUrl: "assets/videos/day-42.mp4", poster: "assets/videos/day-42.jpg",
      //    link: "https://instagram.com/p/…", description: "Shot in one take.", results: "1.2M views, 4.1% CTR" }
    ]
  },

  /* -------------------------------------------------------------------------
     TESTIMONIALS
     videos: vertical clip testimonials. Use a Vimeo ID (the number in
             vimeo.com/123456789) OR a self-hosted MP4 in video.
     quotes: written quotes, or a screenshot of a DM/email via image.
     ------------------------------------------------------------------------- */
  testimonials: {
    show: true,
    navLabel: "",                // e.g. "Testimonials" to add it to the menu
    heading: "What People Say About the Work.",
    videos: [
      { name: "Client Name", quote: "“One sentence that sums up the result.”", vimeo: null, video: null },
      { name: "Client Name", quote: "“We got monetized in 60 days.”",           vimeo: null, video: null }
    ],
    quotes: [
      { quote: "Paste a real quote from a client here. Two or three sentences about the result and what it was like to work together.",
        name: "Client Name", role: "CMO", company: "Brand One", headshot: null, image: null },
      { quote: "Short quotes work great too.",
        name: "Client Name", role: "Founder", company: "Brand Two", headshot: null, image: null },
      { quote: "Got a screenshot of a happy DM instead? Set image to the screenshot path and it shows that instead of this text.",
        name: "Client Name", role: "CEO", company: "Brand Three", headshot: null, image: null }
    ]
  },

  /* -------------------------------------------------------------------------
     DESIGN WORK — thumbnails, carousels, graphics.
     ratio: "16 / 9" for YouTube thumbnails, "1 / 1" square, "4 / 5" portrait.
     images: for carousels, list every slide; the viewer gets arrows.
     ------------------------------------------------------------------------- */
  design: {
    show: true,
    navLabel: "Design",
    heading: "Content Starts Before the Video Plays.",
    subheading: "Thumbnails created to package ideas, stop the scroll, and make the content impossible to ignore.",
    items: [
      { title: "Thumbnail Title", client: "Brand One",   ratio: "16 / 9", cover: null, images: [], description: "" },
      { title: "Thumbnail Title", client: "Brand Two",   ratio: "16 / 9", cover: null, images: [], description: "" },
      { title: "Thumbnail Title", client: "Brand Three", ratio: "16 / 9", cover: null, images: [], description: "" },
      { title: "Thumbnail Title", client: "Brand Four",  ratio: "16 / 9", cover: null, images: [], description: "" }
      // Carousel example:
      // ,{ title: "5 Hook Formulas", client: "Brand Five", ratio: "4 / 5", cover: "assets/design/hooks-1.jpg",
      //    images: ["assets/design/hooks-1.jpg", "assets/design/hooks-2.jpg", "assets/design/hooks-3.jpg"] }
    ]
  },

  /* -------------------------------------------------------------------------
     FOOTER
     ------------------------------------------------------------------------- */
  footer: {
    tagline: "UGC Creator and Creative Strategist",
    copyrightName: ""            // blank = your name
  }
};
