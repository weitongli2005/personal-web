# Weitong Li (Asa) — Academic Homepage

A minimal, single-page academic homepage built on the
[Minimal Light](https://github.com/yaoyao-liu/minimal-light) theme (MIT, by
Yaoyao Liu) — the same theme used by many BNBU/HKBU students.

No build step, no npm, no framework. Open `index.html` and it works.

**Live at → <https://weitongli2005.github.io/personal-web/>**

---

## 1. What's in here

| File | Purpose |
|---|---|
| `index.html` | The whole page: About Me, Research Interests, Education, Publications, Internships, Awards |
| `assets/css/style.css` | Theme layout (fixed left header + right content column) |
| `assets/css/font.css` | Fonts — Crimson Pro (body) + Ubuntu Mono (email) |
| `assets/css/publications.css` | Publication list styling (title / author / venue / buttons) |
| `assets/js/scale.fix.js` | Small iOS viewport fix from the theme |
| `assets/img/avatar.png` | Placeholder monogram avatar — **replace with your photo** |
| `assets/favicon.svg` | Browser tab icon |
| `assets/og.png` | 1200×630 link-preview card for WeChat / LinkedIn / Twitter |
| `resume.pdf` | Your CV, linked from the CV icon in the header |
| `404.html` | Not-found page, in the same theme |
| `robots.txt`, `sitemap.xml` | SEO — already pointed at the live URL |
| `CNAME.example` | Template for a custom domain — copy to `CNAME` only if you own the domain |
| `deploy.sh` | One-command publish to GitHub Pages (needs the GitHub CLI) |
| `LICENSE` | MIT for the code; theme credited to Yaoyao Liu; CV text stays yours |

Layout is **two columns** like the reference site: a fixed 232 px left header
(avatar, name, position, affiliation, email, icons) and a right column of
`<h2>` sections. Below 1000 px it collapses to a single column automatically.

**Two deliberate departures from the stock theme**, both to keep the page short
enough to read top-to-bottom in one scroll:

- The canvas is wider — `.wrapper` is `min(1280px, 95vw)` instead of a fixed
  960 px, and the body column takes the remaining width (`calc(100% - 262px)`
  rather than a fixed 650 px). The left column therefore also sits further left.
- Publication entries no longer reserve the theme's empty 8 rem thumbnail
  column, and their spacing comes from a margin instead of `<br>` tags.

Both overrides live in a clearly-marked block at the end of
`assets/css/style.css` (layout) and `assets/css/publications.css` (list spacing),
so you can delete them to get the stock theme back.

## 2. Preview locally

```bash
cd personal-web
python3 -m http.server 8000
# open http://localhost:8000
```

## 3. Things to fill in (2 minutes)

1. **Avatar.** Drop a square photo at `assets/img/avatar.png` (about 400×400),
   or delete the `<a class="image avatar">` line in `index.html` to remove it.
2. **Social icons.** Only the CV icon is enabled. Uncomment the Google Scholar /
   GitHub / LinkedIn block in `index.html` and paste your real profile URLs
   (the block is right below the CV icon, inside `<div class="social-icons">`).
3. **Publications.** Add or edit `<li>` blocks inside
   `<ol class="bibliography">`. Each entry needs a `.title`, `.author`,
   `.periodical`, and a `.links` div. `*` marks equal contribution.
4. **CV.** `resume.pdf` is the copy you gave me — swap the file, keep the name.

## 4. Updating the live site

The site is **already deployed** on GitHub Pages (`main` branch, root folder,
HTTPS enforced). To publish any change:

```bash
cd personal-web
git add -A
git commit -m "Update site"
git push
```

GitHub rebuilds automatically; the change is live in about a minute at
<https://weitongli2005.github.io/personal-web/>.

> Pushing from **your own terminal** for the first time? Run `gh auth setup-git`
> once so git can reuse your GitHub CLI login. (GitHub Desktop also works.)

### Deploying somewhere fresh

```bash
./deploy.sh                # creates a public repo "personal-web" and enables Pages
./deploy.sh asa-website    # ...or pick your own repo name
```

Manual route: `git push` to a repo, then **Settings → Pages → Source:
Deploy from a branch → main / (root) → Save**.

> **Do not** create a `CNAME` file unless you own the domain — a wrong `CNAME`
> makes GitHub redirect away from your working `github.io` URL. That is why the
> file ships as `CNAME.example`.

## 5. Custom domain checklist (only if you own one)

```bash
echo "your-domain.com" > CNAME
git add CNAME && git commit -m "Add custom domain" && git push
```

1. Add the DNS records GitHub shows you (`A` records for `@`, or a `CNAME` for `www`).
2. **Settings → Pages → Custom domain** → enter the domain → **Save** → tick
   **Enforce HTTPS**.
3. Replace `https://weitongli2005.github.io/personal-web` with the new domain in
   `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`),
   `robots.txt`, `sitemap.xml`, and the corner label of `assets/og.png`.
4. Submit `https://yourdomain.com/sitemap.xml` to
   [Google Search Console](https://search.google.com/search-console).

## 6. Theme notes

- **Fonts**: Crimson Pro for body text, Ubuntu Mono for the email line, loaded
  from Google Fonts. Falls back to system serif if they are unreachable.
- **Icons**: Font Awesome 6 + Academicons from cdnjs (the theme's own choice).
- **Dark mode**: handled automatically by the theme via `prefers-color-scheme`.
- **Print**: `Cmd/Ctrl + P` gives a clean black-on-white copy of the page.
- Credit and licence for the theme are in the page footer and in `LICENSE`.

## 7. Editing tips

- Sections are plain `<h2>` + `<ul>` / `<p>` — search for
  `id="publications"`, `id="awards"`, `id="internships"`.
- Award lines follow the reference format:
  `<li><strong>[Date]</strong> What you won</li>`.
- Colours live at the top of the theme: headings are `#043361` navy, links `#39c`.
  Change those two values to re-skin the page.
