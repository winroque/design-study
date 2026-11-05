(function () {
  var A = window.Atlas, esc = A.esc, el = A.el;
  var pool = ['Mocha', 'Cold brew', 'Yerba mate', 'Flat white', 'Matcha latte', 'Hot chocolate', 'Espresso', 'Cheese bread'];
  var order = ['Queued', 'Ready', 'Late'];
  var R4 = [['Cappuccino', 'Ready'], ['Oat latte', 'Queued'], ['Double espresso', 'Late'], ['Cold brew', 'Queued']];
  var R3 = R4.slice(0, 3), R2 = R4.slice(0, 2);

  var systems = [
    { g: 'plat', n: 'Material 3 Expressive', d: 'Google · Android, Wear OS', x: 'Shapes that morph, dynamic color from the wallpaper, big buttons. The button turns square when touched.', use: 'Consumer Android apps',
      bg: 'background:#fef7ff', head: '<div style="font-size:22px;color:#1d1b20">Orders</div>',
      box: 'background:#f3edf7;border-radius:18px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#1d1b20;padding:2px 0', trow: 'color:#1d1b20',
      cb: 'border-radius:999px;padding:2px 9px;font-size:11px', chip: { Ready: 'background:#e8def8;color:#4a4458', 'Queued': 'background:#ece6f0;color:#49454f', Late: 'background:#f9dedc;color:#8c1d18' },
      on: '#6750a4', off: '#e6e0e9', btn: 'background:#6750a4;color:#fff;border-radius:999px;padding:13px;font-size:14px;width:100%;margin-top:auto', btnDown: 'border-radius:14px;', init: R2 },
    { g: 'plat', n: 'Liquid Glass (HIG)', d: 'Apple · iOS, macOS, visionOS', x: 'Glass that refracts the content; adjustable transparency since iOS 27. The button grows under your finger.', use: 'iPhone, iPad and Mac apps',
      bg: 'background:linear-gradient(160deg,#2d4a6b,#7a5a8c 55%,#d08a6a)', head: '<div style="font-size:22px;color:#fff;font-weight:600">Orders</div>',
      box: 'background:rgba(255,255,255,.2);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.35);border-radius:22px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#fff;padding:2px 0', trow: 'color:#fff',
      cb: 'border-radius:999px;padding:2px 9px;font-size:11px;color:#fff', chip: { Ready: 'background:rgba(52,199,89,.5)', 'Queued': 'background:rgba(255,255,255,.25)', Late: 'background:rgba(255,69,58,.6)' },
      on: '#34c759', off: 'rgba(255,255,255,.3)', btn: 'background:rgba(10,132,255,.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:999px;padding:12px;font-size:14px;width:100%;margin-top:auto', btnDown: 'transform:scale(1.05);background:rgba(10,132,255,.8);', init: R2 },
    { g: 'plat', n: 'One UI', d: 'Samsung · Galaxy', x: 'A huge title at the top and content pushed down, within reach of the thumb.', use: 'The interface most Brazilians see on Android',
      bg: 'background:#f6f6f6', head: '<div style="font-size:26px;color:#000;margin:22px 0 10px 4px">Orders</div>',
      box: 'background:#fff;border-radius:24px;padding:10px 14px;display:flex;flex-direction:column;gap:10px;min-height:0', rowsGap: '10px', row: 'color:#000', trow: 'color:#000',
      cb: 'font-size:11px', chip: { Ready: 'color:#3e91ff', 'Queued': 'color:#8a8a8a', Late: 'color:#e5484d;font-weight:600' },
      on: '#3e91ff', off: '#d2d2d2', btn: 'background:#3e91ff;color:#fff;border-radius:999px;padding:10px;font-size:13px;width:100%;margin-top:auto', btnDown: 'background:#2f76d6;', init: R2 },
    { g: 'plat', n: 'Fluent 2', d: 'Microsoft · Windows, Office, Teams', x: 'Sober, 4 to 8 px corners; serves everything from Excel to Windows.', use: 'Corporate apps in the Microsoft ecosystem', flat: true,
      bg: 'background:#fafafa', head: '<div style="font-size:16px;color:#242424;font-weight:600">Orders</div>',
      box: 'background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:8px;display:flex;flex-direction:column;gap:7px;min-height:0', rowsGap: '7px', row: 'color:#242424', trow: 'color:#242424',
      cb: 'border-radius:4px;padding:1px 6px;font-size:11px', chip: { Ready: 'background:#f1faf1;color:#0e700e;border:1px solid #9fd89f', 'Queued': 'background:#f5f5f5;color:#424242;border:1px solid #d1d1d1', Late: 'background:#fdf3f4;color:#b10e1c;border:1px solid #eeacb2' },
      on: '#0f6cbd', off: '#c7c7c7', tgSize: 'width:28px;height:14px;--ts:10px', btn: 'background:#0f6cbd;color:#fff;border-radius:4px;padding:6px 12px;font-size:12px;align-self:flex-start;margin-top:auto', btnDown: 'background:#0c3b5e;', init: R4 },
    { g: 'plat', n: 'Carbon', d: 'IBM · enterprise software', x: 'Rectangular and dense; made for screens full of data.', use: 'Professional software and data-dense screens', lab: 'labs/carbon.html', flat: true,
      bg: 'background:#fff;padding:0;gap:0', head: '<div style="font-size:14px;color:#161616;padding:10px 12px;border-bottom:1px solid #e0e0e0">Orders</div>',
      box: 'display:flex;flex-direction:column;min-height:0', rowsGap: '0', row: 'color:#161616;padding:8px 12px;border-bottom:1px solid #e0e0e0', trow: 'color:#161616;padding:8px 12px;border-bottom:1px solid #e0e0e0',
      cb: 'border-radius:999px;padding:1px 8px;font-size:11px', chip: { Ready: 'background:#a7f0ba;color:#0e6027', 'Queued': 'background:#e0e0e0;color:#161616', Late: 'background:#ffd7d9;color:#a2191f' },
      on: '#24a148', off: '#8d8d8d', btn: 'background:#0f62fe;color:#fff;padding:11px 12px;font-size:12px;display:flex;justify-content:space-between;width:100%;margin-top:auto', btnDown: 'background:#002d9c;', btnText: 'New order<span>+</span>', init: R4 },
    { g: 'plat', n: 'Padrão Digital gov.br', d: 'Brazilian federal government · public services', x: 'A blue pill and a focus on accessibility; mandatory across federal services.', use: 'Brazilian public services', flat: true,
      bg: 'background:#fff;padding:0;gap:0', head: '<div style="border-bottom:4px solid #1351b4;padding:10px 12px;color:#1351b4;font-weight:600;font-size:14px">≡ Orders</div>',
      box: 'padding:10px 12px 0;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#333;border-bottom:1px solid #ededed;padding-bottom:8px', trow: 'color:#333',
      cb: 'border-radius:999px;padding:1px 8px;font-size:11px', chip: { Ready: 'background:#168821;color:#fff', 'Queued': 'background:#ededed;color:#333', Late: 'background:#e52207;color:#fff' },
      on: '#1351b4', off: '#888', btn: 'margin:auto 12px 12px;background:#1351b4;color:#fff;border-radius:999px;padding:10px;font-size:13px;font-weight:600', btnDown: 'background:#0c326f;', init: R3 },

    { g: 'libs', n: 'Mantine', d: 'Community · React', star: true, x: 'Clean and neutral, uppercase badges and an ecosystem that ships with forms, dates, charts and notifications.', use: 'Internal tools and dashboards in React', lab: 'labs/mantine.html',
      bg: 'background:#fff', head: '<div style="font-size:18px;font-weight:700;color:#000">Orders</div>',
      box: 'border:1px solid #dee2e6;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#000', trow: 'color:#000',
      cb: 'border-radius:32px;padding:1px 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.02em', chip: { Ready: 'background:rgba(64,192,87,.1);color:#2f9e44', 'Queued': 'background:rgba(34,139,230,.1);color:#1c7ed6', Late: 'background:rgba(250,82,82,.1);color:#e03131' },
      on: '#228be6', off: '#e9ecef', btn: 'background:#228be6;color:#fff;border-radius:8px;padding:9px;font-size:13px;font-weight:600;width:100%;margin-top:auto', btnDown: 'background:#1c7ed6;transform:translateY(1px);', init: R3 },
    { g: 'libs', n: 'Chakra UI 3', d: 'Community · React, built on Ark UI', x: 'Neutral and configurable through colorPalette, here in the teal palette. Composable, accessible components.', use: 'Your own design system with an accessible base',
      bg: 'background:#fff', head: '<div style="font-size:18px;font-weight:600;color:#18181b">Orders</div>',
      box: 'border:1px solid #e4e4e7;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#18181b', trow: 'color:#18181b',
      cb: 'border-radius:4px;padding:1px 7px;font-size:11px;font-weight:500', chip: { Ready: 'background:#ccfbef;color:#0d5d56', 'Queued': 'background:#f4f4f5;color:#3f3f46', Late: 'background:#fee2e2;color:#991919' },
      on: '#0d9488', off: '#e4e4e7', btn: 'background:#0d9488;color:#fff;border-radius:6px;padding:9px;font-size:13px;font-weight:600;width:100%;margin-top:auto', btnDown: 'background:#115e59;', init: R3 },
    { g: 'libs', n: 'shadcn/ui + Tailwind', d: 'Community · web, SaaS, AI apps', x: 'Minimalism in zinc and black; the code is copied into your project.', use: 'SaaS, and anyone who wants full control of the code',
      bg: 'background:#fff', head: '<div style="font-size:16px;color:#09090b;font-weight:600">Orders</div>',
      box: 'border:1px solid #e4e4e7;border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:7px;min-height:0', rowsGap: '7px', row: 'color:#09090b', trow: 'color:#09090b',
      cb: 'border-radius:6px;padding:1px 6px;font-size:11px', chip: { Ready: 'border:1px solid #e4e4e7;color:#09090b', 'Queued': 'background:#f4f4f5;color:#71717a', Late: 'background:#ef4444;color:#fff' },
      on: '#18181b', off: '#e4e4e7', btn: 'background:#18181b;color:#fafafa;border-radius:6px;padding:9px;font-size:12px;width:100%;margin-top:auto', btnDown: 'background:#3f3f46;', init: R3 },
    { g: 'libs', n: 'Ant Design', d: 'Alibaba · admin panels', x: 'Tables, filters and forms in abundance; the ERP standard.', use: 'ERP, back office and admin panels', flat: true,
      bg: 'background:#f5f5f5', head: '<div style="display:flex;gap:6px"><div style="flex:1;background:#fff;border:1px solid #d9d9d9;border-radius:6px;padding:5px 8px;font-size:12px;color:#bfbfbf">Search orders</div><span style="background:#1677ff;color:#fff;border-radius:6px;padding:5px 10px;font-size:12px">Search</span></div>',
      box: 'background:#fff;border-radius:8px;display:flex;flex-direction:column;min-height:0;overflow:hidden', boxHead: '<div class="trow" style="background:#fafafa;color:#000;padding:6px 10px;font-weight:600;border-bottom:1px solid #f0f0f0">Order<span>Status</span></div>', rowsGap: '0', row: 'color:#000;padding:6px 10px;border-bottom:1px solid #f0f0f0', trow: 'color:#000;padding:6px 10px',
      cb: 'border-radius:4px;padding:0 6px;font-size:11px', chip: { Ready: 'color:#389e0d;background:#f6ffed;border:1px solid #b7eb8f', 'Queued': 'color:#d46b08;background:#fff7e6;border:1px solid #ffd591', Late: 'color:#cf1322;background:#fff1f0;border:1px solid #ffa39e' },
      on: '#1677ff', off: '#bfbfbf', tgSize: 'width:28px;height:16px', btn: 'background:#1677ff;color:#fff;border-radius:6px;padding:6px 12px;font-size:12px;align-self:flex-end;margin-top:auto', btnDown: 'background:#0958d9;', init: R4 }
  ];

  function rowHTML(cfg, name, st) {
    return '<button type="button" class="row" style="' + cfg.row + '" aria-label="' + esc(name) + ', status ' + st + '. Tap to change"><span>' + esc(name) + '</span><span class="chip" style="' + cfg.cb + ';' + cfg.chip[st] + '">' + st + '</span></button>';
  }

  systems.forEach(function (cfg, si) {
    var rows = cfg.init.map(function (r) { return rowHTML(cfg, r[0], r[1]); }).join('');
    var html = '<article class="sys' + (cfg.star ? ' star' : '') + '"><div class="stage"><div class="screen' + (cfg.flat ? ' flat' : '') + '" style="' + cfg.bg + '">' + cfg.head +
      '<div class="box" style="' + cfg.box + '">' + (cfg.boxHead || '') + '<div class="rows" style="gap:' + cfg.rowsGap + '">' + rows + '</div>' +
      '<div class="trow" style="' + cfg.trow + '"><span>Alerts</span><button type="button" class="tg" role="switch" aria-checked="true" aria-label="Alerts" style="' + (cfg.tgSize || '') + ';background:' + cfg.on + '"><span class="th"></span></button></div></div>' +
      '<button type="button" class="add" style="' + cfg.btn + '">' + (cfg.btnText || 'New order') + '</button></div></div>' +
      '<div class="body">' + (cfg.star ? '<span class="star-tag">Featured</span>' : '') + '<h3>' + esc(cfg.n) + '</h3><div class="meta"><span>' + esc(cfg.d) + '</span></div><p class="idea">' + esc(cfg.x) + '</p>' +
      '<dl><dt>Use it for</dt><dd>' + esc(cfg.use) + '</dd></dl>' + (cfg.lab ? '<a class="labl" href="' + cfg.lab + '">Open the lab with real components →</a>' : '') + '</div></article>';
    var card = el(html);
    A.$(cfg.g === 'plat' ? 'gPlat' : 'gLibs').appendChild(card);
    var list = card.querySelector('.rows'), tg = card.querySelector('.tg'), add = card.querySelector('.add'), abase = add.getAttribute('style'), n = 0;
    list.addEventListener('click', function (e) {
      var r = e.target.closest('.row'); if (!r) return;
      var chip = r.querySelector('.chip'), st = chip.textContent, nx = order[(order.indexOf(st) + 1) % 3];
      chip.textContent = nx; chip.setAttribute('style', cfg.cb + ';' + cfg.chip[nx]);
      r.setAttribute('aria-label', r.firstChild.textContent + ', status ' + nx + '. Tap to change');
    });
    tg.addEventListener('click', function () {
      var on = tg.getAttribute('aria-checked') !== 'true';
      tg.setAttribute('aria-checked', on ? 'true' : 'false'); tg.style.background = on ? cfg.on : cfg.off;
    });
    add.addEventListener('pointerdown', function () { add.setAttribute('style', abase + ';' + cfg.btnDown); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { add.addEventListener(ev, function () { add.setAttribute('style', abase); }); });
    add.addEventListener('click', function () {
      var name = pool[(si + n++) % pool.length], r = el(rowHTML(cfg, name, 'Queued'));
      list.appendChild(r);
      while (list.children.length > 10) list.removeChild(list.firstChild);
      list.scrollTop = list.scrollHeight;
      if (!A.reduce && r.animate) r.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
    });
  });
})();
