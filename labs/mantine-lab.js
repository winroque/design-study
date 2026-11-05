/* Laboratório Mantine — componentes reais do @mantine/core 9.7.5, sem build (React.createElement).
   Tema dos exemplos: pedidos de uma cafeteria fictícia. */
(function () {
  var React = window.React, M = window.Mantine;
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useMemo = React.useMemo;

  function store(k, d) { try { var v = localStorage.getItem('atlas-mantine-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem('atlas-mantine-' + k, JSON.stringify(v)); } catch (e) {} }
  function useStored(k, d) { var s = useState(function () { return store(k, d); }); useEffect(function () { save(k, s[0]); }, [s[0]]); return s; }

  function icon(d, size) {
    return h('svg', { width: size || 16, height: size || 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, [].concat(d).map(function (p, i) { return h('path', { key: i, d: p }); }));
  }
  var I = {
    search: ['M21 21l-4.3-4.3', 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z'],
    dots: ['M12 5h.01', 'M12 12h.01', 'M12 19h.01'],
    check: ['M5 12l5 5L20 7'],
    alert: ['M12 9v4', 'M12 17h.01', 'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'],
    info: ['M12 16v-4', 'M12 8h.01', 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'],
    list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
    pen: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
    grid: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
    back: ['M19 12H5', 'M12 19l-7-7 7-7'],
    flame: ['M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8 0 4 3 7 7 7z'],
    eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
    plus: ['M12 5v14', 'M5 12h14'],
    cup: ['M17 8h1a4 4 0 0 1 0 8h-1', 'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z', 'M6 2v3', 'M10 2v3', 'M14 2v3']
  };

  var COLORS = ['blue', 'indigo', 'violet', 'grape', 'pink', 'red', 'orange', 'teal', 'green', 'cyan'];
  var RADII = ['xs', 'sm', 'md', 'lg', 'xl'];
  var VARIANTS = ['filled', 'light', 'outline', 'subtle', 'default', 'gradient'];
  var SIZES = ['xs', 'sm', 'md', 'lg'];
  var ST = { 'Queued': 'blue', 'Priority': 'red', 'Ready': 'teal' };
  var BEBIDAS = ['Cappuccino', 'Double espresso', 'Oat latte', 'Flat white', 'Mocha', 'Cold brew', 'Iced yerba mate', 'Matcha latte', 'Hot chocolate'];

  var SEED = [
    { id: 1, cli: 'Ana', qtd: 1, item: 'Cappuccino', tam: 'M', st: 'Priority', hora: '08:41' },
    { id: 2, cli: 'Bruno', qtd: 2, item: 'Double espresso', tam: 'S', st: 'Queued', hora: '08:38' },
    { id: 3, cli: 'Carla', qtd: 1, item: 'Oat latte', tam: 'L', st: 'Priority', hora: '08:30' },
    { id: 4, cli: 'Diego', qtd: 1, item: 'Cold brew', tam: 'L', st: 'Queued', hora: '08:22' },
    { id: 5, cli: 'Elisa', qtd: 3, item: 'Cheese bread', tam: 'S', st: 'Ready', hora: '08:10' },
    { id: 6, cli: 'Fábio', qtd: 1, item: 'Mocha', tam: 'M', st: 'Queued', hora: '07:58' },
    { id: 7, cli: 'Gabi', qtd: 1, item: 'Matcha latte', tam: 'M', st: 'Ready', hora: '07:47' },
    { id: 8, cli: 'Hugo', qtd: 2, item: 'Flat white', tam: 'S', st: 'Queued', hora: '07:40' },
    { id: 9, cli: 'Íris', qtd: 1, item: 'Iced yerba mate', tam: 'L', st: 'Ready', hora: '07:31' },
    { id: 10, cli: 'João', qtd: 1, item: 'Hot chocolate', tam: 'M', st: 'Queued', hora: '07:15' }
  ];

  function Label(p) { return h(M.Text, { size: 'xs', fw: 600, tt: 'uppercase', c: 'dimmed', style: { letterSpacing: '.04em' } }, p.children); }

  function CodeView(p) {
    var t = p.theme;
    var lines = [
      ['k', "import "], ['', "{ MantineProvider, createTheme } "], ['k', "from "], ['', "'@mantine/core';\n\n"],
      ['k', "const "], ['', "theme = createTheme({\n  primaryColor: '" + t.color + "',\n  defaultRadius: '" + t.radius + "',\n});\n\n"],
      ['', "<MantineProvider theme={theme} forceColorScheme=\"" + t.scheme + "\">\n  <Button variant=\"" + t.variant + "\" size=\"" + t.size + "\">\n    Place order\n  </Button>\n</MantineProvider>"]
    ];
    return h('pre', { className: 'lab-code', 'aria-label': 'Equivalent code' }, lines.map(function (l, i) { return h('span', { key: i, className: l[0] }, l[1]); }));
  }

  function ThemePanel(p) {
    var t = p.theme, set = p.set;
    return h(M.Paper, { withBorder: true, p: 'md' },
      h(M.Stack, { gap: 'md' },
        h(M.Title, { order: 4 }, 'Theme'),
        h(M.Text, { size: 'sm', c: 'dimmed' }, 'Everything on this page comes from a single theme object. Change the values and watch the components react.'),
        h(M.Stack, { gap: 6 }, h(Label, null, 'primaryColor'),
          h(M.Group, { gap: 6 }, COLORS.map(function (c) {
            return h(M.Tooltip, { key: c, label: c, withArrow: true },
              h(M.ColorSwatch, { component: 'button', type: 'button', color: 'var(--mantine-color-' + c + '-filled)', size: 28, onClick: function () { set('color', c); }, 'aria-label': 'Color ' + c, 'aria-pressed': t.color === c, style: { color: '#fff', cursor: 'pointer' } }, t.color === c ? h(M.CheckIcon, { size: 12 }) : null));
          }))),
        h(M.Stack, { gap: 6 }, h(Label, null, 'defaultRadius'), h(M.SegmentedControl, { fullWidth: true, size: 'xs', data: RADII, value: t.radius, onChange: function (v) { set('radius', v); } })),
        h(M.Stack, { gap: 6 }, h(Label, null, 'Control size'), h(M.SegmentedControl, { fullWidth: true, size: 'xs', data: SIZES, value: t.size, onChange: function (v) { set('size', v); } }),
          h(M.Text, { size: 'xs', c: 'dimmed' }, 'xs 30px · sm 36px · md 42px · lg 50px tall. On work screens, xs or sm make everything denser.')),
        h(M.Select, { label: 'Main button variant', size: 'sm', data: VARIANTS, value: t.variant, onChange: function (v) { if (v) set('variant', v); }, allowDeselect: false }),
        h(M.Stack, { gap: 6 }, h(Label, null, 'Equivalent code'), h(CodeView, { theme: t }))
      ));
  }

  function Stat(p) {
    return h(M.Paper, { withBorder: true, p: 'md' },
      h(M.Group, { justify: 'space-between', wrap: 'nowrap' },
        h('div', null, h(M.Text, { size: 'xs', c: 'dimmed', tt: 'uppercase', fw: 700 }, p.label), h(M.Text, { fw: 700, size: 'xl' }, p.value), p.sub ? h(M.Text, { size: 'xs', c: 'dimmed' }, p.sub) : null),
        p.ring != null ? h(M.RingProgress, { size: 56, thickness: 6, roundCaps: true, sections: [{ value: p.ring, color: p.color || 'var(--mantine-primary-color-filled)' }] }) : null));
  }

  function Orders(p) {
    var rows = p.rows, t = p.theme;
    var q = useState(''), f = useState('All'), page = useState(1), open = useState(null);
    var filtered = rows.filter(function (r) {
      var okS = f[0] === 'All' || r.st === f[0];
      var s = q[0].trim().toLowerCase();
      return okS && (!s || (r.cli + ' ' + r.item).toLowerCase().indexOf(s) > -1);
    });
    var per = 6, total = Math.max(1, Math.ceil(filtered.length / per)), pg = Math.min(page[0], total);
    var shown = filtered.slice((pg - 1) * per, pg * per);
    var fila = rows.filter(function (r) { return r.st !== 'Ready'; }).length, pri = rows.filter(function (r) { return r.st === 'Priority'; }).length, done = rows.length - fila;
    var cur = open[0] != null ? rows.filter(function (r) { return r.id === open[0]; })[0] : null;

    return h(M.Stack, { gap: 'md' },
      h(M.SimpleGrid, { cols: { base: 1, xs: 2, lg: 4 }, spacing: 'sm' },
        h(Stat, { label: 'Queued', value: fila, sub: 'waiting to be made', ring: Math.round(fila / rows.length * 100) }),
        h(Stat, { label: 'Priority', value: pri, sub: 'jump the line', ring: Math.round(pri / rows.length * 100), color: 'red' }),
        h(Stat, { label: 'Delivered', value: done, sub: 'this morning', ring: Math.round(done / rows.length * 100), color: 'teal' }),
        h(Stat, { label: 'Average time', value: '4 min', sub: 'per order (example)' })),
      h(M.Group, { justify: 'space-between', gap: 'sm' },
        h(M.TextInput, { size: t.size, placeholder: 'Search customer or drink', leftSection: icon(I.search), value: q[0], onChange: function (e) { q[1](e.currentTarget.value); page[1](1); }, style: { flex: '1 1 220px' }, 'aria-label': 'Search' }),
        h(M.SegmentedControl, { size: t.size, data: ['All', 'Queued', 'Priority', 'Ready'], value: f[0], onChange: function (v) { f[1](v); page[1](1); } })),
      h(M.Paper, { withBorder: true },
        h(M.Table.ScrollContainer, { minWidth: 620 },
          h(M.Table, { striped: true, highlightOnHover: true, verticalSpacing: t.size, horizontalSpacing: 'md' },
            h(M.Table.Thead, null, h(M.Table.Tr, null, ['Customer', 'Order', 'Size', 'Status', 'Time', ''].map(function (c, i) { return h(M.Table.Th, { key: i }, c); }))),
            h(M.Table.Tbody, null, shown.length ? shown.map(function (r) {
              return h(M.Table.Tr, { key: r.id, className: 'lab-row', onClick: function () { open[1](r.id); } },
                h(M.Table.Td, null, h(M.Group, { gap: 'sm', wrap: 'nowrap' }, h(M.Avatar, { size: 'sm', color: ST[r.st], radius: 'xl' }, r.cli.slice(0, 2).toUpperCase()), h(M.Text, { size: 'sm', fw: 600 }, r.cli))),
                h(M.Table.Td, null, (r.qtd > 1 ? r.qtd + '× ' : '') + r.item),
                h(M.Table.Td, null, h(M.Badge, { variant: 'outline', color: 'gray' }, r.tam)),
                h(M.Table.Td, null, h(M.Badge, { variant: r.st === 'Priority' ? 'filled' : 'light', color: ST[r.st] }, r.st)),
                h(M.Table.Td, null, h(M.Text, { size: 'sm', ff: 'monospace' }, r.hora)),
                h(M.Table.Td, { onClick: function (e) { e.stopPropagation(); } },
                  h(M.Menu, { position: 'bottom-end', shadow: 'md', withinPortal: true },
                    h(M.Menu.Target, null, h(M.ActionIcon, { variant: 'subtle', color: 'gray', 'aria-label': 'Actions for the order from ' + r.cli }, icon(I.dots))),
                    h(M.Menu.Dropdown, null,
                      h(M.Menu.Label, null, r.item),
                      h(M.Menu.Item, { leftSection: icon(I.eye, 14), onClick: function () { open[1](r.id); } }, 'Open'),
                      h(M.Menu.Item, { leftSection: icon(I.flame, 14), onClick: function () { p.setSt(r.id, 'Priority'); } }, 'Prioritize'),
                      h(M.Menu.Divider),
                      h(M.Menu.Item, { color: 'teal', leftSection: icon(I.check, 14), onClick: function () { p.setSt(r.id, 'Ready'); p.toast('Order delivered', r.item + ' for ' + r.cli + '.', 'teal'); } }, 'Deliver order')))));
            }) : h(M.Table.Tr, null, h(M.Table.Td, { colSpan: 6 }, h(M.Text, { c: 'dimmed', ta: 'center', py: 'lg', size: 'sm' }, 'No orders found for this filter.'))))))),
      h(M.Group, { justify: 'space-between' },
        h(M.Text, { size: 'sm', c: 'dimmed' }, filtered.length + ' orders · tap a row to open it'),
        h(M.Pagination, { total: total, value: pg, onChange: page[1], size: 'sm' })),
      h(M.Modal, { opened: !!cur, onClose: function () { open[1](null); }, title: cur ? cur.item : '', centered: true },
        cur ? h(M.Stack, { gap: 'sm' },
          h(M.Group, { gap: 'xs' }, h(M.Badge, { variant: 'outline', color: 'gray' }, 'Size ' + cur.tam), h(M.Badge, { variant: 'light', color: ST[cur.st] }, cur.st), h(M.Text, { size: 'sm', c: 'dimmed' }, 'ordered at ' + cur.hora)),
          h(M.Text, { size: 'sm' }, cur.qtd + ' item' + (cur.qtd > 1 ? 's' : '') + ' for ' + cur.cli + '. Fictional data.'),
          h(M.Textarea, { label: 'Note', placeholder: 'E.g. no sugar, plant milk', autosize: true, minRows: 2, size: t.size }),
          h(M.Group, { justify: 'flex-end', mt: 'sm' },
            h(M.Button, { variant: 'default', size: t.size, onClick: function () { open[1](null); } }, 'Close'),
            h(M.Button, { variant: t.variant, size: t.size, leftSection: icon(I.cup), gradient: { from: t.color, to: 'cyan', deg: 45 }, onClick: function () { p.setSt(cur.id, 'Ready'); p.toast('Order delivered', cur.item + ' for ' + cur.cli + '.', 'teal'); open[1](null); } }, 'Deliver order'))) : null)
    );
  }

  function NewOrder(p) {
    var t = p.theme;
    var cli = useState('Lia'), qtd = useState(1), item = useState('Cappuccino'), tam = useState('M'), obs = useState(''), viagem = useState(true), pri = useState(false), saving = useState(false);
    var filled = [cli[0].trim(), String(qtd[0] || ''), item[0], obs[0].trim()].filter(Boolean).length;
    var pct = Math.round(filled / 4 * 100);
    function submit() {
      if (!cli[0].trim()) return;
      saving[1](true);
      setTimeout(function () {
        saving[1](false);
        p.add({ cli: cli[0].trim(), qtd: qtd[0] || 1, item: item[0], tam: tam[0], st: pri[0] ? 'Priority' : 'Queued' });
        p.toast('Order added', item[0] + ' ' + tam[0] + ' for ' + cli[0].trim() + (pri[0] ? ', prioritized.' : '.'), pri[0] ? 'red' : t.color);
        obs[1]('');
      }, 700);
    }
    return h(M.Paper, { withBorder: true, p: 'lg', component: 'form', onSubmit: function (e) { e.preventDefault(); submit(); } },
      h(M.Stack, { gap: 'md' },
        h(M.Group, { justify: 'space-between', align: 'flex-start' },
          h('div', null, h(M.Title, { order: 3 }, 'New order'), h(M.Text, { size: 'sm', c: 'dimmed' }, 'The form uses the size and variant chosen in the theme panel.')),
          h(M.Group, { gap: 6 }, h(M.Badge, { variant: 'light' }, viagem[0] ? 'To go' : 'For here'), pri[0] ? h(M.Badge, { color: 'red', variant: 'filled' }, 'Priority') : null)),
        h(M.SimpleGrid, { cols: { base: 1, sm: 2 }, spacing: 'md' },
          h(M.TextInput, { label: 'Name on cup', required: true, size: t.size, value: cli[0], onChange: function (e) { cli[1](e.currentTarget.value); }, error: cli[0].trim() ? null : 'Enter a name' }),
          h(M.NumberInput, { label: 'Quantity', size: t.size, min: 1, max: 10, value: qtd[0], onChange: qtd[1] })),
        h(M.Select, { label: 'Drink', size: t.size, searchable: true, data: BEBIDAS, value: item[0], onChange: function (v) { if (v) item[1](v); }, allowDeselect: false }),
        h(M.Stack, { gap: 4 }, h(M.Text, { size: 'sm', fw: 600 }, 'Size'), h(M.SegmentedControl, { size: t.size, data: [{ label: 'S · 8 oz', value: 'S' }, { label: 'M · 12 oz', value: 'M' }, { label: 'L · 16 oz', value: 'L' }], value: tam[0], onChange: tam[1] })),
        h(M.Textarea, { label: 'Note', description: 'Optional. Printed on the cup label.', size: t.size, autosize: true, minRows: 2, placeholder: 'E.g. no sugar, oat milk', value: obs[0], onChange: function (e) { obs[1](e.currentTarget.value); } }),
        h(M.Group, { gap: 'xl' },
          h(M.Checkbox, { label: 'To go', size: t.size === 'lg' ? 'md' : 'sm', checked: viagem[0], onChange: function (e) { viagem[1](e.currentTarget.checked); } }),
          h(M.Switch, { label: 'Priority', color: 'red', size: t.size === 'lg' ? 'md' : 'sm', checked: pri[0], onChange: function (e) { pri[1](e.currentTarget.checked); } })),
        h(M.Stack, { gap: 4 }, h(M.Group, { justify: 'space-between' }, h(M.Text, { size: 'sm', c: 'dimmed' }, 'Completion'), h(M.Text, { size: 'sm', c: 'dimmed' }, pct + '%')), h(M.Progress, { value: pct, size: 'sm', color: pct === 100 ? 'teal' : undefined, transitionDuration: 300 })),
        h(M.Group, { justify: 'flex-end' },
          h(M.Button, { variant: 'default', size: t.size, onClick: function () { obs[1](''); pri[1](false); } }, 'Clear'),
          h(M.Button, { type: 'submit', variant: t.variant, size: t.size, loading: saving[0], leftSection: icon(I.plus), gradient: { from: t.color, to: 'cyan', deg: 45 } }, 'Add order'))));
  }

  var STEPS = [['Order', 'At the register'], ['Making', 'With the barista'], ['Ready', 'At the counter'], ['Delivered', 'With the customer']];

  function Gallery(p) {
    var t = p.theme;
    var step = useState(1), chips = useState(['Coffee', 'Lactose-free']), rate = useState(4), sl = useState(60);
    return h(M.SimpleGrid, { cols: { base: 1, md: 2 }, spacing: 'md' },
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Button · every variant'),
        h(M.Group, { gap: 'xs' }, VARIANTS.map(function (v) { return h(M.Button, { key: v, variant: v, size: t.size, gradient: { from: t.color, to: 'cyan', deg: 45 } }, v); })),
        h(M.Group, { gap: 'xs' }, h(M.Button, { loading: true, size: t.size }, 'loading'), h(M.Button, { disabled: true, size: t.size }, 'disabled'), h(M.Button, { color: 'red', size: t.size }, 'Cancel order'), h(M.Button.Group, null, h(M.Button, { variant: 'default', size: t.size }, 'P'), h(M.Button, { variant: 'default', size: t.size }, 'M'), h(M.Button, { variant: 'default', size: t.size }, 'G'))))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Badge, ActionIcon and Avatar'),
        h(M.Group, { gap: 'xs' }, ['filled', 'light', 'outline', 'dot', 'default', 'transparent'].map(function (v) { return h(M.Badge, { key: v, variant: v }, v); })),
        h(M.Group, { gap: 'xs' }, ['filled', 'light', 'outline', 'subtle', 'default'].map(function (v) { return h(M.ActionIcon, { key: v, variant: v, size: 'lg', 'aria-label': v }, icon(I.cup)); })),
        h(M.Avatar.Group, null, ['AN', 'BR', 'CA', 'DI'].map(function (x, i) { return h(M.Avatar, { key: x, radius: 'xl', color: COLORS[i * 2] }, x); }), h(M.Avatar, { radius: 'xl' }, '+5')))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Alert'),
        h(M.Alert, { variant: 'light', color: 'blue', title: 'Running low on oat milk', icon: icon(I.info) }, '2 liters left. Order more before lunch.'),
        h(M.Alert, { variant: 'light', color: 'red', title: 'Machine 2 is down', icon: icon(I.alert) }, 'Use machine 1 until the repair arrives.'))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Stepper · the order’s path'),
        h(M.Stepper, { active: step[0], onStepClick: step[1], size: 'sm', orientation: 'vertical' }, STEPS.map(function (s, i) { return h(M.Stepper.Step, { key: i, label: s[0], description: s[1] }); })),
        h(M.Group, null, h(M.Button, { variant: 'default', size: 'xs', onClick: function () { step[1](Math.max(0, step[0] - 1)); } }, 'Back'), h(M.Button, { size: 'xs', variant: t.variant, gradient: { from: t.color, to: 'cyan', deg: 45 }, onClick: function () { step[1](Math.min(4, step[0] + 1)); } }, 'Next')))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Chip, Slider, Rating and Loader'),
        h(M.Chip.Group, { multiple: true, value: chips[0], onChange: chips[1] }, h(M.Group, { gap: 'xs' }, ['Coffee', 'Tea', 'Iced', 'Lactose-free', 'Vegan'].map(function (c) { return h(M.Chip, { key: c, value: c, size: 'sm' }, c); }))),
        h(M.Text, { size: 'sm' }, 'Roast level: ', h('b', null, sl[0])),
        h(M.Slider, { value: sl[0], onChange: sl[1], marks: [{ value: 20, label: 'light' }, { value: 50, label: 'medium' }, { value: 80, label: 'dark' }], mb: 'lg', 'aria-label': 'Roast level' }),
        h(M.Group, { justify: 'space-between' }, h(M.Rating, { value: rate[0], onChange: rate[1] }), h(M.Group, { gap: 'md' }, h(M.Loader, { size: 'sm' }), h(M.Loader, { size: 'sm', type: 'bars' }), h(M.Loader, { size: 'sm', type: 'dots' }))))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Accordion and Kbd'),
        h(M.Accordion, { variant: 'separated', defaultValue: 'tema' },
          h(M.Accordion.Item, { value: 'tema' }, h(M.Accordion.Control, null, 'Why does everything change together?'), h(M.Accordion.Panel, null, h(M.Text, { size: 'sm' }, 'Each component reads CSS variables such as --mantine-primary-color-filled and --mantine-radius-default. Changing the theme rewrites those variables, and the whole page follows.'))),
          h(M.Accordion.Item, { value: 'atalhos' }, h(M.Accordion.Control, null, 'Keyboard shortcuts'), h(M.Accordion.Panel, null, h(M.Group, { gap: 6 }, h(M.Kbd, null, '⌘'), '+', h(M.Kbd, null, 'K'), h(M.Text, { size: 'sm', c: 'dimmed' }, 'opens search in the @mantine/spotlight package')))))))
    );
  }

  function App() {
    var color = useStored('color', 'blue'), radius = useStored('radius', 'md'), scheme = useStored('scheme', 'light'), variant = useStored('variant', 'filled'), size = useStored('size', 'sm');
    var tab = useStored('tab', 'fila');
    var rows = useState(SEED), toast = useState(null);
    var t = { color: color[0], radius: radius[0], scheme: scheme[0], variant: variant[0], size: size[0] };
    var setters = { color: color[1], radius: radius[1], scheme: scheme[1], variant: variant[1], size: size[1] };
    function set(k, v) { setters[k](v); }
    var theme = useMemo(function () { return M.createTheme({ primaryColor: t.color, defaultRadius: t.radius, cursorType: 'pointer' }); }, [t.color, t.radius]);
    useEffect(function () { document.documentElement.setAttribute('data-theme', t.scheme); }, [t.scheme]);
    /* O pacote do design system desliga a injeção de variáveis do MantineProvider e aponta tudo para tokens fixos.
       Para o tema reagir, reescrevemos aqui as variáveis que o createTheme geraria. */
    useEffect(function () {
      var c = t.color, v = [];
      for (var i = 0; i < 10; i++) v.push('--mantine-primary-color-' + i + ':var(--mantine-color-' + c + '-' + i + ')');
      ['filled', 'filled-hover', 'light', 'light-hover', 'light-color'].forEach(function (k) { v.push('--mantine-primary-color-' + k + ':var(--mantine-color-' + c + '-' + k + ')'); });
      v.push('--mantine-radius-default:var(--mantine-radius-' + t.radius + ')');
      var el = document.getElementById('lab-theme');
      if (!el) { el = document.createElement('style'); el.id = 'lab-theme'; document.head.appendChild(el); }
      el.textContent = ':root:root[data-mantine-color-scheme],:root:root{' + v.join(';') + '}';
    }, [t.color, t.radius]);
    useEffect(function () { if (!toast[0]) return; var id = setTimeout(function () { toast[1](null); }, 4500); return function () { clearTimeout(id); }; }, [toast[0]]);
    function showToast(title, msg, c) { toast[1]({ title: title, msg: msg, color: c, k: Date.now() }); }
    function setSt(id, st) { rows[1](rows[0].map(function (r) { return r.id === id ? Object.assign({}, r, { st: st }) : r; })); }
    function add(r) { var d = new Date(); rows[1]([Object.assign({ id: Date.now(), hora: ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) }, r)].concat(rows[0])); }

    return h(M.MantineProvider, { theme: theme, forceColorScheme: t.scheme },
      h(M.AppShell, { header: { height: 60 }, padding: 'md' },
        h(M.AppShell.Header, null,
          h(M.Group, { h: '100%', px: 'md', justify: 'space-between', wrap: 'nowrap', gap: 'sm' },
            h(M.Group, { gap: 'sm', wrap: 'nowrap', style: { minWidth: 0 } },
              h(M.ActionIcon, { component: 'a', href: '../index.html', variant: 'default', size: 'lg', 'aria-label': 'Back to the atlas' }, icon(I.back)),
              h(M.Title, { order: 4, style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, 'Mantine lab'),
              h(M.Badge, { variant: 'light', visibleFrom: 'sm' }, '@mantine/core 9.7.5')),
            h(M.Group, { gap: 'xs', wrap: 'nowrap' },
              h(M.Anchor, { href: 'carbon.html', size: 'sm', visibleFrom: 'sm' }, 'See Carbon'),
              h(M.SegmentedControl, { size: 'xs', data: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }], value: t.scheme, onChange: function (v) { set('scheme', v); } })))),
        h(M.AppShell.Main, null,
          h(M.Container, { size: 'xl', px: 0 },
            h(M.Stack, { gap: 'lg' },
              h(M.Stack, { gap: 4 },
                h(M.Text, { size: 'xs', fw: 700, tt: 'uppercase', c: 'dimmed', style: { letterSpacing: '.08em' } }, 'Atlas · real components'),
                h(M.Title, { order: 1 }, 'Mantine in practice'),
                h(M.Text, { c: 'dimmed', maw: 720 }, 'This page does not imitate Mantine: it runs the real library, building the orders panel of a fictional coffee shop. Change the theme in the panel and watch the list, the form and the gallery react.')),
              h(M.SimpleGrid, { cols: { base: 1, md: 3 }, spacing: 'lg' },
                h('div', null, h(ThemePanel, { theme: t, set: set })),
                h('div', { className: 'lab-span2' },
                  h(M.Tabs, { value: tab[0], onChange: function (v) { if (v) tab[1](v); }, keepMounted: false },
                    h(M.Tabs.List, { mb: 'md' },
                      h(M.Tabs.Tab, { value: 'fila', leftSection: icon(I.list, 14) }, 'Orders'),
                      h(M.Tabs.Tab, { value: 'novo', leftSection: icon(I.pen, 14) }, 'New order'),
                      h(M.Tabs.Tab, { value: 'galeria', leftSection: icon(I.grid, 14) }, 'Components')),
                    h(M.Tabs.Panel, { value: 'fila' }, h(Orders, { rows: rows[0], theme: t, setSt: setSt, toast: showToast })),
                    h(M.Tabs.Panel, { value: 'novo' }, h(NewOrder, { theme: t, add: add, toast: function (a, b, c) { showToast(a, b, c); tab[1]('fila'); } })),
                    h(M.Tabs.Panel, { value: 'galeria' }, h(Gallery, { theme: t }))))),
              h(M.Text, { size: 'xs', c: 'dimmed' }, 'Mantine is MIT, © Vitaly Rtishchev. Bundle taken from the “Mantine” design system in Claude Design.')))),
        toast[0] ? h('div', { className: 'lab-toast', key: toast[0].k, role: 'status' },
          h(M.Notification, { title: toast[0].title, color: toast[0].color, onClose: function () { toast[1](null); }, withBorder: true, icon: icon(I.check), radius: 'md' }, toast[0].msg)) : null
      ));
  }

  var css = document.createElement('style');
  css.textContent = '@media (min-width:62em){.lab-span2{grid-column:span 2}}';
  document.head.appendChild(css);
  window.ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
