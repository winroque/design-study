(function () {
  var A = window.Atlas, esc = A.esc, el = A.el, $ = A.$;

  /* ---------- Matriz ---------- */
  var AX = ['Physical imitation', 'Depth', 'Density', 'Expressiveness', 'Accessibility', 'Longevity'];
  var M = [
    ['Bauhaus', 'estilo', [1, 1, 3, 5, 4, 5]], ['Swiss Style', 'estilo', [1, 1, 4, 3, 5, 5]], ['Memphis', 'estilo', [1, 2, 2, 5, 3, 2]], ['Cyberpunk / HUD', 'estilo', [2, 3, 4, 5, 2, 2]],
    ['Pixel / 8-bit', 'estilo', [2, 2, 3, 4, 3, 3]], ['High contrast', 'estilo', [1, 1, 3, 2, 5, 5]], ['Chrome Y2K', 'estilo', [4, 4, 2, 5, 3, 1]], ['Aqua', 'estilo', [4, 4, 2, 4, 3, 2]],
    ['Frutiger Aero', 'estilo', [4, 4, 2, 5, 3, 1]], ['Skeuomorphism', 'estilo', [5, 4, 2, 4, 3, 1]], ['Sketch', 'estilo', [3, 1, 3, 4, 4, 3]], ['Flat / Metro', 'estilo', [1, 1, 3, 3, 3, 3]],
    ['Vaporwave', 'estilo', [2, 2, 1, 5, 2, 1]], ['Material (2014)', 'estilo', [3, 3, 3, 3, 4, 4]], ['Web brutalism', 'estilo', [1, 1, 4, 3, 3, 3]], ['Variable type', 'estilo', [1, 1, 3, 5, 4, 4]],
    ['Neumorphism', 'estilo', [3, 3, 2, 3, 1, 1]], ['Glassmorphism', 'estilo', [3, 5, 2, 4, 2, 2]], ['Claymorphism', 'estilo', [4, 4, 1, 5, 3, 2]], ['Neobrutalism', 'estilo', [1, 2, 3, 5, 4, 2]],
    ['Aurora / mesh', 'estilo', [1, 2, 1, 4, 3, 1]], ['Bento grid', 'estilo', [1, 2, 4, 3, 4, 4]], ['Tactile neo-skeuomorphism', 'estilo', [5, 4, 2, 4, 3, 3]], ['Blueprint / technical', 'estilo', [1, 1, 4, 3, 3, 3]], ['Terminal / TUI', 'estilo', [1, 1, 5, 2, 4, 5]],
    ['Material 3 Expressive', 'plataforma', [2, 2, 2, 5, 4, 4]], ['Liquid Glass', 'plataforma', [4, 5, 2, 4, 3, 3]], ['One UI', 'plataforma', [2, 1, 2, 3, 4, 4]], ['Fluent 2', 'plataforma', [2, 3, 4, 2, 4, 4]], ['Carbon', 'plataforma', [1, 1, 5, 1, 5, 5]], ['gov.br', 'plataforma', [1, 1, 3, 2, 5, 4]],
    ['Mantine', 'biblioteca', [1, 1, 4, 2, 4, 4], 1], ['Chakra UI 3', 'biblioteca', [1, 1, 3, 2, 4, 4]], ['shadcn/ui', 'biblioteca', [1, 1, 3, 1, 4, 4]], ['Ant Design', 'biblioteca', [1, 1, 5, 2, 4, 4]]
  ];
  var GROUP = { estilo: 'Philosophies and styles', plataforma: 'Platform design systems', biblioteca: 'Web libraries' };
  var filt = 'todos', sortCol = -1;
  var head = $('mxH');
  AX.forEach(function (a, i) {
    var th = el('<th scope="col" class="sortable" tabindex="0">' + a + '</th>');
    A.act(th, function () { sortCol = sortCol === i ? -1 : i; head.querySelectorAll('th').forEach(function (h) { h.removeAttribute('aria-sort'); }); if (sortCol > -1) th.setAttribute('aria-sort', 'descending'); drawM(); });
    head.appendChild(th);
  });
  function dots(v) { var d = ''; for (var i = 1; i <= 5; i++) d += '<i class="' + (i <= v ? 'on' : '') + '"></i>'; return '<td><span class="dots" role="img" aria-label="' + v + ' of 5">' + d + '</span></td>'; }
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
    { c: 'Consumer Android app', u: 'Material 3 Expressive', a: 'Jetpack Compose components', e: 'Copying the iPhone look', w: 'Users already know the native patterns; fighting them costs usability.', tg: ['celular'] },
    { c: 'iPhone app', u: 'Apple HIG · Liquid Glass', a: 'Native SwiftUI components', e: 'Glass under dense blocks of text', w: 'The system applies glass to the bars on its own; content should sit on a solid surface.', tg: ['celular'] },
    { c: 'Cross-platform app', u: 'Your own neutral system', a: 'Material 3 adjusted per platform', e: 'Forcing one style on both', w: 'Flutter and React Native let you adapt navigation and controls to each system.', tg: ['celular'] },
    { c: 'Internal tool or React dashboard, small team', u: 'Mantine', a: 'Ant Design', e: 'Building forms, dates and charts from scratch', w: 'Ships with forms, dates, charts, notifications and hooks in one ecosystem, under a single theme.', tg: ['web', 'profissional'], lab: 'labs/mantine.html' },
    { c: 'Dense professional software (finance, operations, monitoring)', u: 'Carbon or Fluent as a reference', a: 'Mantine at xs or sm sizes', e: 'Glass, gradients, big corners', w: 'Many decisions per minute; every decorative pixel becomes friction repeated thousands of times.', tg: ['profissional'], lab: 'labs/carbon.html' },
    { c: 'Admin panel, ERP, back office', u: 'Ant Design', a: 'Mantine, Carbon, MUI', e: 'Landing-page aesthetics', w: 'Ready-made tables, filters and forms save months and keep the density.', tg: ['profissional', 'web'] },
    { c: 'A company’s own design system', u: 'Chakra UI 3', a: 'Plain Ark UI or Radix', e: 'Styling components without accessible primitives', w: 'Semantic tokens and composable components give you an identity without redoing focus, keyboard and screen-reader support.', tg: ['web', 'marca'] },
    { c: 'Startup SaaS or web app', u: 'shadcn/ui + Tailwind', a: 'Mantine, if you want more ready-made pieces', e: 'Using the default theme unchanged', w: 'It is the most active ecosystem; customize color and type so it does not look generic.', tg: ['web'] },
    { c: 'Data dashboard in Python', u: 'Dash Mantine Components', a: 'Streamlit', e: 'Hand-made HTML and CSS', w: 'Brings Mantine’s components to Dash without writing React.', tg: ['web', 'profissional'] },
    { c: 'Product landing page', u: 'Bento grid in the brand’s style', a: 'Neobrutalism, Memphis or aurora, if it fits the brand', e: 'Neumorphism', w: 'The goal here is to be remembered and to explain fast; expressiveness matters more than density.', tg: ['web', 'marca'] },
    { c: 'Developer tool', u: 'Primer (GitHub) or a TUI', a: 'Carbon', e: 'Illustrations and too much empty space', w: 'A technical audience values speed, keyboard shortcuts and information per centimeter.', tg: ['profissional', 'web'] },
    { c: 'Brazilian public service', u: 'Padrão Digital gov.br', a: 'None: it is mandatory at the federal level', e: 'Low contrast, text in images', w: 'It requires accessibility and consistency with the other services citizens already use.', tg: ['web', 'profissional'] },
    { c: 'Office add-in or Teams app', u: 'Fluent 2', a: 'None', e: 'Any style foreign to Office', w: 'The app lives inside Microsoft’s interface and has to look like part of it.', tg: ['profissional'] },
    { c: 'Kids’ app or young fintech', u: 'Claymorphism or M3 Expressive', a: '3D illustration with a simple UI', e: 'Dense, gray screens', w: 'Few decisions per minute; warmth and fun increase engagement.', tg: ['celular', 'marca'] },
    { c: 'Portfolio, editorial, creative brand', u: 'Swiss Style', a: 'Neobrutalism', e: 'Generic aurora', w: 'Type and grid give personality without dating in two years.', tg: ['marca', 'web'] },
    { c: 'Indie game or gaming community', u: 'Pixel / 8-bit', a: 'Cyberpunk / HUD', e: 'Corporate components with no personality', w: 'The audience recognizes the reference instantly and values the atmosphere.', tg: ['marca', 'web'] },
    { c: 'Accessibility mode or public kiosk', u: 'High contrast', a: 'Padrão Digital gov.br', e: 'Glass, light gray text, color as the only cue', w: 'It has to work for people with low vision, in bright sun and with no training.', tg: ['profissional', 'web'] },
    { c: 'Prototype or wireframe for discussing ideas', u: 'Sketch', a: 'Blueprint / technical', e: 'Final polish too early', w: 'The unfinished look invites the team to critique the structure, not the color.', tg: ['profissional'] },
    { c: 'Slides and teaching material', u: 'Swiss + bento', a: 'One idea per block, big type', e: 'Decorated backgrounds behind text', w: 'The audience reads from afar and fast; typographic hierarchy does the work.', tg: ['marca'] }
  ];
  var dg = $('decide');
  var cards = D.map(function (d) {
    var c = el('<article class="dcard"><div class="tags">' + d.tg.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div><h3>' + esc(d.c) + '</h3><p class="use">' + esc(d.u) + '</p><dl><dt>Or</dt><dd>' + esc(d.a) + '</dd><dt class="con">Avoid</dt><dd>' + esc(d.e) + '</dd><dt>Why</dt><dd>' + esc(d.w) + '</dd></dl>' + (d.lab ? '<a href="' + d.lab + '">See it in the lab →</a>' : '') + '</article>');
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
