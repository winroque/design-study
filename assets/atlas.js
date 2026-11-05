/* Atlas de Design — utilidades compartilhadas, barra superior e tema. */
(function () {
  var PAGES = [
    ['index.html', 'Início'],
    ['estilos.html', 'Estilos'],
    ['sistemas.html', 'Sistemas'],
    ['incomuns.html', 'Incomuns'],
    ['comparar.html', 'Comparar e escolher'],
    ['labs/mantine.html', 'Lab Mantine', 'lab'],
    ['labs/carbon.html', 'Lab Carbon', 'lab']
  ];

  var A = (window.Atlas = {});
  A.reduce = false;
  try { A.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  A.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  A.el = function (html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  A.$ = function (id) { return document.getElementById(id); };
  A.act = function (node, fn) {
    node.addEventListener('click', fn);
    if (node.tagName !== 'BUTTON' && node.tagName !== 'INPUT') {
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); }
      });
    }
  };
  A.store = {
    get: function (k, d) { try { var v = localStorage.getItem('atlas-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('atlas-' + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* Tema: sistema, claro ou escuro */
  var MODES = ['sistema', 'claro', 'escuro'];
  function applyTheme(m) {
    var r = document.documentElement;
    if (m === 'claro') r.setAttribute('data-theme', 'light');
    else if (m === 'escuro') r.setAttribute('data-theme', 'dark');
    else r.removeAttribute('data-theme');
  }
  var mode = A.store.get('tema', 'sistema');
  applyTheme(mode);

  function here() {
    var p = location.pathname.split('/').pop() || 'index.html';
    return p;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var top = document.getElementById('top');
    if (top) {
      var cur = here();
      var links = PAGES.map(function (p) {
        var current = p[0].split('/').pop() === cur && p[0].indexOf('labs/') === -1;
        return '<a href="' + p[0] + '"' + (p[2] ? ' class="lab"' : '') + (current ? ' aria-current="page"' : '') + '>' + p[1] + '</a>';
      }).join('');
      top.className = 'topbar';
      top.innerHTML = '<div class="topbar-in"><a class="brand" href="index.html">Atlas<span>.</span></a><nav class="nav" aria-label="Seções do atlas">' + links + '</nav><button type="button" class="theme-btn" id="themeBtn" aria-label="Tema da página: ' + mode + '">◐ ' + mode + '</button></div>';
      var btn = document.getElementById('themeBtn');
      btn.addEventListener('click', function () {
        mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
        A.store.set('tema', mode); applyTheme(mode);
        btn.textContent = '◐ ' + mode; btn.setAttribute('aria-label', 'Tema da página: ' + mode);
      });
      var active = top.querySelector('[aria-current="page"]');
      if (active && active.scrollIntoView) { try { active.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {} }
    }
    var foot = document.getElementById('foot');
    if (foot) {
      foot.className = 'foot';
      foot.innerHTML = '<div class="foot-in"><p>Atlas de Design, um caderno de estudo sobre filosofias, estilos e sistemas de interface. As amostras das galerias recriam a aparência de cada escola em HTML e CSS próprios; os laboratórios Mantine e Carbon usam os componentes reais das bibliotecas.</p><p>Pontuações, eixos e o gráfico do pêndulo são avaliações qualitativas. Datas conferidas até novembro de 2026. Código no <a href="https://github.com/winroque/design-study">GitHub</a>.</p></div>';
    }
  });
})();
