/* Laboratório Carbon — componentes reais do @carbon/react 1.120.0 sobre React 18, sem build. */
(function () {
  var React = window.React, C = window.Carbon, I = C.icons;
  var h = React.createElement, F = React.Fragment, useState = React.useState, useEffect = React.useEffect;

  function store(k, d) { try { var v = localStorage.getItem('atlas-carbon-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem('atlas-carbon-' + k, JSON.stringify(v)); } catch (e) {} }
  function useStored(k, d) { var s = useState(function () { return store(k, d); }); useEffect(function () { save(k, s[0]); }, [s[0]]); return s; }

  var THEMES = [['white', 'White', 'White'], ['g10', 'Gray 10', 'G10'], ['g90', 'Gray 90', 'G90'], ['g100', 'Gray 100', 'G100']];
  var SIZES = [['xs', 'XS'], ['sm', 'SM'], ['md', 'MD'], ['lg', 'LG'], ['xl', 'XL']];
  var TAG = { 'Na fila': 'blue', 'Prioridade': 'red', 'Pronto': 'green' };
  var HEADERS = [{ key: 'cli', header: 'Cliente' }, { key: 'item', header: 'Pedido' }, { key: 'tam', header: 'Tamanho' }, { key: 'st', header: 'Status' }, { key: 'hora', header: 'Horário' }];
  var SEED = [
    { id: '1', cli: 'Ana', item: 'Cappuccino', tam: 'M', st: 'Prioridade', hora: '08:41' },
    { id: '2', cli: 'Bruno', item: '2× Espresso duplo', tam: 'P', st: 'Na fila', hora: '08:38' },
    { id: '3', cli: 'Carla', item: 'Latte de aveia', tam: 'G', st: 'Prioridade', hora: '08:30' },
    { id: '4', cli: 'Diego', item: 'Cold brew', tam: 'G', st: 'Na fila', hora: '08:22' },
    { id: '5', cli: 'Elisa', item: '3× Pão de queijo', tam: 'P', st: 'Pronto', hora: '08:10' },
    { id: '6', cli: 'Fábio', item: 'Mocha', tam: 'M', st: 'Na fila', hora: '07:58' },
    { id: '7', cli: 'Gabi', item: 'Matcha latte', tam: 'M', st: 'Pronto', hora: '07:47' },
    { id: '8', cli: 'Hugo', item: '2× Flat white', tam: 'P', st: 'Na fila', hora: '07:40' }
  ];
  var BEBIDAS = ['Cappuccino', 'Espresso duplo', 'Latte de aveia', 'Flat white', 'Mocha', 'Cold brew', 'Chá-mate gelado', 'Matcha latte', 'Chocolate quente'];

  function Kpis(p) {
    var rows = p.rows, fila = rows.filter(function (r) { return r.st !== 'Pronto'; }).length, urg = rows.filter(function (r) { return r.st === 'Prioridade'; }).length, done = rows.length - fila;
    function k(label, n, v, helper) {
      return h(C.Tile, null, h('p', { className: 'label-01', style: { margin: 0, color: 'var(--text-secondary)' } }, label), h('p', { className: 'lab-kpi-n', style: { margin: 0 } }, n),
        v != null ? h(C.ProgressBar, { label: label + ' sobre o total', hideLabel: true, value: v, max: 100, size: 'small', helperText: helper }) : h('p', { className: 'helper-text-01', style: { margin: 0, color: 'var(--text-helper)' } }, helper));
    }
    return h('div', { className: 'lab-kpis' },
      k('Na fila', fila, Math.round(fila / rows.length * 100), 'aguardando preparo'),
      k('Prioridade', urg, Math.round(urg / rows.length * 100), 'passam na frente'),
      k('Entregues', done, Math.round(done / rows.length * 100), 'nesta manhã'),
      k('Tempo médio', '4 min', null, 'por pedido (exemplo)'));
  }

  function Queue(p) {
    var open = useState(null), rows = p.rows;
    var cur = open[0] ? rows.filter(function (r) { return r.id === open[0]; })[0] : null;
    return h(F, null,
      h(Kpis, { rows: rows }),
      h('div', { className: 'lab-scroll' },
        h(C.DataTable, { rows: rows, headers: HEADERS, isSortable: true, size: p.size, useZebraStyles: p.zebra }, function (t) {
          var batch = t.getBatchActionProps();
          return h(C.TableContainer, Object.assign({ title: 'Pedidos', description: rows.length + ' pedidos nesta manhã. Dados fictícios.' }, t.getTableContainerProps()),
            h(C.TableToolbar, t.getToolbarProps(),
              h(C.TableBatchActions, Object.assign({}, batch, { translateWithId: function (id, s) { return id === 'carbon.table.batch.cancel' ? 'Cancelar' : id === 'carbon.table.batch.items.selected' ? (s.totalSelected + ' selecionados') : id === 'carbon.table.batch.item.selected' ? '1 selecionado' : id === 'carbon.table.batch.selectAll' ? 'Selecionar todos' : id; } }),
                h(C.TableBatchAction, { renderIcon: I.Checkmark, tabIndex: batch.shouldShowBatchActions ? 0 : -1, onClick: function () { var ids = t.selectedRows.map(function (r) { return r.id; }); p.setMany(ids, 'Pronto'); p.toast('success', ids.length + ' pedidos entregues', 'Seleção marcada como pronta.'); batch.onCancel(); } }, 'Marcar pronto'),
                h(C.TableBatchAction, { renderIcon: I.WarningFilled, tabIndex: batch.shouldShowBatchActions ? 0 : -1, onClick: function () { var ids = t.selectedRows.map(function (r) { return r.id; }); p.setMany(ids, 'Prioridade'); batch.onCancel(); } }, 'Dar prioridade')),
              h(C.TableToolbarContent, { 'aria-hidden': batch.shouldShowBatchActions },
                h(C.TableToolbarSearch, { onChange: function (e, v) { t.onInputChange(e, v); }, persistent: true, placeholder: 'Buscar cliente ou bebida', tabIndex: batch.shouldShowBatchActions ? -1 : 0 }),
                h(C.Button, { kind: 'primary', size: p.size === 'xs' ? 'sm' : p.size === 'xl' ? 'lg' : p.size, renderIcon: I.Add, onClick: p.onNew, tabIndex: batch.shouldShowBatchActions ? -1 : 0 }, 'Novo pedido'))),
            h(C.Table, Object.assign({}, t.getTableProps(), { 'aria-label': 'Pedidos' }),
              h(C.TableHead, null, h(C.TableRow, null,
                h(C.TableSelectAll, t.getSelectionProps()),
                t.headers.map(function (hd) { var hp = t.getHeaderProps({ header: hd }); var key = hp.key; delete hp.key; return h(C.TableHeader, Object.assign({ key: key }, hp), hd.header); }),
                h(C.TableHeader, { 'aria-label': 'Ações' }))),
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
                    h(C.OverflowMenu, { size: p.size === 'xl' ? 'lg' : p.size === 'xs' ? 'sm' : p.size, flipped: true, 'aria-label': 'Ações', iconDescription: 'Ações' },
                      h(C.OverflowMenuItem, { itemText: 'Abrir', onClick: function () { open[1](r.id); } }),
                      h(C.OverflowMenuItem, { itemText: 'Dar prioridade', onClick: function () { p.setMany([r.id], 'Prioridade'); } }),
                      h(C.OverflowMenuItem, { itemText: 'Entregar pedido', hasDivider: true, onClick: function () { p.setMany([r.id], 'Pronto'); p.toast('success', 'Pedido entregue', r.cells[1].value + ' para ' + r.cells[0].value + '.'); } }))));
              }))));
        })),
      h(C.Modal, {
        open: !!cur, size: 'sm', modalLabel: cur ? 'Tamanho ' + cur.tam + ' · pedido às ' + cur.hora : '', modalHeading: cur ? cur.item : '',
        primaryButtonText: 'Entregar pedido', secondaryButtonText: 'Fechar',
        onRequestClose: function () { open[1](null); },
        onRequestSubmit: function () { p.setMany([cur.id], 'Pronto'); p.toast('success', 'Pedido entregue', cur.item + ' para ' + cur.cli + '.'); open[1](null); }
      }, cur ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } },
        h('p', { className: 'body-01', style: { margin: 0 } }, 'Pedido de ' + cur.cli + '. Status atual: ', h(C.Tag, { type: TAG[cur.st], size: 'sm' }, cur.st)),
        h(C.TextArea, { id: 'obs-modal', labelText: 'Observação', placeholder: 'Ex.: sem açúcar, leite vegetal', rows: 3 })) : null)
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
        p.add({ cli: cli[0].trim(), item: (qtd[0] > 1 ? qtd[0] + '× ' : '') + item[0], tam: tam[0], st: pri[0] ? 'Prioridade' : 'Na fila' });
        p.toast(pri[0] ? 'warning' : 'success', 'Pedido adicionado', item[0] + ' ' + tam[0] + (pri[0] ? ', com prioridade.' : '.'));
        setTimeout(function () { saving[1]('inactive'); cli[1](''); obs[1](''); pri[1](false); touched[1](false); }, 900);
      }, 800);
    }
    return h('form', { className: 'lab-form', onSubmit: submit, noValidate: true },
      h('div', null, h('h2', { className: 'heading-04', style: { margin: '0 0 .5rem' } }, 'Novo pedido'), h('p', { className: 'body-01', style: { margin: 0, color: 'var(--text-secondary)' } }, 'Formulário Carbon padrão: rótulo acima, campo com linha inferior, texto de ajuda abaixo e erro substituindo a ajuda.')),
      pri[0] ? h(C.InlineNotification, { kind: 'warning', lowContrast: true, hideCloseButton: true, title: 'Prioridade:', subtitle: 'o pedido passa na frente da fila e o barista é avisado.' }) : null,
      h('div', { className: 'lab-row2' },
        h(C.TextInput, { id: 'cli', labelText: 'Nome no copo', placeholder: 'Ex.: Lia', helperText: 'Só o primeiro nome.', value: cli[0], invalid: invalid, invalidText: 'Informe um nome.', onChange: function (e) { cli[1](e.target.value); }, onBlur: function () { touched[1](true); } }),
        h(C.NumberInput, { id: 'qtd', label: 'Quantidade', min: 1, max: 10, value: qtd[0], onChange: function (e, s) { if (s && s.value != null) qtd[1](s.value); }, iconDescription: 'Ajustar quantidade' })),
      h(C.Dropdown, { id: 'bebida', titleText: 'Bebida', label: 'Escolha a bebida', items: BEBIDAS, selectedItem: item[0], onChange: function (s) { if (s.selectedItem) item[1](s.selectedItem); } }),
      h(C.RadioButtonGroup, { legendText: 'Tamanho', name: 'tam', valueSelected: tam[0], onChange: function (v) { tam[1](v); } },
        [['P', 'P · 240 ml'], ['M', 'M · 350 ml'], ['G', 'G · 480 ml']].map(function (m) { return h(C.RadioButton, { key: m[0], id: 'tam-' + m[0], labelText: m[1], value: m[0] }); })),
      h(C.TextArea, { id: 'obs', labelText: 'Observação', helperText: 'Opcional. Vai impressa na etiqueta do copo.', rows: 3, value: obs[0], onChange: function (e) { obs[1](e.target.value); }, enableCounter: true, maxCount: 120 }),
      h(C.Checkbox, { id: 'viagem', labelText: 'Para viagem', checked: viagem[0], onChange: function (e, s) { viagem[1](s.checked); } }),
      h(C.Toggle, { id: 'pri', labelText: 'Prioridade', labelA: 'Não', labelB: 'Sim', toggled: pri[0], onToggle: function (v) { pri[1](v); } }),
      h('div', { style: { display: 'flex', gap: '1px', alignItems: 'center', flexWrap: 'wrap' } },
        h(C.Button, { kind: 'secondary', type: 'button', onClick: function () { cli[1](''); obs[1](''); pri[1](false); touched[1](false); } }, 'Limpar'),
        saving[0] === 'inactive' ? h(C.Button, { kind: 'primary', type: 'submit', renderIcon: I.Add }, 'Adicionar pedido') : h(C.InlineLoading, { style: { marginLeft: '1rem', width: 'auto' }, status: saving[0], description: saving[0] === 'active' ? 'Enviando…' : 'Adicionado' })));
  }

  var STEPS = [['Pedido', 'No caixa'], ['Preparo', 'Com o barista'], ['Pronto', 'No balcão'], ['Entregue', 'Com o cliente']];

  function Gallery() {
    var step = useState(1);
    return h('div', { className: 'lab-gallery' },
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Button · tipos'),
        h('div', { className: 'lab-flex' }, ['primary', 'secondary', 'tertiary', 'ghost', 'danger'].map(function (k) { return h(C.Button, { key: k, kind: k, size: 'md' }, k); })),
        h('div', { className: 'lab-flex' }, h(C.Button, { kind: 'primary', size: 'sm', renderIcon: I.Save }, 'sm 32'), h(C.Button, { kind: 'primary', size: 'md' }, 'md 40'), h(C.Button, { kind: 'primary', size: 'lg' }, 'lg 48'), h(C.IconButton, { label: 'Configurações', kind: 'ghost' }, h(I.Settings))),
        h('p', { className: 'helper-text-01', style: { margin: 0, color: 'var(--text-helper)' } }, 'Cantos retos, ícone à direita do texto e um único botão primário por tela.')),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Tag'),
        h('div', { className: 'lab-flex' }, ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray', 'high-contrast', 'outline'].map(function (t) { return h(C.Tag, { key: t, type: t }, t); }))),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Notificações'),
        h(C.InlineNotification, { kind: 'info', lowContrast: true, hideCloseButton: true, title: 'Estoque:', subtitle: 'restam 2 litros de leite de aveia.' }),
        h(C.InlineNotification, { kind: 'success', lowContrast: true, hideCloseButton: true, title: 'Pronto:', subtitle: 'pedido da Ana no balcão.' }),
        h(C.InlineNotification, { kind: 'error', hideCloseButton: true, title: 'Máquina 2 parada:', subtitle: 'use a máquina 1 até a manutenção chegar.' })),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'ProgressIndicator · caminho do pedido'),
        h('div', { className: 'lab-scroll' }, h(C.ProgressIndicator, { currentIndex: step[0], vertical: true, onChange: function (i) { step[1](i); } }, STEPS.map(function (s, i) { return h(C.ProgressStep, { key: i, label: s[0], secondaryLabel: s[1] }); }))),
        h('div', { className: 'lab-flex' }, h(C.Button, { kind: 'tertiary', size: 'sm', onClick: function () { step[1](Math.max(0, step[0] - 1)); } }, 'Voltar'), h(C.Button, { kind: 'primary', size: 'sm', onClick: function () { step[1](Math.min(3, step[0] + 1)); } }, 'Avançar'))),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Os quatro temas lado a lado'),
        h('div', { className: 'lab-themes' }, THEMES.map(function (t) { return h(C.Theme, { key: t[0], theme: t[0] }, h('div', null, h('span', { className: 'label-01' }, t[1]), h(C.Button, { size: 'sm', style: { paddingRight: '1rem', minWidth: 0, maxWidth: '100%' } }, 'Ação'), h(C.Tag, { type: 'blue', size: 'sm' }, 'Tag'))); }))),
      h('section', null, h('h3', { className: 'heading-02', style: { margin: 0 } }, 'Accordion · conceitos do Carbon'),
        h(C.Accordion, null,
          h(C.AccordionItem, { title: 'Camadas (layers)', open: true }, h('p', { className: 'body-01', style: { margin: 0 } }, 'Contêineres se empilham em tons: layer-01 sobre o fundo, layer-02 dentro dele. A separação vem do tom e de bordas de 1px, não de sombras.')),
          h(C.AccordionItem, { title: 'Grid 2x' }, h('p', { className: 'body-01', style: { margin: 0 } }, '16 colunas em telas grandes, 8 em médias e 4 em pequenas, com calhas de 32px.')),
          h(C.AccordionItem, { title: 'Texto de interface' }, h('p', { className: 'body-01', style: { margin: 0 } }, 'Caixa de frase em tudo, verbo no início dos botões ("Entregar pedido") e erros que dizem o que fazer.'))),
        h(C.CodeSnippet, { type: 'single', feedback: 'Copiado' }, 'npm install @carbon/react'))
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
        h(C.Header, { 'aria-label': 'Laboratório Carbon' },
          h(C.HeaderName, { href: '../index.html', prefix: 'Atlas' }, 'Laboratório Carbon'),
          h(C.HeaderNavigation, { 'aria-label': 'Navegação' },
            h(C.HeaderMenuItem, { href: '../index.html' }, 'Atlas'),
            h(C.HeaderMenuItem, { href: '../comparar.html' }, 'Comparar'),
            h(C.HeaderMenuItem, { href: 'mantine.html' }, 'Laboratório Mantine')),
          h(C.HeaderGlobalBar, null,
            h(C.HeaderGlobalAction, { 'aria-label': 'Voltar ao atlas', tooltipAlignment: 'end', onClick: function () { location.href = '../index.html'; } }, h(I.Home, { size: 20 }))))),
      h('main', { className: 'lab-main', id: 'main' },
        h('div', { className: 'lab-intro' },
          h('span', { className: 'lab-eyebrow' }, 'Atlas de Design · componentes reais · @carbon/react 1.120.0'),
          h('h1', { className: 'heading-06', style: { margin: 0 } }, 'Carbon na prática'),
          h('p', { className: 'body-01', style: { margin: 0, color: 'var(--text-secondary)' } }, 'Esta página roda o Carbon de verdade, o sistema da IBM para software profissional. Aqui ele monta o painel de pedidos de uma cafeteria fictícia. Troque o tema e a densidade da tabela: são as duas decisões que mais pesam numa tela de trabalho.')),
        h('div', { className: 'lab-controls' },
          h('div', null, h('span', { className: 'label-01', style: { color: 'var(--text-secondary)' } }, 'Tema: White e Gray 10 são claros; Gray 90 e Gray 100, escuros'),
            h(C.ContentSwitcher, { selectedIndex: ti, size: 'md', onChange: function (e) { theme[1](THEMES[e.index][0]); } }, THEMES.map(function (t) { return h(C.Switch, { key: t[0], name: t[0], text: t[2] }); }))),
          h('div', null, h('span', { className: 'label-01', style: { color: 'var(--text-secondary)' } }, 'Altura da linha: 24 · 32 · 40 · 48 · 64 px'),
            h(C.ContentSwitcher, { selectedIndex: si, size: 'md', onChange: function (e) { size[1](SIZES[e.index][0]); } }, SIZES.map(function (s) { return h(C.Switch, { key: s[0], name: s[0], text: s[1] }); }))),
          h('div', null, h(C.Toggle, { id: 'zebra', labelText: 'Linhas zebradas', labelA: 'Não', labelB: 'Sim', toggled: zebra[0], onToggle: function (v) { zebra[1](v); } }))),
        h(C.Tabs, { selectedIndex: tab[0], onChange: function (s) { tab[1](s.selectedIndex); } },
          h(C.TabList, { 'aria-label': 'Seções do laboratório' }, h(C.Tab, null, 'Pedidos'), h(C.Tab, null, 'Novo pedido'), h(C.Tab, null, 'Componentes')),
          h(C.TabPanels, null,
            h(C.TabPanel, { className: 'lab-tabpanel' }, h(Queue, { rows: rows[0], size: size[0], zebra: zebra[0], setMany: setMany, toast: showToast, onNew: function () { tab[1](1); } })),
            h(C.TabPanel, { className: 'lab-tabpanel' }, h(Form, { add: add, toast: showToast })),
            h(C.TabPanel, { className: 'lab-tabpanel' }, h(Gallery)))),
        h('p', { className: 'lab-foot' }, 'Carbon é Apache-2.0, © IBM. IBM Plex sob SIL Open Font License. Pacote vindo do design system "Carbon" do Claude Design.')),
      toast[0] ? h('div', { className: 'lab-toast', key: toast[0].k },
        h(C.ToastNotification, { kind: toast[0].kind, title: toast[0].title, subtitle: toast[0].sub, caption: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), onClose: function () { toast[1](null); return false; } })) : null
    );
  }

  window.ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
