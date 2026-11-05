# Third-party libraries

The labs in `labs/` use the real components of two libraries, bundled to run straight in the browser with no build step. The bundles came from the "Mantine" and "Carbon" design systems created in Claude Design.

## vendor/mantine

| File | Contents | License |
|---|---|---|
| `bundle.js` | `@mantine/core` 9.7.5 and `@mantine/hooks`, exposed as `window.Mantine` | MIT, © Vitaly Rtishchev |
| `bundle.css` | Mantine 9.7.5 `styles.css` followed by a layer that points each `--mantine-*` variable at a short token | MIT |
| `tokens.css` | Mantine’s default theme (colors, spacing, radii, shadows), generated from `tokens.json` | MIT |
| `react.js`, `react-dom.js` | React and React DOM 19.2.0 | MIT, © Meta Platforms |

Source: `mantinedev/mantine` at `master@82fb128`.

## vendor/carbon

| File | Contents | License |
|---|---|---|
| `bundle.js` | `@carbon/react` 1.120.0 and `@carbon/icons-react` 11.92.0, exposed as `window.Carbon` (icons in `Carbon.icons`) | Apache-2.0, © IBM Corp. |
| `bundle.css` | Carbon’s compiled stylesheet, with the `--cds-*` variables renamed to the tokens in `tokens.css` | Apache-2.0 |
| `tokens.css` | White, Gray 10, Gray 90 and Gray 100 themes, typography and spacing | Apache-2.0 |
| `fonts/*.woff2` | IBM Plex Sans, Mono and Serif, Latin-1 subset | SIL Open Font License 1.1 |
| `react.production.min.js`, `react-dom.production.min.js` | React and React DOM 18.3.1 | MIT, © Meta Platforms |

Source: `carbon-design-system/carbon` at `main@327161f`.

Full license texts:

- https://github.com/mantinedev/mantine/blob/master/LICENSE
- https://github.com/carbon-design-system/carbon/blob/main/LICENSE
- https://github.com/IBM/plex/blob/master/LICENSE.txt
- https://github.com/facebook/react/blob/main/LICENSE
