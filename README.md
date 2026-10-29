# UGC Creator Portfolio Template

A one-page portfolio site for UGC creators and creative strategists. It covers your intro, the brands you've worked with, an about section, results and case studies, a filterable video grid, testimonials, thumbnail/design work, and contact links.

**Live example:** [tony-bakes.vercel.app](https://tony-bakes.vercel.app)

- **One file to edit.** Your words, links, photos and videos all go in `site/content.js`.
- **Free hosting on Vercel.** It redeploys every time you save a change.
- **Nothing breaks if you're missing something.** Empty spots show a labelled grey box telling you what goes there. Sections you don't use disappear, and so do their menu links.
- **Three looks built in** (warm, clean, dark). You can pick any accent color and any Google Font.

---

## Get your own copy (about 10 minutes, no coding)

You need a free [GitHub](https://github.com/signup) account and a free [Vercel](https://vercel.com/signup) account. Sign up for Vercel with your GitHub account.

1. **Click the button below.** Vercel copies this template into a new GitHub repository for you and publishes it.

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tonybakes529/ugc-portfolio-template&project-name=my-portfolio&repository-name=my-portfolio)

   *(Or, on the [template's GitHub page](https://github.com/tonybakes529/ugc-portfolio-template), click **Use this template → Create a new repository**, then import that repository at [vercel.com/new](https://vercel.com/new). Vercel detects the settings for you, so just click **Deploy**.)*

2. **Open your new repository on GitHub** and go to `site/content.js`. Click the ✏️ pencil to edit it in the browser.
3. **Change the text**: your name, email, headline, about section, stats and so on. Click **Commit changes**.
4. **Wait about 30 seconds.** Vercel redeploys automatically, and your live link is on your Vercel dashboard.

That's a working site. Next, add your photos and videos.

---

## Adding photos and videos

Media files live in `site/assets/`. To upload in the browser, open a folder (for example `site/assets/photos`) on GitHub and use **Add file → Upload files**. Then put the file's path in `content.js`:

```js
photo: { src: "assets/photos/me.jpg", alt: "Me at my desk" },
```

| What | Shape | Where it goes in `content.js` |
| --- | --- | --- |
| About photo | 4:5 portrait | `about.photo.src` |
| UGC videos | 9:16 MP4 + a poster image | `ugc.videos[].videoUrl` / `poster` |
| Brand logos | transparent PNG or SVG | `brands.logos[].logo` |
| Results screenshots | 16:10 crop | `results.caseStudies[].panels[].image` |
| Testimonial videos | 9:16, Vimeo ID or MP4 | `testimonials.videos[].vimeo` / `video` |
| Testimonial screenshots | any | `testimonials.quotes[].image` |
| Headshots | square | `testimonials.quotes[].headshot` |
| Thumbnails / carousels | 16:9, 1:1 or 4:5 | `design.items[].cover` / `images` |
| Link-preview image | 1200×630 | `site.shareImage` |

**Keep videos small.** A raw phone video can be 200 MB or more, which makes the site slow and can go over GitHub's 100 MB file limit. Shrink videos first with the helper in the next section, or use a free tool like [HandBrake](https://handbrake.fr) with the "Fast 720p30" preset. Each clip should end up around 2–8 MB.

---

## Working on your computer (optional, recommended for videos)

This needs [Node.js](https://nodejs.org) (the LTS version) and a copy of your repository on your computer. [GitHub Desktop](https://desktop.github.com) is the easiest way to get that copy. Then, in a terminal inside the folder:

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. Edit `site/content.js`, save, and refresh to see your changes.

### Shrink your videos automatically

1. Drop your raw clips (MOV, MP4, any size) into a folder called `media/videos/`. Create the folder if it isn't there. Files in it are never uploaded.
2. Run:

   ```bash
   npm run videos
   ```

   Each clip becomes a web-ready 9:16 MP4 plus a thumbnail in `site/assets/videos/`. Landscape clips are center-cropped. When it finishes, it prints the exact `videoUrl` / `poster` lines to paste into `content.js`.

   Want the thumbnail from a different moment? `npm run videos -- --poster=3` takes it 3 seconds in.

### Shrink your images automatically

```bash
npm run images
```

This resizes oversized photos, turns large PNG photos into JPG or WebP, and updates the paths in `content.js` for you. Originals are kept in `media/originals/`.

### Publish your changes

Commit and push with GitHub Desktop. Vercel redeploys on its own.

---

## Making it look like you

In `content.js`, under `theme`:

```js
theme: {
  preset: "warm",        // "warm" (cream + orange), "clean" (white + blue) or "dark"
  accent: "#FF5A1F",     // any color — buttons, links, labels
  googleFont: ""         // e.g. "Inter", "DM Sans", "Poppins" (from fonts.google.com)
}
```

For finer control, override any individual color. The names are listed at the top of `site/theme.js`:

```js
theme: { preset: "clean", accent: "#111111", colors: { bg: "#FAFAF7" } }
```

**Logo:** set `site.logo` to show a small mark next to your name in the top bar.

**Hiding a section:** set `show: false` on it, or just delete all its items. To leave a section on the page but take it out of the top menu, set `navLabel: ""`. To add a section to the menu (testimonials are off by default), give it a label.

**Button destination:** every "Let's Connect" button opens an email to `contact.email`. Put a Calendly or Cal.com link in `contact.bookingUrl` to send people there instead.

---

## Link previews and Google

When someone shares your link in iMessage, LinkedIn or X, the preview uses `site.title`, `site.description` and `site.shareImage`. Set `site.url` to your live address so the preview image works everywhere. Vercel fills this in automatically if you leave it blank.

## Using your own domain

In Vercel, open your project and go to **Settings → Domains**. Add a domain you own, or buy one there, and follow the DNS steps it shows.

---

## Let AI fill it in for you

If you use [Claude Code](https://claude.com/claude-code), open this folder and say something like:

> Fill in site/content.js for me. My name is ___, I make ___ content, here's my bio: ___. My clients include ___. Use the raw videos in media/videos (run `npm run videos` first).

It knows the file's structure from the comments inside it.

---

## If something goes wrong

**The page is blank or says "content.js didn't load."** There's a typo in `content.js`, usually a missing comma between items or a missing quote. Run `npm run build`, or open the failed deployment's build log in Vercel. Both show the exact line number. While a deploy is failing, Vercel keeps your previous version live, so visitors never see a broken page.

**A photo or video doesn't show.** Check the path. It must start with `assets/` and match the file name exactly, including capital letters and the extension (`.jpg` vs `.jpeg`). `npm run build` lists every path in `content.js` that doesn't point to a real file.

**A video plays on desktop but not on iPhone.** It's probably a `.mov` or an unusual format. Run it through `npm run videos` (or HandBrake) to get a standard MP4.

**I changed a photo but still see the old one.** Hard-refresh the page: Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows.

---

## What's in here

```
site/                   ← everything that gets published
  content.js            ← ★ the only file you need to edit
  assets/               ← your photos, videos, logos
  index.html            ← page layout
  theme.js              ← colour presets
  support.js            ← the small runtime that draws the page
tools/                  ← helper scripts (not published)
  build.mjs             ← link-preview tags + missing-file check (runs on every deploy)
  videos.mjs            ← npm run videos
  images.mjs            ← npm run images
media/                  ← your raw files (never uploaded; create it when you need it)
vercel.json             ← tells Vercel to publish the site/ folder
```

The site has no framework and no dependencies at runtime. The two packages in `package.json` are ffmpeg binaries used only by the video and image helpers on your own computer. Vercel skips installing them.
