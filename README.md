# Asa · Weitong Li — Personal Website

A fast, dependency-free static personal site built from the resume of
**Weitong Li (Asa)** — B.S. in Artificial Intelligence, BNBU.

No build step, no framework, no npm install. Open `index.html` and it works.

---

## 1. What's in here

| File | Purpose |
|---|---|
| `index.html` | All page content (hero, about, publications, research, experience, projects, skills, contact) |
| `styles.css` | Design system: colour tokens, layout, components, responsive + print styles |
| `script.js` | Theme toggle, sticky nav, scroll-spy, scroll reveals, BibTeX copy-to-clipboard |
| `assets/favicon.svg` | The "A" monogram favicon |
| `resume.pdf` | Your CV, linked from the hero and contact sections |
| `robots.txt`, `sitemap.xml` | SEO basics — **update the domain in both** |
| `CNAME` | GitHub Pages custom-domain file — **update if you use a different domain** |
| `404.html` | Friendly not-found page |

## 2. Preview locally

Just double-click `index.html`. For a proper local server (recommended, so
`/resume.pdf` and relative paths behave exactly like production):

```bash
cd personal-web
python3 -m http.server 8000
# then open http://localhost:8000
```

## 3. Things to fill in (5 minutes)

1. **Social links.** In `index.html` search for `data-placeholder=` and replace the
   three `href="#"` values with your real Google Scholar / GitHub / LinkedIn URLs.
   Currently those links show a hint toast instead of navigating.
2. **Domain.** Replace `https://weitongli.com/` with your real domain in:
   - `index.html` (`<link rel="canonical">`, `og:url`)
   - `robots.txt` (sitemap line)
   - `sitemap.xml` (`<loc>`)
   - `CNAME` (GitHub Pages only)
3. **CV.** `resume.pdf` is the copy you gave me. Swap it whenever you update the PDF — keep the filename.
4. **Optional: phone number.** It is deliberately **not** published (privacy). If you
   want it visible, add a line in the `.hero__links` list.
5. **Open Graph image** (optional but nice for LinkedIn/Twitter previews): drop a
   1200×630 PNG at `assets/og.png` and add
   `<meta property="og:image" content="https://yourdomain.com/assets/og.png" />`.

## 4. Deploy — pick one

### Option A — Cloudflare Pages (recommended: free, fast in China-adjacent regions,
### free unlimited bandwidth, free SSL, easy custom domain)

1. Create a free account at <https://dash.cloudflare.com>.
2. **Workers & Pages → Create → Pages → Upload assets**.
3. Drag the whole `personal-web` folder in (or zip it and upload).
4. It gives you `your-project.pages.dev` immediately.
5. **Custom domains → Set up a custom domain** → enter your domain → follow the DNS step.

Or from the command line:

```bash
npm i -g wrangler
cd personal-web
wrangler pages deploy . --project-name=asa-site
```

### Option B — GitHub Pages (100% free, most familiar to academics)

```bash
cd personal-web
git init -b main
git add .
git commit -m "Personal site"
git remote add origin git@github.com:<your-username>/<repo>.git
git push -u origin main
```

Then: **Repo → Settings → Pages → Source: Deploy from a branch → main / (root)**.
Add your custom domain in the same screen (the `CNAME` file already exists), and
tick **Enforce HTTPS**.

### Option C — Netlify / Vercel

Drag-and-drop the folder at <https://app.netlify.com/drop>. Done. Free tier is
generous for a personal site.

## 5. Custom domain checklist (after you buy one)

1. In your registrar's DNS panel add:
   - `A` records for `@` → your host's IPs, **or** a `CNAME` for `www` → `your-project.pages.dev`
   - (Cloudflare Pages and Netlify tell you the exact records — copy them verbatim)
2. Wait for DNS propagation (usually minutes, up to 24 h).
3. Enable HTTPS / "Always Use HTTPS" in the host dashboard.
4. Point the canonical URL + `sitemap.xml` + `robots.txt` at the final domain.
5. Submit `https://yourdomain.com/sitemap.xml` to
   [Google Search Console](https://search.google.com/search-console).
6. Add the site to your email signature, GitHub profile, and Google Scholar profile.

## 6. Design notes

- **Type**: Newsreader (serif display) + Inter (UI) + JetBrains Mono (metadata).
  Falls back to system fonts gracefully if Google Fonts is unreachable.
- **Colour**: deep-green primary, warm-orange accent for awards. Full dark mode,
  remembered in `localStorage`, and it respects `prefers-color-scheme` on first visit.
- **Accessibility**: skip link, focus-visible rings, ARIA labels, `prefers-reduced-motion`
  support, semantic landmarks and heading order.
- **Print**: `Cmd/Ctrl + P` produces a clean, colour-free, link-annotated document —
  a usable paper CV fallback.
- **Performance**: no framework, no bundler, three font families preconnected, and
  scroll handlers are `requestAnimationFrame`-throttled and passive.

## 7. Editing tips

- Content lives in plain HTML with obvious section boundaries
  (`<!-- ===== PUBLICATIONS ===== -->`).
- To add a publication, copy an existing `<li class="pub reveal">` block —
  including its `<details class="bib">` BibTeX block — and edit the text.
- To add an award line, copy a `<li>` inside `<ul class="tl__awards">`.
- Colours are all defined once at the top of `styles.css` under `:root`
  (and dark overrides under `[data-theme="dark"]`). Change `--accent` to re-skin
  the entire site.
