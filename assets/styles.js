(function () {
  var A = window.Atlas, esc = A.esc, el = A.el;

  /* Ordem cronológica. Cada amostra é a mesma ficha de pedido de uma cafeteria. */
  var S = [
    { k: 'bauhaus', n: 'Bauhaus', era: '1919 – 1933', t: 'Philosophy',
      deco: '<div class="deco c1"></div><div class="deco c2"></div><div class="deco c3"></div>',
      idea: 'The German school that joined art, craft and industry. Pure geometric forms, primary colors and function dictating form. Almost all modern design passes through here.',
      pro: 'Geometric clarity and a very strong identity', con: 'Turns into pastiche when used only as decoration', onde: 'Posters, visual identities, museum and school websites', use: 'Cultural brands and educational material',
      signs: ['Circle, square and triangle as elements', 'Red, blue and yellow with black', 'Geometric sans serif type, like Futura'],
      css: '.shape-1 { border-radius: 50%; background: #d62828; }\n.shape-2 { background: #1d3f8f; }\n.shape-3 { /* a triangle made of borders */\n  border-left: 60px solid transparent;\n  border-right: 60px solid transparent;\n  border-bottom: 104px solid #f2b705; }' },
    { k: 'suico', n: 'Swiss Style', era: '1950 →', t: 'Philosophy', title: 'New order.', done: 'Order placed.',
      deco: '<div class="deco bar"></div>',
      idea: 'Mathematical grid, sans serif type and asymmetry. Information is the ornament. Born in graphic design, it is the intellectual root of flat.',
      pro: 'Maximum clarity, ages very well, works with any text content', con: 'Can feel cold; depends on good type and good content', onde: 'Editorial sites, portfolios, signage, data design', use: 'Text-heavy content, sober brands, teaching material',
      signs: ['Visible or implied grid, flush-left alignment', 'Helvetica or similar, big tight headings', 'A single accent color, usually red'],
      css: '.title { font: 700 38px/0.95 Helvetica, sans-serif;\n  letter-spacing: -0.045em; }\n.field  { border: 0; border-bottom: 2px solid #000; }\n.button { background: #000; color: #fff;\n  border-radius: 0; text-align: left; }' },
    { k: 'memphis', n: 'Memphis', era: '1981 → (revived in the 2010s)', t: 'Style',
      deco: '<svg class="deco zig" viewBox="0 0 150 40" aria-hidden="true"><polyline points="0,30 15,10 30,30 45,10 60,30 75,10 90,30 105,10 120,30 135,10 150,30" fill="none" stroke="#ff6ec7" stroke-width="6"/></svg><div class="deco tri"></div><div class="deco dot"></div>',
      idea: 'A Milan design group led by Ettore Sottsass that challenged good taste with squiggles, polka dots, loud colors and crooked shapes. It came back strong in 2010s apps and illustration.',
      pro: 'Cheerful, memorable, escapes the corporate look', con: 'Noisy; gets in the way of dense reading', onde: 'Editorial illustration, music and education apps, packaging', use: 'Young brands, events, campaigns',
      signs: ['Polka-dot and zigzag patterns', 'Pink, turquoise and yellow with black outlines', 'Slightly rotated elements'],
      css: '.background { background-image:\n  radial-gradient(#111 1.5px, transparent 1.6px);\n  background-size: 22px 22px; }\n.card { box-shadow: 10px 10px 0 #00c2b8;\n  transform: rotate(-1.5deg); }' },
    { k: 'cyber', n: 'Cyberpunk / HUD', era: '1982 →', t: 'Style',
      idea: 'The interface of a dystopian future: neon on black, cut corners, scanlines and text that jitters. It comes from film, from Blade Runner on, and from games.',
      pro: 'Immersive and atmospheric', con: 'Aggressive contrast is tiring; small text suffers', onde: 'Games, tech landing pages, demos', use: 'Gaming products and immersive experiences',
      signs: ['Neon cyan, magenta and yellow on black', 'Chamfered corners', 'Scanlines and a background grid'],
      css: '.panel { clip-path: polygon(16px 0, 100% 0,\n  100% calc(100% - 16px), calc(100% - 16px) 100%,\n  0 100%, 0 16px); }\n.button:hover { text-shadow: 2px 0 #ff2a6d,\n  -2px 0 #00f0ff; }' },
    { k: 'pixel', n: 'Pixel / 8-bit', era: '1985 → (NES.css, 2018)', t: 'Style',
      idea: 'The look of 8-bit consoles: pixel font, thick borders and hard shadows inside the buttons. Libraries like NES.css brought it to the web.',
      pro: 'Nostalgic, fun, instantly recognizable', con: 'The font is hard to read in long passages', onde: 'Indie games, portfolios, event pages', use: 'Playful products and gaming communities',
      signs: ['A bitmap font, like Press Start 2P', 'Thick borders with no rounding', 'A dark inner shadow in the lower corner of the button'],
      css: '.button { border: 4px solid #000;\n  box-shadow: inset -4px -4px 0 #006bb3; }\n.button:active { box-shadow: inset 4px 4px 0 #006bb3; }\n/* pressing = moving the shadow to the other side */' },
    { k: 'contraste', n: 'High contrast', era: '1999 → (WCAG 1.0)', t: 'Philosophy',
      idea: 'Accessibility taken seriously: maximum contrast, large text, focus you cannot miss and no information carried by color alone. Windows, macOS and Android all have modes like this.',
      pro: 'Readable for almost everyone, even in bright sun', con: 'Little room for brand identity', onde: 'Accessibility modes, public services, kiosks', use: 'As an alternative mode in any product',
      signs: ['Pure black and white, yellow for focus and action', 'Large, bold text', 'A thick focus ring set away from the element'],
      css: '.button { background: #ff0; color: #000;\n  font-size: 18px; text-decoration: underline; }\n:focus-visible { outline: 4px solid #ff0;\n  outline-offset: 3px; }\n/* yellow on black: 19.6:1 contrast */' },
    { k: 'y2k', n: 'Chrome Y2K', era: '1998 – 2004 (revived 2020 →)', t: 'Style',
      deco: '<div class="deco star" style="left:10%;top:12%">✦</div><div class="deco star" style="right:12%;top:20%;font-size:22px">✦</div><div class="deco star" style="left:18%;bottom:12%;font-size:26px">✧</div>',
      idea: 'The optimism of the turn of the millennium: chrome metal, translucent plastic, iridescent shine and little stars. Phones, MP3 players and music sites looked like this, and Gen Z brought it back.',
      pro: 'Shiny and nostalgic', con: 'Unstable contrast; everything shines at once', onde: 'Fashion, music, youth campaigns', use: 'Brand pieces and social media',
      signs: ['Chrome text with a metallic gradient', 'Iridescent pink, blue and green gradients', 'Very rounded corners and inner shine'],
      css: '.title { background: linear-gradient(#fff 0%,\n  #a9b4c6 42%, #2e3a4d 50%, #eef2f8 100%);\n  -webkit-background-clip: text; color: transparent; }\n/* the color jump at 50% imitates the reflection on metal */' },
    { k: 'aqua', n: 'Aqua', era: '2001 – 2014', t: 'Style',
      idea: 'Skeuomorphism of idealized materials: gel, droplets, translucent plastic and striped backgrounds. It was the face of Mac OS X for more than a decade.',
      pro: 'Striking, tactile, very strong identity', con: 'Heavy to render and to maintain', onde: 'Mac OS X up to Yosemite; today a nostalgic reference', use: 'Retro pieces or tributes',
      signs: ['Gel buttons with a reflection on the top half', 'Three colored dots in the window bar', 'A background of thin horizontal stripes'],
      css: '.button { border-radius: 20px;\n  background: linear-gradient(#a9d4ff 0%, #4a9be8 50%,\n    #2f7fd6 51%, #7cc0ff 100%); }\n/* the cut at 50%/51% creates the gel reflection */' },
    { k: 'aero', n: 'Frutiger Aero', era: '2004 – 2013', t: 'Style',
      deco: '<div class="deco bub" style="width:70px;height:70px;left:8%;top:12%"></div><div class="deco bub" style="width:40px;height:40px;right:12%;top:8%"></div><div class="deco bub" style="width:56px;height:56px;right:6%;bottom:16%"></div>',
      idea: 'Sky, water, bubbles and shine. Windows Vista and 7, the Wii, MSN. The name was given later, out of nostalgia, to an aesthetic of tech optimism.',
      pro: 'Optimistic and welcoming', con: 'Dated; the shine competes with the content', onde: 'Y2K revival in young brands', use: 'Nostalgic campaigns',
      signs: ['Blue sky and green grass', 'Bubbles and white highlights', 'Clear glass panels with a white border'],
      css: '.panel { background: linear-gradient(\n    rgba(255,255,255,.82), rgba(255,255,255,.4));\n  border: 1px solid rgba(255,255,255,.95);\n  box-shadow: inset 0 1px 0 #fff; }' },
    { k: 'skeu', n: 'Skeuomorphism', era: '2007 – 2013', t: 'Philosophy',
      idea: 'Imitates real objects: stitched leather, lined paper, brushed metal. The metaphor taught the function to people who had never used a touchscreen.',
      pro: 'Obvious affordance, tactile feel, short learning curve', con: 'Visual noise, heavy images, ages fast', onde: 'iOS 1 to 6, audio plugins, games, camera apps', use: 'Tools that imitate a real instrument',
      signs: ['Material textures (leather, wood, paper)', 'Shine on top and shadow underneath every button', 'Fields with an inner shadow, as if carved in'],
      css: '.button { background: linear-gradient(#fdfdfd, #c9ccd1);\n  box-shadow: inset 0 1px 0 #fff, 0 2px 4px rgba(0,0,0,.4);\n  text-shadow: 0 1px 0 #fff; }\n.button:active { box-shadow: inset 0 2px 5px rgba(0,0,0,.55); }' },
    { k: 'rabisco', n: 'Sketch', era: '2008 → (Balsamiq, Excalidraw)', t: 'Style',
      idea: 'Interfaces that look hand-drawn. Born in wireframing tools to signal that something is still a draft, it became a style of its own with Excalidraw.',
      pro: 'Invites critique and change; looks unfinished on purpose', con: 'Not serious enough for a final product', onde: 'Wireframes, whiteboards, informal documentation', use: 'Prototypes, brainstorming, class material',
      signs: ['Wobbly, irregular borders', 'A handwritten font', 'Highlighter colors'],
      css: '.card { border: 2px solid #222;\n  border-radius: 255px 18px 225px 18px /\n                 18px 225px 18px 255px; }\n/* uneven elliptical radii imitate a hand-drawn line */' },
    { k: 'flat', n: 'Flat / Metro', era: '2010 – 2015', t: 'Philosophy',
      idea: 'Zero depth: solid color, no shadows, strong type. Windows Phone 7, Windows 8 and iOS 7 took the idea to billions of screens.',
      pro: 'Light, scales to any screen, easy to produce', con: 'Hard to tell what is clickable', onde: 'The basis of almost everything that came after', use: 'Icons, illustration, simple interfaces',
      signs: ['Flat, saturated colors', 'No shadows or gradients', 'Fields marked only by a bottom line'],
      css: '.button { background: #e74c3c; color: #fff;\n  border: 0; border-radius: 0; }\n.button:active { background: #a93226; }\n/* the only feedback is the color change */' },
    { k: 'vapor', n: 'Vaporwave', era: '2012 →', t: 'Style',
      deco: '<div class="deco sun"></div><div class="deco floor"></div>',
      idea: 'An aesthetic born on the internet: a striped sun, a perspective grid, old system windows, pink and cyan, spaced-out letters and decorative Japanese. An irony about the consumerism of the 1980s and 1990s.',
      pro: 'Strong, instant atmosphere', con: 'The irony does not suit serious products; weak legibility', onde: 'Album covers, memes, events', use: 'Art and niche pieces',
      signs: ['A striped sunset and a perspective grid', 'Pastel pink, purple and cyan', 'Spaced-out italic text, sometimes in Japanese'],
      css: '.floor { background:\n  linear-gradient(90deg, #ff71ce 2px, transparent 2px),\n  linear-gradient(#ff71ce 2px, transparent 2px);\n  background-size: 40px 30px;\n  transform: perspective(200px) rotateX(55deg); }' },
    { k: 'material', n: 'Material Design', era: '2014 →', t: 'Philosophy and system', done: 'ORDER PLACED ✓',
      deco: '<div class="deco fab">+</div>',
      idea: 'Sheets of digital paper with thickness. Shadow tells the height of each element, and a touch sends an ink wave (ripple) out from the finger.',
      pro: 'Clear rules; it is flat with affordance', con: 'Sameness: many apps ended up identical', onde: 'Android and Google services', use: 'Android apps and products that need ready-made rules',
      signs: ['Layered shadows that signal elevation', 'A round floating action button (FAB)', 'An ink ripple on touch'],
      css: '.button { box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),\n  0 2px 2px rgba(0,0,0,.14), 0 1px 5px rgba(0,0,0,.12); }\n.button:active { /* rises to elevation 8 */\n  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),\n  0 8px 10px 1px rgba(0,0,0,.14); }' },
    { k: 'brutweb', n: 'Web brutalism', era: '2014 → (brutalistwebsites.com)', t: 'Philosophy', btn: 'Place order →', done: 'Order sent. Back',
      mid: '<hr>',
      idea: 'HTML with almost no styling: the browser default font, blue underlined links, native fields. A refusal of the polished, identical web, not to be confused with neobrutalism, which is decorative.',
      pro: 'Fast, honest, light, no dependencies', con: 'Can look broken or careless', onde: 'Artist sites, independent magazines, personal pages', use: 'Personal projects where content comes first',
      signs: ['Times New Roman and native browser controls', 'Blue underlined links instead of buttons', 'Little or no planned spacing'],
      css: '/* the recipe is to have almost no CSS */\nbody { font-family: serif; }\na { color: #00e; }\na:visited { color: #551a8b; }' },
    { k: 'tipovar', n: 'Variable type', era: '2016 → (OpenType Font Variations)', t: 'Technique and style',
      deco: '<div class="hintv">move the cursor: ↔ weight · ↕ width</div>',
      idea: 'A single font with continuous weight and width axes. Type becomes an interactive material: it reacts to the cursor, to state and to screen size. Move the cursor over the specimen.',
      pro: 'Expressive without images, from a single font file', con: 'Overdone, it becomes a gimmick; not every font has axes', onde: 'Type foundry sites, editorial, animated headings', use: 'Headings, button states and typographic identity',
      signs: ['Weight and width changing smoothly', 'Text that reacts to hover or scrolling', 'A single family doing all the work'],
      css: '.title { font-family: "Roboto Flex";\n  font-variation-settings: "wght" var(--w), "wdth" var(--wd); }\n.button:hover {\n  font-variation-settings: "wght" 900, "wdth" 140; }' },
    { k: 'neu', n: 'Neumorphism', era: '2019 – 2020', t: 'Style',
      idea: 'Elements extruded from the background itself, with a light shadow and a dark one on opposite sides. When pressed, the button sinks.',
      pro: 'Soft and pretty in a still image', con: 'Very low contrast; fails WCAG', onde: 'Dribbble; almost nothing in production', use: 'Practically never in a real product',
      signs: ['The same color for background and elements', 'Two opposite shadows, light and dark', 'Little difference between active and inactive states'],
      css: '.button { background: #e0e5ec;\n  box-shadow: 6px 6px 12px #a3b1c6, -6px -6px 12px #fff; }\n.button:active {\n  box-shadow: inset 5px 5px 10px #a3b1c6,\n    inset -5px -5px 10px #fff; }' },
    { k: 'glass', n: 'Glassmorphism', era: '2020 →', t: 'Style',
      deco: '<div class="deco blob drift" style="width:150px;height:150px;background:#ff6b9d;left:10%;top:6%"></div><div class="deco blob drift b2" style="width:170px;height:170px;background:#4facfe;right:8%;bottom:4%"></div>',
      idea: 'Translucent panels that blur what is behind them. Big Sur, Fluent’s Acrylic and Apple’s Liquid Glass took the idea into the operating system.',
      pro: 'Clear spatial hierarchy; a premium feel', con: 'Unpredictable legibility over changing backgrounds', onde: 'iOS, macOS, visionOS, Windows 11', use: 'Floating layers over visual content',
      signs: ['A colorful background visible and blurred through the panel', 'A light 1px border', 'White text over transparency'],
      css: '.panel { background: rgba(255,255,255,.14);\n  backdrop-filter: blur(18px);\n  border: 1px solid rgba(255,255,255,.35);\n  border-radius: 22px; }' },
    { k: 'clay', n: 'Claymorphism', era: '2021 →', t: 'Style',
      deco: '<div class="deco c" style="width:80px;height:80px;background:#ffe08a;left:8%;top:10%"></div><div class="deco c" style="width:60px;height:60px;background:#a5e8ff;right:10%;bottom:12%"></div>',
      idea: '3D modeling clay: inner volume and an outer shadow. It is neumorphism with contrast, and the button squashes like rubber when pressed.',
      pro: 'Friendly, playful, readable', con: 'Makes serious products look childish', onde: 'Kids’ apps, young fintechs, 3D illustration', use: 'Onboarding and light-hearted brands',
      signs: ['Very rounded corners', 'Light and dark inner shadows that give volume', 'Pastel colors and a rounded font'],
      css: '.button { border-radius: 24px;\n  box-shadow: 8px 8px 16px rgba(120,70,200,.35),\n    inset -6px -6px 10px rgba(80,40,160,.35),\n    inset 6px 6px 10px rgba(255,255,255,.6); }\n.button:active { transform: scale(.93, .86); }' },
    { k: 'brutal', n: 'Neobrutalism', era: '2021 →', t: 'Style',
      idea: 'Thick black borders, hard shadows with no blur, saturated colors. A reaction to generic startup minimalism, and the button literally sinks into its own shadow.',
      pro: 'Obvious affordance and a strong identity', con: 'Tiring on dense screens; ages fast', onde: 'Gumroad, parts of Figma, landing pages', use: 'Brands that want to stand out',
      signs: ['Black borders 2 to 4px thick', 'An offset shadow with no blur', 'Saturated yellow, pink and green'],
      css: '.button { border: 3px solid #000;\n  box-shadow: 5px 5px 0 #000; }\n.button:active { transform: translate(5px, 5px);\n  box-shadow: 0 0 0 #000; }' },
    { k: 'aurora', n: 'Aurora / mesh', era: '2021 →', t: 'Style',
      deco: '<div class="deco glow drift" style="width:220px;height:220px;background:#7c3aed;left:-30px;top:-40px"></div><div class="deco glow drift b2" style="width:200px;height:200px;background:#06b6d4;right:-30px;bottom:-60px"></div>',
      idea: 'A dark background with diffuse blobs of color in slow motion, a gradient heading and a glowing pill button. It became the face of AI landing pages.',
      pro: 'Immediate impact', con: 'Now a SaaS and AI cliché', onde: 'Startup landing pages', use: 'Only with a real identity on top',
      signs: ['A near-black background', 'Blurred purple and cyan blobs', 'A white pill button'],
      css: '.blob { background: #7c3aed; filter: blur(46px);\n  border-radius: 50%; }\n.title { background: linear-gradient(90deg, #c4b5fd, #22d3ee);\n  -webkit-background-clip: text; color: transparent; }' },
    { k: 'bento', n: 'Bento grid', era: '2022 →', t: 'Layout pattern', btn: 'Order and rearrange',
      idea: 'Modular boxes of different sizes, one idea per block. Made famous by Apple’s keynote slides. Press the button to watch the grid rearrange.',
      pro: 'Scannable, great for summaries', con: 'Becomes an empty mosaic without strong content', onde: 'Landing pages, dashboards, slides', use: 'Presenting several features or numbers',
      signs: ['Rectangular blocks of varied sizes', 'The same rounded corners on all of them', 'One message per block'],
      css: '.grade { display: grid; gap: 8px;\n  grid-template-columns: 1fr 1fr; }\n.destaque { grid-column: span 2; }\n.grade > * { border-radius: 16px; }' },
    { k: 'neoskeu', n: 'Tactile neo-skeuomorphism', era: '2023 →', t: 'Style',
      idea: 'Skeuomorphism comes back cleaner: buttons with physical travel, switches with LEDs, surfaces of industrial devices. Inspired by gear like Teenage Engineering’s and by Polaris’s raised buttons.',
      pro: 'A satisfying click and clear affordance', con: 'Needs a lot of polish not to look dated', onde: 'Audio apps, creative tools, hardware sites', use: 'Products where the feel of touch matters',
      signs: ['A button with travel: the solid shadow disappears when pressed', 'Indicator lights (LEDs)', 'Warm, matte surfaces, like appliance plastic'],
      css: '.button { box-shadow: 0 5px 0 #b84508,\n  0 8px 12px rgba(0,0,0,.25); }\n.button:active { transform: translateY(5px);\n  box-shadow: 0 0 0 #b84508; }' },
    { k: 'blueprint', n: 'Blueprint / technical', era: '2023 →', t: 'Style',
      pre: '<div class="dim"><i></i>310 px<i></i></div>',
      idea: 'The interface presents itself as a technical drawing: a visible grid, dashed lines, dimensions and alignment crosses. Common on developer-tool and hardware sites.',
      pro: 'Conveys precision and transparency', con: 'Cold; can look unfinished', onde: 'Dev tool, hardware and engineering sites', use: 'Technical products that want to show rigor',
      signs: ['A blue background with a fine grid', 'Dashed borders and crosses in the corners', 'Dimensions and measurements as decoration'],
      css: '.background { background-image:\n  linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),\n  linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px);\n  background-size: 80px 80px; }\n.card { border: 1px dashed rgba(255,255,255,.75); }' },
    { k: 'term', n: 'Terminal / TUI', era: 'sempre', t: 'Style', title: 'new_order --cappuccino', btn: 'order --now',
      idea: 'Monospaced, high contrast, keyboard first. Reborn with developer tools and AI agents. Every action becomes a log line.',
      pro: 'Maximum density and speed', con: 'Hostile to laypeople', onde: 'lazygit, htop, Claude Code', use: 'A technical audience',
      signs: ['A monospaced font', 'Green or amber on black', 'States as text: [x], OK, ERROR'],
      css: '.screen { background: #0a0f0a; color: #33ff66;\n  font-family: ui-monospace, monospace; }\n.check::before { content: "[ ] no"; }\n.check[aria-checked="true"]::before { content: "[x] yes"; }' }
  ];

  var jump = A.$('jump'), list = A.$('list');
  S.forEach(function (s) {
    jump.appendChild(el('<a href="#' + s.k + '">' + esc(s.n) + '</a>'));
    var term = s.k === 'term';
    var card = '<div class="sc">' + (s.pre || '') +
      '<div class="ttl">' + esc(s.title || 'New order') + '</div>' +
      '<div class="txt">' + (term ? '# size M, whole milk' : 'Cappuccino · size M') + '</div>' +
      '<input class="fld" id="f-' + s.k + '" placeholder="' + (term ? 'name_on_cup_' : 'Name on cup') + '" aria-label="Name on cup" autocomplete="off">' +
      '<div class="row"><span>To go</span><button type="button" class="tgl" role="switch" aria-checked="false" aria-label="To go"><span class="k"></span></button></div>' +
      (s.mid || '') +
      '<button type="button" class="btn">' + esc(s.btn || 'Order') + '</button>' +
      (term ? '<div class="log" aria-live="polite">[ OK ] register open<span class="cursor">█</span></div>' : '') +
      '</div>';
    var entry = el('<article class="entry" id="' + s.k + '">' +
      '<div class="spec sp-' + s.k + '">' + (s.deco || '') + card + '</div>' +
      '<div class="sheet"><div class="meta"><span>' + esc(s.era) + '</span><span>· ' + esc(s.t) + '</span></div><h2>' + esc(s.n) + '</h2><p class="idea">' + esc(s.idea) + '</p>' +
      '<dl><dt class="pro">Pros</dt><dd>' + esc(s.pro) + '</dd><dt class="con">Cons</dt><dd>' + esc(s.con) + '</dd><dt>Where to see it</dt><dd>' + esc(s.onde) + '</dd><dt>Use it for</dt><dd>' + esc(s.use) + '</dd></dl>' +
      '<span class="lbl">How to spot it</span><ul class="signs">' + s.signs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<span class="lbl">CSS recipe</span><pre class="recipe">' + esc(s.css) + '</pre></div></article>');
    list.appendChild(entry);

    var spec = entry.querySelector('.spec'), tgl = entry.querySelector('.tgl'), btn = entry.querySelector('.btn'), label = btn.textContent, timer = null, n = 0;
    tgl.addEventListener('click', function () { tgl.setAttribute('aria-checked', tgl.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); });
    if (s.k === 'material') {
      btn.addEventListener('pointerdown', function (ev) {
        if (A.reduce) return;
        var r = btn.getBoundingClientRect(), d = Math.max(r.width, r.height), rp = document.createElement('span');
        rp.className = 'ripple'; rp.style.width = rp.style.height = d + 'px';
        rp.style.left = (ev.clientX - r.left - d / 2) + 'px'; rp.style.top = (ev.clientY - r.top - d / 2) + 'px';
        btn.appendChild(rp); setTimeout(function () { rp.remove(); }, 600);
      });
    }
    if (s.k === 'tipovar') {
      spec.addEventListener('pointermove', function (e) {
        var r = spec.getBoundingClientRect(), x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        spec.style.setProperty('--w', Math.round(100 + x * 900)); spec.style.setProperty('--wd', Math.round(151 - y * 126));
      });
      spec.addEventListener('pointerleave', function () { spec.style.setProperty('--w', 400); spec.style.setProperty('--wd', 100); });
    }
    btn.addEventListener('click', function () {
      var v = entry.querySelector('.fld').value.trim(), viagem = tgl.getAttribute('aria-checked') === 'true';
      if (term) {
        var log = entry.querySelector('.log');
        n++;
        var lines = log.textContent.replace('█', '').split('\n').filter(Boolean);
        lines.push('[ OK ] order #' + n + ' queued' + (viagem ? ' (TO GO)' : '') + (v ? ': ' + v : ''));
        while (lines.length > 3) lines.shift();
        log.innerHTML = esc(lines.join('\n')) + '<span class="cursor">█</span>';
        return;
      }
      if (s.k === 'bento') { entry.querySelector('.sc').classList.toggle('alt'); return; }
      if (s.k === 'brutweb') { btn.classList.add('visited'); }
      clearTimeout(timer);
      btn.textContent = s.done || 'Order placed ✓';
      timer = setTimeout(function () { btn.textContent = label; }, 1400);
    });
  });
  /* Faz :active funcionar no Safari de iOS */
  document.addEventListener('touchstart', function () {}, { passive: true });
})();
