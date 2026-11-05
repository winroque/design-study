/* Laboratório Mantine — componentes reais do @mantine/core 9.7.5, sem build (React.createElement). */
(function () {
  var React = window.React, M = window.Mantine, H = M.hooks || {};
  var h = React.createElement, F = React.Fragment, useState = React.useState, useEffect = React.useEffect, useMemo = React.useMemo;

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
    sign: ['M3 17c3-1 4-6 6-6s1 5 3 5 2-3 3-3 1 2 2 2', 'M3 21h18']
  };

  var COLORS = ['blue', 'indigo', 'violet', 'grape', 'pink', 'red', 'orange', 'teal', 'green', 'cyan'];
  var RADII = ['xs', 'sm', 'md', 'lg', 'xl'];
  var VARIANTS = ['filled', 'light', 'outline', 'subtle', 'default', 'gradient'];
  var SIZES = ['xs', 'sm', 'md', 'lg'];
  var ST = { Fila: 'blue', Urgente: 'red', Pronto: 'teal' };

  var SEED = [
    { id: 1, pac: 'M. A. S.', idade: 54, exame: 'TC de crânio', mod: 'TC', st: 'Urgente', hora: '22:41' },
    { id: 2, pac: 'J. P. R.', idade: 31, exame: 'RX de tórax', mod: 'RX', st: 'Fila', hora: '22:38' },
    { id: 3, pac: 'L. C. M.', idade: 67, exame: 'Angio-TC de tórax', mod: 'TC', st: 'Urgente', hora: '22:30' },
    { id: 4, pac: 'A. B. F.', idade: 45, exame: 'US de abdome total', mod: 'US', st: 'Fila', hora: '22:22' },
    { id: 5, pac: 'R. T. O.', idade: 72, exame: 'TC de abdome', mod: 'TC', st: 'Pronto', hora: '22:10' },
    { id: 6, pac: 'C. D. L.', idade: 28, exame: 'RM de joelho', mod: 'RM', st: 'Fila', hora: '21:58' },
    { id: 7, pac: 'F. N. G.', idade: 59, exame: 'TC de coluna lombar', mod: 'TC', st: 'Pronto', hora: '21:47' },
    { id: 8, pac: 'P. H. A.', idade: 39, exame: 'RX de punho', mod: 'RX', st: 'Fila', hora: '21:40' },
    { id: 9, pac: 'S. M. V.', idade: 81, exame: 'TC de crânio', mod: 'TC', st: 'Pronto', hora: '21:31' },
    { id: 10, pac: 'G. E. K.', idade: 50, exame: 'RM de crânio', mod: 'RM', st: 'Fila', hora: '21:15' }
  ];

  function Label(p) { return h(M.Text, { size: 'xs', fw: 600, tt: 'uppercase', c: 'dimmed', style: { letterSpacing: '.04em' } }, p.children); }

  function CodeView(p) {
    var t = p.theme;
    var lines = [
      ['k', "import "], ['', "{ MantineProvider, createTheme } "], ['k', "from "], ['', "'@mantine/core';\n\n"],
      ['k', "const "], ['', "theme = createTheme({\n  primaryColor: '" + t.color + "',\n  defaultRadius: '" + t.radius + "',\n});\n\n"],
      ['', "<MantineProvider theme={theme} forceColorScheme=\"" + t.scheme + "\">\n  <Button variant=\"" + t.variant + "\" size=\"" + t.size + "\">\n    Salvar laudo\n  </Button>\n</MantineProvider>"]
    ];
    return h('pre', { className: 'lab-code', 'aria-label': 'Código equivalente' }, lines.map(function (l, i) { return h('span', { key: i, className: l[0] }, l[1]); }));
  }

  function ThemePanel(p) {
    var t = p.theme, set = p.set;
    return h(M.Paper, { withBorder: true, p: 'md' },
      h(M.Stack, { gap: 'md' },
        h(M.Title, { order: 4 }, 'Tema'),
        h(M.Text, { size: 'sm', c: 'dimmed' }, 'Tudo nesta página vem de um único objeto de tema. Mude os valores e veja os componentes reagirem.'),
        h(M.Stack, { gap: 6 }, h(Label, null, 'primaryColor'),
          h(M.Group, { gap: 6 }, COLORS.map(function (c) {
            return h(M.Tooltip, { key: c, label: c, withArrow: true },
              h(M.ColorSwatch, { component: 'button', type: 'button', color: 'var(--mantine-color-' + c + '-filled)', size: 28, onClick: function () { set('color', c); }, 'aria-label': 'Cor ' + c, 'aria-pressed': t.color === c, style: { color: '#fff', cursor: 'pointer' } }, t.color === c ? h(M.CheckIcon, { size: 12 }) : null));
          }))),
        h(M.Stack, { gap: 6 }, h(Label, null, 'defaultRadius'), h(M.SegmentedControl, { fullWidth: true, size: 'xs', data: RADII, value: t.radius, onChange: function (v) { set('radius', v); } })),
        h(M.Stack, { gap: 6 }, h(Label, null, 'Tamanho dos controles'), h(M.SegmentedControl, { fullWidth: true, size: 'xs', data: SIZES, value: t.size, onChange: function (v) { set('size', v); } }),
          h(M.Text, { size: 'xs', c: 'dimmed' }, 'xs 30px · sm 36px · md 42px · lg 50px de altura. Em telas de trabalho, xs ou sm deixam tudo mais denso.')),
        h(M.Select, { label: 'Variante do botão principal', size: 'sm', data: VARIANTS, value: t.variant, onChange: function (v) { if (v) set('variant', v); }, allowDeselect: false }),
        h(M.Stack, { gap: 6 }, h(Label, null, 'Código equivalente'), h(CodeView, { theme: t }))
      ));
  }

  function Stat(p) {
    return h(M.Paper, { withBorder: true, p: 'md' },
      h(M.Group, { justify: 'space-between', wrap: 'nowrap' },
        h('div', null, h(M.Text, { size: 'xs', c: 'dimmed', tt: 'uppercase', fw: 700 }, p.label), h(M.Text, { fw: 700, size: 'xl' }, p.value), p.sub ? h(M.Text, { size: 'xs', c: 'dimmed' }, p.sub) : null),
        p.ring != null ? h(M.RingProgress, { size: 56, thickness: 6, roundCaps: true, sections: [{ value: p.ring, color: p.color || 'var(--mantine-primary-color-filled)' }] }) : null));
  }

  function Queue(p) {
    var rows = p.rows, t = p.theme;
    var q = useState(''), f = useState('Todos'), page = useState(1), open = useState(null);
    var filtered = rows.filter(function (r) {
      var okS = f[0] === 'Todos' || r.st === f[0];
      var s = q[0].trim().toLowerCase();
      return okS && (!s || (r.pac + ' ' + r.exame + ' ' + r.mod).toLowerCase().indexOf(s) > -1);
    });
    var per = 6, total = Math.max(1, Math.ceil(filtered.length / per)), pg = Math.min(page[0], total);
    var shown = filtered.slice((pg - 1) * per, pg * per);
    var fila = rows.filter(function (r) { return r.st !== 'Pronto'; }).length, urg = rows.filter(function (r) { return r.st === 'Urgente'; }).length, done = rows.length - fila;
    var cur = open[0] != null ? rows.filter(function (r) { return r.id === open[0]; })[0] : null;

    return h(M.Stack, { gap: 'md' },
      h(M.SimpleGrid, { cols: { base: 1, xs: 2, lg: 4 }, spacing: 'sm' },
        h(Stat, { label: 'Na fila', value: fila, sub: 'aguardando laudo', ring: Math.round(fila / rows.length * 100) }),
        h(Stat, { label: 'Urgentes', value: urg, sub: 'prioridade máxima', ring: Math.round(urg / rows.length * 100), color: 'red' }),
        h(Stat, { label: 'Laudados', value: done, sub: 'neste plantão', ring: Math.round(done / rows.length * 100), color: 'teal' }),
        h(Stat, { label: 'Tempo médio', value: '14 min', sub: 'por exame (exemplo)' })),
      h(M.Group, { justify: 'space-between', gap: 'sm' },
        h(M.TextInput, { size: t.size, placeholder: 'Buscar paciente ou exame', leftSection: icon(I.search), value: q[0], onChange: function (e) { q[1](e.currentTarget.value); page[1](1); }, style: { flex: '1 1 220px' }, 'aria-label': 'Buscar' }),
        h(M.SegmentedControl, { size: t.size, data: ['Todos', 'Fila', 'Urgente', 'Pronto'], value: f[0], onChange: function (v) { f[1](v); page[1](1); } })),
      h(M.Paper, { withBorder: true },
        h(M.Table.ScrollContainer, { minWidth: 620 },
          h(M.Table, { striped: true, highlightOnHover: true, verticalSpacing: t.size, horizontalSpacing: 'md' },
            h(M.Table.Thead, null, h(M.Table.Tr, null, ['Paciente', 'Exame', 'Modalidade', 'Status', 'Chegada', ''].map(function (c, i) { return h(M.Table.Th, { key: i }, c); }))),
            h(M.Table.Tbody, null, shown.length ? shown.map(function (r) {
              return h(M.Table.Tr, { key: r.id, className: 'lab-row', onClick: function () { open[1](r.id); } },
                h(M.Table.Td, null, h(M.Group, { gap: 'sm', wrap: 'nowrap' }, h(M.Avatar, { size: 'sm', color: ST[r.st], radius: 'xl' }, r.pac.replace(/[^A-Z]/g, '').slice(0, 2)), h('div', null, h(M.Text, { size: 'sm', fw: 600 }, r.pac), h(M.Text, { size: 'xs', c: 'dimmed' }, r.idade + ' anos')))),
                h(M.Table.Td, null, r.exame),
                h(M.Table.Td, null, h(M.Badge, { variant: 'outline', color: 'gray' }, r.mod)),
                h(M.Table.Td, null, h(M.Badge, { variant: r.st === 'Urgente' ? 'filled' : 'light', color: ST[r.st] }, r.st)),
                h(M.Table.Td, null, h(M.Text, { size: 'sm', ff: 'monospace' }, r.hora)),
                h(M.Table.Td, { onClick: function (e) { e.stopPropagation(); } },
                  h(M.Menu, { position: 'bottom-end', shadow: 'md', withinPortal: true },
                    h(M.Menu.Target, null, h(M.ActionIcon, { variant: 'subtle', color: 'gray', 'aria-label': 'Ações de ' + r.pac }, icon(I.dots))),
                    h(M.Menu.Dropdown, null,
                      h(M.Menu.Label, null, r.exame),
                      h(M.Menu.Item, { leftSection: icon(I.eye, 14), onClick: function () { open[1](r.id); } }, 'Abrir'),
                      h(M.Menu.Item, { leftSection: icon(I.flame, 14), onClick: function () { p.setSt(r.id, 'Urgente'); } }, 'Marcar urgente'),
                      h(M.Menu.Divider),
                      h(M.Menu.Item, { color: 'teal', leftSection: icon(I.check, 14), onClick: function () { p.setSt(r.id, 'Pronto'); p.toast('Laudo assinado', r.exame + ' de ' + r.pac + ' liberado.', 'teal'); } }, 'Assinar laudo')))));
            }) : h(M.Table.Tr, null, h(M.Table.Td, { colSpan: 6 }, h(M.Text, { c: 'dimmed', ta: 'center', py: 'lg', size: 'sm' }, 'Nenhum exame encontrado para esse filtro.'))))))),
      h(M.Group, { justify: 'space-between' },
        h(M.Text, { size: 'sm', c: 'dimmed' }, filtered.length + ' exames · toque numa linha para abrir'),
        h(M.Pagination, { total: total, value: pg, onChange: page[1], size: 'sm' })),
      h(M.Modal, { opened: !!cur, onClose: function () { open[1](null); }, title: cur ? cur.exame : '', centered: true },
        cur ? h(M.Stack, { gap: 'sm' },
          h(M.Group, { gap: 'xs' }, h(M.Badge, { variant: 'outline', color: 'gray' }, cur.mod), h(M.Badge, { variant: 'light', color: ST[cur.st] }, cur.st), h(M.Text, { size: 'sm', c: 'dimmed' }, 'chegou às ' + cur.hora)),
          h(M.Text, { size: 'sm' }, 'Paciente ' + cur.pac + ', ' + cur.idade + ' anos. Dados fictícios para demonstração.'),
          h(M.Textarea, { label: 'Impressão', placeholder: 'Digite a conclusão do laudo', autosize: true, minRows: 3, size: t.size }),
          h(M.Group, { justify: 'flex-end', mt: 'sm' },
            h(M.Button, { variant: 'default', size: t.size, onClick: function () { open[1](null); } }, 'Fechar'),
            h(M.Button, { variant: t.variant, size: t.size, leftSection: icon(I.sign), onClick: function () { p.setSt(cur.id, 'Pronto'); p.toast('Laudo assinado', cur.exame + ' de ' + cur.pac + ' liberado.', 'teal'); open[1](null); } }, 'Assinar laudo'))) : null)
    );
  }

  function NewReport(p) {
    var t = p.theme;
    var pac = useState('M. A. S.'), idade = useState(54), ex = useState('TC de crânio'), mod = useState('TC'), achado = useState(''), cmp = useState(true), urg = useState(false), saving = useState(false);
    var filled = [pac[0].trim(), String(idade[0] || ''), ex[0], achado[0].trim()].filter(Boolean).length;
    var pct = Math.round(filled / 4 * 100);
    function submit() {
      if (!pac[0].trim()) return;
      saving[1](true);
      setTimeout(function () {
        saving[1](false);
        p.add({ pac: pac[0].trim(), idade: idade[0] || 0, exame: ex[0], mod: mod[0], st: urg[0] ? 'Urgente' : 'Fila' });
        p.toast('Exame adicionado à fila', ex[0] + ' de ' + pac[0].trim() + (urg[0] ? ' como urgente.' : '.'), urg[0] ? 'red' : (t.color));
        achado[1]('');
      }, 700);
    }
    return h(M.Paper, { withBorder: true, p: 'lg', component: 'form', onSubmit: function (e) { e.preventDefault(); submit(); } },
      h(M.Stack, { gap: 'md' },
        h(M.Group, { justify: 'space-between', align: 'flex-start' },
          h('div', null, h(M.Title, { order: 3 }, 'Novo laudo'), h(M.Text, { size: 'sm', c: 'dimmed' }, 'O formulário usa o tamanho e a variante escolhidos no painel de tema.')),
          h(M.Group, { gap: 6 }, h(M.Badge, { variant: 'light' }, 'Rascunho'), urg[0] ? h(M.Badge, { color: 'red', variant: 'filled' }, 'Urgente') : null)),
        h(M.SimpleGrid, { cols: { base: 1, sm: 2 }, spacing: 'md' },
          h(M.TextInput, { label: 'Paciente', required: true, size: t.size, value: pac[0], onChange: function (e) { pac[1](e.currentTarget.value); }, error: pac[0].trim() ? null : 'Informe o paciente' }),
          h(M.NumberInput, { label: 'Idade', size: t.size, min: 0, max: 120, suffix: ' anos', value: idade[0], onChange: idade[1] })),
        h(M.Select, { label: 'Exame', size: t.size, searchable: true, data: ['TC de crânio', 'TC de tórax', 'Angio-TC de tórax', 'TC de abdome', 'RM de crânio', 'RM de joelho', 'US de abdome total', 'RX de tórax'], value: ex[0], onChange: function (v) { if (v) { ex[1](v); mod[1](v.split(' ')[0].replace('Angio-', '')); } }, allowDeselect: false }),
        h(M.Stack, { gap: 4 }, h(M.Text, { size: 'sm', fw: 600 }, 'Modalidade'), h(M.SegmentedControl, { size: t.size, data: ['TC', 'RM', 'US', 'RX'], value: mod[0], onChange: mod[1] })),
        h(M.Textarea, { label: 'Achado principal', description: 'Uma frase. O texto completo vai no editor de laudo.', size: t.size, autosize: true, minRows: 2, placeholder: 'Ex.: hematoma subdural agudo à esquerda, 8 mm', value: achado[0], onChange: function (e) { achado[1](e.currentTarget.value); } }),
        h(M.Group, { gap: 'xl' },
          h(M.Checkbox, { label: 'Comparar com exame anterior', size: t.size === 'lg' ? 'md' : 'sm', checked: cmp[0], onChange: function (e) { cmp[1](e.currentTarget.checked); } }),
          h(M.Switch, { label: 'Laudo urgente', color: 'red', size: t.size === 'lg' ? 'md' : 'sm', checked: urg[0], onChange: function (e) { urg[1](e.currentTarget.checked); } })),
        h(M.Stack, { gap: 4 }, h(M.Group, { justify: 'space-between' }, h(M.Text, { size: 'sm', c: 'dimmed' }, 'Preenchimento'), h(M.Text, { size: 'sm', c: 'dimmed' }, pct + '%')), h(M.Progress, { value: pct, size: 'sm', color: pct === 100 ? 'teal' : undefined, transitionDuration: 300 })),
        h(M.Group, { justify: 'flex-end' },
          h(M.Button, { variant: 'default', size: t.size, onClick: function () { achado[1](''); urg[1](false); } }, 'Descartar'),
          h(M.Button, { type: 'submit', variant: t.variant, size: t.size, loading: saving[0], leftSection: icon(I.plus), gradient: { from: t.color, to: 'cyan', deg: 45 } }, 'Adicionar à fila'))));
  }

  var STEPS = [['Aquisição', 'Imagens no PACS'], ['Laudo', 'Em digitação'], ['Revisão', 'Segunda leitura'], ['Liberado', 'Disponível ao médico']];

  function Gallery(p) {
    var t = p.theme;
    var step = useState(1), chips = useState(['TC', 'RM']), rate = useState(4), sl = useState(40);
    return h(M.SimpleGrid, { cols: { base: 1, md: 2 }, spacing: 'md' },
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Button · todas as variantes'),
        h(M.Group, { gap: 'xs' }, VARIANTS.map(function (v) { return h(M.Button, { key: v, variant: v, size: t.size, gradient: { from: t.color, to: 'cyan', deg: 45 } }, v); })),
        h(M.Group, { gap: 'xs' }, h(M.Button, { loading: true, size: t.size }, 'loading'), h(M.Button, { disabled: true, size: t.size }, 'disabled'), h(M.Button, { color: 'red', size: t.size }, 'Excluir'), h(M.Button.Group, null, h(M.Button, { variant: 'default', size: t.size }, 'TC'), h(M.Button, { variant: 'default', size: t.size }, 'RM'), h(M.Button, { variant: 'default', size: t.size }, 'US'))))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Badge, ActionIcon e Avatar'),
        h(M.Group, { gap: 'xs' }, ['filled', 'light', 'outline', 'dot', 'default', 'transparent'].map(function (v) { return h(M.Badge, { key: v, variant: v }, v); })),
        h(M.Group, { gap: 'xs' }, ['filled', 'light', 'outline', 'subtle', 'default'].map(function (v) { return h(M.ActionIcon, { key: v, variant: v, size: 'lg', 'aria-label': v }, icon(I.pen)); })),
        h(M.Avatar.Group, null, ['WS', 'NA', 'RD', 'MA'].map(function (x, i) { return h(M.Avatar, { key: x, radius: 'xl', color: COLORS[i * 2] }, x); }), h(M.Avatar, { radius: 'xl' }, '+5')))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Alert'),
        h(M.Alert, { variant: 'light', color: 'blue', title: 'Exame anterior disponível', icon: icon(I.info) }, 'TC de crânio de 12/08/2026 pode ser usada para comparação.'),
        h(M.Alert, { variant: 'light', color: 'red', title: 'Achado crítico', icon: icon(I.alert) }, 'Comunique o médico assistente e registre o horário no laudo.'))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Stepper · fluxo do laudo'),
        h(M.Stepper, { active: step[0], onStepClick: step[1], size: 'sm', orientation: 'vertical' }, STEPS.map(function (s, i) { return h(M.Stepper.Step, { key: i, label: s[0], description: s[1] }); })),
        h(M.Group, null, h(M.Button, { variant: 'default', size: 'xs', onClick: function () { step[1](Math.max(0, step[0] - 1)); } }, 'Voltar'), h(M.Button, { size: 'xs', variant: t.variant, gradient: { from: t.color, to: 'cyan', deg: 45 }, onClick: function () { step[1](Math.min(4, step[0] + 1)); } }, 'Avançar')))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Chip, Slider, Rating e Loader'),
        h(M.Chip.Group, { multiple: true, value: chips[0], onChange: chips[1] }, h(M.Group, { gap: 'xs' }, ['TC', 'RM', 'US', 'RX', 'MG'].map(function (c) { return h(M.Chip, { key: c, value: c, size: 'sm' }, c); }))),
        h(M.Text, { size: 'sm' }, 'Janela de contraste: ', h('b', null, sl[0])),
        h(M.Slider, { value: sl[0], onChange: sl[1], marks: [{ value: 20, label: 'pulmão' }, { value: 50, label: 'partes moles' }, { value: 80, label: 'osso' }], mb: 'lg', 'aria-label': 'Janela' }),
        h(M.Group, { justify: 'space-between' }, h(M.Rating, { value: rate[0], onChange: rate[1] }), h(M.Group, { gap: 'md' }, h(M.Loader, { size: 'sm' }), h(M.Loader, { size: 'sm', type: 'bars' }), h(M.Loader, { size: 'sm', type: 'dots' }))))),
      h(M.Paper, { withBorder: true, p: 'md' }, h(M.Stack, { gap: 'sm' }, h(M.Title, { order: 5 }, 'Accordion e Kbd'),
        h(M.Accordion, { variant: 'separated', defaultValue: 'tema' },
          h(M.Accordion.Item, { value: 'tema' }, h(M.Accordion.Control, null, 'Por que tudo muda junto?'), h(M.Accordion.Panel, null, h(M.Text, { size: 'sm' }, 'Cada componente lê variáveis CSS como --mantine-primary-color-filled e --mantine-radius-default. O MantineProvider reescreve essas variáveis quando o tema muda.'))),
          h(M.Accordion.Item, { value: 'atalhos' }, h(M.Accordion.Control, null, 'Atalhos de teclado'), h(M.Accordion.Panel, null, h(M.Group, { gap: 6 }, h(M.Kbd, null, '⌘'), '+', h(M.Kbd, null, 'K'), h(M.Text, { size: 'sm', c: 'dimmed' }, 'abre a busca no pacote @mantine/spotlight')))))))
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
              h(M.ActionIcon, { component: 'a', href: '../index.html', variant: 'default', size: 'lg', 'aria-label': 'Voltar ao atlas' }, icon(I.back)),
              h(M.Title, { order: 4, style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, 'Laboratório Mantine'),
              h(M.Badge, { variant: 'light', visibleFrom: 'sm' }, '@mantine/core 9.7.5')),
            h(M.Group, { gap: 'xs', wrap: 'nowrap' },
              h(M.Anchor, { href: 'carbon.html', size: 'sm', visibleFrom: 'sm' }, 'Ver o Carbon'),
              h(M.SegmentedControl, { size: 'xs', data: [{ label: 'Claro', value: 'light' }, { label: 'Escuro', value: 'dark' }], value: t.scheme, onChange: function (v) { set('scheme', v); } })))),
        h(M.AppShell.Main, null,
          h(M.Container, { size: 'xl', px: 0 },
            h(M.Stack, { gap: 'lg' },
              h(M.Stack, { gap: 4 },
                h(M.Text, { size: 'xs', fw: 700, tt: 'uppercase', c: 'dimmed', style: { letterSpacing: '.08em' } }, 'Atlas de Design · componentes reais'),
                h(M.Title, { order: 1 }, 'Mantine na prática'),
                h(M.Text, { c: 'dimmed', maw: 720 }, 'Esta página não imita o Mantine: ela roda a biblioteca de verdade. Mude o tema no painel e veja a fila de laudos, o formulário e a galeria reagirem. Os dados de pacientes são fictícios.')),
              h(M.SimpleGrid, { cols: { base: 1, md: 3 }, spacing: 'lg' },
                h('div', { style: { gridColumn: 'span 1' } }, h(ThemePanel, { theme: t, set: set })),
                h('div', { className: 'lab-span2' },
                  h(M.Tabs, { value: tab[0], onChange: function (v) { if (v) tab[1](v); }, keepMounted: false },
                    h(M.Tabs.List, { mb: 'md' },
                      h(M.Tabs.Tab, { value: 'fila', leftSection: icon(I.list, 14) }, 'Fila de laudos'),
                      h(M.Tabs.Tab, { value: 'novo', leftSection: icon(I.pen, 14) }, 'Novo laudo'),
                      h(M.Tabs.Tab, { value: 'galeria', leftSection: icon(I.grid, 14) }, 'Componentes')),
                    h(M.Tabs.Panel, { value: 'fila' }, h(Queue, { rows: rows[0], theme: t, setSt: setSt, toast: showToast })),
                    h(M.Tabs.Panel, { value: 'novo' }, h(NewReport, { theme: t, add: add, toast: function (a, b, c) { showToast(a, b, c); tab[1]('fila'); } })),
                    h(M.Tabs.Panel, { value: 'galeria' }, h(Gallery, { theme: t }))))),
              h(M.Text, { size: 'xs', c: 'dimmed' }, 'Mantine é MIT, © Vitaly Rtishchev. Pacote vindo do design system "Mantine" do Claude Design.')))),
        toast[0] ? h('div', { className: 'lab-toast', key: toast[0].k, role: 'status' },
          h(M.Notification, { title: toast[0].title, color: toast[0].color, onClose: function () { toast[1](null); }, withBorder: true, icon: icon(I.check), radius: 'md' }, toast[0].msg)) : null
      ));
  }

  var css = document.createElement('style');
  css.textContent = '@media (min-width:62em){.lab-span2{grid-column:span 2}}';
  document.head.appendChild(css);
  window.ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
