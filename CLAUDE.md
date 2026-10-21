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
| `index.html` | Home page: intro, rotating research words, stats, research cards, news, selected papers, contact |
| `research.html` | The four research themes, methods, and research positions |
| `publications.html` | Every paper, manuscript, talk, and poster |
| `cv.html` | CV summary plus the embedded PDF |
| `assets/files/Shin_CV.pdf` | The CV PDF linked from every page |
| `assets/css/style.css` | All styling. Colors are the tokens at the top (`--accent` is the crimson) |
| `assets/js/main.js` | Dark-mode toggle, mobile menu, animations, publication filter |
| `assets/img/` | Headshot (`rachel-shin.webp` and `.jpg`, 800×1000), favicon |

The header and footer are repeated in each of the four HTML pages. Change all four when
editing them, such as when adding a menu item or a social link.

## Common updates

**New paper.** Add an `<li class="pub">` at the top of the right list in `publications.html`,
copying an existing entry. Set `data-type` to `article` or `presentation`, adding `first`
if Rachel is first author (e.g. `data-type="article first"`). Bold her name with
`<b>Shin, J. Y.</b>`. Then also:
- update the counts in the `hero-stats` block of `index.html`. Both the `data-count`
  attribute and the visible number must change.
- add a line to the News timeline on `index.html` if it is worth announcing.
- add it to the "Related work" list of the matching theme in `research.html`.
- move a paper from "Manuscripts in preparation" once it is published.

**News item.** Add an `<li>` at the top of `.timeline` in `index.html`. Keep 4–6 items and
drop the oldest.

**New CV.** Replace `assets/files/Shin_CV.pdf`, keeping the same file name. Update the
"Last updated" month in the footer of every page and the date on `cv.html`. Leave the
phone number out of the public PDF.

**New photo.** Crop it to 4:5 portrait, about 800×1000. Save it as both
`assets/img/rachel-shin.webp` and `assets/img/rachel-shin.jpg`.

**Social links.** Add Google Scholar, ORCID, LinkedIn, and similar links in the contact
list on `index.html` (there's a commented example) and in each page's `.footer-links`.

## Style rules

- APA 7 for citations: sentence-case titles, italic journal names, DOI links.
- Write in first person ("I study…"), warm but professional. Don't overstate findings.
- Keep it accessible: every image needs `alt` text, every icon-only link needs `aria-label`.
- Check every change at phone width (about 390px) as well as on desktop.

## Previewing locally

Run `python -m http.server 8000` in this folder, then open http://localhost:8000.
