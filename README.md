# Atlas de Design

Página de estudo de design de interface: um atlas interativo das filosofias, estilos e design systems, do estilo suíço ao Liquid Glass. Site estático, sem etapa de build, pronto para o GitHub Pages.

## Páginas

| Página | O que tem |
|---|---|
| `index.html` | Roteiro, os três níveis (filosofia, estilo, design system), gráfico do pêndulo, linha do tempo e glossário |
| `estilos.html` | 25 escolas com a mesma ficha de pedido interativa, sinais para reconhecer e receita em CSS |
| `sistemas.html` | A mesma tela de pedidos em 10 design systems atuais |
| `incomuns.html` | 42 interfaces experimentais, gestos, inovações que viraram padrão e designs estranhos, todas interativas |
| `comparar.html` | Matriz de seis eixos (filtrável e ordenável), bibliotecas React lado a lado e 19 cenários de decisão |
| `labs/mantine.html` | Mantine 9.7.5 real: tema ao vivo, painel de pedidos, formulário e galeria |
| `labs/carbon.html` | Carbon 1.120 real: quatro temas, densidade da tabela, seleção em lote e UI Shell |

As galerias recriam a aparência de cada escola em HTML e CSS próprios. Os laboratórios usam os componentes reais, empacotados em `vendor/` a partir dos design systems "Mantine" e "Carbon" do Claude Design. Licenças e origem em [`vendor/README.md`](vendor/README.md).

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`. O arquivo `.nojekyll` faz o Pages servir os arquivos como estão. O endereço fica em `https://winroque.github.io/design-study/`.

## Estrutura

```
assets/      casca compartilhada (atlas.css, atlas.js) e o script de cada galeria
labs/        laboratórios com componentes reais
vendor/      bundles de Mantine, Carbon e React, com tokens e fontes
```

Pontuações, eixos e o gráfico do pêndulo são avaliações qualitativas. Datas conferidas até novembro de 2026.
