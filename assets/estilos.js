(function () {
  var A = window.Atlas, esc = A.esc, el = A.el;

  /* Ordem cronológica. Cada amostra é a mesma ficha de pedido de uma cafeteria. */
  var S = [
    { k: 'bauhaus', n: 'Bauhaus', era: '1919 – 1933', t: 'Filosofia',
      deco: '<div class="deco c1"></div><div class="deco c2"></div><div class="deco c3"></div>',
      idea: 'A escola alemã que juntou arte, artesanato e indústria. Formas geométricas puras, cores primárias e a função ditando a forma. Quase todo o design moderno passa por aqui.',
      pro: 'Clareza geométrica e identidade fortíssima', con: 'Vira pastiche quando usado só como enfeite', onde: 'Pôsteres, identidades visuais, sites de museus e escolas', use: 'Marcas culturais e materiais educativos',
      signs: ['Círculo, quadrado e triângulo como elementos', 'Vermelho, azul e amarelo com preto', 'Tipografia geométrica sem serifa, como a Futura'],
      css: '.forma-1 { border-radius: 50%; background: #d62828; }\n.forma-2 { background: #1d3f8f; }\n.forma-3 { /* triângulo feito de bordas */\n  border-left: 60px solid transparent;\n  border-right: 60px solid transparent;\n  border-bottom: 104px solid #f2b705; }' },
    { k: 'suico', n: 'Estilo Suíço', era: '1950 →', t: 'Filosofia', title: 'Novo pedido.', done: 'Pedido feito.',
      deco: '<div class="deco bar"></div>',
      idea: 'Grid matemático, tipografia sem serifa e assimetria. A informação é o ornamento. Nasceu no design gráfico e é a raiz intelectual do flat.',
      pro: 'Clareza máxima, envelhece muito bem, funciona com qualquer conteúdo textual', con: 'Pode soar frio; depende de tipografia e conteúdo bons', onde: 'Sites editoriais, portfólios, sinalização, design de dados', use: 'Conteúdo textual, marcas sóbrias, material didático',
      signs: ['Grid visível ou implícito, alinhamento à esquerda', 'Helvetica ou similar, títulos grandes e apertados', 'Uma única cor de destaque, geralmente vermelho'],
      css: '.titulo { font: 700 38px/0.95 Helvetica, sans-serif;\n  letter-spacing: -0.045em; }\n.campo  { border: 0; border-bottom: 2px solid #000; }\n.botao  { background: #000; color: #fff;\n  border-radius: 0; text-align: left; }' },
    { k: 'memphis', n: 'Memphis', era: '1981 → (revival nos anos 2010)', t: 'Estilo',
      deco: '<svg class="deco zig" viewBox="0 0 150 40" aria-hidden="true"><polyline points="0,30 15,10 30,30 45,10 60,30 75,10 90,30 105,10 120,30 135,10 150,30" fill="none" stroke="#ff6ec7" stroke-width="6"/></svg><div class="deco tri"></div><div class="deco dot"></div>',
      idea: 'Grupo de design de Milão, liderado por Ettore Sottsass, que desafiou o bom gosto com rabiscos, bolinhas, cores berrantes e formas tortas. Voltou com força em apps e ilustrações dos anos 2010.',
      pro: 'Alegre, memorável, foge do corporativo', con: 'Barulhento; atrapalha leitura densa', onde: 'Ilustração editorial, apps de música e educação, embalagens', use: 'Marcas jovens, eventos, campanhas',
      signs: ['Padrões de bolinhas e zigue-zagues', 'Rosa, turquesa e amarelo com contorno preto', 'Elementos levemente girados'],
      css: '.fundo { background-image:\n  radial-gradient(#111 1.5px, transparent 1.6px);\n  background-size: 22px 22px; }\n.cartao { box-shadow: 10px 10px 0 #00c2b8;\n  transform: rotate(-1.5deg); }' },
    { k: 'cyber', n: 'Cyberpunk / HUD', era: '1982 →', t: 'Estilo',
      idea: 'A interface do futuro distópico: neon sobre preto, cantos cortados, linhas de varredura e texto que treme. Vem do cinema, de Blade Runner em diante, e dos jogos.',
      pro: 'Imersivo e atmosférico', con: 'Contraste agressivo cansa; texto pequeno sofre', onde: 'Jogos, landing pages de tecnologia, demonstrações', use: 'Produtos de games e experiências imersivas',
      signs: ['Ciano, magenta e amarelo neon sobre preto', 'Cantos chanfrados', 'Linhas de varredura e grade ao fundo'],
      css: '.painel { clip-path: polygon(16px 0, 100% 0,\n  100% calc(100% - 16px), calc(100% - 16px) 100%,\n  0 100%, 0 16px); }\n.botao:hover { text-shadow: 2px 0 #ff2a6d,\n  -2px 0 #00f0ff; }' },
    { k: 'pixel', n: 'Pixel / 8 bits', era: '1985 → (NES.css, 2018)', t: 'Estilo',
      idea: 'A estética dos consoles de 8 bits: fonte pixelada, bordas grossas e sombras duras dentro dos botões. Bibliotecas como a NES.css trouxeram o visual para a web.',
      pro: 'Nostálgico, divertido, reconhecível na hora', con: 'Fonte difícil de ler em blocos longos', onde: 'Jogos independentes, portfólios, páginas de eventos', use: 'Produtos lúdicos e comunidades de jogos',
      signs: ['Fonte bitmap, como a Press Start 2P', 'Bordas grossas sem arredondamento', 'Sombra interna escura no canto inferior do botão'],
      css: '.botao { border: 4px solid #000;\n  box-shadow: inset -4px -4px 0 #006bb3; }\n.botao:active { box-shadow: inset 4px 4px 0 #006bb3; }\n/* afundar = trocar a sombra de lado */' },
    { k: 'contraste', n: 'Alto contraste', era: '1999 → (WCAG 1.0)', t: 'Filosofia',
      idea: 'Acessibilidade levada a sério: contraste máximo, texto grande, foco impossível de não ver e nenhuma informação transmitida só por cor. Windows, macOS e Android têm modos assim.',
      pro: 'Legível para quase todo mundo, inclusive sob sol forte', con: 'Pouca margem para identidade de marca', onde: 'Modos de acessibilidade, serviços públicos, quiosques', use: 'Como modo alternativo em qualquer produto',
      signs: ['Preto e branco puros, amarelo para foco e ação', 'Texto grande e em negrito', 'Contorno de foco grosso e afastado do elemento'],
      css: '.botao { background: #ff0; color: #000;\n  font-size: 18px; text-decoration: underline; }\n:focus-visible { outline: 4px solid #ff0;\n  outline-offset: 3px; }\n/* amarelo sobre preto: contraste de 19,6:1 */' },
    { k: 'y2k', n: 'Y2K cromado', era: '1998 – 2004 (revival 2020 →)', t: 'Estilo',
      deco: '<div class="deco star" style="left:10%;top:12%">✦</div><div class="deco star" style="right:12%;top:20%;font-size:22px">✦</div><div class="deco star" style="left:18%;bottom:12%;font-size:26px">✧</div>',
      idea: 'O otimismo da virada do milênio: metal cromado, plástico translúcido, brilho iridescente e estrelinhas. Celulares, players de MP3 e sites de música tinham essa cara, que voltou com a geração Z.',
      pro: 'Brilhante e nostálgico', con: 'Contraste instável; tudo brilha ao mesmo tempo', onde: 'Moda, música, campanhas jovens', use: 'Peças de marca e redes sociais',
      signs: ['Texto cromado com gradiente metálico', 'Gradientes iridescentes rosa, azul e verde', 'Cantos muito arredondados e brilho interno'],
      css: '.titulo { background: linear-gradient(#fff 0%,\n  #a9b4c6 42%, #2e3a4d 50%, #eef2f8 100%);\n  -webkit-background-clip: text; color: transparent; }\n/* o salto de cor em 50% imita o reflexo do metal */' },
    { k: 'aqua', n: 'Aqua', era: '2001 – 2014', t: 'Estilo',
      idea: 'Skeumorfismo de materiais idealizados: gel, gota, plástico translúcido e listras de fundo. Foi a cara do Mac OS X por mais de uma década.',
      pro: 'Marcante, tátil, identidade fortíssima', con: 'Pesado de renderizar e de manter', onde: 'Mac OS X até o Yosemite, hoje como referência nostálgica', use: 'Peças retrô ou homenagens',
      signs: ['Botões em gel com reflexo na metade de cima', 'Três bolinhas coloridas na barra da janela', 'Fundo com listras horizontais finas'],
      css: '.botao { border-radius: 20px;\n  background: linear-gradient(#a9d4ff 0%, #4a9be8 50%,\n    #2f7fd6 51%, #7cc0ff 100%); }\n/* o corte em 50%/51% cria o reflexo do gel */' },
    { k: 'aero', n: 'Frutiger Aero', era: '2004 – 2013', t: 'Estilo',
      deco: '<div class="deco bub" style="width:70px;height:70px;left:8%;top:12%"></div><div class="deco bub" style="width:40px;height:40px;right:12%;top:8%"></div><div class="deco bub" style="width:56px;height:56px;right:6%;bottom:16%"></div>',
      idea: 'Céu, água, bolhas e brilho. Windows Vista e 7, Wii, MSN. O nome foi dado depois, por nostalgia, a uma estética de otimismo tecnológico.',
      pro: 'Otimista e acolhedor', con: 'Datado; o brilho compete com o conteúdo', onde: 'Revival Y2K em marcas jovens', use: 'Campanhas nostálgicas',
      signs: ['Céu azul e grama verde', 'Bolhas e reflexos brancos', 'Painéis de vidro claro com borda branca'],
      css: '.painel { background: linear-gradient(\n    rgba(255,255,255,.82), rgba(255,255,255,.4));\n  border: 1px solid rgba(255,255,255,.95);\n  box-shadow: inset 0 1px 0 #fff; }' },
    { k: 'skeu', n: 'Skeumorfismo', era: '2007 – 2013', t: 'Filosofia',
      idea: 'Imita objetos reais: couro costurado, papel pautado, metal escovado. A metáfora ensinava a função para quem nunca tinha usado uma tela de toque.',
      pro: 'Affordance óbvia, sensação tátil, curva de aprendizado curta', con: 'Ruído visual, imagens pesadas, envelhece rápido', onde: 'iOS 1 a 6, plugins de áudio, jogos, apps de câmera', use: 'Ferramentas que imitam um instrumento real',
      signs: ['Texturas de material (couro, madeira, papel)', 'Brilho no topo e sombra embaixo de cada botão', 'Campos com sombra interna, como se fossem cavados'],
      css: '.botao { background: linear-gradient(#fdfdfd, #c9ccd1);\n  box-shadow: inset 0 1px 0 #fff, 0 2px 4px rgba(0,0,0,.4);\n  text-shadow: 0 1px 0 #fff; }\n.botao:active { box-shadow: inset 0 2px 5px rgba(0,0,0,.55); }' },
    { k: 'rabisco', n: 'Rabisco / esboço', era: '2008 → (Balsamiq, Excalidraw)', t: 'Estilo',
      idea: 'Interfaces que parecem desenhadas à mão. Nasceu nas ferramentas de wireframe para avisar que aquilo ainda é rascunho e virou estilo próprio com o Excalidraw.',
      pro: 'Convida a criticar e mudar; parece inacabado de propósito', con: 'Pouco sério para produto final', onde: 'Wireframes, quadros brancos, documentação informal', use: 'Protótipos, brainstorming, materiais de aula',
      signs: ['Bordas tremidas e irregulares', 'Fonte manuscrita', 'Cores de marca-texto'],
      css: '.cartao { border: 2px solid #222;\n  border-radius: 255px 18px 225px 18px /\n                 18px 225px 18px 255px; }\n/* raios elípticos desiguais imitam o traço à mão */' },
    { k: 'flat', n: 'Flat / Metro', era: '2010 – 2015', t: 'Filosofia',
      idea: 'Zero profundidade: cor sólida, nenhuma sombra, tipografia forte. Windows Phone 7, Windows 8 e iOS 7 levaram a ideia para bilhões de telas.',
      pro: 'Leve, escala em qualquer tela, fácil de produzir', con: 'Difícil saber o que é clicável', onde: 'Base de quase tudo que veio depois', use: 'Ícones, ilustração, interfaces simples',
      signs: ['Cores chapadas e saturadas', 'Nenhuma sombra ou gradiente', 'Campos marcados só por uma linha inferior'],
      css: '.botao { background: #e74c3c; color: #fff;\n  border: 0; border-radius: 0; }\n.botao:active { background: #a93226; }\n/* o único feedback é a troca de cor */' },
    { k: 'vapor', n: 'Vaporwave', era: '2012 →', t: 'Estilo',
      deco: '<div class="deco sun"></div><div class="deco floor"></div>',
      idea: 'Estética nascida na internet: sol listrado, grade em perspectiva, janelas de sistemas antigos, rosa e ciano, letras espaçadas e japonês decorativo. Uma ironia sobre o consumismo dos anos 1980 e 1990.',
      pro: 'Atmosfera forte e instantânea', con: 'A ironia não serve a produtos sérios; legibilidade fraca', onde: 'Capas de música, memes, eventos', use: 'Peças artísticas e de nicho',
      signs: ['Pôr do sol listrado e grade em perspectiva', 'Rosa, roxo e ciano pastel', 'Texto espaçado e itálico, às vezes em japonês'],
      css: '.chao { background:\n  linear-gradient(90deg, #ff71ce 2px, transparent 2px),\n  linear-gradient(#ff71ce 2px, transparent 2px);\n  background-size: 40px 30px;\n  transform: perspective(200px) rotateX(55deg); }' },
    { k: 'material', n: 'Material Design', era: '2014 →', t: 'Filosofia e sistema', done: 'PEDIDO FEITO ✓',
      deco: '<div class="deco fab">+</div>',
      idea: 'Folhas de papel digital com espessura. A sombra informa a altura de cada elemento, e o toque gera uma onda de tinta (ripple) a partir do dedo.',
      pro: 'Regras claras; é o flat com affordance', con: 'Uniformidade: muitos apps ficaram iguais', onde: 'Android e serviços Google', use: 'Apps Android e produtos que precisam de regras prontas',
      signs: ['Sombras em camadas que indicam elevação', 'Botão flutuante redondo (FAB)', 'Onda de tinta ao tocar'],
      css: '.botao { box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),\n  0 2px 2px rgba(0,0,0,.14), 0 1px 5px rgba(0,0,0,.12); }\n.botao:active { /* sobe para elevação 8 */\n  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),\n  0 8px 10px 1px rgba(0,0,0,.14); }' },
    { k: 'brutweb', n: 'Brutalismo web', era: '2014 → (brutalistwebsites.com)', t: 'Filosofia', btn: 'Fazer pedido →', done: 'Pedido enviado. Voltar',
      mid: '<hr>',
      idea: 'HTML quase sem estilo: fonte padrão do navegador, links azuis sublinhados, campos nativos. É uma recusa da web polida e igual, e não deve ser confundido com o neobrutalismo, que é decorativo.',
      pro: 'Rápido, honesto, leve, sem dependências', con: 'Pode parecer quebrado ou descuidado', onde: 'Sites de artistas, revistas independentes, páginas pessoais', use: 'Projetos pessoais em que o conteúdo vem antes de tudo',
      signs: ['Times New Roman e controles nativos do navegador', 'Links azuis sublinhados no lugar de botões', 'Pouco ou nenhum espaçamento planejado'],
      css: '/* a receita é quase não ter CSS */\nbody { font-family: serif; }\na { color: #00e; }\na:visited { color: #551a8b; }' },
    { k: 'tipovar', n: 'Tipografia variável', era: '2016 → (OpenType Font Variations)', t: 'Técnica e estilo',
      deco: '<div class="hintv">mova o cursor: ↔ peso · ↕ largura</div>',
      idea: 'Uma única fonte com eixos contínuos de peso e largura. A tipografia vira material interativo: reage ao cursor, ao estado e ao tamanho da tela. Mova o cursor sobre a amostra.',
      pro: 'Expressiva sem imagens, com um único arquivo de fonte', con: 'Exagero vira truque; nem toda fonte tem eixos', onde: 'Sites de fundições tipográficas, editoriais, títulos animados', use: 'Títulos, estados de botões e identidade tipográfica',
      signs: ['Peso e largura mudando suavemente', 'Texto que reage a hover ou rolagem', 'Uma família só fazendo todo o trabalho'],
      css: '.titulo { font-family: "Roboto Flex";\n  font-variation-settings: "wght" var(--w), "wdth" var(--wd); }\n.botao:hover {\n  font-variation-settings: "wght" 900, "wdth" 140; }' },
    { k: 'neu', n: 'Neumorfismo', era: '2019 – 2020', t: 'Estilo',
      idea: 'Elementos extrudados do próprio fundo, com uma sombra clara e uma escura em lados opostos. Ao pressionar, o botão afunda.',
      pro: 'Suave e bonito em imagem estática', con: 'Contraste baixíssimo; falha no WCAG', onde: 'Dribbble; quase nada em produção', use: 'Praticamente nunca em produto real',
      signs: ['Mesma cor no fundo e nos elementos', 'Duas sombras opostas, clara e escura', 'Pouca diferença entre estado ativo e inativo'],
      css: '.botao { background: #e0e5ec;\n  box-shadow: 6px 6px 12px #a3b1c6, -6px -6px 12px #fff; }\n.botao:active {\n  box-shadow: inset 5px 5px 10px #a3b1c6,\n    inset -5px -5px 10px #fff; }' },
    { k: 'glass', n: 'Glassmorfismo', era: '2020 →', t: 'Estilo',
      deco: '<div class="deco blob drift" style="width:150px;height:150px;background:#ff6b9d;left:10%;top:6%"></div><div class="deco blob drift b2" style="width:170px;height:170px;background:#4facfe;right:8%;bottom:4%"></div>',
      idea: 'Painéis translúcidos com desfoque do que está atrás. Big Sur, o Acrylic do Fluent e o Liquid Glass da Apple levaram a ideia ao sistema operacional.',
      pro: 'Hierarquia espacial clara; sensação premium', con: 'Legibilidade imprevisível sobre fundos variáveis', onde: 'iOS, macOS, visionOS, Windows 11', use: 'Camadas flutuantes sobre conteúdo visual',
      signs: ['Fundo colorido visível e desfocado através do painel', 'Borda clara de 1px', 'Texto branco sobre transparência'],
      css: '.painel { background: rgba(255,255,255,.14);\n  backdrop-filter: blur(18px);\n  border: 1px solid rgba(255,255,255,.35);\n  border-radius: 22px; }' },
    { k: 'clay', n: 'Claymorfismo', era: '2021 →', t: 'Estilo',
      deco: '<div class="deco c" style="width:80px;height:80px;background:#ffe08a;left:8%;top:10%"></div><div class="deco c" style="width:60px;height:60px;background:#a5e8ff;right:10%;bottom:12%"></div>',
      idea: 'Massinha 3D: volume interno e sombra externa. É o neumorfismo com contraste, e o botão achata como borracha ao ser apertado.',
      pro: 'Amigável, lúdico, legível', con: 'Infantiliza produtos sérios', onde: 'Apps infantis, fintechs jovens, ilustração 3D', use: 'Onboarding e marcas leves',
      signs: ['Cantos muito arredondados', 'Sombra interna clara e escura que dá volume', 'Cores pastel e fonte arredondada'],
      css: '.botao { border-radius: 24px;\n  box-shadow: 8px 8px 16px rgba(120,70,200,.35),\n    inset -6px -6px 10px rgba(80,40,160,.35),\n    inset 6px 6px 10px rgba(255,255,255,.6); }\n.botao:active { transform: scale(.93, .86); }' },
    { k: 'brutal', n: 'Neobrutalismo', era: '2021 →', t: 'Estilo',
      idea: 'Borda preta grossa, sombra dura sem desfoque, cores saturadas. É uma reação ao minimalismo genérico das startups, e o botão afunda literalmente na própria sombra.',
      pro: 'Affordance óbvia e identidade forte', con: 'Cansa em telas densas; envelhece rápido', onde: 'Gumroad, partes do Figma, landing pages', use: 'Marcas que querem se diferenciar',
      signs: ['Bordas pretas de 2 a 4px', 'Sombra deslocada sem desfoque', 'Amarelo, rosa e verde saturados'],
      css: '.botao { border: 3px solid #000;\n  box-shadow: 5px 5px 0 #000; }\n.botao:active { transform: translate(5px, 5px);\n  box-shadow: 0 0 0 #000; }' },
    { k: 'aurora', n: 'Aurora / mesh', era: '2021 →', t: 'Estilo',
      deco: '<div class="deco glow drift" style="width:220px;height:220px;background:#7c3aed;left:-30px;top:-40px"></div><div class="deco glow drift b2" style="width:200px;height:200px;background:#06b6d4;right:-30px;bottom:-60px"></div>',
      idea: 'Fundo escuro com manchas de cor difusas em movimento lento, título em gradiente e botão em pílula com brilho. Virou a cara das landing pages de IA.',
      pro: 'Impacto imediato', con: 'Virou clichê de SaaS e IA', onde: 'Landing pages de startups', use: 'Só com identidade própria por cima',
      signs: ['Fundo quase preto', 'Manchas de roxo e ciano desfocadas', 'Botão branco em pílula'],
      css: '.mancha { background: #7c3aed; filter: blur(46px);\n  border-radius: 50%; }\n.titulo { background: linear-gradient(90deg, #c4b5fd, #22d3ee);\n  -webkit-background-clip: text; color: transparent; }' },
    { k: 'bento', n: 'Bento grid', era: '2022 →', t: 'Padrão de layout', btn: 'Pedir e reorganizar',
      idea: 'Caixas modulares de tamanhos diferentes, uma ideia por bloco. Ficou famoso pelos slides de keynote da Apple. Aperte o botão para ver o grid se reorganizar.',
      pro: 'Escaneável, ótimo para resumo', con: 'Vira mosaico vazio sem conteúdo forte', onde: 'Landing pages, dashboards, slides', use: 'Apresentar várias features ou números',
      signs: ['Blocos retangulares de tamanhos variados', 'Cantos arredondados iguais em todos', 'Cada bloco com uma única mensagem'],
      css: '.grade { display: grid; gap: 8px;\n  grid-template-columns: 1fr 1fr; }\n.destaque { grid-column: span 2; }\n.grade > * { border-radius: 16px; }' },
    { k: 'neoskeu', n: 'Neo-skeumorfismo tátil', era: '2023 →', t: 'Estilo',
      idea: 'O skeumorfismo volta mais limpo: botões com curso físico, interruptores com LED, superfícies de aparelho industrial. Inspirado em equipamentos como os da Teenage Engineering e nos botões com relevo do Polaris.',
      pro: 'Clique satisfatório e affordance clara', con: 'Exige muito acabamento para não parecer datado', onde: 'Apps de áudio, ferramentas criativas, sites de hardware', use: 'Produtos em que a sensação de toque importa',
      signs: ['Botão com curso: a sombra sólida some ao apertar', 'Luzes indicadoras (LED)', 'Superfícies quentes e foscas, como plástico de aparelho'],
      css: '.botao { box-shadow: 0 5px 0 #b84508,\n  0 8px 12px rgba(0,0,0,.25); }\n.botao:active { transform: translateY(5px);\n  box-shadow: 0 0 0 #b84508; }' },
    { k: 'blueprint', n: 'Blueprint / técnico', era: '2023 →', t: 'Estilo',
      pre: '<div class="dim"><i></i>310 px<i></i></div>',
      idea: 'A interface se mostra como planta técnica: grade visível, linhas tracejadas, cotas e cruzes de alinhamento. Comum em sites de ferramentas para desenvolvedores e de hardware.',
      pro: 'Passa precisão e transparência', con: 'Frio; pode parecer inacabado', onde: 'Sites de ferramentas de dev, hardware, engenharia', use: 'Produtos técnicos que querem mostrar rigor',
      signs: ['Fundo azul com grade fina', 'Bordas tracejadas e cruzes nos cantos', 'Cotas e medidas como decoração'],
      css: '.fundo { background-image:\n  linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),\n  linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px);\n  background-size: 80px 80px; }\n.cartao { border: 1px dashed rgba(255,255,255,.75); }' },
    { k: 'term', n: 'Terminal / TUI', era: 'sempre', t: 'Estilo', title: 'novo_pedido --cappuccino', btn: 'pedir --agora',
      idea: 'Monoespaçado, alto contraste, teclado primeiro. Renasceu com ferramentas de desenvolvedor e agentes de IA. Cada ação vira uma linha de registro.',
      pro: 'Densidade e velocidade máximas', con: 'Hostil para leigos', onde: 'lazygit, htop, Claude Code', use: 'Público técnico',
      signs: ['Fonte monoespaçada', 'Verde ou âmbar sobre preto', 'Estados como texto: [x], OK, ERRO'],
      css: '.tela { background: #0a0f0a; color: #33ff66;\n  font-family: ui-monospace, monospace; }\n.check::before { content: "[ ] não"; }\n.check[aria-checked="true"]::before { content: "[x] sim"; }' }
  ];

  var jump = A.$('jump'), list = A.$('list');
  S.forEach(function (s) {
    jump.appendChild(el('<a href="#' + s.k + '">' + esc(s.n) + '</a>'));
    var term = s.k === 'term';
    var card = '<div class="sc">' + (s.pre || '') +
      '<div class="ttl">' + esc(s.title || 'Novo pedido') + '</div>' +
      '<div class="txt">' + (term ? '# tamanho M, leite integral' : 'Cappuccino · tamanho M') + '</div>' +
      '<input class="fld" id="f-' + s.k + '" placeholder="' + (term ? 'nome_no_copo_' : 'Nome no copo') + '" aria-label="Nome no copo" autocomplete="off">' +
      '<div class="row"><span>Para viagem</span><button type="button" class="tgl" role="switch" aria-checked="false" aria-label="Para viagem"><span class="k"></span></button></div>' +
      (s.mid || '') +
      '<button type="button" class="btn">' + esc(s.btn || 'Pedir') + '</button>' +
      (term ? '<div class="log" aria-live="polite">[ OK ] caixa aberto<span class="cursor">█</span></div>' : '') +
      '</div>';
    var entry = el('<article class="entry" id="' + s.k + '">' +
      '<div class="spec sp-' + s.k + '">' + (s.deco || '') + card + '</div>' +
      '<div class="sheet"><div class="meta"><span>' + esc(s.era) + '</span><span>· ' + esc(s.t) + '</span></div><h2>' + esc(s.n) + '</h2><p class="idea">' + esc(s.idea) + '</p>' +
      '<dl><dt class="pro">Prós</dt><dd>' + esc(s.pro) + '</dd><dt class="con">Contras</dt><dd>' + esc(s.con) + '</dd><dt>Onde ver</dt><dd>' + esc(s.onde) + '</dd><dt>Use para</dt><dd>' + esc(s.use) + '</dd></dl>' +
      '<span class="lbl">Como reconhecer</span><ul class="signs">' + s.signs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<span class="lbl">Receita em CSS</span><pre class="recipe">' + esc(s.css) + '</pre></div></article>');
    list.appendChild(entry);

    var spec = entry.querySelector('.spec'), tgl = entry.querySelector('.tgl'), btn = entry.querySelector('.btn'), label = btn.textContent, timer = null, n = 0;
    tgl.addEventListener('click', function () { tgl.setAttribute('aria-checked', tgl.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); });
    if (s.k === 'material') {
      btn.addEventListener('pointerdown', function (ev) {
        if (A.reduce) return;
        var r = btn.getBoundingClientRect(), d = Math.max(r.width, r.height), rp = document.createElement('span');
        rp.className = 'ripple'; rp.style.width = rp.style.height = d + 'px';
        rp.style.left = (ev.clientX - r.left - d / 2) + 'px'; rp.style.top = (ev.clientY - r.top - d / 2) + 'px';
        btn.appendChild(rp); setTimeout(function () { rp.remove(); }, 600);
      });
    }
    if (s.k === 'tipovar') {
      spec.addEventListener('pointermove', function (e) {
        var r = spec.getBoundingClientRect(), x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        spec.style.setProperty('--w', Math.round(100 + x * 900)); spec.style.setProperty('--wd', Math.round(151 - y * 126));
      });
      spec.addEventListener('pointerleave', function () { spec.style.setProperty('--w', 400); spec.style.setProperty('--wd', 100); });
    }
    btn.addEventListener('click', function () {
      var v = entry.querySelector('.fld').value.trim(), viagem = tgl.getAttribute('aria-checked') === 'true';
      if (term) {
        var log = entry.querySelector('.log');
        n++;
        var lines = log.textContent.replace('█', '').split('\n').filter(Boolean);
        lines.push('[ OK ] pedido #' + n + ' na fila' + (viagem ? ' (VIAGEM)' : '') + (v ? ': ' + v : ''));
        while (lines.length > 3) lines.shift();
        log.innerHTML = esc(lines.join('\n')) + '<span class="cursor">█</span>';
        return;
      }
      if (s.k === 'bento') { entry.querySelector('.sc').classList.toggle('alt'); return; }
      if (s.k === 'brutweb') { btn.classList.add('visited'); }
      clearTimeout(timer);
      btn.textContent = s.done || 'Pedido feito ✓';
      timer = setTimeout(function () { btn.textContent = label; }, 1400);
    });
  });
  /* Faz :active funcionar no Safari de iOS */
  document.addEventListener('touchstart', function () {}, { passive: true });
})();
