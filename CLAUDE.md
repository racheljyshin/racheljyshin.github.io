# Rachel Shin's academic website

Personal academic site for Jin Young (Rachel) Shin, PhD student in Education at Harvard.
Hosted free on GitHub Pages at https://racheljyshin.github.io from the `main` branch of
the `racheljyshin/racheljyshin.github.io` repository. Any change merged into `main` goes
live in about a minute.

## How the site is built

Plain HTML and CSS: no build step, no framework, nothing to install. `.nojekyll` tells
GitHub Pages to serve the files exactly as they are.

| File | What it is |
|---|---|
| `index.html` | Home page: intro with rotating phrases (the `data-words` list on `.rotator`; keep the first word in the span the same as the list's first item), research cards, contact |
| `research.html` | Research overview, the four research themes with related work, and research positions |
| `publications.html` | Every paper, manuscript, talk, and poster |
| `cv.html` | Only forwards old links to the PDF; the CV menu item opens the PDF directly |
| `assets/files/Shin_CV.pdf` | The CV PDF linked from every page |
| `assets/css/style.css` | All styling. Colors are the tokens at the top: `--accent` (burgundy) for links and labels, `--accent-fill` for button backgrounds |
| `assets/js/main.js` | Dark-mode toggle, mobile menu, animations, publication filter |
| `assets/img/` | Headshot (`rachel-shin.webp` and `.jpg`, 800×1000), favicon |

The header and footer are repeated in `index.html`, `publications.html`, and
`research.html`. Change all three when editing them, such as when adding a menu item or a
social link. The menu order is Home, Publications, CV, Research. CV links straight to
`assets/files/Shin_CV.pdf`, the way many academic sites do.

## Common updates

**New paper.** Add an `<li class="pub">` at the top of the right list in `publications.html`,
copying an existing entry. Set `data-type` to `article` or `presentation`. Bold her name
with `<b>Shin, J. Y.</b>`. Don't add "first author" labels; she removed them. Then also:
- add it to the "Related work" list of the matching theme in `research.html`. Use the
  exact title from her CV, linked to the DOI when there is one, with an author line such
  as `<b>Shin et al.</b> (2025) · <i>Journal</i>`. Titles there must always match the CV.
  Each list sits in a collapsed `<details>`; update the count in its `<summary>`.
- move a paper from "Manuscripts in preparation" once it is published.

**New CV.** Rachel keeps her CV as a Word file. Export it to PDF and replace
`assets/files/Shin_CV.pdf`, keeping the same file name. Update the "Last updated" month
in the footer of every page. Leave the phone number out of the public PDF. Then compare the
CV with the site: publications and presentations, research positions (with advisor/PI and
research focus), and the home-page intro. The
website should never contradict the CV.

**New photo.** Crop it to 4:5 portrait, about 800×1000. Save it as both
`assets/img/rachel-shin.webp` and `assets/img/rachel-shin.jpg`.

**Social links.** Add Google Scholar, ORCID, LinkedIn, and similar links in the contact
list on `index.html` (there's a commented example) and in each page's `.footer-links`.

## Style rules

- Fonts: headings use Plus Jakarta Sans (`--display` in the CSS), body text uses Inter. She asked
  for a modern look; avoid quirky display serifs.
- APA 7 for citations: sentence-case titles, italic journal names, DOI links.
- Write in first person ("I study…"), warm but professional. Don't overstate findings.
- Keep it concise: she found the Research page too wordy once. Aim for 2–3 sentences per topic.
- Keep it accessible: every image needs `alt` text, every icon-only link needs `aria-label`.
- Check every change at phone width (about 390px) as well as on desktop.

## Search engines

`sitemap.xml` and `robots.txt` help Google find the pages. Add new pages to `sitemap.xml`.
The home page has structured data (`application/ld+json`) describing Rachel; keep it in step
with her current position.

## Previewing locally

Run `python -m http.server 8000` in this folder, then open http://localhost:8000.
