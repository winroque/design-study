# Atlas

A study site for interface design: an interactive atlas of design philosophies, styles and design systems, from the Bauhaus to Liquid Glass. The site itself is set as a graphic standards manual, with Print and Blueprint papers and a Construction mode that shows the grid. Static site, no build step, ready for GitHub Pages.

## Pages

| Page | What it has |
|---|---|
| `index.html` | A cover that cycles through the 25 schools, chapters, the three levels, the pendulum chart, a timeline and a glossary |
| `styles.html` | 25 schools with the same interactive order card, the signs that give each away and the CSS recipe |
| `systems.html` | The same orders screen in 10 current design systems |
| `unusual.html` | 42 experimental interfaces, gestures, innovations that became standard and strange designs, all interactive |
| `compare.html` | A six-axis matrix (filterable and sortable), React libraries side by side and 19 decision scenarios |
| `labs/mantine.html` | The real Mantine 9.7.5: live theme, orders panel, form and gallery |
| `labs/carbon.html` | The real Carbon 1.120: four themes, table density, batch selection and the UI Shell |

The galleries rebuild the look of each school in their own HTML and CSS. The labs use the real components, bundled in `vendor/` from the "Mantine" and "Carbon" design systems in Claude Design. Licenses and sources in [`vendor/README.md`](vendor/README.md).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. The `.nojekyll` file makes Pages serve the files as they are. The site lives at `https://winroque.github.io/design-study/`.

## Structure

```
assets/      the manual shell (manual.css, manual.js), the gallery layer (atlas.css) and each gallery's script
labs/        labs with real components
vendor/      Mantine, Carbon and React bundles, with tokens and fonts
```

Scores, axes and the pendulum chart are qualitative judgments. Dates checked through November 2026.
