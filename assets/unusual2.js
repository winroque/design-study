/* Atlas · Incomuns, grupos 5 a 7: gestos, padrões e designs estranhos. */
(function () {
  var A = window.Atlas, $ = A.$, act = A.act, reduce = A.reduce;
  /* As amostras são renderizadas com zoom; converte coordenadas de tela em coordenadas da amostra. */
  function k(el) { return (el.getBoundingClientRect().width / el.offsetWidth) || 1; }
  function local(el, e) { var r = el.getBoundingClientRect(), z = k(el); return { x: (e.clientX - r.left) / z, y: (e.clientY - r.top) / z }; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function hhmm() { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }

  /* ---------- Deslize para desbloquear ---------- */
  (function () {
    var track = $('sluTrack'), knob = $('sluK'), ok = $('sluOk'), start = null, x0 = 3, cur = 3;
    $('sluT').textContent = hhmm();
    function max() { return track.offsetWidth - knob.offsetWidth - 3; }
    function place(x) { cur = x; knob.style.left = x + 'px'; knob.setAttribute('aria-valuenow', Math.round((x - 3) / (max() - 3) * 100)); }
    function unlock() { ok.style.opacity = 1; setTimeout(function () { ok.style.opacity = 0; knob.style.transition = 'left .3s'; place(3); setTimeout(function () { knob.style.transition = ''; }, 320); }, 1600); }
    knob.addEventListener('pointerdown', function (e) { start = e.clientX; x0 = cur; knob.setPointerCapture(e.pointerId); knob.style.transition = ''; });
    knob.addEventListener('pointermove', function (e) { if (start === null) return; place(clamp(x0 + (e.clientX - start) / k(track), 3, max())); });
    function end() { if (start === null) return; start = null; if (cur >= max() - 4) { place(max()); unlock(); } else { knob.style.transition = 'left .3s'; place(3); setTimeout(function () { knob.style.transition = ''; }, 320); } }
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); place(max()); unlock(); } });
  })();

  /* ---------- Puxar para atualizar ---------- */
  (function () {
    var t = $('ptr'), list = $('ptrList'), spin = $('ptrSpin'), arrow = $('ptrA'), lab = $('ptrL'), y0 = null, moved = false, busy = false, h = 0;
    var items = [['#f97316', 'Ana', 'Orange cake just joined the menu'], ['#0ea5e9', 'Atlas Coffee', 'Tomorrow we open at 7 AM'], ['#22c55e', 'Léo', 'Has anyone seen my umbrella?'], ['#a855f7', 'Bia', 'Afternoon playlist: jazz']];
    var pool = [['#ef4444', 'Rui', 'Two espressos for the price of one'], ['#14b8a6', 'Mia', 'The Wi-Fi password changed'], ['#eab308', 'Caio', 'Line of 3 people right now'], ['#6366f1', 'Nina', 'Fresh coffee from southern Minas Gerais']], pi = 0;
    function draw() { list.innerHTML = items.slice(0, 5).map(function (it) { return '<div class="ptr-item"><i style="background:' + it[0] + '"></i><div><b>' + it[1] + '</b><br>' + it[2] + '</div></div>'; }).join(''); }
    function setH(v) { h = v; spin.style.height = v + 'px'; arrow.style.transform = v > 30 ? 'rotate(180deg)' : 'none'; lab.textContent = v > 30 ? 'release to refresh' : 'pull to refresh'; }
    function refresh() {
      if (busy) return; busy = true; spin.style.transition = 'height .2s'; setH(32);
      arrow.textContent = '⟳'; arrow.style.transform = 'none'; lab.textContent = 'refreshing…';
      if (!reduce) arrow.style.animation = 'spin .8s linear infinite';
      setTimeout(function () {
        items.unshift(pool[pi++ % pool.length]); draw();
        arrow.style.animation = ''; arrow.textContent = '↓'; setH(0); busy = false;
        setTimeout(function () { spin.style.transition = ''; }, 220);
        if (!reduce && list.firstChild && list.firstChild.animate) list.firstChild.animate([{ background: '#fff7d6' }, { background: '#fff' }], { duration: 900 });
      }, 900);
    }
    t.addEventListener('pointerdown', function (e) { if (busy) return; y0 = e.clientY; moved = false; t.setPointerCapture(e.pointerId); });
    t.addEventListener('pointermove', function (e) { if (y0 === null) return; var dy = (e.clientY - y0) / k(t); if (Math.abs(dy) > 4) moved = true; if (dy > 0) setH(Math.min(44, dy * 0.5)); });
    function up() { if (y0 === null) return; y0 = null; if (!moved || h > 30) refresh(); else { spin.style.transition = 'height .2s'; setH(0); setTimeout(function () { spin.style.transition = ''; }, 220); } }
    t.addEventListener('pointerup', up); t.addEventListener('pointercancel', up);
    draw();
  })();

  /* ---------- Roda do iPod ---------- */
  (function () {
    var wheel = $('wheel'), center = $('wheelC'), L = $('ipodL'), items = ['Songs', 'Albums', 'Artists', 'Podcasts', 'Settings'], sel = 0, a0 = null, acc = 0, playing = null;
    function draw() {
      L.innerHTML = playing ? '<div style="padding:6px 5px;color:#222">▶ Now playing<br><b>' + playing + '</b></div>' :
        (function () { var st = clamp(sel - 1, 0, items.length - 3); return items.slice(st, st + 3).map(function (t, j) { var i = st + j; return '<div style="padding:1px 5px;display:flex;justify-content:space-between;' + (i === sel ? 'background:#3a6ea5;color:#fff' : 'color:#222') + '">' + t + '<span>›</span></div>'; }).join(''); })();
      wheel.setAttribute('aria-valuenow', sel);
    }
    function ang(e) { var r = wheel.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
    wheel.addEventListener('pointerdown', function (e) { if (e.target === center) return; a0 = ang(e); acc = 0; wheel.setPointerCapture(e.pointerId); playing = null; });
    wheel.addEventListener('pointermove', function (e) {
      if (a0 === null) return; var a = ang(e), d = a - a0; if (d > 180) d -= 360; if (d < -180) d += 360; a0 = a; acc += d;
      while (acc > 28) { acc -= 28; sel = Math.min(items.length - 1, sel + 1); draw(); }
      while (acc < -28) { acc += 28; sel = Math.max(0, sel - 1); draw(); }
    });
    ['pointerup', 'pointercancel'].forEach(function (ev) { wheel.addEventListener(ev, function () { a0 = null; }); });
    wheel.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); sel = Math.min(items.length - 1, sel + 1); playing = null; draw(); } if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); sel = Math.max(0, sel - 1); playing = null; draw(); } });
    act(center, function (e) { e.stopPropagation(); playing = playing ? null : items[sel]; draw(); });
    draw();
  })();

  /* ---------- Cartas para deslizar ---------- */
  (function () {
    var deck = $('swpDeck'), data = [['Light comedy', '1h35 · rated 4.2', '#fde68a'], ['Documentary', '52 min · rated 4.6', '#bfdbfe'], ['Thriller', '2h10 · rated 3.9', '#fecaca'], ['Animation', '1h40 · rated 4.8', '#bbf7d0'], ['Drama', '2h05 · rated 4.1', '#e9d5ff']], i = 0, liked = 0, top = null;
    function card(d) { return A.el('<div class="swc"><div style="position:absolute;left:0;right:0;top:0;height:58%;background:' + d[2] + '"></div><span class="lab y" style="left:10px;color:#16a34a;border-color:#16a34a;transform:rotate(-12deg)">LIKE</span><span class="lab n" style="right:10px;color:#e11d48;border-color:#e11d48;transform:rotate(12deg)">PASS</span><b style="position:relative;font-size:12px;color:#111">' + d[0] + '</b><span style="position:relative;font-size:9px;color:#666">' + d[1] + '</span></div>'); }
    function render() {
      deck.innerHTML = '';
      if (i >= data.length) { deck.appendChild(A.el('<div class="swc" style="align-items:center;justify-content:center;text-align:center;font-size:11px;color:#333;cursor:pointer">Done! You liked ' + liked + ' of ' + data.length + '.<br><small style="color:#888">tap to start over</small></div>')); deck.firstChild.addEventListener('click', function () { i = 0; liked = 0; render(); }); top = null; return; }
      if (data[i + 1]) { var b = card(data[i + 1]); b.style.transform = 'scale(.94) translateY(6px)'; deck.appendChild(b); }
      top = card(data[i]); deck.appendChild(top); bind(top);
    }
    function fly(dir) {
      if (!top) return; var c = top; top = null;
      if (dir > 0) liked++;
      c.style.transition = 'transform .35s ease, opacity .35s'; c.style.transform = 'translateX(' + dir * 260 + 'px) rotate(' + dir * 25 + 'deg)'; c.style.opacity = 0;
      setTimeout(function () { i++; render(); }, reduce ? 0 : 300);
    }
    function bind(c) {
      var x0 = null, dx = 0, yl = c.querySelector('.lab.y'), nl = c.querySelector('.lab.n');
      c.addEventListener('pointerdown', function (e) { x0 = e.clientX; c.setPointerCapture(e.pointerId); c.style.transition = ''; });
      c.addEventListener('pointermove', function (e) { if (x0 === null) return; dx = (e.clientX - x0) / k(deck); c.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 10 + 'deg)'; yl.style.opacity = clamp(dx / 60, 0, 1); nl.style.opacity = clamp(-dx / 60, 0, 1); });
      function up() { if (x0 === null) return; x0 = null; if (Math.abs(dx) > 55) fly(dx > 0 ? 1 : -1); else { c.style.transition = 'transform .25s'; c.style.transform = 'none'; yl.style.opacity = 0; nl.style.opacity = 0; } dx = 0; }
      c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
    }
    act($('swpN'), function () { fly(-1); }); act($('swpY'), function () { fly(1); });
    render();
  })();

  /* ---------- Stories ---------- */
  (function () {
    var t = $('sty'), bg = $('styBg'), txt = $('styTxt'), bars = $('styBars');
    var S = [['#f97316', '#ef4444', 'New on the menu: orange cold brew'], ['#0ea5e9', '#6366f1', 'Live jazz on Friday at 7 PM'], ['#22c55e', '#14b8a6', 'Bring your own cup and get 10% off'], ['#a855f7', '#ec4899', 'Thanks for another year!']], i = 0, p = 0;
    bars.innerHTML = S.map(function () { return '<div style="flex:1;height:2px;background:rgba(255,255,255,.4);border-radius:2px;overflow:hidden"><i style="display:block;height:100%;width:0;background:#fff"></i></div>'; }).join('');
    function draw() {
      bg.style.background = 'linear-gradient(160deg,' + S[i][0] + ',' + S[i][1] + ')'; txt.textContent = S[i][2];
      Array.prototype.forEach.call(bars.children, function (b, j) { b.firstChild.style.width = (j < i ? 100 : j > i ? 0 : p) + '%'; });
    }
    function go(d) { i = (i + d + S.length) % S.length; p = 0; draw(); }
    t.addEventListener('click', function (e) { var x = local(t, e).x; go(x > t.offsetWidth / 2 ? 1 : -1); });
    t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') go(-1); });
    if (!reduce) setInterval(function () { p += 2; if (p >= 100) go(1); else draw(); }, 60);
    draw();
  })();

  /* ---------- Graffiti ---------- */
  (function () {
    var svg = $('grafSvg'), out = $('grafOut'), word = 'ATLAS', n = 0, busy = false;
    var P = { A: 'M25 70 L50 10 L75 70', T: 'M22 14 L56 14 L56 70', L: 'M38 10 L38 68 L74 68', S: 'M72 18 C 40 0, 18 26, 48 40 S 72 76, 26 66' };
    function write() {
      if (busy) return;
      if (n >= word.length) { n = 0; out.textContent = '_'; svg.innerHTML = ''; return; }
      busy = true; var ch = word[n];
      svg.innerHTML = '<path d="' + P[ch] + '" fill="none" stroke="#1b2414" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
      var path = svg.querySelector('path'), len = path.getTotalLength();
      path.style.strokeDasharray = len; path.style.strokeDashoffset = reduce ? 0 : len;
      if (!reduce) { path.getBoundingClientRect(); path.style.transition = 'stroke-dashoffset .6s ease'; path.style.strokeDashoffset = 0; }
      setTimeout(function () { n++; out.textContent = word.slice(0, n) + (n < word.length ? '_' : ''); busy = false; }, reduce ? 0 : 650);
    }
    act($('graf'), write);
  })();

  /* ---------- Menu hambúrguer ---------- */
  (function () {
    var b = $('hambB'), d = $('hambD');
    function set(o) { b.classList.toggle('open', o); b.setAttribute('aria-expanded', o ? 'true' : 'false'); b.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); d.style.transform = o ? 'none' : 'translateX(-102%)'; }
    act(b, function () { set(!b.classList.contains('open')); });
    Array.prototype.forEach.call(d.children, function (it) { it.style.cursor = 'pointer'; it.addEventListener('click', function () { Array.prototype.forEach.call(d.children, function (x) { x.style.fontWeight = x === it ? '700' : '400'; }); setTimeout(function () { set(false); }, 250); }); });
  })();

  /* ---------- Cartões do webOS ---------- */
  (function () {
    var row = $('wosRow'), msg = $('wosMsg'), apps = [['E-mail', '#2563eb'], ['Maps', '#16a34a'], ['Music', '#db2777']], open = [];
    function render() {
      row.innerHTML = '';
      if (!open.length) { msg.textContent = 'all closed · tap to reopen'; return; }
      msg.textContent = 'drag a card up to close it';
      open.forEach(function (a) {
        var c = A.el('<div class="wcard" role="button" tabindex="0" aria-label="Card ' + a[0] + '"><b style="background:' + a[1] + '">' + a[0] + '</b><i></i><i style="flex:.6"></i></div>');
        var y0 = null, dy = 0, big = false;
        c.addEventListener('pointerdown', function (e) { y0 = e.clientY; dy = 0; c.setPointerCapture(e.pointerId); c.style.transition = 'none'; });
        c.addEventListener('pointermove', function (e) { if (y0 === null) return; dy = Math.min(0, (e.clientY - y0) / k(row)); c.style.transform = 'translateY(' + dy + 'px)'; c.style.opacity = 1 + dy / 120; });
        function up() {
          if (y0 === null) return; y0 = null; c.style.transition = '';
          if (dy < -40) { c.style.transform = 'translateY(-160px)'; c.style.opacity = 0; setTimeout(function () { open = open.filter(function (x) { return x !== a; }); render(); }, reduce ? 0 : 280); }
          else if (Math.abs(dy) < 4) { big = !big; c.style.transform = big ? 'scale(1.9)' : 'none'; c.style.zIndex = big ? 3 : ''; c.style.opacity = 1; }
          else { c.style.transform = 'none'; c.style.opacity = 1; }
        }
        c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
        c.addEventListener('keydown', function (e) { if (e.key === 'ArrowUp' || e.key === 'Delete') { open = open.filter(function (x) { return x !== a; }); render(); } });
        row.appendChild(c);
      });
    }
    $('wos').addEventListener('click', function (e) { if (!open.length) { open = apps.slice(); render(); } });
    open = apps.slice(); render();
  })();

  /* ---------- Cross Media Bar ---------- */
  (function () {
    var cats = [['◐', 'Photos', ['Trip 2025', 'Birthday', 'Recipes']], ['♫', 'Music', ['Afternoon jazz', 'Bossa nova', 'Lo-fi']], ['▶', 'Video', ['Documentaries', 'Movies', 'Series']], ['◆', 'Games', ['Racing', 'Puzzle', 'Platformer']], ['⚙', 'Settings', ['Display', 'Sound', 'Network']]], ci = 1, ii = 0;
    var C = $('xmbCats'), I = $('xmbItems'), X = 52;
    $('xmbClock').textContent = hhmm();
    function draw() {
      C.innerHTML = ''; cats.forEach(function (c, i) {
        var d = A.el('<div class="xc' + (i === ci ? ' on' : '') + '" role="button" tabindex="0" aria-label="' + c[1] + '" style="left:' + (X + (i - ci) * 40 - 15) + 'px;opacity:' + (i === ci ? 1 : .6) + '">' + c[0] + '<span>' + c[1] + '</span></div>');
        act(d, function () { ci = i; ii = 0; draw(); }); C.appendChild(d);
      });
      I.style.left = (X - 10) + 'px'; I.innerHTML = '';
      cats[ci][2].forEach(function (t, j) { var d = A.el('<div class="xi' + (j === ii ? ' on' : '') + '" role="button" tabindex="0">' + t + '</div>'); act(d, function () { ii = j; draw(); }); I.appendChild(d); });
    }
    draw();
  })();

  /* ---------- Telas de esqueleto ---------- */
  (function () {
    var box = $('skelIn'), tm = null;
    var sk = '<div style="display:flex;gap:8px;align-items:center"><div class="sk" style="width:30px;height:30px;border-radius:50%"></div><div style="flex:1;display:flex;flex-direction:column;gap:5px"><div class="sk" style="height:8px;width:60%"></div><div class="sk" style="height:6px;width:40%"></div></div></div><div class="sk" style="height:56px;margin-top:10px;border-radius:8px"></div><div class="sk" style="height:7px;width:80%;margin-top:8px"></div>';
    var real = '<div style="display:flex;gap:8px;align-items:center"><div style="width:30px;height:30px;border-radius:50%;background:#7c2d12;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px">☕</div><div><div style="font-size:11px;font-weight:700;color:#111">Atlas Coffee</div><div style="font-size:8px;color:#16a34a">Open now · 300 m</div></div></div><div style="height:56px;margin-top:10px;border-radius:8px;background:linear-gradient(135deg,#fcd34d,#f97316);display:flex;align-items:flex-end;padding:6px;font-size:9px;color:#fff;font-weight:700">Orange cold brew</div><div style="font-size:8px;color:#555;margin-top:8px">Rated 4.8 · 312 reviews</div>';
    function load() { clearTimeout(tm); box.innerHTML = sk; tm = setTimeout(function () { box.innerHTML = real; if (!reduce && box.animate) box.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 }); }, 1200); }
    act($('skel'), load); load();
  })();

  /* ---------- Cursores multiplayer ---------- */
  (function () {
    var t = $('mcur'), c1 = $('mc1'), c2 = $('mc2'), notes = $('mcurNotes'), msgs = ['nice idea!', 'what if it were blue?', 'approved', 'review this'], ni = 0;
    function mv(c) { c.style.transform = 'translate(' + Math.round(10 + Math.random() * 150) + 'px,' + Math.round(10 + Math.random() * 110) + 'px)'; }
    mv(c1); mv(c2);
    if (!reduce) { setInterval(function () { mv(c1); }, 1600); setInterval(function () { mv(c2); }, 2100); }
    t.addEventListener('click', function (e) {
      var p = local(t, e), n = A.el('<div class="mnote" style="left:' + clamp(p.x - 15, 2, 166) + 'px;top:' + clamp(p.y - 12, 2, 132) + 'px">' + msgs[ni++ % msgs.length] + '<br><b>you</b></div>');
      notes.appendChild(n); while (notes.children.length > 4) notes.removeChild(notes.firstChild);
    });
  })();

  /* ---------- Dynamic Island ---------- */
  (function () {
    var p = $('islP'), st = 0, sec = 299, call = 0;
    function draw() {
      var S = [
        ['70px', '20px', '999px', ''],
        ['150px', '24px', '999px', '<span style="color:#fb923c">◷ Timer</span><b style="font-variant-numeric:tabular-nums">' + Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2) + '</b>'],
        ['176px', '58px', '24px', '<div style="display:flex;gap:6px;align-items:center"><span style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#f97316,#db2777);display:block"></span><div><b style="font-size:9px">Afternoon jazz</b><br><span style="font-size:8px;opacity:.7">Atlas Coffee</span></div></div><div class="bars"><i style="height:6px"></i><i style="height:12px;animation-delay:.1s"></i><i style="height:8px;animation-delay:.2s"></i><i style="height:11px;animation-delay:.3s"></i></div>'],
        ['150px', '24px', '999px', '<span style="color:#4ade80">● Ana</span><b style="font-variant-numeric:tabular-nums">0:' + ('0' + call).slice(-2) + '</b>']
      ][st];
      p.style.width = S[0]; p.style.height = S[1]; p.style.borderRadius = S[2]; p.innerHTML = S[3];
    }
    act($('isl'), function () { st = (st + 1) % 4; draw(); });
    setInterval(function () { if (st === 1) { sec = sec > 0 ? sec - 1 : 299; draw(); } if (st === 3) { call = (call + 1) % 60; draw(); } }, 1000);
    draw();
  })();

  /* ---------- Padrões obscuros ---------- */
  (function () {
    var tip = $('dpTip');
    function say(t) { tip.textContent = t; tip.style.opacity = 1; }
    $('dpY').addEventListener('click', function () { say('A huge, colorful button just for “yes”.'); });
    act($('dpN'), function () { say('Confirmshaming: the refusal was written to shame you.'); });
    $('dpC').addEventListener('change', function () { say('Pre-checked box: consent you never gave.'); });
  })();

  /* ---------- User Inyerface ---------- */
  (function () {
    var t = $('iny'), b = $('inyB'), msg = $('inyMsg'), tries = 0;
    function flee() {
      tries++;
      if (tries >= 5) { msg.textContent = 'Fine, you win. Go ahead and click.'; return false; }
      b.style.left = Math.round(10 + Math.random() * 120) + 'px'; b.style.top = Math.round(60 + Math.random() * 70) + 'px';
      msg.textContent = ['Almost!', 'Oops.', 'Try again.', 'One more time?'][tries - 1] || '';
      return true;
    }
    t.addEventListener('pointermove', function (e) {
      if (tries >= 5 || e.pointerType !== 'mouse') return;
      var p = local(t, e), bx = b.offsetLeft + b.offsetWidth / 2, by = b.offsetTop + b.offsetHeight / 2;
      if (Math.hypot(p.x - bx, p.y - by) < 28) flee();
    });
    b.addEventListener('pointerdown', function (e) { if (tries < 5 && e.pointerType !== 'mouse') { e.preventDefault(); flee(); } });
    b.addEventListener('click', function () { if (tries >= 5) msg.textContent = 'Account created. Or not.'; });
    $('inyF').addEventListener('focus', function () { msg.textContent = 'The example text is real. Delete it yourself.'; });
    $('inyC').addEventListener('change', function () { msg.textContent = 'Checked means you do NOT accept.'; });
  })();

  /* ---------- Páginas pessoais dos anos 90 ---------- */
  (function () {
    var n = 4217, box = $('geoN');
    function draw() { box.innerHTML = ('000000' + n).slice(-6).split('').map(function (d) { return '<span class="geod">' + d + '</span>'; }).join(''); }
    act($('geo'), function () { n++; draw(); });
    draw();
  })();

  /* ---------- Rastro do cursor ---------- */
  (function () {
    var t = $('trail'), ch = ['✦', '✧', '★', '·'], last = 0;
    function spark(x, y) {
      var s = document.createElement('span'); s.className = 'spark'; s.textContent = ch[Math.floor(Math.random() * ch.length)];
      s.style.left = x + 'px'; s.style.top = y + 'px'; s.style.color = 'hsl(' + Math.floor(Math.random() * 360) + ',90%,75%)';
      t.appendChild(s);
      var anim = reduce ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 1, transform: 'translate(0,0) scale(1)' }, { opacity: 0, transform: 'translate(' + (Math.random() * 16 - 8) + 'px,' + (10 + Math.random() * 14) + 'px) scale(.4)' }];
      if (s.animate) s.animate(anim, { duration: 700, easing: 'ease-out' });
      setTimeout(function () { s.remove(); }, 700);
    }
    t.addEventListener('pointermove', function (e) { var now = Date.now(); if (now - last < 25) return; last = now; var p = local(t, e); spark(p.x, p.y); });
    t.addEventListener('pointerdown', function (e) { var p = local(t, e); for (var i = 0; i < 8; i++) spark(p.x + Math.random() * 20 - 10, p.y + Math.random() * 20 - 10); });
  })();

  /* ---------- Rolagem sequestrada ---------- */
  (function () {
    var t = $('sjk'), row = $('sjkRow'), bar = $('sjkBar'), P = [['Fast.', 'new processor', '#111'], ['Light.', '1.2 kg', '#1e3a8a'], ['Beautiful.', 'recycled aluminum', '#7c2d12'], ['Expensive.', 'starting at a lot', '#14532d']], i = 0, lock = false, acc = 0;
    row.innerHTML = P.map(function (p) { return '<div class="sjp" style="background:' + p[2] + '"><b>' + p[0] + '</b><span>' + p[1] + '</span></div>'; }).join('');
    function go(n) { i = clamp(n, 0, P.length - 1); row.style.transform = 'translateX(' + (-100 * i) + '%)'; bar.style.width = ((i + 1) / P.length * 100) + '%'; }
    t.addEventListener('wheel', function (e) {
      var d = e.deltaY;
      if ((d > 0 && i === P.length - 1) || (d < 0 && i === 0)) return; /* nas pontas, devolve a rolagem à página */
      e.preventDefault(); if (lock) return; acc += d;
      if (Math.abs(acc) > 40) { go(i + (acc > 0 ? 1 : -1)); acc = 0; lock = true; setTimeout(function () { lock = false; }, 550); }
    }, { passive: false });
    act(t, function () { go(i === P.length - 1 ? 0 : i + 1); });
  })();

  /* ---------- Interfaces de cinema ---------- */
  (function () {
    var box = $('fuiP'), N = 5, panels = [];
    for (var i = 0; i < N; i++) {
      var p = A.el('<div class="fp">NODE 0x' + (0xa3 + i * 17).toString(16).toUpperCase() + '<i style="width:' + (40 + i * 10) + '%"></i><i style="width:' + (80 - i * 9) + '%"></i><i style="width:' + (55 + i * 6) + '%"></i></div>');
      box.appendChild(p); panels.push(p);
    }
    function shuffle() {
      panels.forEach(function (p) {
        p.style.left = Math.round(8 + Math.random() * 120) + 'px'; p.style.top = Math.round(8 + Math.random() * 100) + 'px';
        p.style.transform = 'rotateY(' + Math.round(Math.random() * 60 - 30) + 'deg) rotateX(' + Math.round(Math.random() * 20 - 10) + 'deg) translateZ(' + Math.round(Math.random() * 40) + 'px)';
      });
    }
    act($('fui'), shuffle); shuffle();
  })();
})();
