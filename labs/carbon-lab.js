/* Laboratório Carbon — componentes reais do @carbon/react 1.120.0 sobre React 18, sem build. */
(function () {
  var React = window.React, C = window.Carbon, I = C.icons;
  var h = React.createElement, F = React.Fragment, useState = React.useState, useEffect = React.useEffect;

  function store(k, d) { try { var v = localStorage.getItem('atlas-carbon-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem('atlas-carbon-' + k, JSON.stringify(v)); } catch (e) {} }
  function useStored(k, d) { var s = useState(function () { return store(k, d); }); useEffect(function () { save(k, s[0]); }, [s[0]]); return s; }

  var THEMES = [['white', 'White', 'White'], ['g10', 'Gray 10', 'G10'], ['g90', 'Gray 90', 'G90'], ['g100', 'Gray 100', 'G100']];
  var SIZES = [['xs', 'XS'], ['sm', 'SM'], ['md', 'MD'], ['lg', 'LG'], ['xl', 'XL']];
  var TAG = { 'Queued': 'blue', 'Priority': 'red', 'Ready': 'green' };
  var HEADERS = [{ key: 'cli', header: 'Customer' }, { key: 'item', header: 'Order' }, { key: 'tam', header: 'Size' }, { key: 'st', header: 'Status' }, { key: 'hora', header: 'Time' }];
  var SEED = [
    { id: '1', cli: 'Ana', item: 'Cappuccino', tam: 'M', st: 'Priority', hora: '08:41' },
    { id: '2', cli: 'Bruno', item: '2× Double espresso', tam: 'S', st: 'Queued', hora: '08:38' },
    { id: '3', cli: 'Carla', item: 'Oat latte', tam: 'L', st: 'Priority', hora: '08:30' },
    { id: '4', cli: 'Diego', item: 'Cold brew', tam: 'L', st: 'Queued', hora: '08:22' },
    { id: '5', cli: 'Elisa', item: '3× Cheese bread', tam: 'S', st: 'Ready', hora: '08:10' },
    { id: '6', cli: 'Fábio', item: 'Mocha', tam: 'M', st: 'Queued', hora: '07:58' },
    { id: '7', cli: 'Gabi', item: 'Matcha latte', tam: 'M', st: 'Ready', hora: '07:47' },
    { id: '8', cli: 'Hugo', item: '2× Flat white', tam: 'S', st: 'Queued', hora: '07:40' }
  ];
  var BEBIDAS = ['Cappuccino', 'Double espresso', 'Oat latte', 'Flat white', 'Mocha', 'Cold brew', 'Iced yerba mate', 'Matcha latte', 'Hot chocolate'];

  function Kpis(p) {
    var rows = p.rows, fila = rows.filter(function (r) { return r.st !== 'Ready'; }).length, urg = rows.filter(function (r) { return r.st === 'Priority'; }).length, done = rows.length - fila;
    function k(label, n, v, helper) {
      return h(C.Tile, null, h('p', { className: 'label-01', style: { margin: 0, color: 'var(--text-secondary)' } }, label), h('p', { className: 'lab-kpi-n', style: { margin: 0 } }, n),
        v != null ? h(C.ProgressBar, { label: label + ' of the total', hideLabel: true, value: v, max: 100, size: 'small', helperText: helper }) : h('p', { className: 'helper-text-01', style: { margin: 0, color: 'var(--text-helper)' } }, helper));
    }
    return h('div', { className: 'lab-kpis' },
      k('Queued', fila, Math.round(fila / rows.length * 100), 'waiting to be made'),
      k('Priority', urg, Math.round(urg / rows.length * 100), 'jump the line'),
      k('Delivered', done, Math.round(done / rows.length * 100), 'this morning'),
      k('Average time', '4 min', null, 'per order (example)'));
  }

  function Queue(p) {
    var open = useState(null), rows = p.rows;
    var cur = open[0] ? rows.filter(function (r) { return r.id === open[0]; })[0] : null;
    return h(F, null,
      h(Kpis, { rows: rows }),
      h('div', { className: 'lab-scroll' },
        h(C.DataTable, { rows: rows, headers: HEADERS, isSortable: true, size: p.size, useZebraStyles: p.zebra }, function (t) {
          var batch = t.getBatchActionProps();
          return h(C.TableContainer, Object.assign({ title: 'Orders', description: rows.length + ' orders this morning. Fictional data.' }, t.getTableContainerProps()),
            h(C.TableToolbar, t.getToolbarProps(),
              h(C.TableBatchActions, Object.assign({}, batch, { translateWithId: function (id, s) { return id === 'carbon.table.batch.cancel' ? 'Cancel' : id === 'carbon.table.batch.items.selected' ? (s.totalSelected + ' selected') : id === 'carbon.table.batch.item.selected' ? '1 selected' : id === 'carbon.table.batch.selectAll' ? 'Select all' : id; } }),
                h(C.TableBatchAction, { renderIcon: I.Checkmark, tabIndex: batch.shouldShowBatchActions ? 0 : -1, onClick: function () { var ids = t.selectedRows.map(function (r) { return r.id; }); p.setMany(ids, 'Ready'); p.toast('success', ids.length + (ids.length === 1 ? ' order delivered' : ' orders delivered'), 'Selection marked as ready.'); batch.onCancel(); } }, 'Mark ready'),
                h(C.TableBatchAction, { renderIcon: I.WarningFilled, tabIndex: batch.shouldShowBatchActions ? 0 : -1, onClick: function () { var ids = t.selectedRows.map(function (r) { return r.id; }); p.setMany(ids, 'Priority'); batch.onCancel(); } }, 'Prioritize')),
              h(C.TableToolbarContent, { 'aria-hidden': batch.shouldShowBatchActions },
                h(C.TableToolbarSearch, { onChange: function (e, v) { t.onInputChange(e, v); }, persistent: true, placeholder: 'Search customer or drink', tabIndex: batch.shouldShowBatchActions ? -1 : 0 }),
                h(C.Button, { kind: 'primary', size: p.size === 'xs' ? 'sm' : p.size === 'xl' ? 'lg' : p.size, renderIcon: I.Add, onClick: p.onNew, tabIndex: batch.shouldShowBatchActions ? -1 : 0 }, 'New order'))),
            h(C.Table, Object.assign({}, t.getTableProps(), { 'aria-label': 'Orders' }),
              h(C.TableHead, null, h(C.TableRow, null,
                h(C.TableSelectAll, t.getSelectionProps()),
                t.headers.map(function (hd) { var hp = t.getHeaderProps({ header: hd }); var key = hp.key; delete hp.key; return h(C.TableHeader, Object.assign({ key: key }, hp), hd.header); }),
                h(C.TableHeader, { 'aria-label': 'Actions' }))),
              h(C.TableBody, null, t.rows.map(function (r) {
                var rp = t.getRowProps({ row: r }); var key = rp.key; delete rp.key;
                var sp = t.getSelectionProps({ row: r });
                return h(C.TableRow, Object.assign({ key: key }, rp),
                  h(C.TableSelectRow, sp),
                  r.cells.map(function (c) {
                    var v = c.value, col = c.info.header;
                    if (col === 'st') v = h(C.Tag, { type: TAG[c.value], size: 'sm' }, c.value);
                    else if (col === 'tam') v = h(C.Tag, { type: 'outline', size: 'sm' }, c.value);
                    else if (col === 'hora') v = h('span', { style: { fontFamily: 'var(--font-mono)' } }, c.value);
                    return h(C.TableCell, { key: c.id }, v);
                  }),
                  h(C.TableCell, { className: 'cds--table-column-menu' },
                    h(C.OverflowMenu, { size: p.size === 'xl' ? 'lg' : p.size === 'xs' ? 'sm' : p.size, flipped: true, 'aria-label': 'Actions', iconDescription: 'Actions' },
                      h(C.OverflowMenuItem, { itemText: 'Open', onClick: function () { open[1](r.id); } }),
                      h(C.OverflowMenuItem, { itemText: 'Prioritize', onClick: function () { p.setMany([r.id], 'Priority'); } }),
                      h(C.OverflowMenuItem, { itemText: 'Deliver order', hasDivider: true, onClick: function () { p.setMany([r.id], 'Ready'); p.toast('success', 'Order delivered', r.cells[1].value + ' for ' + r.cells[0].value + '.'); } }))));
              }))));
        })),
      h(C.Modal, {
        open: !!cur, size: 'sm', modalLabel: cur ? 'Size ' + cur.tam + ' · ordered at ' + cur.hora : '', modalHeading: cur ? cur.item : '',
        primaryButtonText: 'Deliver order', secondaryButtonText: 'Close',
        onRequestClose: function () { open[1](null); },
        onRequestSubmit: function () { p.setMany([cur.id], 'Ready'); p.toast('success', 'Order delivered', cur.item + ' for ' + cur.cli + '.'); open[1](null); }
      }, cur ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } },
        h('p', { className: 'body-01', style: { margin: 0 } }, 'Order from ' + cur.cli + '. Current status: ', h(C.Tag, { type: TAG[cur.st], size: 'sm' }, cur.st)),
        h(C.TextArea, { id: 'obs-modal', labelText: 'Note', placeholder: 'E.g. no sugar, plant milk', rows: 3 })) : null)
    );
  }

  function Form(p) {
    var cli = useState(''), qtd = useState(1), item = useState('Cappuccino'), tam = useState('M'), obs = useState(''), viagem = useState(true), pri = useState(false), saving = useState('inactive'), touched = useState(false);
    var invalid = touched[0] && !cli[0].trim();
    function submit(e) {
      e.preventDefault(); touched[1](true);
      if (!cli[0].trim()) return;
      saving[1]('active');
      setTimeout(function () {
        saving[1]('finished');
        p.add({ cli: cli[0].trim(), item: (qtd[0] > 1 ? qtd[0] + '× ' : '') + item[0], tam: tam[0], st: pri[0] ? 'Priority' : 'Queued' });
        p.toast(pri[0] ? 'warning' : 'success', 'Order added', item[0] + ' ' + tam[0] + (pri[0] ? ', prioritized.' : '.'));
        setTimeout(function () { saving[1]('inactive'); cli[1](''); obs[1](''); pri[1](false); touched[1](false); }, 900);
      }, 800);
    }
    return h('form', { className: 'lab-form', onSubmit: submit, noValidate: true },
      h('div', null, h('h2', { className: 'heading-04', style: { margin: '0 0 .5rem' } }, 'New order'), h('p', { className: 'body-01', style: { margin: 0, color: 'var(--text-secondary)' } }, 'Standard Carbon form: label above, a field with a bottom line, helper text below and an error that replaces the helper.')),
      pri[0] ? h(C.InlineNotification, { kind: 'warning', lowContrast: true, hideCloseButton: true, title: 'Priority:', subtitle: 'the order jumps the line and the barista is notified.' }) : null,
      h('div', { className: 'lab-row2' },
        h(C.TextInput, { id: 'cli', labelText: 'Name on cup', placeholder: 'E.g. Lia', helperText: 'First name only.', value: cli[0], invalid: invalid, invalidText: 'Enter a name.', onChange: function (e) { cli[1](e.target.value); }, onBlur: function () { touched[1](true); } }),
        h(C.NumberInput, { id: 'qtd', label: 'Quantity', min: 1, max: 10, value: qtd[0], onChange: function (e, s) { if (s && s.value != null) qtd[1](s.value); }, iconDescription: 'Adjust quantity' })),
      h(C.Dropdown, { id: 'bebida', titleText: 'Drink', label: 'Choose the drink', items: BEBIDAS, selectedItem: item[0], onChange: function (s) { if (s.selectedItem) item[1](s.selectedItem); } }),
      h(C.RadioButtonGroup, { legendText: 'Size', name: 'tam', valueSelected: tam[0], onChange: function (v) { tam[1](v); } },
        [['S', 'S · 8 oz'], ['M', 'M · 12 oz'], ['L', 'L · 16 oz']].map(function (m) { return h(C.RadioButton, { key: m[0], id: 'tam-' + m[0], labelText: m[1], value: m[0] }); })),
      h(C.TextArea, { id: 'obs', labelText: 'Note', helperText: 'Optional. Printed on the cup label.', rows: 3, value: obs[0], onChange: function (e) { obs[1](e.target.value); }, enableCounter: true, maxCount: 120 }),
      h(C.Checkbox, { id: 'viagem', labelText: 'To go', checked: viagem[0], onChange: function (e, s) { viagem[1](s.checked); } }),
      h(C.Toggle, { id: 'pri', labelText: 'Priority', labelA: 'No', labelB: 'Yes', toggled: pri[0], onToggle: function (v) { pri[1](v); } }),
      h('div', { style: { display: 'flex', gap: '1px', alignItems: 'center', flexWrap: 'wrap' } },
        h(C.Button, { kind: 'secondary', type: 'button', onClick: function () { cli[1](''); obs[1](''); pri[1](false); touched[1](false); } }, 'Clear'),
        saving[0] === 'inactive' ? h(C.Button, { kind: 'primary', type: 'submit', renderIcon: I.Add }, 'Add order') : h(C.InlineLoading, { style: { marginLeft: '1rem', width: 'auto' }, status: saving[0], description: saving[0] === 'active' ? 'Sending…' : 'Added' })));
  }

  var STEPS = [['Order', 'At the register'], ['Making', 'With the barista'], ['Ready', 'At the counter'], ['Delivered', 'With the customer']];

  function Gallery() {
    var step = useState(1);
    return h('div', { className: 'lab-gallery' },
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Button · kinds'),
        h('div', { className: 'lab-flex' }, ['primary', 'secondary', 'tertiary', 'ghost', 'danger'].map(function (k) { return h(C.Button, { key: k, kind: k, size: 'md' }, k); })),
        h('div', { className: 'lab-flex' }, h(C.Button, { kind: 'primary', size: 'sm', renderIcon: I.Save }, 'sm 32'), h(C.Button, { kind: 'primary', size: 'md' }, 'md 40'), h(C.Button, { kind: 'primary', size: 'lg' }, 'lg 48'), h(C.IconButton, { label: 'Settings', kind: 'ghost' }, h(I.Settings))),
        h('p', { className: 'helper-text-01', style: { margin: 0, color: 'var(--text-helper)' } }, 'Square corners, the icon to the right of the text and a single primary button per screen.')),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Tag'),
        h('div', { className: 'lab-flex' }, ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray', 'high-contrast', 'outline'].map(function (t) { return h(C.Tag, { key: t, type: t }, t); }))),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Notifications'),
        h(C.InlineNotification, { kind: 'info', lowContrast: true, hideCloseButton: true, title: 'Stock:', subtitle: '2 liters of oat milk left.' }),
        h(C.InlineNotification, { kind: 'success', lowContrast: true, hideCloseButton: true, title: 'Ready:', subtitle: 'Ana’s order is at the counter.' }),
        h(C.InlineNotification, { kind: 'error', hideCloseButton: true, title: 'Machine 2 is down:', subtitle: 'use machine 1 until the repair arrives.' })),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'ProgressIndicator · the order’s path'),
        h('div', { className: 'lab-scroll' }, h(C.ProgressIndicator, { currentIndex: step[0], vertical: true, onChange: function (i) { step[1](i); } }, STEPS.map(function (s, i) { return h(C.ProgressStep, { key: i, label: s[0], secondaryLabel: s[1] }); }))),
        h('div', { className: 'lab-flex' }, h(C.Button, { kind: 'tertiary', size: 'sm', onClick: function () { step[1](Math.max(0, step[0] - 1)); } }, 'Back'), h(C.Button, { kind: 'primary', size: 'sm', onClick: function () { step[1](Math.min(3, step[0] + 1)); } }, 'Next'))),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'The four themes side by side'),
        h('div', { className: 'lab-themes' }, THEMES.map(function (t) { return h(C.Theme, { key: t[0], theme: t[0] }, h('div', null, h('span', { className: 'label-01' }, t[1]), h(C.Button, { size: 'sm', style: { paddingRight: '1rem', minWidth: 0, maxWidth: '100%' } }, 'Action'), h(C.Tag, { type: 'blue', size: 'sm' }, 'Tag'))); }))),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Accordion · Carbon concepts'),
        h(C.Accordion, null,
          h(C.AccordionItem, { title: 'Layers', open: true }, h('p', { className: 'body-01', style: { margin: 0 } }, 'Containers stack in tones: layer-01 on the background, layer-02 inside it. Separation comes from tone and 1px borders, not from shadows.')),
          h(C.AccordionItem, { title: '2x Grid' }, h('p', { className: 'body-01', style: { margin: 0 } }, '16 columns on large screens, 8 on medium and 4 on small, with 32px gutters.')),
          h(C.AccordionItem, { title: 'Interface copy' }, h('p', { className: 'body-01', style: { margin: 0 } }, 'Sentence case everywhere, a verb first on buttons (“Deliver order”) and errors that say what to do.'))),
        h(C.CodeSnippet, { type: 'single', feedback: 'Copied' }, 'npm install @carbon/react'))
    );
  }

  function App() {
    var theme = useStored('theme', 'g10'), size = useStored('size', 'md'), zebra = useStored('zebra', false), tab = useStored('tab', 0);
    var rows = useState(SEED), toast = useState(null);
    useEffect(function () { document.body.setAttribute('data-theme', theme[0]); }, [theme[0]]);
    useEffect(function () { if (!toast[0]) return; var id = setTimeout(function () { toast[1](null); }, 5000); return function () { clearTimeout(id); }; }, [toast[0]]);
    function showToast(kind, title, sub) { toast[1]({ kind: kind, title: title, sub: sub, k: Date.now() }); }
    function setMany(ids, st) { rows[1](rows[0].map(function (r) { return ids.indexOf(r.id) > -1 ? Object.assign({}, r, { st: st }) : r; })); }
    function add(r) { var d = new Date(); rows[1]([Object.assign({ id: String(Date.now()), hora: ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) }, r)].concat(rows[0])); tab[1](0); }
    var ti = Math.max(0, THEMES.map(function (t) { return t[0]; }).indexOf(theme[0])), si = Math.max(0, SIZES.map(function (s) { return s[0]; }).indexOf(size[0]));

    return h(C.Theme, { theme: theme[0], className: 'lab' },
      h(C.Theme, { theme: 'g100' },
        h(C.Header, { 'aria-label': 'Carbon lab' },
          h(C.HeaderName, { href: '../index.html', prefix: 'Atlas' }, 'Carbon lab'),
          h(C.HeaderNavigation, { 'aria-label': 'Navigation' },
            h(C.HeaderMenuItem, { href: '../index.html' }, 'Atlas'),
            h(C.HeaderMenuItem, { href: '../compare.html' }, 'Compare'),
            h(C.HeaderMenuItem, { href: 'mantine.html' }, 'Mantine lab')),
          h(C.HeaderGlobalBar, null,
            h(C.HeaderGlobalAction, { 'aria-label': 'Back to the atlas', tooltipAlignment: 'end', onClick: function () { location.href = '../index.html'; } }, h(I.Home, { size: 20 }))))),
      h('main', { className: 'lab-main', id: 'main' },
        h('div', { className: 'lab-intro' },
          h('span', { className: 'lab-eyebrow' }, 'Atlas · real components · @carbon/react 1.120.0'),
          h('h1', { className: 'heading-06', style: { margin: 0 } }, 'Carbon in practice'),
          h('p', { className: 'body-01', style: { margin: 0, color: 'var(--text-secondary)' } }, 'This page runs the real Carbon, IBM’s system for professional software. Here it builds the orders panel of a fictional coffee shop. Switch the theme and the table density: they are the two decisions that weigh most on a work screen.')),
        h('div', { className: 'lab-controls' },
          h('div', null, h('span', { className: 'label-01', style: { color: 'var(--text-secondary)' } }, 'Theme: White and Gray 10 are light; Gray 90 and Gray 100 are dark'),
            h(C.ContentSwitcher, { selectedIndex: ti, size: 'md', onChange: function (e) { theme[1](THEMES[e.index][0]); } }, THEMES.map(function (t) { return h(C.Switch, { key: t[0], name: t[0], text: t[2] }); }))),
          h('div', null, h('span', { className: 'label-01', style: { color: 'var(--text-secondary)' } }, 'Row height: 24 · 32 · 40 · 48 · 64 px'),
            h(C.ContentSwitcher, { selectedIndex: si, size: 'md', onChange: function (e) { size[1](SIZES[e.index][0]); } }, SIZES.map(function (s) { return h(C.Switch, { key: s[0], name: s[0], text: s[1] }); }))),
          h('div', null, h(C.Toggle, { id: 'zebra', labelText: 'Zebra rows', labelA: 'No', labelB: 'Yes', toggled: zebra[0], onToggle: function (v) { zebra[1](v); } }))),
        h(C.Tabs, { selectedIndex: tab[0], onChange: function (s) { tab[1](s.selectedIndex); } },
          h(C.TabList, { 'aria-label': 'Lab sections' }, h(C.Tab, null, 'Orders'), h(C.Tab, null, 'New order'), h(C.Tab, null, 'Components')),
          h(C.TabPanels, null,
            h(C.TabPanel, { className: 'lab-tabpanel' }, h(Queue, { rows: rows[0], size: size[0], zebra: zebra[0], setMany: setMany, toast: showToast, onNew: function () { tab[1](1); } })),
            h(C.TabPanel, { className: 'lab-tabpanel' }, h(Form, { add: add, toast: showToast })),
            h(C.TabPanel, { className: 'lab-tabpanel' }, h(Gallery)))),
        h('p', { className: 'lab-foot' }, 'Carbon is Apache-2.0, © IBM. IBM Plex under the SIL Open Font License. Bundle taken from the “Carbon” design system in Claude Design.')),
      toast[0] ? h('div', { className: 'lab-toast', key: toast[0].k },
        h(C.ToastNotification, { kind: toast[0].kind, title: toast[0].title, subtitle: toast[0].sub, caption: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }), onClose: function () { toast[1](null); return false; } })) : null
    );
  }

  window.ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
