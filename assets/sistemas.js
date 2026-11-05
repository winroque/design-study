(function () {
  var A = window.Atlas, esc = A.esc, el = A.el;
  var pool = ['RM de crânio', 'TC de tórax', 'US de tireoide', 'RX de tórax', 'Angio-TC', 'RM de coluna', 'US de abdome', 'TC de seios da face'];
  var order = ['Fila', 'Pronto', 'Urgente'];
  var R4 = [['TC de crânio', 'Pronto'], ['RM de joelho', 'Fila'], ['US de abdome', 'Urgente'], ['RX de tórax', 'Fila']];
  var R3 = R4.slice(0, 3), R2 = R4.slice(0, 2);

  var systems = [
    { g: 'plat', n: 'Material 3 Expressive', d: 'Google · Android, Wear OS', x: 'Formas que se transformam, cor dinâmica do papel de parede, botões grandes. O botão vira quadrado ao toque.', use: 'Apps Android para o público',
      bg: 'background:#fef7ff', head: '<div style="font-size:22px;color:#1d1b20">Exames</div>',
      box: 'background:#f3edf7;border-radius:18px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#1d1b20;padding:2px 0', trow: 'color:#1d1b20',
      cb: 'border-radius:999px;padding:2px 9px;font-size:11px', chip: { Pronto: 'background:#e8def8;color:#4a4458', Fila: 'background:#ece6f0;color:#49454f', Urgente: 'background:#f9dedc;color:#8c1d18' },
      on: '#6750a4', off: '#e6e0e9', btn: 'background:#6750a4;color:#fff;border-radius:999px;padding:13px;font-size:14px;width:100%;margin-top:auto', btnDown: 'border-radius:14px;', init: R2 },
    { g: 'plat', n: 'Liquid Glass (HIG)', d: 'Apple · iOS, macOS, visionOS', x: 'Vidro que refrata o conteúdo; transparência regulável desde o iOS 27. O botão cresce sob o dedo.', use: 'Apps de iPhone, iPad e Mac',
      bg: 'background:linear-gradient(160deg,#2d4a6b,#7a5a8c 55%,#d08a6a)', head: '<div style="font-size:22px;color:#fff;font-weight:600">Exames</div>',
      box: 'background:rgba(255,255,255,.2);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.35);border-radius:22px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#fff;padding:2px 0', trow: 'color:#fff',
      cb: 'border-radius:999px;padding:2px 9px;font-size:11px;color:#fff', chip: { Pronto: 'background:rgba(52,199,89,.5)', Fila: 'background:rgba(255,255,255,.25)', Urgente: 'background:rgba(255,69,58,.6)' },
      on: '#34c759', off: 'rgba(255,255,255,.3)', btn: 'background:rgba(10,132,255,.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:999px;padding:12px;font-size:14px;width:100%;margin-top:auto', btnDown: 'transform:scale(1.05);background:rgba(10,132,255,.8);', init: R2 },
    { g: 'plat', n: 'One UI', d: 'Samsung · Galaxy', x: 'Título enorme no topo e conteúdo empurrado para baixo, ao alcance do polegar.', use: 'A interface que a maioria dos brasileiros vê no Android',
      bg: 'background:#f6f6f6', head: '<div style="font-size:26px;color:#000;margin:22px 0 10px 4px">Exames</div>',
      box: 'background:#fff;border-radius:24px;padding:10px 14px;display:flex;flex-direction:column;gap:10px;min-height:0', rowsGap: '10px', row: 'color:#000', trow: 'color:#000',
      cb: 'font-size:11px', chip: { Pronto: 'color:#3e91ff', Fila: 'color:#8a8a8a', Urgente: 'color:#e5484d;font-weight:600' },
      on: '#3e91ff', off: '#d2d2d2', btn: 'background:#3e91ff;color:#fff;border-radius:999px;padding:10px;font-size:13px;width:100%;margin-top:auto', btnDown: 'background:#2f76d6;', init: R2 },
    { g: 'plat', n: 'Fluent 2', d: 'Microsoft · Windows, Office, Teams', x: 'Sóbrio, cantos de 4 a 8 px; serve do Excel ao Windows.', use: 'Apps corporativos no ecossistema Microsoft', flat: true,
      bg: 'background:#fafafa', head: '<div style="font-size:16px;color:#242424;font-weight:600">Exames</div>',
      box: 'background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:8px;display:flex;flex-direction:column;gap:7px;min-height:0', rowsGap: '7px', row: 'color:#242424', trow: 'color:#242424',
      cb: 'border-radius:4px;padding:1px 6px;font-size:11px', chip: { Pronto: 'background:#f1faf1;color:#0e700e;border:1px solid #9fd89f', Fila: 'background:#f5f5f5;color:#424242;border:1px solid #d1d1d1', Urgente: 'background:#fdf3f4;color:#b10e1c;border:1px solid #eeacb2' },
      on: '#0f6cbd', off: '#c7c7c7', tgSize: 'width:28px;height:14px;--ts:10px', btn: 'background:#0f6cbd;color:#fff;border-radius:4px;padding:6px 12px;font-size:12px;align-self:flex-start;margin-top:auto', btnDown: 'background:#0c3b5e;', init: R4 },
    { g: 'plat', n: 'Carbon', d: 'IBM · software corporativo', x: 'Retangular e denso; feito para telas cheias de dados.', use: 'Software profissional e clínico', lab: 'labs/carbon.html', flat: true,
      bg: 'background:#fff;padding:0;gap:0', head: '<div style="font-size:14px;color:#161616;padding:10px 12px;border-bottom:1px solid #e0e0e0">Exames</div>',
      box: 'display:flex;flex-direction:column;min-height:0', rowsGap: '0', row: 'color:#161616;padding:8px 12px;border-bottom:1px solid #e0e0e0', trow: 'color:#161616;padding:8px 12px;border-bottom:1px solid #e0e0e0',
      cb: 'border-radius:999px;padding:1px 8px;font-size:11px', chip: { Pronto: 'background:#a7f0ba;color:#0e6027', Fila: 'background:#e0e0e0;color:#161616', Urgente: 'background:#ffd7d9;color:#a2191f' },
      on: '#24a148', off: '#8d8d8d', btn: 'background:#0f62fe;color:#fff;padding:11px 12px;font-size:12px;display:flex;justify-content:space-between;width:100%;margin-top:auto', btnDown: 'background:#002d9c;', btnText: 'Novo laudo<span>+</span>', init: R4 },
    { g: 'plat', n: 'Padrão Digital gov.br', d: 'Governo Federal · serviços públicos', x: 'Pílula azul e foco em acessibilidade; obrigatório nos serviços federais.', use: 'Serviços públicos brasileiros', flat: true,
      bg: 'background:#fff;padding:0;gap:0', head: '<div style="border-bottom:4px solid #1351b4;padding:10px 12px;color:#1351b4;font-weight:600;font-size:14px">≡ Exames</div>',
      box: 'padding:10px 12px 0;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#333;border-bottom:1px solid #ededed;padding-bottom:8px', trow: 'color:#333',
      cb: 'border-radius:999px;padding:1px 8px;font-size:11px', chip: { Pronto: 'background:#168821;color:#fff', Fila: 'background:#ededed;color:#333', Urgente: 'background:#e52207;color:#fff' },
      on: '#1351b4', off: '#888', btn: 'margin:auto 12px 12px;background:#1351b4;color:#fff;border-radius:999px;padding:10px;font-size:13px;font-weight:600', btnDown: 'background:#0c326f;', init: R3 },

    { g: 'libs', n: 'Mantine', d: 'Comunidade · React', star: true, x: 'Limpo e neutro, badges em caixa alta e um ecossistema que vem com formulários, datas, gráficos e notificações.', use: 'Ferramentas internas e dashboards em React', lab: 'labs/mantine.html',
      bg: 'background:#fff', head: '<div style="font-size:18px;font-weight:700;color:#000">Exames</div>',
      box: 'border:1px solid #dee2e6;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#000', trow: 'color:#000',
      cb: 'border-radius:32px;padding:1px 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.02em', chip: { Pronto: 'background:rgba(64,192,87,.1);color:#2f9e44', Fila: 'background:rgba(34,139,230,.1);color:#1c7ed6', Urgente: 'background:rgba(250,82,82,.1);color:#e03131' },
      on: '#228be6', off: '#e9ecef', btn: 'background:#228be6;color:#fff;border-radius:8px;padding:9px;font-size:13px;font-weight:600;width:100%;margin-top:auto', btnDown: 'background:#1c7ed6;transform:translateY(1px);', init: R3 },
    { g: 'libs', n: 'Chakra UI 3', d: 'Comunidade · React, sobre Ark UI', x: 'Neutro e configurável por colorPalette, aqui na paleta teal. Componentes compostos e acessíveis.', use: 'Design system próprio com acessibilidade de base',
      bg: 'background:#fff', head: '<div style="font-size:18px;font-weight:600;color:#18181b">Exames</div>',
      box: 'border:1px solid #e4e4e7;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px;min-height:0', rowsGap: '8px', row: 'color:#18181b', trow: 'color:#18181b',
      cb: 'border-radius:4px;padding:1px 7px;font-size:11px;font-weight:500', chip: { Pronto: 'background:#ccfbef;color:#0d5d56', Fila: 'background:#f4f4f5;color:#3f3f46', Urgente: 'background:#fee2e2;color:#991919' },
      on: '#0d9488', off: '#e4e4e7', btn: 'background:#0d9488;color:#fff;border-radius:6px;padding:9px;font-size:13px;font-weight:600;width:100%;margin-top:auto', btnDown: 'background:#115e59;', init: R3 },
    { g: 'libs', n: 'shadcn/ui + Tailwind', d: 'Comunidade · web, SaaS, apps de IA', x: 'Minimalismo em zinco e preto; o código é copiado para o seu projeto.', use: 'SaaS e quem quer controle total do código',
      bg: 'background:#fff', head: '<div style="font-size:16px;color:#09090b;font-weight:600">Exames</div>',
      box: 'border:1px solid #e4e4e7;border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:7px;min-height:0', rowsGap: '7px', row: 'color:#09090b', trow: 'color:#09090b',
      cb: 'border-radius:6px;padding:1px 6px;font-size:11px', chip: { Pronto: 'border:1px solid #e4e4e7;color:#09090b', Fila: 'background:#f4f4f5;color:#71717a', Urgente: 'background:#ef4444;color:#fff' },
      on: '#18181b', off: '#e4e4e7', btn: 'background:#18181b;color:#fafafa;border-radius:6px;padding:9px;font-size:12px;width:100%;margin-top:auto', btnDown: 'background:#3f3f46;', init: R3 },
    { g: 'libs', n: 'Ant Design', d: 'Alibaba · painéis administrativos', x: 'Tabelas, filtros e formulários em profusão; padrão de ERP.', use: 'ERP, backoffice e painéis administrativos', flat: true,
      bg: 'background:#f5f5f5', head: '<div style="display:flex;gap:6px"><div style="flex:1;background:#fff;border:1px solid #d9d9d9;border-radius:6px;padding:5px 8px;font-size:12px;color:#bfbfbf">Buscar exame</div><span style="background:#1677ff;color:#fff;border-radius:6px;padding:5px 10px;font-size:12px">Buscar</span></div>',
      box: 'background:#fff;border-radius:8px;display:flex;flex-direction:column;min-height:0;overflow:hidden', boxHead: '<div class="trow" style="background:#fafafa;color:#000;padding:6px 10px;font-weight:600;border-bottom:1px solid #f0f0f0">Exame<span>Status</span></div>', rowsGap: '0', row: 'color:#000;padding:6px 10px;border-bottom:1px solid #f0f0f0', trow: 'color:#000;padding:6px 10px',
      cb: 'border-radius:4px;padding:0 6px;font-size:11px', chip: { Pronto: 'color:#389e0d;background:#f6ffed;border:1px solid #b7eb8f', Fila: 'color:#d46b08;background:#fff7e6;border:1px solid #ffd591', Urgente: 'color:#cf1322;background:#fff1f0;border:1px solid #ffa39e' },
      on: '#1677ff', off: '#bfbfbf', tgSize: 'width:28px;height:16px', btn: 'background:#1677ff;color:#fff;border-radius:6px;padding:6px 12px;font-size:12px;align-self:flex-end;margin-top:auto', btnDown: 'background:#0958d9;', init: R4 }
  ];

  function rowHTML(cfg, name, st) {
    return '<button type="button" class="row" style="' + cfg.row + '" aria-label="' + esc(name) + ', status ' + st + '. Tocar para mudar"><span>' + esc(name) + '</span><span class="chip" style="' + cfg.cb + ';' + cfg.chip[st] + '">' + st + '</span></button>';
  }

  systems.forEach(function (cfg, si) {
    var rows = cfg.init.map(function (r) { return rowHTML(cfg, r[0], r[1]); }).join('');
    var html = '<article class="sys' + (cfg.star ? ' star' : '') + '"><div class="stage"><div class="screen' + (cfg.flat ? ' flat' : '') + '" style="' + cfg.bg + '">' + cfg.head +
      '<div class="box" style="' + cfg.box + '">' + (cfg.boxHead || '') + '<div class="rows" style="gap:' + cfg.rowsGap + '">' + rows + '</div>' +
      '<div class="trow" style="' + cfg.trow + '"><span>Avisos</span><button type="button" class="tg" role="switch" aria-checked="true" aria-label="Avisos" style="' + (cfg.tgSize || '') + ';background:' + cfg.on + '"><span class="th"></span></button></div></div>' +
      '<button type="button" class="add" style="' + cfg.btn + '">' + (cfg.btnText || 'Novo laudo') + '</button></div></div>' +
      '<div class="body">' + (cfg.star ? '<span class="star-tag">Em destaque</span>' : '') + '<h3>' + esc(cfg.n) + '</h3><div class="meta"><span>' + esc(cfg.d) + '</span></div><p class="idea">' + esc(cfg.x) + '</p>' +
      '<dl><dt>Use para</dt><dd>' + esc(cfg.use) + '</dd></dl>' + (cfg.lab ? '<a class="labl" href="' + cfg.lab + '">Abrir laboratório com componentes reais →</a>' : '') + '</div></article>';
    var card = el(html);
    A.$(cfg.g === 'plat' ? 'gPlat' : 'gLibs').appendChild(card);
    var list = card.querySelector('.rows'), tg = card.querySelector('.tg'), add = card.querySelector('.add'), abase = add.getAttribute('style'), n = 0;
    list.addEventListener('click', function (e) {
      var r = e.target.closest('.row'); if (!r) return;
      var chip = r.querySelector('.chip'), st = chip.textContent, nx = order[(order.indexOf(st) + 1) % 3];
      chip.textContent = nx; chip.setAttribute('style', cfg.cb + ';' + cfg.chip[nx]);
      r.setAttribute('aria-label', r.firstChild.textContent + ', status ' + nx + '. Tocar para mudar');
    });
    tg.addEventListener('click', function () {
      var on = tg.getAttribute('aria-checked') !== 'true';
      tg.setAttribute('aria-checked', on ? 'true' : 'false'); tg.style.background = on ? cfg.on : cfg.off;
    });
    add.addEventListener('pointerdown', function () { add.setAttribute('style', abase + ';' + cfg.btnDown); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { add.addEventListener(ev, function () { add.setAttribute('style', abase); }); });
    add.addEventListener('click', function () {
      var name = pool[(si + n++) % pool.length], r = el(rowHTML(cfg, name, 'Fila'));
      list.appendChild(r);
      while (list.children.length > 10) list.removeChild(list.firstChild);
      list.scrollTop = list.scrollHeight;
      if (!A.reduce && r.animate) r.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
    });
  });
})();
