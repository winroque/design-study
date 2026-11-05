/* Atlas de Design — casca "manual de normas": cabeçalho, papel (Impresso/Planta), modo Construção e colofão. */
(function () {
  var CAP = [
    ['estilos.html', '1', 'Estilos'],
    ['sistemas.html', '2', 'Sistemas'],
    ['incomuns.html', '3', 'Incomuns'],
    ['comparar.html', '4', 'Comparar'],
    ['labs/mantine.html', '5.1', 'Mantine'],
    ['labs/carbon.html', '5.2', 'Carbon']
  ];
  var HOME = 'index.html';

  var A = (window.Atlas = window.Atlas || {});
  A.reduce = false;
  try { A.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  A.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  A.el = function (html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  A.$ = function (id) { return document.getElementById(id); };
  A.act = function (node, fn) {
    node.addEventListener('click', fn);
    if (node.tagName !== 'BUTTON' && node.tagName !== 'INPUT') {
      node.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); } });
    }
  };
  A.store = {
    get: function (k, d) { try { var v = localStorage.getItem('atlas-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('atlas-' + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* Papel: 'claro' = Impresso, 'escuro' = Planta, 'sistema' segue o aparelho */
  var root = document.documentElement;
  var tema = A.store.get('tema', 'sistema');
  function sysDark() { try { return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { return false; } }
  function aplicar(t) {
    if (t === 'claro') root.setAttribute('data-theme', 'light');
    else if (t === 'escuro') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }
  function planta() { return tema === 'escuro' || (tema === 'sistema' && sysDark()); }
  aplicar(tema);

  var cotaTimer;
  A.cotas = function () {
    if (!root.classList.contains('construcao')) return;
    var nodes = document.querySelectorAll('[data-spec]');
    for (var i = 0; i < nodes.length; i++) {
      var e = nodes[i], cs = getComputedStyle(e), r = e.getBoundingClientRect();
      var kind = e.getAttribute('data-spec');
      var dim = Math.round(r.width) + ' × ' + Math.round(r.height);
      if (kind === 'caixa') { e.setAttribute('data-cota', dim); continue; }
      var st = cs.fontStretch, map = { 'ultra-condensed': 50, 'extra-condensed': 62.5, condensed: 75, 'semi-condensed': 87.5, normal: 100, 'semi-expanded': 112.5, expanded: 125, 'extra-expanded': 150 };
      var w = map[st] !== undefined ? map[st] : Math.round(parseFloat(st));
      var lh = cs.lineHeight === 'normal' ? '' : '/' + Math.round(parseFloat(cs.lineHeight));
      e.setAttribute('data-cota', (kind || e.tagName.toLowerCase()) + ', ' + Math.round(parseFloat(cs.fontSize)) + lh + ' px, peso ' + cs.fontWeight + ', largura ' + w + '. ' + dim);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var top = document.getElementById('top');
    if (top) {
      var cur = location.pathname.split('/').pop() || 'index.html';
      var links = CAP.map(function (p) {
        var on = p[0] === cur;
        return '<a href="' + p[0] + '"' + (on ? ' aria-current="page"' : '') + '><i>' + p[1] + '</i>' + p[2] + '</a>';
      }).join('');
      top.className = 'mb';
      top.innerHTML = '<div class="wrap mb-in">' +
        '<a class="marca" href="' + HOME + '" data-spec="marca" aria-label="Atlas, página inicial">Atlas<span class="pt">.</span></a>' +
        '<nav class="nav" aria-label="Capítulos do atlas">' + links + '</nav>' +
        '<div class="ctrl">' +
          '<button type="button" class="bt" id="obraBtn" aria-pressed="false" aria-label="Mostrar construção da página"><svg viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M1 1v12M5 1v12M9 1v12M13 1v12M1 4.5h12M1 9.5h12"/></svg><span class="tx">Construção</span></button>' +
          '<div class="seg" role="group" aria-label="Papel"><button type="button" class="bt" data-p="claro">Impresso</button><button type="button" class="bt" data-p="escuro">Planta</button></div>' +
        '</div></div>';

      var segs = top.querySelectorAll('.seg .bt');
      function marcar() { for (var i = 0; i < segs.length; i++) segs[i].setAttribute('aria-pressed', String((segs[i].getAttribute('data-p') === 'escuro') === planta())); }
      marcar();
      for (var i = 0; i < segs.length; i++) segs[i].addEventListener('click', function () {
        tema = this.getAttribute('data-p'); A.store.set('tema', tema); aplicar(tema); marcar();
        clearTimeout(cotaTimer); cotaTimer = setTimeout(A.cotas, 400);
      });
      try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', marcar); } catch (e) {}

      var obra = A.el('<div class="obra" aria-hidden="true"><div class="wrap"><div class="g">' + new Array(13).join('<i></i>') + '</div></div></div>');
      document.body.appendChild(obra);
      var ob = document.getElementById('obraBtn');
      ob.addEventListener('click', function () {
        var on = !root.classList.contains('construcao');
        root.classList.toggle('construcao', on);
        ob.setAttribute('aria-pressed', String(on));
        if (on) A.cotas();
      });
      window.addEventListener('resize', function () { clearTimeout(cotaTimer); cotaTimer = setTimeout(A.cotas, 150); });
    }

    /* Páginas de capítulo: "Capítulo N" na abertura e seções numeradas N.1, N.2… */
    var here = location.pathname.split('/').pop() || 'index.html', capN = null;
    CAP.forEach(function (p) { if (p[0] === here) capN = p[1]; });
    if (capN) {
      var hero = document.querySelector('main .hero .eyebrow');
      if (hero) hero.textContent = 'Capítulo ' + capN;
      var secs = document.querySelectorAll('main.wrap > section:not(.hero)');
      for (var k = 0; k < secs.length; k++) {
        var num = capN + '.' + (k + 1), eb = secs[k].querySelector('.sec-head .eyebrow');
        if (eb) eb.innerHTML = '<b>' + num + '</b>' + (/^Grupo \d+$/.test(eb.textContent.trim()) ? '' : eb.innerHTML);
        else {
          var h2 = secs[k].querySelector('h2');
          if (h2) h2.insertAdjacentHTML('beforebegin', '<span class="eyebrow"><b>' + num + '</b></span>');
        }
      }
    }

    var foot = document.getElementById('foot');
    if (foot) {
      foot.className = 'wrap g colofao';
      foot.innerHTML = '<div class="m"><span class="anot">Colofão</span></div><div class="c">' +
        '<h2>Como este manual foi feito</h2>' +
        '<p>Composto inteiramente em Archivo, uma família variável. A largura indica o papel do texto: larga nos títulos, normal na leitura e condensada nas anotações. Grade de doze colunas com 24 px de calha e linha de base de 8 px. Ligue a Construção no topo para ver a grade sobre a página.</p>' +
        '<div class="amostras">' +
          '<div><b style="background:#F7F7F4"></b><span>Papel<br>#F7F7F4</span></div>' +
          '<div><b style="background:#000"></b><span>Tinta<br>#000000</span></div>' +
          '<div><b style="background:#CF3A14"></b><span>Sinal<br>#CF3A14</span></div>' +
          '<div><b style="background:#0F3D6E"></b><span>Planta<br>#0F3D6E</span></div>' +
          '<div><b style="background:#FFD24A"></b><span>Marcador<br>#FFD24A</span></div>' +
        '</div>' +
        '<p class="anot">As amostras recriam cada escola em HTML e CSS próprios; os laboratórios usam Mantine e Carbon reais. Pontuações e o gráfico do pêndulo são avaliações qualitativas, com datas conferidas até novembro de 2026. Código no <a href="https://github.com/winroque/design-study">GitHub</a>.</p>' +
        '</div>';
    }
  });
})();
