# Asa · Weitong Li — Personal Website

A fast, dependency-free static personal site built from the CV of
**Weitong Li (Asa)** — B.S. in Artificial Intelligence, BNBU.

No build step, no framework, no `npm install`. Open `index.html` and it works.
Deploy it to GitHub Pages in about two minutes (see §4).

---

## 1. What's in here

| File | Purpose |
|---|---|
| `index.html` | All page content (hero, about, publications, research, experience, projects, skills, contact) |
| `styles.css` | Design system: colour tokens, layout, components, responsive + print styles |
| `script.js` | Theme toggle, sticky nav, scroll-spy, scroll reveals, BibTeX copy-to-clipboard |
| `assets/favicon.svg` | The "A" monogram favicon |
| `assets/og.png` | 1200×630 social-preview card (LinkedIn / Twitter / WeChat link previews) |
| `resume.pdf` | Your CV, linked from the hero and contact sections |
| `deploy.sh` | One-command publish to GitHub Pages (needs the GitHub CLI) |
| `.github/workflows/pages.yml` | **Optional** Actions-based deploy (off by default) |
| `CNAME.example` | Template for a custom domain — copy to `CNAME` only if you own the domain |
| `robots.txt`, `sitemap.xml` | SEO basics — **update the domain in both** |
| `404.html` | Friendly not-found page (works under a repo sub-path too) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is, no Jekyll processing |
| `LICENSE` | MIT for the code; the CV content stays yours |

## 2. Preview locally

Double-click `index.html`, or serve it properly (recommended, so `resume.pdf`
and relative paths behave exactly like production):

```bash
cd personal-web
python3 -m http.server 8000
# open http://localhost:8000
```

## 3. Things to fill in (5 minutes)

1. **Social links.** In `index.html` search for `data-placeholder=` and replace the
   three `href="#"` values with your real Google Scholar / GitHub / LinkedIn URLs.
   Until then those links show a hint toast instead of navigating.
2. **Domain.** If you are *not* using `weitongli.com`, replace it in:
   - `index.html` (`<link rel="canonical">`, `og:url`)
   - `robots.txt` (the `Sitemap:` line)
   - `sitemap.xml` (`<loc>`)
   - `assets/og.png` shows `weitongli.com` in the corner — re-run `.tools/make_og.py`
     after editing, or just ignore it.
   - Make `og:image` / `twitter:image` **absolute** (`https://yourdomain.com/assets/og.png`)
     once you know the URL — some crawlers, Twitter/X in particular, ignore relative paths.
3. **CV.** `resume.pdf` is the copy you gave me. Swap it whenever you update the
   PDF — keep the filename so every link keeps working.
4. **Optional: phone number.** Deliberately **not** published (privacy). If you want
   it visible, add a line to the `.hero__links` list in the hero.

## 4. Deploy to GitHub Pages

You need a GitHub account. Pick **one** of the two routes.

### Route A — the one-command route (recommended)

Requires the GitHub CLI. Install it with `brew install gh` (or from
<https://cli.github.com>), then authenticate once:

```bash
gh auth login
```

Then, from this folder:

```bash
./deploy.sh                # creates a public repo called "personal-web"
./deploy.sh asa-website    # ...or pick your own repo name
```

The script initialises git if needed, commits, creates the repo, pushes, and
switches on GitHub Pages. Your site goes live at:

```
https://<your-username>.github.io/<repo-name>/
```

### Route B — the manual route

```bash
cd personal-web
git add .
git commit -m "Personal website: Asa (Weitong Li)"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then in the browser:

1. Open the repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait ~1 minute, then open `https://<your-username>.github.io/<repo-name>/`.

> **Do not** create a `CNAME` file unless you own the domain — a wrong `CNAME`
> makes GitHub redirect away from your working `github.io` URL. That is why the
> file ships as `CNAME.example`.

### Route C — Actions-based deploy (optional)

Prefer CI? Set the Pages source to **GitHub Actions**, then add a repository
variable so the shipped workflow activates:

**Settings → Secrets and variables → Actions → Variables → New repository variable**
name `PAGES_SOURCE`, value `actions`. The workflow is skipped until you do this,
so it never leaves red ✗ runs on a branch-deploy repo.

## 5. Custom domain checklist (only if you own one)

```bash
echo "your-domain.com" > CNAME
git add CNAME && git commit -m "Add custom domain" && git push
```

1. In your registrar's DNS panel add the records GitHub shows you
   (`A` records for `@`, or a `CNAME` for `www`).
2. **Settings → Pages → Custom domain** → enter the domain → **Save**, then tick
   **Enforce HTTPS** once the certificate is issued.
3. Point the canonical URL, `sitemap.xml`, and `robots.txt` at the final domain.
4. Submit `https://yourdomain.com/sitemap.xml` to
   [Google Search Console](https://search.google.com/search-console).

## 6. Design notes

- **Type**: Newsreader (serif display) + Inter (UI) + JetBrains Mono (metadata).
  Falls back to system fonts gracefully if Google Fonts is unreachable.
- **Colour**: deep-green primary, warm-orange accent for awards. Full dark mode,
  remembered in `localStorage`, and it respects `prefers-color-scheme` on first visit.
- **Accessibility**: skip link, focus-visible rings, ARIA labels, `prefers-reduced-motion`
  support, semantic landmarks and heading order.
- **Print**: `Cmd/Ctrl + P` produces a clean, colour-free, link-annotated document —
  a usable paper CV fallback.
- **Performance**: no framework, no bundler, no build step; scroll handlers are
  `requestAnimationFrame`-throttled and passive.

## 7. Editing tips

- Content lives in plain HTML with obvious section boundaries
  (`<!-- ===== PUBLICATIONS ===== -->`).
- To add a publication, copy an existing `<li class="pub reveal">` block —
  including its `<details class="bib">` BibTeX block — and edit the text.
- To add an award line, copy a `<li>` inside `<ul class="tl__awards">`.
- Colours are all defined once at the top of `styles.css` under `:root`
  (with dark overrides under `[data-theme="dark"]`). Change `--accent` to
  re-skin the entire site.
