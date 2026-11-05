# Bibliotecas de terceiros

Os laboratórios em `labs/` usam os componentes reais de duas bibliotecas, empacotados para rodar direto no navegador, sem etapa de build. Os pacotes vieram dos design systems "Mantine" e "Carbon" criados no Claude Design.

## vendor/mantine

| Arquivo | Conteúdo | Licença |
|---|---|---|
| `bundle.js` | `@mantine/core` 9.7.5 e `@mantine/hooks`, expostos como `window.Mantine` | MIT, © Vitaly Rtishchev |
| `bundle.css` | `styles.css` do Mantine 9.7.5 seguido de uma camada que aponta cada `--mantine-*` para um token curto | MIT |
| `tokens.css` | Tema padrão do Mantine (cores, espaçamento, raios, sombras), gerado a partir de `tokens.json` | MIT |
| `react.js`, `react-dom.js` | React e React DOM 19.2.0 | MIT, © Meta Platforms |

Origem: `mantinedev/mantine` em `master@82fb128`.

## vendor/carbon

| Arquivo | Conteúdo | Licença |
|---|---|---|
| `bundle.js` | `@carbon/react` 1.120.0 e `@carbon/icons-react` 11.92.0, expostos como `window.Carbon` (ícones em `Carbon.icons`) | Apache-2.0, © IBM Corp. |
| `bundle.css` | Folha de estilos compilada do Carbon, com as variáveis `--cds-*` renomeadas para os tokens de `tokens.css` | Apache-2.0 |
| `tokens.css` | Temas White, Gray 10, Gray 90 e Gray 100, tipografia e espaçamento | Apache-2.0 |
| `fonts/*.woff2` | IBM Plex Sans, Mono e Serif, subconjunto Latin-1 | SIL Open Font License 1.1 |
| `react.production.min.js`, `react-dom.production.min.js` | React e React DOM 18.3.1 | MIT, © Meta Platforms |

Origem: `carbon-design-system/carbon` em `main@327161f`.

Os textos completos das licenças estão em:

- https://github.com/mantinedev/mantine/blob/master/LICENSE
- https://github.com/carbon-design-system/carbon/blob/main/LICENSE
- https://github.com/IBM/plex/blob/master/LICENSE.txt
- https://github.com/facebook/react/blob/main/LICENSE
