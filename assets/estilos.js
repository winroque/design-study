(function () {
  var A = window.Atlas, esc = A.esc, el = A.el;

  var S = [
    { k: 'suico', n: 'Estilo Suíço', era: '1950 →', t: 'Filosofia', title: 'Novo laudo.',
      deco: '<div class="deco bar"></div>',
      idea: 'Grid matemático, tipografia sem serifa e assimetria. A informação é o ornamento. Nasceu no design gráfico e é a raiz intelectual do flat.',
      pro: 'Clareza máxima, envelhece muito bem, funciona com qualquer conteúdo textual', con: 'Pode soar frio; depende de tipografia e conteúdo bons', onde: 'Sites editoriais, portfólios, sinalização, design de dados', use: 'Conteúdo textual, marcas sóbrias, material didático',
      signs: ['Grid visível ou implícito, alinhamento à esquerda', 'Helvetica ou similar, títulos grandes e apertados', 'Uma única cor de destaque, geralmente vermelho'],
      css: '.titulo { font: 700 38px/0.95 Helvetica, sans-serif;\n  letter-spacing: -0.045em; }\n.campo  { border: 0; border-bottom: 2px solid #000; }\n.botao  { background: #000; color: #fff;\n  border-radius: 0; text-align: left; }' },
    { k: 'skeu', n: 'Skeumorfismo', era: '2007 – 2013', t: 'Filosofia', title: 'Novo laudo',
      idea: 'Imita objetos reais: couro costurado, papel pautado, metal escovado. A metáfora ensinava a função para quem nunca tinha usado uma tela de toque.',
      pro: 'Affordance óbvia, sensação tátil, curva de aprendizado curta', con: 'Ruído visual, imagens pesadas, envelhece rápido', onde: 'iOS 1 a 6, plugins de áudio, jogos, apps de câmera', use: 'Ferramentas que imitam um instrumento real',
      signs: ['Texturas de material (couro, madeira, papel)', 'Brilho no topo e sombra embaixo de cada botão', 'Campos com sombra interna, como se fossem cavados'],
      css: '.botao { background: linear-gradient(#fdfdfd, #c9ccd1);\n  box-shadow: inset 0 1px 0 #fff, 0 2px 4px rgba(0,0,0,.4);\n  text-shadow: 0 1px 0 #fff; }\n.botao:active { box-shadow: inset 0 2px 5px rgba(0,0,0,.55); }' },
    { k: 'aqua', n: 'Aqua', era: '2001 – 2014', t: 'Estilo', title: 'Novo laudo',
      idea: 'Skeumorfismo de materiais idealizados: gel, gota, plástico translúcido e listras de fundo. Foi a cara do Mac OS X por mais de uma década.',
      pro: 'Marcante, tátil, identidade fortíssima', con: 'Pesado de renderizar e de manter', onde: 'Mac OS X até o Yosemite, hoje como referência nostálgica', use: 'Peças retrô ou homenagens',
      signs: ['Botões em gel com reflexo na metade de cima', 'Três bolinhas coloridas na barra da janela', 'Fundo com listras horizontais finas'],
      css: '.botao { border-radius: 20px;\n  background: linear-gradient(#a9d4ff 0%, #4a9be8 50%,\n    #2f7fd6 51%, #7cc0ff 100%); }\n/* o corte em 50%/51% cria o reflexo do gel */' },
    { k: 'aero', n: 'Frutiger Aero', era: '2004 – 2013', t: 'Estilo', title: 'Novo laudo',
      deco: '<div class="deco bub" style="width:70px;height:70px;left:8%;top:12%"></div><div class="deco bub" style="width:40px;height:40px;right:12%;top:8%"></div><div class="deco bub" style="width:56px;height:56px;right:6%;bottom:16%"></div>',
      idea: 'Céu, água, bolhas e brilho. Windows Vista e 7, Wii, MSN. O nome foi dado depois, por nostalgia, a uma estética de otimismo tecnológico.',
      pro: 'Otimista e acolhedor', con: 'Datado; o brilho compete com o conteúdo', onde: 'Revival Y2K em marcas jovens', use: 'Campanhas nostálgicas',
      signs: ['Céu azul e grama verde', 'Bolhas e reflexos brancos', 'Painéis de vidro claro com borda branca'],
      css: '.painel { background: linear-gradient(\n    rgba(255,255,255,.82), rgba(255,255,255,.4));\n  border: 1px solid rgba(255,255,255,.95);\n  box-shadow: inset 0 1px 0 #fff; }' },
    { k: 'flat', n: 'Flat / Metro', era: '2010 – 2015', t: 'Filosofia', title: 'Novo laudo',
      idea: 'Zero profundidade: cor sólida, nenhuma sombra, tipografia forte. Windows Phone 7, Windows 8 e iOS 7 levaram a ideia para bilhões de telas.',
      pro: 'Leve, escala em qualquer tela, fácil de produzir', con: 'Difícil saber o que é clicável', onde: 'Base de quase tudo que veio depois', use: 'Ícones, ilustração, interfaces simples',
      signs: ['Cores chapadas e saturadas', 'Nenhuma sombra ou gradiente', 'Campos marcados só por uma linha inferior'],
      css: '.botao { background: #e74c3c; color: #fff;\n  border: 0; border-radius: 0; }\n.botao:active { background: #a93226; }\n/* o único feedback é a troca de cor */' },
    { k: 'material', n: 'Material Design', era: '2014 →', t: 'Filosofia e sistema', title: 'Novo laudo',
      deco: '<div class="deco fab">+</div>',
      idea: 'Folhas de papel digital com espessura. A sombra informa a altura de cada elemento, e o toque gera uma onda de tinta (ripple) a partir do dedo.',
      pro: 'Regras claras; é o flat com affordance', con: 'Uniformidade: muitos apps ficaram iguais', onde: 'Android e serviços Google', use: 'Apps Android e produtos que precisam de regras prontas',
      signs: ['Sombras em camadas que indicam elevação', 'Botão flutuante redondo (FAB)', 'Onda de tinta ao tocar'],
      css: '.botao { box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),\n  0 2px 2px rgba(0,0,0,.14), 0 1px 5px rgba(0,0,0,.12); }\n.botao:active { /* sobe para elevação 8 */\n  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),\n  0 8px 10px 1px rgba(0,0,0,.14); }' },
    { k: 'neu', n: 'Neumorfismo', era: '2019 – 2020', t: 'Estilo', title: 'Novo laudo',
      idea: 'Elementos extrudados do próprio fundo, com uma sombra clara e uma escura em lados opostos. Ao pressionar, o botão afunda.',
      pro: 'Suave e bonito em imagem estática', con: 'Contraste baixíssimo; falha no WCAG', onde: 'Dribbble; quase nada em produção', use: 'Praticamente nunca em produto real',
      signs: ['Mesma cor no fundo e nos elementos', 'Duas sombras opostas, clara e escura', 'Pouca diferença entre estado ativo e inativo'],
      css: '.botao { background: #e0e5ec;\n  box-shadow: 6px 6px 12px #a3b1c6, -6px -6px 12px #fff; }\n.botao:active {\n  box-shadow: inset 5px 5px 10px #a3b1c6,\n    inset -5px -5px 10px #fff; }' },
    { k: 'glass', n: 'Glassmorfismo', era: '2020 →', t: 'Estilo', title: 'Novo laudo',
      deco: '<div class="deco blob drift" style="width:150px;height:150px;background:#ff6b9d;left:10%;top:6%"></div><div class="deco blob drift b2" style="width:170px;height:170px;background:#4facfe;right:8%;bottom:4%"></div>',
      idea: 'Painéis translúcidos com desfoque do que está atrás. Big Sur, Acrylic do Fluent e o Liquid Glass da Apple levaram a ideia ao sistema operacional.',
      pro: 'Hierarquia espacial clara; sensação premium', con: 'Legibilidade imprevisível sobre fundos variáveis', onde: 'iOS, macOS, visionOS, Windows 11', use: 'Camadas flutuantes sobre conteúdo visual',
      signs: ['Fundo colorido visível e desfocado através do painel', 'Borda clara de 1px', 'Texto branco sobre transparência'],
      css: '.painel { background: rgba(255,255,255,.14);\n  backdrop-filter: blur(18px);\n  border: 1px solid rgba(255,255,255,.35);\n  border-radius: 22px; }' },
    { k: 'clay', n: 'Claymorfismo', era: '2021 →', t: 'Estilo', title: 'Novo laudo',
      deco: '<div class="deco c" style="width:80px;height:80px;background:#ffe08a;left:8%;top:10%"></div><div class="deco c" style="width:60px;height:60px;background:#a5e8ff;right:10%;bottom:12%"></div>',
      idea: 'Massinha 3D: volume interno e sombra externa. É o neumorfismo com contraste, e o botão achata como borracha ao ser apertado.',
      pro: 'Amigável, lúdico, legível', con: 'Infantiliza produtos sérios', onde: 'Apps infantis, fintechs jovens, ilustração 3D', use: 'Onboarding e marcas leves',
      signs: ['Cantos muito arredondados', 'Sombra interna clara e escura que dá volume', 'Cores pastel e fonte arredondada'],
      css: '.botao { border-radius: 24px;\n  box-shadow: 8px 8px 16px rgba(120,70,200,.35),\n    inset -6px -6px 10px rgba(80,40,160,.35),\n    inset 6px 6px 10px rgba(255,255,255,.6); }\n.botao:active { transform: scale(.93, .86); }' },
    { k: 'brutal', n: 'Neobrutalismo', era: '2021 →', t: 'Estilo', title: 'Novo laudo',
      idea: 'Borda preta grossa, sombra dura sem desfoque, cores saturadas. É uma reação ao minimalismo genérico das startups. O botão afunda literalmente na própria sombra.',
      pro: 'Affordance óbvia e identidade forte', con: 'Cansa em telas densas; envelhece rápido', onde: 'Gumroad, partes do Figma, landing pages', use: 'Marcas que querem se diferenciar',
      signs: ['Bordas pretas de 2 a 4px', 'Sombra deslocada sem desfoque', 'Amarelo, rosa e verde saturados'],
      css: '.botao { border: 3px solid #000;\n  box-shadow: 5px 5px 0 #000; }\n.botao:active { transform: translate(5px, 5px);\n  box-shadow: 0 0 0 #000; }' },
    { k: 'bento', n: 'Bento grid', era: '2022 →', t: 'Padrão de layout', title: 'Novo laudo',
      idea: 'Caixas modulares de tamanhos diferentes, uma ideia por bloco. Ficou famoso pelos slides de keynote da Apple. Aperte o botão para ver o grid se reorganizar.',
      pro: 'Escaneável, ótimo para resumo', con: 'Vira mosaico vazio sem conteúdo forte', onde: 'Landing pages, dashboards, slides', use: 'Apresentar várias features ou números',
      signs: ['Blocos retangulares de tamanhos variados', 'Cantos arredondados iguais em todos', 'Cada bloco com uma única mensagem'],
      css: '.grade { display: grid; gap: 8px;\n  grid-template-columns: 1fr 1fr; }\n.destaque { grid-column: span 2; }\n.grade > * { border-radius: 16px; }' },
    { k: 'aurora', n: 'Aurora / mesh', era: '2021 →', t: 'Estilo', title: 'Novo laudo',
      deco: '<div class="deco glow drift" style="width:220px;height:220px;background:#7c3aed;left:-30px;top:-40px"></div><div class="deco glow drift b2" style="width:200px;height:200px;background:#06b6d4;right:-30px;bottom:-60px"></div>',
      idea: 'Fundo escuro com manchas de cor difusas em movimento lento, título em gradiente e botão em pílula com brilho. Virou a cara das landing pages de IA.',
      pro: 'Impacto imediato', con: 'Virou clichê de SaaS e IA', onde: 'Landing pages de startups', use: 'Só com identidade própria por cima',
      signs: ['Fundo quase preto', 'Manchas de roxo e ciano desfocadas', 'Botão branco em pílula'],
      css: '.mancha { background: #7c3aed; filter: blur(46px);\n  border-radius: 50%; }\n.titulo { background: linear-gradient(90deg, #c4b5fd, #22d3ee);\n  -webkit-background-clip: text; color: transparent; }' },
    { k: 'term', n: 'Terminal / TUI', era: 'sempre', t: 'Estilo', title: 'novo_laudo --tc-cranio',
      idea: 'Monoespaçado, alto contraste, teclado primeiro. Renasceu com ferramentas de desenvolvedor e agentes de IA. Cada ação vira uma linha de registro.',
      pro: 'Densidade e velocidade máximas', con: 'Hostil para leigos', onde: 'lazygit, htop, Claude Code', use: 'Público técnico',
      signs: ['Fonte monoespaçada', 'Verde ou âmbar sobre preto', 'Estados como texto: [x], OK, ERRO'],
      css: '.tela { background: #0a0f0a; color: #33ff66;\n  font-family: ui-monospace, monospace; }\n.check::before { content: "[ ] não"; }\n.check[aria-checked="true"]::before { content: "[x] sim"; }' }
  ];

  var jump = A.$('jump'), list = A.$('list');
  S.forEach(function (s) {
    jump.appendChild(el('<a href="#' + s.k + '">' + esc(s.n) + '</a>'));
    var card = '<div class="card">' +
      '<div class="ttl">' + esc(s.title) + '</div>' +
      '<div class="txt">' + (s.k === 'term' ? '# TC de crânio, 54 anos' : 'TC de crânio · 54 anos') + '</div>' +
      '<input class="fld" id="f-' + s.k + '" placeholder="' + (s.k === 'term' ? 'achado principal_' : 'Achado principal') + '" aria-label="Achado principal" autocomplete="off">' +
      '<div class="row"><span>Urgente</span><button type="button" class="tgl" role="switch" aria-checked="false" aria-label="Urgente"><span class="k"></span></button></div>' +
      '<button type="button" class="btn">' + (s.k === 'term' ? 'enviar --agora' : s.k === 'bento' ? 'Enviar e reorganizar' : 'Enviar') + '</button>' +
      (s.k === 'term' ? '<div class="log" aria-live="polite">[ OK ] sessão aberta<span class="cursor">█</span></div>' : '') +
      '</div>';
    var entry = el('<article class="entry" id="' + s.k + '">' +
      '<div class="spec sp-' + s.k + '">' + (s.deco || '') + card + '</div>' +
      '<div class="sheet"><div class="meta"><span>' + esc(s.era) + '</span><span>· ' + esc(s.t) + '</span></div><h2>' + esc(s.n) + '</h2><p class="idea">' + esc(s.idea) + '</p>' +
      '<dl><dt class="pro">Prós</dt><dd>' + esc(s.pro) + '</dd><dt class="con">Contras</dt><dd>' + esc(s.con) + '</dd><dt>Onde ver</dt><dd>' + esc(s.onde) + '</dd><dt>Use para</dt><dd>' + esc(s.use) + '</dd></dl>' +
      '<span class="lbl">Como reconhecer</span><ul class="signs">' + s.signs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<span class="lbl">Receita em CSS</span><pre class="recipe">' + esc(s.css) + '</pre></div></article>');
    list.appendChild(entry);

    var tgl = entry.querySelector('.tgl'), btn = entry.querySelector('.btn'), label = btn.textContent, timer = null, n = 0;
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
    btn.addEventListener('click', function () {
      var f = entry.querySelector('.fld'), v = f.value.trim();
      if (s.k === 'term') {
        var log = entry.querySelector('.log'), urg = tgl.getAttribute('aria-checked') === 'true';
        n++;
        var lines = log.textContent.replace('█', '').split('\n').filter(Boolean);
        lines.push('[ OK ] laudo #' + n + ' enviado' + (urg ? ' (URGENTE)' : '') + (v ? ': ' + v : ''));
        while (lines.length > 3) lines.shift();
        log.innerHTML = esc(lines.join('\n')) + '<span class="cursor">█</span>';
        return;
      }
      if (s.k === 'bento') { entry.querySelector('.card').classList.toggle('alt'); return; }
      clearTimeout(timer);
      btn.textContent = s.k === 'material' ? 'ENVIADO ✓' : s.k === 'suico' ? 'Enviado.' : 'Enviado ✓';
      timer = setTimeout(function () { btn.textContent = label; }, 1400);
    });
  });
  /* Faz :active funcionar no Safari de iOS */
  document.addEventListener('touchstart', function () {}, { passive: true });
})();
