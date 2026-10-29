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
    name: "Nathan Winn",
    role: "Content Producer & Social Media Marketer",
    logo: null,          // optional, e.g. "assets/logo.png" — appears next to your name in the top bar

    // How the site looks in Google and when someone shares your link.
    url: "",             // your live address, e.g. "https://yourname.vercel.app"
    title: "",           // blank = "Your Name — Your Role"
    description: "Nathan Winn is a Tampa-based cinematographer, colorist and filmmaker producing marketing campaigns, videography, photography and social media content for brands.",
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
    email: "hello@yourname.com",   // ← Nathan's email still needed
    bookingUrl: "",
    buttonLabel: "Start a Project",
    socials: [   // ← Nathan's handles still needed
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
               Write a line as { text: "…", fit: true } to make it grow until it's
               exactly as wide as the longest other line.
     ------------------------------------------------------------------------- */
  hero: {
    eyebrow: "Nathan Winn — Content Producer & Social Media Marketer",   // small grey line above the headline
    headline: [
      "Content Production",
      { text: "REFRAMED", fit: true }
    ],
    intro: "From commercial sets to independent films, I’ve learned what makes people feel something on screen. Now I bring that craft to brands, with a strategy behind every frame.",
    workButtonLabel: "View My Work"
  },

  /* -------------------------------------------------------------------------
     BRANDS YOU'VE WORKED WITH — the scrolling logo strip under the intro.
     shape: "wide"   = normal horizontal logo (default)
            "tall"   = stacked / taller logo
            "square" = logo with its own background block (app-icon style)
     height: optional size in pixels. Wide logos look bigger than square ones at
             the same height, so give wide logos a smaller number to balance them.
     No logo file yet? Leave logo as null and the brand name shows as text.
     Tip: transparent PNGs or SVGs look best. Aim for 6+ brands.
     ------------------------------------------------------------------------- */
  brands: {
    label: "Past Collaborations",
    scrollSeconds: 64,           // lower = faster
    logos: [
      { name: "HBO",                     logo: "assets/logos/hbo.png",                     height: 30 },
      { name: "Apple TV",                logo: "assets/logos/apple-tv.png",                height: 34 },
      { name: "New York Fashion Week",   logo: "assets/logos/new-york-fashion-week.png",   height: 42 },
      { name: "University of Tampa",     logo: "assets/logos/university-of-tampa.png",     height: 48 },
      { name: "Annapolis Film Festival", logo: "assets/logos/annapolis-film-festival.png", height: 40 },
      { name: "Gateway Subs",            logo: "assets/logos/gateway-subs.png",            height: 46 },
      { name: "Jackpot Media",           logo: "assets/logos/jackpot-media.png",           height: 36 },
      { name: "Hallee Media & Design",   logo: "assets/logos/hallee-media-design.png",     height: 54 },
      { name: "BM",                      logo: "assets/logos/bm.png",                      height: 46 }
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
      "I’m Nathan Winn, a Tampa-based cinematographer, colorist and filmmaker. My work has put me on sets for HBO, Apple TV and Fashion Week, alongside commercial shoots for global brands and independent feature and short films.",
      "I produce marketing campaigns for brands, from videography and photography to social media content, and I’ve independently managed and branded accounts with over 1.1 million followers."
    ],
    photo: { src: "assets/photos/nathan.jpg", alt: "Nathan Winn holding a camera outdoors" },   // a 4:5 portrait
    specialties: ["Cinematography", "Color Grading", "Commercial Production", "Videography", "Photography", "Marketing Campaigns", "Social Media"]
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
      { value: "6",   label: "Years of Experience" },
      { value: "20+", label: "Brands Served" },
      { value: "2M",  label: "Followers Managed" },
      { value: "5",   label: "Campaigns Produced" }
    ],
    caseStudiesLabel: "Campaign Case Studies",
    caseStudies: [
      {
        client: "Client Name",   // ← a real campaign from Nathan still needed
        panels: [
          { platform: "Instagram", stat: "", image: null,
            description: "What Nathan produced for this campaign and what it did, e.g. reach, views or followers gained." },
          { platform: "TikTok", stat: "", image: null,
            description: "One or two sentences with a number in it." },
          { platform: "YouTube", stat: "", image: null,
            description: "Analytics screenshots work great here (16:10 crop)." }
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
     drive:    instead of videoUrl, a Google Drive share link (set to "Anyone with
               the link"). The card uses Drive's thumbnail and plays in Drive's player.
     ------------------------------------------------------------------------- */
  ugc: {
    show: true,
    navLabel: "Work",
    heading: "Featured Work",
    subheading: "Campaigns, commercials and social content, shot and graded with a filmmaker’s eye.",
    buttonLabel: "Let’s Create Something",
    videos: [
      { title: "Social Media Campaign · Video 1", brand: "Gateway Subs", category: "Social Content", platform: "",
        drive: "https://drive.google.com/file/d/1XsSyPoy6AWPeROcBJ9yPfP2OOmYkDWm-/view?usp=sharing",
        link: null, description: "Social media campaign marketing deliverable for Gateway Subs.", results: "" },
      { title: "Social Media Campaign · Video 2", brand: "Gateway Subs", category: "Social Content", platform: "",
        drive: "https://drive.google.com/file/d/1Quykjqe4lL_xOyWqy2u91Da0Bxi-26Y3/view?usp=sharing",
        link: null, description: "Social media campaign marketing deliverable for Gateway Subs.", results: "" },
      // ← Nathan's other videos still needed
      { title: "Project Title", brand: "Client Name", category: "Commercial",     platform: "",
        videoUrl: null, poster: null, link: null, description: "", results: "" },
      { title: "Project Title", brand: "Client Name", category: "Brand Film",     platform: "",
        videoUrl: null, poster: null, link: null, description: "", results: "" },
      { title: "Project Title", brand: "Client Name", category: "Fashion",        platform: "",
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
    videos: [   // ← Nathan's testimonials still needed
      { name: "Client Name", quote: "“One sentence from the client about the result.”", vimeo: null, video: null },
      { name: "Client Name", quote: "“One sentence from the client about the result.”", vimeo: null, video: null }
    ],
    quotes: [
      { quote: "A real quote from one of Nathan’s clients goes here: the campaign, the result, and what it was like to work with him.",
        name: "Client Name", role: "Role", company: "Company", headshot: null, image: null },
      { quote: "Short quotes work great too.",
        name: "Client Name", role: "Role", company: "Company", headshot: null, image: null },
      { quote: "A screenshot of a client message works too. Set image to the screenshot path and it shows instead of this text.",
        name: "Client Name", role: "Role", company: "Company", headshot: null, image: null }
    ]
  },

  /* -------------------------------------------------------------------------
     PHOTOGRAPHY — stills from shoots (this section can hold any image work).
     ratio: "3 / 2" landscape, "4 / 5" portrait, "1 / 1" square, "16 / 9" wide.
     images: for a set from one shoot, list every photo; the viewer gets arrows.
     ------------------------------------------------------------------------- */
  design: {
    show: true,
    navLabel: "Photography",
    heading: "Stills With a Cinematic Eye.",
    subheading: "Campaign, product and event photography, lit and color graded like a film.",
    items: [   // ← Nathan's photos still needed
      { title: "Shoot Title", client: "Client Name", ratio: "3 / 2", cover: null, images: [], description: "" },
      { title: "Shoot Title", client: "Client Name", ratio: "3 / 2", cover: null, images: [], description: "" },
      { title: "Shoot Title", client: "Client Name", ratio: "3 / 2", cover: null, images: [], description: "" },
      { title: "Shoot Title", client: "Client Name", ratio: "3 / 2", cover: null, images: [], description: "" }
      // Carousel example:
      // ,{ title: "5 Hook Formulas", client: "Brand Five", ratio: "4 / 5", cover: "assets/design/hooks-1.jpg",
      //    images: ["assets/design/hooks-1.jpg", "assets/design/hooks-2.jpg", "assets/design/hooks-3.jpg"] }
    ]
  },

  /* -------------------------------------------------------------------------
     FOOTER
     ------------------------------------------------------------------------- */
  footer: {
    tagline: "Content Producer & Social Media Marketer · Tampa, FL",
    copyrightName: ""            // blank = your name
  }
};
