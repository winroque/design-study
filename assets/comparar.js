(function () {
  var A = window.Atlas, esc = A.esc, el = A.el, $ = A.$;

  /* ---------- Matriz ---------- */
  var AX = ['Imitação física', 'Profundidade', 'Densidade', 'Expressividade', 'Acessibilidade', 'Longevidade'];
  var M = [
    ['Bauhaus', 'estilo', [1, 1, 3, 5, 4, 5]], ['Estilo Suíço', 'estilo', [1, 1, 4, 3, 5, 5]], ['Memphis', 'estilo', [1, 2, 2, 5, 3, 2]], ['Cyberpunk / HUD', 'estilo', [2, 3, 4, 5, 2, 2]],
    ['Pixel / 8 bits', 'estilo', [2, 2, 3, 4, 3, 3]], ['Alto contraste', 'estilo', [1, 1, 3, 2, 5, 5]], ['Y2K cromado', 'estilo', [4, 4, 2, 5, 3, 1]], ['Aqua', 'estilo', [4, 4, 2, 4, 3, 2]],
    ['Frutiger Aero', 'estilo', [4, 4, 2, 5, 3, 1]], ['Skeumorfismo', 'estilo', [5, 4, 2, 4, 3, 1]], ['Rabisco / esboço', 'estilo', [3, 1, 3, 4, 4, 3]], ['Flat / Metro', 'estilo', [1, 1, 3, 3, 3, 3]],
    ['Vaporwave', 'estilo', [2, 2, 1, 5, 2, 1]], ['Material (2014)', 'estilo', [3, 3, 3, 3, 4, 4]], ['Brutalismo web', 'estilo', [1, 1, 4, 3, 3, 3]], ['Tipografia variável', 'estilo', [1, 1, 3, 5, 4, 4]],
    ['Neumorfismo', 'estilo', [3, 3, 2, 3, 1, 1]], ['Glassmorfismo', 'estilo', [3, 5, 2, 4, 2, 2]], ['Claymorfismo', 'estilo', [4, 4, 1, 5, 3, 2]], ['Neobrutalismo', 'estilo', [1, 2, 3, 5, 4, 2]],
    ['Aurora / mesh', 'estilo', [1, 2, 1, 4, 3, 1]], ['Bento grid', 'estilo', [1, 2, 4, 3, 4, 4]], ['Neo-skeumorfismo tátil', 'estilo', [5, 4, 2, 4, 3, 3]], ['Blueprint / técnico', 'estilo', [1, 1, 4, 3, 3, 3]], ['Terminal / TUI', 'estilo', [1, 1, 5, 2, 4, 5]],
    ['Material 3 Expressive', 'plataforma', [2, 2, 2, 5, 4, 4]], ['Liquid Glass', 'plataforma', [4, 5, 2, 4, 3, 3]], ['One UI', 'plataforma', [2, 1, 2, 3, 4, 4]], ['Fluent 2', 'plataforma', [2, 3, 4, 2, 4, 4]], ['Carbon', 'plataforma', [1, 1, 5, 1, 5, 5]], ['gov.br', 'plataforma', [1, 1, 3, 2, 5, 4]],
    ['Mantine', 'biblioteca', [1, 1, 4, 2, 4, 4], 1], ['Chakra UI 3', 'biblioteca', [1, 1, 3, 2, 4, 4]], ['shadcn/ui', 'biblioteca', [1, 1, 3, 1, 4, 4]], ['Ant Design', 'biblioteca', [1, 1, 5, 2, 4, 4]]
  ];
  var GROUP = { estilo: 'Filosofias e estilos', plataforma: 'Design systems de plataforma', biblioteca: 'Bibliotecas web' };
  var filt = 'todos', sortCol = -1;
  var head = $('mxH');
  AX.forEach(function (a, i) {
    var th = el('<th scope="col" class="sortable" tabindex="0">' + a + '</th>');
    A.act(th, function () { sortCol = sortCol === i ? -1 : i; head.querySelectorAll('th').forEach(function (h) { h.removeAttribute('aria-sort'); }); if (sortCol > -1) th.setAttribute('aria-sort', 'descending'); drawM(); });
    head.appendChild(th);
  });
  function dots(v) { var d = ''; for (var i = 1; i <= 5; i++) d += '<i class="' + (i <= v ? 'on' : '') + '"></i>'; return '<td><span class="dots" role="img" aria-label="' + v + ' de 5">' + d + '</span></td>'; }
  function drawM() {
    var tb = $('matrix'); tb.innerHTML = '';
    var rows = M.filter(function (r) { return filt === 'todos' || r[1] === filt; });
    if (sortCol > -1) {
      rows = rows.slice().sort(function (a, b) { return b[2][sortCol] - a[2][sortCol]; });
      rows.forEach(function (r) { var tr = document.createElement('tr'); if (r[3]) tr.className = 'mark'; tr.innerHTML = '<th scope="row">' + esc(r[0]) + '</th>' + r[2].map(dots).join(''); tb.appendChild(tr); });
      return;
    }
    var last = '';
    rows.forEach(function (r) {
      if (r[1] !== last) { last = r[1]; var g = document.createElement('tr'); g.className = 'group'; g.innerHTML = '<th colspan="7">' + GROUP[r[1]] + '</th>'; tb.appendChild(g); }
      var tr = document.createElement('tr'); if (r[3]) tr.className = 'mark'; tr.innerHTML = '<th scope="row">' + esc(r[0]) + '</th>' + r[2].map(dots).join(''); tb.appendChild(tr);
    });
  }
  document.querySelectorAll('#mxF button').forEach(function (b) {
    b.addEventListener('click', function () { filt = b.getAttribute('data-f'); document.querySelectorAll('#mxF button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); drawM(); });
  });
  drawM();

  /* ---------- Cenários ---------- */
  var D = [
    { c: 'App Android para o público', u: 'Material 3 Expressive', a: 'Componentes do Jetpack Compose', e: 'Copiar visual de iPhone', w: 'O usuário já conhece os padrões nativos; lutar contra eles custa usabilidade.', tg: ['celular'] },
    { c: 'App de iPhone', u: 'Apple HIG · Liquid Glass', a: 'Componentes nativos SwiftUI', e: 'Vidro sob blocos de texto denso', w: 'O sistema aplica o vidro sozinho nas barras; o conteúdo deve ficar em superfície sólida.', tg: ['celular'] },
    { c: 'App multiplataforma', u: 'Sistema neutro próprio', a: 'Material 3 com ajustes por plataforma', e: 'Forçar um único estilo nos dois', w: 'Flutter e React Native permitem adaptar navegação e controles a cada sistema.', tg: ['celular'] },
    { c: 'Ferramenta interna ou dashboard em React, time pequeno', u: 'Mantine', a: 'Ant Design', e: 'Montar formulários, datas e gráficos do zero', w: 'Vem com formulários, datas, gráficos, notificações e hooks no mesmo ecossistema, com um tema único.', tg: ['web', 'profissional'], lab: 'labs/mantine.html' },
    { c: 'Software profissional denso (financeiro, operações, monitoramento)', u: 'Carbon ou Fluent como referência', a: 'Mantine em tamanhos xs ou sm', e: 'Vidro, gradientes, cantos grandes', w: 'Muitas decisões por minuto; cada pixel decorativo vira atrito repetido milhares de vezes.', tg: ['profissional'], lab: 'labs/carbon.html' },
    { c: 'Painel admin, ERP, backoffice', u: 'Ant Design', a: 'Mantine, Carbon, MUI', e: 'Estética de landing page', w: 'Tabelas, filtros e formulários prontos economizam meses e mantêm a densidade.', tg: ['profissional', 'web'] },
    { c: 'Design system próprio para uma empresa', u: 'Chakra UI 3', a: 'Ark UI ou Radix puros', e: 'Estilizar componentes sem primitivas acessíveis', w: 'Tokens semânticos e componentes compostos dão identidade própria sem refazer foco, teclado e leitores de tela.', tg: ['web', 'marca'] },
    { c: 'SaaS ou app web de startup', u: 'shadcn/ui + Tailwind', a: 'Mantine, se quiser mais coisas prontas', e: 'Usar o tema padrão sem mudar nada', w: 'É o ecossistema mais ativo; personalize cor e tipografia para não ficar com cara genérica.', tg: ['web'] },
    { c: 'Painel de dados em Python', u: 'Dash Mantine Components', a: 'Streamlit', e: 'HTML e CSS feitos à mão', w: 'Leva os componentes do Mantine para o Dash sem escrever React.', tg: ['web', 'profissional'] },
    { c: 'Landing page de produto', u: 'Bento grid com estilo da marca', a: 'Neobrutalismo, Memphis ou aurora, se combinar com a marca', e: 'Neumorfismo', w: 'Aqui o objetivo é ser lembrado e explicar rápido; expressividade vale mais que densidade.', tg: ['web', 'marca'] },
    { c: 'Ferramenta para desenvolvedores', u: 'Primer (GitHub) ou TUI', a: 'Carbon', e: 'Ilustrações e espaço vazio demais', w: 'Público técnico valoriza velocidade, atalhos de teclado e informação por centímetro.', tg: ['profissional', 'web'] },
    { c: 'Serviço público brasileiro', u: 'Padrão Digital gov.br', a: 'Nenhuma: é obrigatório no federal', e: 'Contraste baixo, texto em imagem', w: 'Exige acessibilidade e consistência com os outros serviços que o cidadão já usa.', tg: ['web', 'profissional'] },
    { c: 'Add-in de Office ou app de Teams', u: 'Fluent 2', a: 'Nenhuma', e: 'Qualquer estilo estranho ao Office', w: 'O app vive dentro da interface da Microsoft e precisa parecer parte dela.', tg: ['profissional'] },
    { c: 'App infantil ou fintech jovem', u: 'Claymorfismo ou M3 Expressive', a: 'Ilustração 3D com UI simples', e: 'Telas densas e cinzentas', w: 'Poucas decisões por minuto; acolhimento e diversão aumentam o engajamento.', tg: ['celular', 'marca'] },
    { c: 'Portfólio, editorial, marca criativa', u: 'Estilo Suíço', a: 'Neobrutalismo', e: 'Aurora genérica', w: 'Tipografia e grid dão personalidade sem datar em dois anos.', tg: ['marca', 'web'] },
    { c: 'Jogo independente ou comunidade de games', u: 'Pixel / 8 bits', a: 'Cyberpunk / HUD', e: 'Componentes corporativos sem personalidade', w: 'O público reconhece a referência na hora e valoriza a atmosfera.', tg: ['marca', 'web'] },
    { c: 'Modo de acessibilidade ou quiosque público', u: 'Alto contraste', a: 'Padrão Digital gov.br', e: 'Vidro, texto cinza claro, cor como única pista', w: 'Precisa funcionar para quem enxerga mal, sob sol forte e sem treino.', tg: ['profissional', 'web'] },
    { c: 'Protótipo ou wireframe para discutir ideias', u: 'Rabisco / esboço', a: 'Blueprint / técnico', e: 'Acabamento final cedo demais', w: 'A aparência inacabada convida o time a criticar a estrutura, não a cor.', tg: ['profissional'] },
    { c: 'Slides e material didático', u: 'Suíço + bento', a: 'Uma ideia por bloco, tipografia grande', e: 'Fundos decorados atrás de texto', w: 'Quem assiste lê de longe e rápido; a hierarquia tipográfica faz o trabalho.', tg: ['marca'] }
  ];
  var dg = $('decide');
  var cards = D.map(function (d) {
    var c = el('<article class="dcard"><div class="tags">' + d.tg.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div><h3>' + esc(d.c) + '</h3><p class="use">' + esc(d.u) + '</p><dl><dt>Ou</dt><dd>' + esc(d.a) + '</dd><dt class="con">Evite</dt><dd>' + esc(d.e) + '</dd><dt>Por quê</dt><dd>' + esc(d.w) + '</dd></dl>' + (d.lab ? '<a href="' + d.lab + '">Ver no laboratório →</a>' : '') + '</article>');
    c.setAttribute('data-tags', d.tg.join(' ')); dg.appendChild(c); return c;
  });
  var fb = document.querySelectorAll('#filters button');
  function apply(f) {
    fb.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-f') === f ? 'true' : 'false'); });
    cards.forEach(function (c) { c.hidden = !(f === 'todos' || c.getAttribute('data-tags').split(' ').indexOf(f) > -1); });
    A.store.set('filtro', f);
  }
  fb.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-f')); }); });
  apply(A.store.get('filtro', 'todos'));
})();
