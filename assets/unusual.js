(function () {
  var A = window.Atlas, $ = A.$, act = A.act, reduce = A.reduce;
  function clock(sec) { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + (sec ? ':' + ('0' + d.getSeconds()).slice(-2) : ''); }

  /* ---------- GOV.UK ---------- */
  var gf = false;
  act($('gov'), function () {
    gf = !gf; var b = $('govb');
    if (gf) { b.style.background = '#ffdd00'; b.style.color = '#0b0c0c'; b.style.boxShadow = '0 -2px #ffdd00, 0 4px #0b0c0c'; }
    else { b.style.background = '#00703c'; b.style.color = '#fff'; b.style.boxShadow = '0 2px 0 #002d18'; }
  });

  /* ---------- Nothing OS ---------- */
  var F = { '0': ['111', '101', '101', '101', '111'], '1': ['010', '110', '010', '010', '111'], '2': ['111', '001', '111', '100', '111'], '3': ['111', '001', '111', '001', '111'], '4': ['101', '101', '111', '001', '001'], '5': ['111', '100', '111', '001', '111'], '6': ['111', '100', '111', '101', '111'], '7': ['111', '001', '001', '001', '001'], '8': ['111', '101', '111', '101', '111'], '9': ['111', '101', '111', '001', '111'], ':': ['0', '1', '0', '1', '0'] };
  var ns = $('nsvg'), gl = false;
  function drawN() {
    var t = clock(false), s = 7, w = 0, out = '';
    t.split('').forEach(function (c) { w += F[c][0].length * s + s; });
    var x = (200 - w + s) / 2;
    t.split('').forEach(function (c) {
      F[c].forEach(function (r, ri) { r.split('').forEach(function (v, ci) { out += '<circle cx="' + (x + ci * s) + '" cy="' + (56 + ri * s) + '" r="2.5" fill="' + (v === '1' ? '#fff' : '#1c1c1c') + '"/>'; }); });
      x += F[c][0].length * s + s;
    });
    out += '<circle cx="180" cy="20" r="4" fill="#d71921"' + (reduce ? '' : ' style="animation:pulse 1.6s infinite"') + '/>';
    out += '<text x="100" y="124" text-anchor="middle" fill="#8a8a8a" font-family="monospace" font-size="9" letter-spacing="2">TAP FOR THE GLYPH</text>';
    if (gl) out += '<g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" style="filter:drop-shadow(0 0 4px #fff)"><path d="M18 18 Q18 8 28 8 L54 8"/><path d="M166 142 L184 142"/><path d="M12 64 L12 104"/><circle cx="178" cy="78" r="11"/></g>';
    ns.innerHTML = out;
  }
  drawN(); setInterval(drawN, 30000);
  act($('noth'), function () { gl = !gl; drawN(); });

  /* ---------- Teenage Engineering ---------- */
  var kc = [['#2f6fd6', 'BPM', 120], ['#27a35a', 'TONE', 0], ['#f2f2f2', 'VOL', 8], ['#f26b1d', 'FX', 3]], kb = $('knobs');
  kc.forEach(function (k, i) {
    var r = 0, b = document.createElement('div');
    b.setAttribute('role', 'button'); b.tabIndex = 0; b.setAttribute('aria-label', 'Turn knob ' + k[1]);
    b.style.cssText = 'width:32px;height:32px;border-radius:50%;background:' + k[0] + ';border:2px solid #c9c9c5;position:relative;cursor:pointer;box-shadow:0 2px 0 #b9b9b4';
    b.innerHTML = '<span class="tr" style="position:absolute;left:50%;top:3px;width:2px;height:10px;margin-left:-1px;background:' + (i === 2 ? '#111' : '#fff') + ';transform-origin:1px 13px"></span>';
    act(b, function () { r += 45; k[2] += i === 0 ? 4 : 1; b.firstChild.style.transform = 'rotate(' + r + 'deg)'; $('lcd').textContent = k[1] + ' ' + k[2]; });
    kb.appendChild(b);
  });

  /* ---------- Playdate ---------- */
  var dith = ['transparent', 'repeating-conic-gradient(#312f28 0 25%,transparent 0 50%) 0 0/4px 4px', 'repeating-linear-gradient(45deg,#312f28 0 1.5px,transparent 1.5px 4px)', '#312f28'], pi = 1, cr = 0, bar = $('pdbar');
  bar.style.background = dith[pi];
  act($('pd'), function () { cr += 90; $('crank').style.transform = 'rotate(' + cr + 'deg)'; pi = (pi + 1) % 4; bar.style.background = dith[pi]; bar.style.height = (25 + pi * 20) + '%'; });

  /* ---------- Terminal financeiro ---------- */
  var rows = [['ABC3', 41.20], ['DEF4', 12.85], ['GHI11', 103.40], ['JKL3', 7.62], ['MNO5', 55.10], ['PQR6', 22.04]], sel = 0, br = $('bbrows');
  function drawB() {
    br.innerHTML = rows.map(function (r, i) {
      var ch = ((Math.random() - .5) * 2).toFixed(2), c = ch >= 0 ? '#4ade80' : '#f87171';
      return '<div style="display:flex;justify-content:space-between;padding:0 3px;' + (i === sel ? 'background:#ffa028;color:#000' : '') + '"><span>' + (i + 1) + ') ' + r[0] + '</span><span>' + r[1].toFixed(2) + ' <span style="color:' + (i === sel ? '#000' : c) + '">' + (ch >= 0 ? '+' : '') + ch + '</span></span></div>';
    }).join('');
  }
  drawB();
  if (!reduce) setInterval(function () { rows.forEach(function (r) { r[1] = Math.max(1, r[1] * (1 + (Math.random() - .5) * .004)); }); drawB(); }, 1300);
  act($('bb'), function () { sel = (sel + 1) % rows.length; drawB(); });

  /* ---------- Tinta eletrônica ---------- */
  var items = ['Phone', 'Messages', 'Alarm', 'Notes'], ei = 0, eL = $('einkl');
  function drawE() { $('einkT').textContent = clock(false); eL.innerHTML = items.map(function (t, i) { return '<span style="' + (i === ei ? 'text-decoration:underline;text-underline-offset:3px' : 'color:#555') + '">' + t + '</span>'; }).join(''); }
  drawE();
  act($('eink'), function () {
    var f = $('flash');
    if (reduce) { ei = (ei + 1) % items.length; drawE(); return; }
    f.style.opacity = 1; setTimeout(function () { f.style.opacity = 0; ei = (ei + 1) % items.length; drawE(); }, 160);
  });

  /* ---------- Canvas infinito ---------- */
  var zs = [1, 2, 4.2], zi = 0;
  act($('zui'), function () {
    zi = (zi + 1) % zs.length; var z = zs[zi], k = zi === 2 ? 1 : 0.5;
    $('zin').style.transform = 'scale(' + z + ') translate(' + (zi ? -(39 / z) * k : 0) + 'px,' + (zi ? (7 / z) * k : 0) + 'px)';
    $('zlab').textContent = Math.round(z * 100) + '%';
  });

  /* ---------- Dynamicland ---------- */
  var dp = false; act($('dl'), function () { dp = !dp; $('proj').style.opacity = dp ? 1 : 0; });

  /* ---------- Diegética ---------- */
  var hp = 8, sp = $('spine');
  function drawS() {
    var o = '';
    for (var i = 0; i < 8; i++) { var on = i < hp, c = hp <= 2 ? '#ff3b3b' : hp <= 4 ? '#ffb020' : '#3fe0ff'; o += '<rect x="84" y="' + (118 - i * 8) + '" width="12" height="6" rx="1.5" fill="' + (on ? c : '#1a2328') + '"' + (on ? ' style="filter:drop-shadow(0 0 3px ' + c + ')"' : '') + '/>'; }
    sp.innerHTML = o;
  }
  drawS(); act($('dg'), function () { hp = hp <= 1 ? 8 : hp - 1; drawS(); });

  /* ---------- Interface generativa ---------- */
  var qs = ['3 days in Lisbon', 'monthly spending by category', 'compare two phones'], gi = 0, go = $('gout');
  function sk() { go.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px"><div style="height:14px;width:70%;background:#eee;border-radius:4px"></div><div style="height:30px;background:#f3f3f3;border-radius:6px"></div><div style="height:22px;width:85%;background:#eee;border-radius:4px"></div></div>'; }
  function res(i) {
    if (i === 0) {
      var d = ''; for (var k = 1; k <= 21; k++) { var on = [12, 13, 14].indexOf(k) > -1; d += '<div style="height:13px;border-radius:3px;background:' + (on ? '#3b82f6' : '#f1f1f1') + ';color:' + (on ? '#fff' : '#999') + ';font-size:7px;text-align:center;line-height:13px">' + k + '</div>'; }
      go.innerHTML = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">' + d + '</div><div style="font-size:10px;color:#555;margin-top:6px">3 days, 9 suggested outings</div>';
    } else if (i === 1) {
      var b = [['Groceries', 80, '#10b981'], ['Home', 55, '#3b82f6'], ['Leisure', 30, '#8b5cf6'], ['Transit', 45, '#f59e0b']];
      go.innerHTML = '<div style="display:flex;flex-direction:column;gap:6px">' + b.map(function (x) { return '<div style="display:flex;align-items:center;gap:6px;font-size:10px;color:#333"><span style="width:40px">' + x[0] + '</span><span style="height:11px;width:' + x[1] + '%;background:' + x[2] + ';border-radius:3px"></span></div>'; }).join('') + '</div>';
    } else {
      var ph = function (n, gb, cam, bat, best) { return '<div style="border:1px solid #e5e5e5;border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:3px;font-size:9px;color:#333"><div style="display:flex;gap:6px;align-items:center"><span style="width:12px;height:20px;border:2px solid #333;border-radius:3px;display:block"></span><b style="font-size:10px">' + n + '</b></div><div>' + gb + '</div><div>' + cam + '</div><div' + (best ? ' style="color:#16a34a;font-weight:700"' : '') + '>' + bat + '</div></div>'; };
      go.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' + ph('Model A', '128 GB', '48 MP camera', '22 h battery', false) + ph('Model B', '256 GB', '50 MP camera', '29 h battery', true) + '</div>';
    }
  }
  res(0);
  act($('gen'), function () { gi = (gi + 1) % qs.length; $('gq').textContent = qs[gi]; sk(); setTimeout(function () { res(gi); }, reduce ? 0 : 550); });

  /* ---------- Retrô ---------- */
  var eq = $('eqw'), pl = false;
  for (var i = 0; i < 6; i++) { var s = document.createElement('span'); s.style.cssText = 'width:4px;height:4px;background:#000080;display:block'; eq.appendChild(s); }
  act($('w9b'), function () {
    pl = !pl; var b = $('w9b');
    b.textContent = pl ? '❚❚ Pause' : '▶ Play';
    b.style.borderColor = pl ? '#404040 #fff #fff #404040' : '#fff #404040 #404040 #fff';
    Array.prototype.forEach.call(eq.children, function (s, i) { s.style.animation = pl && !reduce ? 'eq ' + (0.4 + i * 0.09) + 's ease-in-out infinite' : 'none'; s.style.height = pl && reduce ? (6 + i * 2) + 'px' : '4px'; });
  });

  /* ---------- Tipografia de jogo ---------- */
  var tf = false;
  act($('ty'), function () {
    tf = !tf; var t = $('tyt');
    t.style.transform = tf ? 'rotate(4deg) skewX(-14deg) scale(1.25)' : 'rotate(-12deg) skewX(-10deg)';
    t.textContent = tf ? 'SENT!' : 'SEND!';
    $('tyw').style.background = tf ? 'rgba(0,0,0,.15)' : 'transparent';
  });

  /* ---------- HyperCard ---------- */
  var hcCards = [['Recipe stack', '3 cards. Use the arrows to navigate. Every button can have a script.'], ['Carrot cake', '3 carrots, 3 eggs, 1 cup of oil. Chocolate frosting.'], ['Cheese bread', '500 g of cassava starch, 2 eggs and grated semi-cured cheese.']], hi = 0;
  function hcR() { $('hcC').innerHTML = '<div style="font-size:13px;font-weight:700;margin-bottom:6px">' + hcCards[hi][0] + '</div><div style="font-size:11px;line-height:1.35">' + hcCards[hi][1] + '</div><div style="position:absolute;right:12px;top:24px;font-size:9px">' + (hi + 1) + '/3</div>'; }
  function hcGo(d) {
    hi = (hi + d + 3) % 3; var f = $('hcF');
    if (reduce) { hcR(); return; }
    f.style.transition = 'none'; f.style.opacity = 1;
    setTimeout(function () { hcR(); f.style.transition = 'opacity .25s'; f.style.opacity = 0; }, 90);
  }
  hcR(); act($('hcN'), function () { hcGo(1); }); act($('hcP'), function () { hcGo(-1); });

  /* ---------- Microsoft Bob ---------- */
  document.querySelectorAll('#bob .obj').forEach(function (o) { o.addEventListener('click', function (e) { e.stopPropagation(); $('bobB').textContent = o.getAttribute('data-m'); }); });
  $('bob').addEventListener('click', function () { $('bobB').textContent = 'Click the objects! The desk, the clock, the window... everything is a program.'; });

  /* ---------- Kai's Power Tools ---------- */
  var kOpen = false, kh = 0;
  act($('kpt'), function () { kOpen = !kOpen; kh += 70; $('kptm').style.right = kOpen ? '0' : '-96px'; $('kptp').style.filter = 'hue-rotate(' + kh + 'deg)'; $('kptp').style.transform = kOpen ? 'rotate(8deg) scale(1.05)' : 'none'; });

  /* ---------- Skins ---------- */
  var skins = [
    { n: 'metal', p: 'background:linear-gradient(#5b5b66,#2c2c33);border:1px solid #888;border-radius:2px;color:#cfe', l: 'background:#000;color:#00e000', q: '#00e000' },
    { n: 'pastel', p: 'background:#fde2e4;border:2px solid #f48fb1;border-radius:14px;color:#8e2453', l: 'background:#fff;color:#c2185b;border-radius:8px', q: '#f48fb1' },
    { n: 'wood', p: 'background:repeating-linear-gradient(90deg,#8b5a2b 0 6px,#7a4e24 6px 9px);border:2px solid #3e2410;border-radius:4px;color:#f4e0c0', l: 'background:#1d3a1d;color:#a8ff60', q: '#f4c37a' },
    { n: 'glass', p: 'background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.4);border-radius:10px;color:#fff;box-shadow:0 0 20px rgba(80,160,255,.4)', l: 'background:rgba(0,0,0,.4);color:#7fd0ff;border-radius:6px', q: '#7fd0ff' }
  ], si = 0, sq = $('skq');
  for (var j = 0; j < 12; j++) { var bb = document.createElement('span'); bb.style.cssText = 'width:5px;display:block;height:' + (4 + ((j * 7) % 14)) + 'px;' + (reduce ? '' : 'animation:eq ' + (0.45 + (j % 5) * 0.11) + 's ease-in-out infinite'); sq.appendChild(bb); }
  function skR() {
    var s = skins[si];
    $('skp').setAttribute('style', 'width:78%;padding:8px;font-family:var(--f-mono);font-size:10px;transition:all .3s;' + s.p);
    $('skl').setAttribute('style', 'padding:4px 6px;overflow:hidden;white-space:nowrap;' + s.l);
    Array.prototype.forEach.call(sq.children, function (c) { c.style.background = s.q; });
    $('skn').textContent = s.n;
  }
  skR(); act($('sk'), function () { si = (si + 1) % skins.length; skR(); });

  /* ---------- Teletexto ---------- */
  var pages = {
    100: ['#0000ff', '#ffff00', 'INDEX', [['#00ffff', 'News ............ 101'], ['#00ffff', 'Weather ......... 102'], ['#00ffff', 'Sports .......... 103'], ['#fff', 'Select by color']]],
    101: ['#ff0000', '#fff', 'NEWS', [['#fff', 'Subway: all lines'], ['#fff', 'running normally'], ['#ffff00', 'More on page 104'], ['#888', '(illustrative page)']]],
    102: ['#00aa00', '#fff', 'WEATHER', [['#ffff00', 'North ▄▄█ 31°  sun'], ['#ffff00', 'South ▄▄▄ 19°  rain'], ['#00ffff', 'Low humidity in the afternoon'], ['#888', '(illustrative page)']]],
    103: ['#ffff00', '#000', 'SPORTS', [['#fff', 'Matchday ........ 105'], ['#fff', 'Table ........... 106'], ['#00ff00', 'Live ............ 107'], ['#888', '(illustrative page)']]]
  }, cur = 100, busy = false;
  function ttH(n) { $('tth').innerHTML = '<span>P' + n + ' TELETEXT</span> <span style="float:right;color:#ffff00">' + clock(true) + '</span>'; }
  function ttR() { var p = pages[cur]; ttH(cur); $('ttc').innerHTML = '<div style="background:' + p[0] + ';color:' + p[1] + ';font-weight:700;font-size:13px;padding:0 4px;margin:2px 0 3px;letter-spacing:.1em">' + p[2] + '</div>' + p[3].map(function (l) { return '<div style="color:' + l[0] + '">' + l[1] + '</div>'; }).join(''); }
  function ttGo(n) {
    if (busy || n === cur) return; busy = true;
    var steps = reduce ? [n] : [cur + 1, n - 1, n], k = 0; $('ttc').style.opacity = .25;
    (function tick() { ttH(steps[k]); k++; if (k < steps.length) setTimeout(tick, 140); else { cur = n; $('ttc').style.opacity = 1; ttR(); busy = false; } })();
  }
  [['#ff3333', 'News', 101], ['#33ff33', 'Weather', 102], ['#ffff33', 'Sports', 103], ['#33ffff', 'Index', 100]].forEach(function (f) {
    var s = document.createElement('span'); s.textContent = f[1]; s.style.color = f[0]; s.style.cursor = 'pointer';
    s.addEventListener('click', function (e) { e.stopPropagation(); ttGo(f[2]); }); $('ttf').appendChild(s);
  });
  ttR(); $('tt').addEventListener('click', function () { ttGo(cur === 103 ? 100 : cur + 1); });
  if (!reduce) setInterval(function () { if (!busy) ttH(cur); }, 1000);

  /* ---------- Acme ---------- */
  var body0 = ['Shopping list:', 'coffee beans, oat milk,', 'sourdough bread.'], body = body0.slice(), out = [], look = false;
  function acR() { $('acb').innerHTML = body.map(function (l) { return look ? l.replace('coffee', '<span style="background:#eeee9e">coffee</span>') : l; }).join('<br>') + (out.length ? '<div style="color:#0000aa;margin-top:4px">+Errors: ' + out[out.length - 1] + '</div>' : ''); }
  $('actag').innerHTML = ['/notes/shopping.txt', 'Del', 'Snarf', 'Get', 'Put', '|', 'Look', 'Undo'].map(function (w) { return (w[0] === '/' || w === '|') ? w : '<span class="aw" data-w="' + w + '">' + w + '</span>'; }).join(' ');
  $('actag').addEventListener('click', function (e) {
    var w = e.target.getAttribute && e.target.getAttribute('data-w'); if (!w) return;
    if (w === 'Put') out.push('/notes/shopping.txt written');
    if (w === 'Snarf') out.push('3 lines copied');
    if (w === 'Get') { body = body0.slice(); look = false; out.push('file reloaded'); }
    if (w === 'Look') { look = !look; out.push(look ? '“coffee” on line 2' : 'search cleared'); }
    if (w === 'Undo') out.pop();
    if (w === 'Del') { $('acb').style.opacity = 0; setTimeout(function () { $('acb').style.opacity = 1; }, 700); out.push('window closed (and reopened)'); }
    acR();
  });
  acR();

  /* ---------- Menu radial ---------- */
  var pItems = ['Copy', 'Paste', 'Cut', 'Rotate', 'Undo', 'Send'], pOpen = false, pI = $('pieI');
  pItems.forEach(function (t, i) {
    var a = (i * 60 - 90) * Math.PI / 180, d = document.createElement('div');
    d.className = 'pi'; d.textContent = t;
    d.style.left = 'calc(50% + ' + Math.round(Math.cos(a) * 58) + 'px)'; d.style.top = 'calc(50% + ' + Math.round(Math.sin(a) * 52) + 'px)';
    d.style.transform = 'scale(0)'; d.style.opacity = 0;
    d.addEventListener('click', function (e) { e.stopPropagation(); $('pieC').textContent = t; pT(false); });
    pI.appendChild(d);
  });
  function pT(v) { pOpen = v; Array.prototype.forEach.call(pI.children, function (d, i) { d.style.transitionDelay = (v && !reduce ? i * 25 : 0) + 'ms'; d.style.transform = v ? 'scale(1)' : 'scale(0)'; d.style.opacity = v ? 1 : 0; }); }
  act($('pieC'), function (e) { e.stopPropagation(); pT(!pOpen); });
  $('pie').addEventListener('click', function () { if (pOpen) pT(false); });

  /* ---------- Favo de mel ---------- */
  var hx = $('hx'), cols = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#5ac8fa', '#007aff', '#af52de', '#ff2d55', '#8e8e93', '#30b0c7'], dots = [];
  function hxB() {
    hx.innerHTML = ''; dots = []; var w = hx.offsetWidth, h = hx.offsetHeight, r = 0;
    for (var y = 10; y < h; y += 21) { for (var x = (r % 2 ? 20 : 8); x < w; x += 24) { var c = document.createElement('div'); c.className = 'hxc'; c.style.left = x + 'px'; c.style.top = y + 'px'; c.style.background = cols[(dots.length * 7) % cols.length]; hx.appendChild(c); dots.push([c, x, y]); } r++; }
    hxF(w / 2, h / 2);
  }
  function hxF(fx, fy) { dots.forEach(function (d) { var dist = Math.hypot(d[1] - fx, d[2] - fy), s = Math.max(.3, 1.55 - dist / 55); d[0].style.transform = 'scale(' + s.toFixed(2) + ')'; }); }
  function hxP(e) { var r = hx.getBoundingClientRect(), k = r.width / hx.offsetWidth || 1; hxF((e.clientX - r.left) / k, (e.clientY - r.top) / k); }
  hx.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') hxP(e); });
  hx.addEventListener('click', hxP);
  hx.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hxF(hx.offsetWidth / 2, hx.offsetHeight / 2); });
  hxB();

  /* ---------- Live Tiles ---------- */
  var tiles = [['#1ba1e2', '12', 'e-mails', '3', 'important'], ['#a4c400', '28°', 'now', '31°', 'high today'], ['#e51400', '3', 'events', '2 PM', 'next'], ['#f09609', '5', 'messages', 'Ana', 'latest']], lts = [];
  tiles.forEach(function (t) {
    var d = document.createElement('div'); d.className = 'lt'; d.setAttribute('role', 'button'); d.tabIndex = 0; d.setAttribute('aria-label', 'Flip tile ' + t[2]);
    d.innerHTML = '<div class="lf" style="background:' + t[0] + '"><span class="n">' + t[1] + '</span><span class="tt">' + t[2] + '</span></div><div class="lf b" style="background:' + t[0] + ';filter:brightness(.85)"><span class="n" style="font-size:18px">' + t[3] + '</span><span class="tt">' + t[4] + '</span></div>';
    act(d, function () { d.classList.toggle('f'); }); $('lt').appendChild(d); lts.push(d);
  });
  if (!reduce) setInterval(function () { lts[Math.floor(Math.random() * lts.length)].classList.toggle('f'); }, 2400);

  /* ---------- Paleta de comandos ---------- */
  var cmds = [['New document', '⌘N'], ['Open recent', '⌘O'], ['Toggle theme', '⌘⇧L'], ['Split screen', '⌘ \\'], ['Search in file', '⌘F'], ['Export PDF', '⌘E'], ['Close tab', '⌘W']], cpSel = 0, cpM = cmds;
  function norm(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function cpR() {
    var q = norm($('cpI').value);
    cpM = cmds.filter(function (c) { return norm(c[0]).indexOf(q) > -1; }).slice(0, 4);
    if (cpSel >= cpM.length) cpSel = 0;
    $('cpL').innerHTML = cpM.length ? cpM.map(function (c, i) { return '<div class="cpi' + (i === cpSel ? ' on' : '') + '" data-i="' + i + '"><span>' + c[0] + '</span><span>' + c[1] + '</span></div>'; }).join('') : '<div class="cpi">Nothing found</div>';
  }
  function cpX(i) { if (!cpM[i]) return; var c = cpM[i][0]; $('cpL').innerHTML = '<div class="cpi on"><span>✓ ' + c + '</span><span>ok</span></div>'; setTimeout(function () { $('cpI').value = ''; cpSel = 0; cpR(); }, 1100); }
  $('cpI').addEventListener('input', function () { cpSel = 0; cpR(); });
  $('cpI').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); cpSel = Math.min(cpSel + 1, cpM.length - 1); cpR(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); cpSel = Math.max(cpSel - 1, 0); cpR(); }
    if (e.key === 'Enter') { e.preventDefault(); cpX(cpSel); }
  });
  $('cpL').addEventListener('click', function (e) { var it = e.target.closest('[data-i]'); if (it) cpX(+it.getAttribute('data-i')); });
  cpR();

  /* ---------- Ambient Orb ---------- */
  var orbs = [['#34c759', 10], ['#ffcc00', 45], ['#ff3b30', 85]], oi = 0;
  function orbR() {
    var c = orbs[oi][0], b = $('orbB');
    b.style.background = 'radial-gradient(circle at 35% 30%,rgba(255,255,255,.85),transparent 45%),radial-gradient(circle,transparent 55%,rgba(0,0,0,.35)),' + c;
    b.style.boxShadow = '0 0 34px ' + c + ',0 0 70px ' + c + '55';
    b.style.animation = (oi === 2 && !reduce) ? 'pulse 1.2s ease-in-out infinite' : 'none';
    $('orbL').textContent = 'RAIN: ' + orbs[oi][1] + '%';
  }
  orbR(); act($('orb'), function () { oi = (oi + 1) % 3; orbR(); });

  /* ---------- Tufte ---------- */
  var data = [42, 48, 45, 57, 61, 66], mo = ['may', 'jun', 'jul', 'aug', 'sep', 'oct'], J = '', C = '';
  J += '<rect x="0" y="0" width="180" height="150" fill="url(#jg)"/>';
  for (var g = 28; g <= 128; g += 20) J += '<line x1="22" y1="' + g + '" x2="172" y2="' + g + '" stroke="#5a6f94" stroke-width="1.2"/>';
  J += '<text x="90" y="16" text-anchor="middle" font-size="12" font-weight="900" fill="#c00" stroke="#fff" stroke-width=".4" font-family="Impact,Arial Black,sans-serif">VISITS/MONTH!!!</text>';
  data.forEach(function (v, i) {
    var x = 30 + i * 23, h = v * 1.3, t = 128 - h;
    J += '<polygon points="' + (x + 14) + ',' + t + ' ' + (x + 19) + ',' + (t - 5) + ' ' + (x + 19) + ',123 ' + (x + 14) + ',128" fill="#7b1040"/><polygon points="' + x + ',' + t + ' ' + (x + 5) + ',' + (t - 5) + ' ' + (x + 19) + ',' + (t - 5) + ' ' + (x + 14) + ',' + t + '" fill="#ffb199"/><rect x="' + x + '" y="' + t + '" width="14" height="' + h + '" fill="url(#jb)" stroke="#000" stroke-width=".6"/><text x="' + (x + 7) + '" y="' + (t - 8) + '" text-anchor="middle" font-size="7" font-weight="700" fill="#000">' + v + '</text>';
  });
  J += '<rect x="132" y="22" width="42" height="14" fill="#fff" stroke="#000"/><rect x="135" y="26" width="6" height="6" fill="#c2185b"/><text x="144" y="32" font-size="7" fill="#000">Visits</text>';
  C += '<text x="20" y="22" font-size="9" fill="#666" font-family="Georgia,serif">Site visits per month (fictional)</text>';
  C += '<polyline points="' + data.map(function (v, i) { return (24 + i * 28) + ',' + (120 - (v - 40) * 3); }).join(' ') + '" fill="none" stroke="#333" stroke-width="1.3"/>';
  C += '<circle cx="164" cy="42" r="2.6" fill="#d33"/><text x="164" y="34" text-anchor="middle" font-size="10" fill="#d33" font-family="Georgia,serif">66</text>';
  C += '<text x="24" y="128" text-anchor="middle" font-size="9" fill="#666" font-family="Georgia,serif">42</text>';
  mo.forEach(function (m, i) { C += '<text x="' + (24 + i * 28) + '" y="142" text-anchor="middle" font-size="8" fill="#999" font-family="Georgia,serif">' + m + '</text>'; });
  $('tfJ').innerHTML = J; $('tfC').innerHTML = C;
  var clean = false;
  act($('tf'), function () { clean = !clean; $('tfJ').style.opacity = clean ? 0 : 1; $('tfC').style.opacity = clean ? 1 : 0; $('tfL').textContent = clean ? 'data only · tap' : 'with decoration · tap'; });
})();
