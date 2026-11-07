# AI Innovations in Autism Diagnosis — Special Session Archive

A lightweight, responsive, single-page academic website for the **AI Innovations in Autism Diagnosis** special session archive at the International Conference on AI in Healthcare (AIiH).

## What is included

- `index.html` — homepage, navigation, overview, expandable publication years, organisers and contact.
- `styles.css` — minimal responsive styling (desktop, tablet and mobile).
- `script.js` — accessible mobile menu, year-accordion enhancement, scrolling navigation highlight, working Back to Top control and gentle scroll-reveal transitions; no frameworks or dependencies.
- `.nojekyll` — GitHub Pages support.

The homepage highlights the **2026** edition at Imperial College London (26–28 August 2026), while the site archives publications from the **2025** and **2026** sessions, with publisher DOI links. The organisers aim to hold future editions annually, subject to conference approval.

## Preview locally

Open `index.html` in a web browser, or serve the folder with a local server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Publish with GitHub Pages

1. Create a new **public** GitHub repository (for example, `ai-autism-session`).
2. Upload the contents of this folder to the repository root; commit the changes.
3. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your website will be available at `https://YOUR-USERNAME.github.io/ai-autism-session/` after GitHub completes its deployment.

The website uses relative file paths and works under a GitHub Pages project repository (no custom domain or build process required).

## Source material

The 2025 venue is Jesus College, University of Cambridge (verified against the AIiH 2025 overview at https://aiih.cc/aiih-2025-overview/). The 2026 venue is Imperial College London. The overview and organiser details were adapted from the supplied *Special Session on Autism* proposal. Paper titles and the three 2026 author lists came from `Papers_List.txt`. The 2025 author list was completed using the published Springer proceedings. Paper publisher links were verified against Springer and institutional research records.

- Conference website: https://aiih.cc/
- Official 2026 session page: https://aiih.cc/special-session/special-session-ai-innovations-in-autism-diagnosis/
- 2025 paper: https://doi.org/10.1007/978-3-032-00652-3_11
- 2026 papers: https://doi.org/10.1007/978-3-032-35390-0_26 , https://doi.org/10.1007/978-3-032-35390-0_27 , https://doi.org/10.1007/978-3-032-35390-0_28

## Updating the edition archive

The homepage's **Latest edition** panel shows the most recent special session's host venue, location and dates. Update these details **only after another edition has actually taken place**; the conference running in another year does not automatically mean this special session will return.

The **Publications by Year** section uses native expandable `<details>` blocks. **2026 is expanded by default** and **2025 is collapsed**; opening another year closes the previous one. The publication titles, author lists and publisher links appear inside each year. Visitors can also expand the years with a keyboard, and they remain accessible if JavaScript is disabled.

If a later edition is approved and held, duplicate one of the `<details class="publication-year" ...>` blocks under Publications in `index.html`, update the year, venue, publications and proceedings link, then place it above the older years. Remove `open` from the previous latest year, and add `open` to the new latest year. No dropdown or additional page is required.

The highlighted navigation item follows the section currently in view. Sections gently fade and rise into view on scroll, with reduced-motion preferences honoured and graceful fallback if JavaScript is disabled. This is a single-page website, so no separate pages are required.

## Next iterations

Possible additions: details on invited talks and presentations, BibTeX downloads, and a short archive-maintenance guide.


Version 9: Updated About title to “Connecting AI & Autism Research”, promoted “Topics include, but are not limited to:” to the bold topics heading, and changed the Contact section kicker to “CONTACT”.
