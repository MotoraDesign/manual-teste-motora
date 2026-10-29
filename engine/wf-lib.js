/* ============================================================
   MOTOR · biblioteca de blocos (não editar por marca)
   Tudo que é específico da marca vem de window.BRAND (content/brand.js).
   Uso nos arquivos de content/: T.body(), T.cards(), T.swatch()…
   ============================================================ */
(function () {
  const B = () => window.BRAND || {};

  window.isDark = function (hex) {
    const c = String(hex || '').replace('#', '');
    if (c.length < 6) return false;
    const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) < 150;
  };
  const fg = (hex) => (window.isDark(hex) ? '#fff' : '#1a1a1a');
  const emph = (s, tag) => String(s || '').replace(/\*(.+?)\*/g, `<${tag}>$1</${tag}>`);

  const T = {
    /* ---- texto ---- */
    body: (t) => `<p class="copytext">${t}</p>`,
    lead: (t) => `<p class="copytext lead">${t}</p>`,
    lbl: (t, info) => `<div class="lbl">${t}${info ? T.info(info) : ''}</div>`,
    /* ícone (i) com hover: info = { what: 'O que é esse texto?', why: 'Para que serve?' } */
    info(info) {
      if (!info || (!info.what && !info.why)) return '';
      const row = (k, v) => v ? `<span class="info-row"><span class="info-k">${k}</span><span class="info-v">${v}</span></span>` : '';
      return `<span class="info" tabindex="0" role="button" aria-label="Sobre este texto"><span class="info-i" aria-hidden="true">i</span><span class="info-pop" role="tooltip">${row('O que é esse texto?', info.what)}${row('Para que serve?', info.why)}</span></span>`;
    },
    hint: (t) => `<div class="hint">${t}</div>`,
    tag: (t, muted) => `<span class="part-tag${muted ? ' muted' : ''}">${t}</span>`,
    chips: (arr) => `<div class="chips">${arr.map((t) => `<span class="chip">${t}</span>`).join('')}</div>`,

    /* ---- grade de cards [título, texto] ---- */
    cards(list, cols = 2, lead = false) {
      return `<div class="grid cols-${cols}">${list.map(([t, d]) => `
        <div class="box flow"><div class="lbl">${t}</div><p class="copytext${lead ? ' lead' : ''}">${d}</p></div>`).join('')}</div>`;
    },

    /* ---- tabela: headers[], rows[] (array de células ou { group:'rótulo' }), cols = grid-template-columns ---- */
    table(headers, rows, cols) {
      const st = cols ? ` style="grid-template-columns:${cols}"` : '';
      return `<div class="ntable">
        <div class="nt-head"${st}>${headers.map((h) => `<span>${h}</span>`).join('')}</div>
        ${rows.map((r) => Array.isArray(r)
          ? `<div class="nt-row"${st}>${r.map((c, i) => `<span${headers[i] ? ` data-th="${headers[i]}"` : ''}>${c}</span>`).join('')}</div>`
          : `<div class="nt-group">${r.group}</div>`).join('')}
      </div>`;
    },

    /* ---- árvore de decisão interativa: def = { title, start: nó, outcomes: {n: texto} } ---- */
    decisionTree(def) {
      window.__DT = window.__DT || {};
      const id = 'dt' + Object.keys(window.__DT).length;
      window.__DT[id] = def;
      const all = Object.entries(def.outcomes || {}).map(([n, t]) => `<div class="dt-card"><span class="dt-n">${n}</span><p class="copytext">${t}</p></div>`).join('');
      return `<div class="box flow" data-dt="${id}" data-path="">
        ${def.title ? T.lbl(def.title) : ''}
        <div class="dt-steps">${T.dtSteps(def, [])}</div>
        ${all ? `<details class="dt-all"><summary>Ver todos os resultados</summary><div class="grid cols-3" style="margin-top:14px">${all}</div></details>` : ''}
      </div>`;
    },
    dtSteps(def, path) {
      let node = def.start, html = '', i = 0;
      while (node && typeof node === 'object') {
        const chosen = path[i];
        html += `<div class="dt-step"><div class="dt-q"><span class="dt-qn">${i + 1}</span>${node.q}</div><div class="dt-opts">${node.a.map(([label], j) =>
          `<button type="button" class="dt-opt${chosen === j ? ' on' : chosen != null ? ' off' : ''}" data-dt-step="${i}" data-dt-ans="${j}">${label}</button>`).join('')}</div></div>`;
        if (chosen == null) return html;
        node = node.a[chosen][1]; i++;
      }
      const n = node;
      return html + `<div class="dt-result"><span class="dt-n">${n}</span><div class="flow" style="flex:1"><div class="lbl" style="margin:0">Resultado</div><p class="copytext">${(def.outcomes || {})[n] || ''}</p></div><button type="button" class="btn" data-dt-reset>↺ Recomeçar</button></div>`;
    },

    /* ---- repositório de links interativo ----
       def = { id, categories:[...], seed:[{ title, url, cat, note }] }
       Itens adicionados pelo usuário ficam salvos no navegador (localStorage).
       "Exportar" baixa um JSON para colar em seed e tornar permanente. */
    linkRepo(def) {
      window.__REPO = window.__REPO || {};
      window.__REPO[def.id] = def;
      const cats = def.categories || [];
      return `<div class="box flow repo" data-repo="${def.id}">
        <form class="repo-form" data-repo-form>
          <input name="title" type="text" placeholder="Título do conteúdo" required>
          <input name="url" type="url" placeholder="https://…" required>
          ${cats.length ? `<select name="cat">${cats.map((c) => `<option>${c}</option>`).join('')}</select>` : ''}
          <input name="note" type="text" placeholder="Por que é referência? (opcional)">
          <button class="btn accent" type="submit">+ Adicionar</button>
        </form>
        <div class="hint repo-status" data-repo-status style="margin:0"></div>
        <div class="repo-bar">
          <div class="repo-filter" data-repo-filter>${['Todos', ...cats].map((c, i) => `<button type="button" data-cat="${i ? c : ''}"${i ? '' : ' class="on"'}>${c}</button>`).join('')}</div>
          <button class="btn" type="button" data-repo-export>↓ Exportar</button>
        </div>
        <div class="repo-list" data-repo-list></div>
      </div>`;
    },

    /* ---- figura e fundo: contraste (WCAG) ---- */
    contrast(a, b) {
      const lum = (hex) => {
        const c = String(hex).replace('#', '');
        const ch = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
        return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
      };
      const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (l1 + 0.05) / (l2 + 0.05);
    },
    colorName(hex, all) {
      const c = (all || []).find((x) => x.hex.toUpperCase() === String(hex).toUpperCase());
      return c ? c.name : hex;
    },
    /* tile "Aa": fundo + grafismo + texto, gerado das cores (sem imagem) */
    comboTile(combo, all) {
      const g = (B().logos || {}).grafismoSvg || (B().logos || {}).simboloSvg || '';
      const nm = (h) => T.colorName(h, all);
      const sw = (h) => `<button type="button" class="swcopy" data-copy="${h}" title="Copiar ${h}" style="background:${h}; color:${fg(h)}; font-size:11px">${nm(h)}<br>${h}</button>`;
      return `<figure class="ff-combo">
        <div class="ff-tile">
          <div class="ff-main" style="background:${combo.bg}">
            <span class="ff-shape" style="color:${combo.figure}">${g}</span>
            <span class="ff-aa" style="color:${combo.text}">Aa</span>
          </div>
          <div class="ff-side">${sw(combo.bg)}${sw(combo.figure)}${sw(combo.text)}</div>
        </div>
        <figcaption class="hint" style="margin:0">Grafismo em <b>${nm(combo.figure)}</b> e texto em <b>${nm(combo.text)}</b> sobre fundo <b>${nm(combo.bg)}</b>.</figcaption>
      </figure>`;
    },
    /* faixa de cores de um layout (até N cores) */
    layoutStrip(hexes, all) {
      return `<div class="ff-strip">${hexes.map((h, i) => `<button type="button" class="swcopy" data-copy="${h}" title="Copiar ${h}" style="flex:${i ? 1 : 2}; background:${h}; color:${fg(h)}"><span>${T.colorName(h, all)}<br><small>${h}</small></span></button>`).join('')}</div>`;
    },
    /* matriz: uma faixa por fundo; figuras ordenadas do maior para o menor contraste; abaixo do mínimo não aparece */
    contrastMatrix(all, ff = {}) {
      const min = ff.minContrast || 3;
      const hidden = (bg, c) => Object.entries(ff.overrides || {}).some(([k, v]) => v === 'evitar' && k.toUpperCase() === `${bg}|${c}`.toUpperCase());
      const bgs = ff.backgrounds && ff.backgrounds.length ? ff.backgrounds.map((h) => all.find((c) => c.hex.toUpperCase() === h.toUpperCase())).filter(Boolean) : all;
      return `<div class="ff-matrix">${bgs.map((bg) => {
        const figs = all.filter((c) => c.hex.toUpperCase() !== bg.hex.toUpperCase())
          .map((c) => ({ ...c, r: T.contrast(bg.hex, c.hex) }))
          .filter((c) => c.r >= min && !hidden(bg.hex, c.hex))
          .sort((a, b) => b.r - a.r);
        return `<div class="ff-row" style="background:${bg.hex}; color:${fg(bg.hex)}">
          <span class="ff-row-name">${bg.name}<br><small style="font-weight:500; opacity:.8">${bg.hex}</small></span>
          <div class="ff-dots">${figs.map((c) => `<button type="button" class="ff-dot" data-copy="${c.hex}" title="${c.name} · ${c.hex} · copiar"><i style="background:${c.hex}"></i><small>${c.r.toFixed(1)}:1</small></button>`).join('')}</div>
        </div>`;
      }).join('')}</div>`;
    },

    /* ---- aplicação da marca ---- */
    logoArt(c1, c2) {
      const L = B().logos || {};
      if (L.principalSvg) return `<span class="ap-logo" style="--c1:${c1}; --c2:${c2 || c1}">${L.principalSvg}</span>`;
      return `<span class="ap-logo ap-mask" style="background:${c2 || c1}; -webkit-mask-image:url('${L.principal}'); mask-image:url('${L.principal}')"></span>`;
    },
    apEval(bg, c1, c2, A = {}) {
      const U = (h) => String(h).toUpperCase();
      if (U(c2) === U(bg) || U(c1) === U(bg)) return 'skip';
      const key = `${U(bg)}|${U(c1)}|${U(c2)}`;
      const ov = Object.entries(A.overrides || {}).find(([k]) => U(k) === key);
      if (ov) return ov[1];
      return T.contrast(bg, c2) >= (A.minContrast || 3) && T.contrast(bg, c1) >= (A.minSecondary || 1.8) ? 'ok' : 'no';
    },
    apTile(bg, c1, c2, state, extra = '') {
      return `<div class="ap-tile${state === 'no' ? ' no' : ''}" style="background-color:${bg}${extra}">${T.logoArt(c1, c2)}</div>`;
    },
    /* todas as combinações fundo × cor de logo de um grupo, em grade de 6 por linha */
    apGroup(pairs, A = {}) {
      const tiles = [];
      (A.backgrounds || []).forEach((bg) => pairs.forEach(([c1, c2]) => {
        const st = T.apEval(bg, c1, c2, A);
        if (st !== 'skip') tiles.push(T.apTile(bg, c1, c2, st));
      }));
      return `<div class="ap-grid">${tiles.join('')}</div>`;
    },
    apFree(ex) {
      if (ex.photo) return T.apTile('#9AA3AE', ex.logo, ex.logo, 'ok', `; background-image:url('${ex.photo}')`);
      const logo = ex.logo || (T.contrast(ex.bg, '#000000') >= T.contrast(ex.bg, '#FFFFFF') ? '#000000' : '#FFFFFF');
      return T.apTile(ex.bg, logo, logo, 'ok');
    },

    /* ---- imagens ---- */
    img: (tag, h = 140) => `<div class="imgph" style="min-height:${h}px"><span class="tag">${tag}</span></div>`,
    photo(src, caption, h = 200) {
      const ph = (caption || 'foto') + (src ? ` · ${src}` : '');
      const inner = src
        ? `<div class="box flush"><img src="${src}" alt="${caption || ''}" data-ph="${ph}" style="width:100%; height:${h}px; object-fit:cover; display:block" onerror="T.__missing(this, ${h})"></div>`
        : T.img(ph, h);
      return `<figure style="margin:0; display:flex; flex-direction:column; gap:6px">${inner}${caption ? `<figcaption class="hint" style="margin:0">${caption}</figcaption>` : ''}</figure>`;
    },
    /* imagem sem legenda (diagramas, exemplos, peças) */
    pic: (src, alt, h = 200) =>
      `<div class="box flush"><img src="${src}" alt="${alt || ''}" data-ph="${(alt || 'imagem')} · ${src}" style="width:100%; height:${h}px; object-fit:cover; display:block" onerror="T.__missing(this, ${h})"></div>`,
    /* carrossel: imagem grande com setas + miniaturas. items = [{ src, cap }] */
    carousel(items, h = 520) {
      const ph = (src) => `<div class="car-ph">imagem · ${src}</div>`;
      const im = (it, i) => `<img src="${it.src}" alt="${it.cap || 'exemplo ' + (i + 1)}" onerror="this.style.display='none'">`;
      return `<div class="car" data-car="0">
        <div class="car-stage" style="height:${h}px">
          ${items.map((it, i) => `<figure class="car-slide${i ? '' : ' on'}">${ph(it.src)}${im(it, i)}</figure>`).join('')}
          <button type="button" class="car-nav prev" data-car-step="-1" aria-label="Anterior">‹</button>
          <button type="button" class="car-nav next" data-car-step="1" aria-label="Próxima">›</button>
          <span class="car-count">1 / ${items.length}</span>
        </div>
        <div class="car-cap hint">${items[0].cap || ''}</div>
        <div class="car-thumbs">${items.map((it, i) => `<button type="button" class="car-thumb${i ? '' : ' on'}" data-car-go="${i}" data-cap="${(it.cap || '').replace(/"/g, '&quot;').replace(/\[/g, '&#91;')}">${ph(String(i + 1).padStart(2, '0'))}${im(it, i)}</button>`).join('')}</div>
      </div>`;
    },
    /* arquivo ainda não enviado → mostra o placeholder com o caminho esperado */
    __missing(img, h) {
      const box = img.parentElement;
      box.outerHTML = T.img(img.dataset.ph || img.alt, h).replace('class="imgph"', `class="imgph" data-src="${img.dataset.orig || img.getAttribute('src') || ''}"`);
    },
    logo: (src, alt, h = 120, bg = 'transparent') =>
      `<div class="logo-real" style="background:${bg}"><img src="${src}" alt="${alt}" style="height:${h}px"></div>`,

    /* ---- cores (sempre com copiar) ---- */
    swatch(name, hex, sub, rgb, cmyk) {
      return `
      <div class="swatch">
        <div class="fill" style="background:${hex}; color:${fg(hex)}"><span class="hexname">${name}</span></div>
        <div class="meta">
          ${sub ? `<span class="name">${sub}</span>` : ''}
          <button class="copybtn" type="button" data-copy="${hex}">${hex} ⧉</button>
          ${rgb ? `<button class="copybtn" type="button" data-copy="${rgb}">RGB ${rgb} ⧉</button>` : ''}
          ${cmyk ? `<button class="copybtn" type="button" data-copy="${cmyk}">CMYK ${cmyk} ⧉</button>` : ''}
        </div>
      </div>`;
    },
    /* objeto de cor do brand.js: {name, hex, pantone, rgb, cmyk, use} */
    color: (c) => T.swatch(c.name, c.hex, [c.use, c.pantone].filter(Boolean).join(' · '), c.rgb, c.cmyk),
    colors: (arr, cols = 3) => `<div class="grid cols-${cols}">${(arr || []).map(T.color).join('')}</div>`,
    /* dupla principal + sobretom, clicável */
    pair(name, c1, c2, note) {
      const b = (h) => `<button class="swcopy" type="button" data-copy="${h}" style="background:${h}; color:${fg(h)}">${h}</button>`;
      return `
      <div class="box flush" style="display:flex; flex-direction:column">
        <div style="display:flex; height:86px">${b(c1)}${c2 ? b(c2) : ''}</div>
        <div style="padding:12px 16px"><div class="lbl" style="margin:0">${name}</div>${note ? T.hint(note) : ''}</div>
      </div>`;
    },

    /* ---- certo / errado ---- */
    dd: (ok, title, inner = '') =>
      `<div class="dd ${ok ? 'ok' : 'no'}"><div class="hd"><span class="badge">${ok ? '✓' : '✕'}</span> ${title}</div>${inner}</div>`,
    beforeAfter(before, after, labelB = 'Evite', labelA) {
      labelA = labelA || `${B().name} diz`;
      return `<div class="grid cols-2" style="align-items:stretch">
        ${T.dd(true, labelA, `<p class="quote">"${after}"</p>`)}
        ${T.dd(false, labelB, `<p class="quote">"${before}"</p>`)}
      </div>`;
    },

    /* ---- capa e slogan ---- */
    hero() {
      const b = B();
      return `
      <div class="hero">
        ${b.logos && b.logos.simbolo ? `<div class="hero-mark"><img src="${b.logos.simbolo}" alt=""></div>` : ''}
        <h2 class="hero-line">${emph(b.slogan, 'em')}</h2>
        <p class="hero-intro">${b.manualTitle || 'Manual da marca'} <b>${b.name}</b>. ${b.audience || ''}</p>
        <div class="hero-cards" data-hero-cards></div>
        ${b.meta && b.meta.length ? `<div class="hero-meta">${b.meta.map((m) => `<span class="chip">${m}</span>`).join('')}</div>` : ''}
      </div>`;
    },
    sloganBanner() {
      const b = B();
      return T.banner(b.slogan, { bg: b.images && b.images.sloganBg });
    },
    /* quadro de destaque: text com *palavra* em destaque · opts = { label, info, bg (imagem) } */
    banner(text, opts = {}) {
      const bg = opts.bg ? ` style="background-image:linear-gradient(rgba(10,10,12,.72),rgba(10,10,12,.72)),url('${opts.bg}')"` : '';
      const lbl = opts.label ? `<div class="sb-lbl">${opts.label}${opts.info ? T.info(opts.info) : ''}</div>` : '';
      return `<div class="slogan-banner"${bg}><div class="sb-inner">${lbl}<div class="sb-txt">${emph(text, 'b')}</div></div></div>`;
    },

    /* ---- símbolo recolorível (usado na assinatura padrão) ---- */
    symbol(color) {
      const l = B().logos || {};
      if (l.simboloSvg) return `<span class="sym" style="color:${color}">${l.simboloSvg}</span>`;
      const m = l.simbolo || '';
      return `<span class="sym mask" style="background:${color}; -webkit-mask-image:url('${m}'); mask-image:url('${m}')"></span>`;
    },
    /* assinatura padrão de newsletter sem marca própria: símbolo + nome */
    newsletterSig: (color, name) => `<div class="box nl-sig">${T.symbol(color)}<span class="nm">${name}</span></div>`,
  };
  /* hash da senha do modo edição (ver brand.admin) */
  T.adminHash = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
  window.T = T;

  /* ============================================================
     SUB-MARCAS · renderizador por nível do portfólio
     level: { n, eyebrow, title, desc, kind: 'mae' | 'endossada', rules: [{ title, text }], grid, items: [] }
     item:  { name, hasOwn, note, color, palette, signatures: [{ group, label, src, bg }], images: [[src, legenda]] }
       hasOwn:false → sem assinatura própria: mostra o diferencial (item.diferencial) e o nome em texto.
     ============================================================ */
  const ownBadge = (has) => T.tag(has ? 'assinatura própria' : 'sem assinatura própria', !has);
  const phArt = (label, dark) => `<span class="imgph" style="min-height:110px; width:100%; background:transparent; border-color:${dark ? 'rgba(255,255,255,.35)' : 'var(--line-2)'}"><span class="tag">assinatura · ${label}</span></span>`;
  const sigSlot = (s) => {
    const bg = s.bg || 'var(--paper-2)';
    const dark = s.bg && window.isDark(s.bg);
    const art = s.src ? `<img src="${s.src}" alt="${s.label}" onerror="this.outerHTML=window.SUB.ph('${s.label}', ${!!dark})">` : phArt(s.label, dark);
    return `<div class="box sig-slot"><div class="sig-art" style="background:${bg}">${art}</div><div class="hint" style="margin:0">${s.label}</div></div>`;
  };
  const palette = (p) => `<div class="grid cols-3">${p.map((c) => Array.isArray(c) ? T.swatch(...c) : T.color(c)).join('')}</div>`;
  const pics = (imgs) => `<div class="grid cols-2">${imgs.map(([src, alt]) => T.pic(src, alt, 260)).join('')}</div>`;
  const nameplate = (it) => `<div class="lvl-name" style="--c:${it.color || 'var(--accent)'}">${it.name}</div>`;
  const sigGroups = (sigs) => {
    const groups = [];
    sigs.forEach((s) => { const g = groups.find((x) => x.k === (s.group || '')); g ? g.list.push(s) : groups.push({ k: s.group || '', list: [s] }); });
    return groups.map((g) => `<div class="flow">${g.k ? T.lbl(g.k) : ''}<div class="grid cols-2">${g.list.map(sigSlot).join('')}</div></div>`).join('');
  };
  /* hierarquia de cores: [{ hex | gradient, label, note }] — fatias empilhadas, HEX com copiar */
  const hierarchy = (arr) => `<div class="lvl-hier">${arr.map((c, i) => {
    const bg = c.gradient || c.hex;
    const ink = c.hex ? fg(c.hex) : '#fff';
    const val = c.hex || c.label || 'gradiente';
    return `<div class="lvl-hier-row"><button type="button" class="lvl-hier-sw" style="background:${bg}; color:${ink}; " ${c.hex ? `data-copy="${c.hex}" title="Copiar ${c.hex}"` : ''}>${c.label ? c.label + (c.hex ? ' · ' : '') : ''}${c.hex || ''}</button>${c.note ? `<div class="hint lvl-hier-note">${c.note}</div>` : ''}</div>`;
  }).join('')}</div>`;
  /* exemplos certo/errado: [{ ok, src, cap }] */
  const dos = (arr) => `<div class="grid cols-2">${arr.map((d) => `<figure class="dd ${d.ok ? 'ok' : 'no'} flow" style="margin:0; padding:14px">
    <div class="hd" style="margin:0; font-size:15px"><span class="badge" style="width:20px; height:20px; font-size:11px">${d.ok ? '✓' : '✕'}</span> ${d.ok ? 'Correto' : 'Evite'}</div>
    ${T.pic(d.src, d.ok ? 'exemplo correto' : 'exemplo indevido', 90)}${d.cap ? `<figcaption class="hint" style="margin:0">${d.cap}</figcaption>` : ''}
  </figure>`).join('')}</div>`;
  const itemBox = (it) => `
    <div class="box flow lvl-item">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; align-items:center; gap:10px">${it.color ? `<span class="lvl-dot" style="background:${it.color}"></span>` : ''}<div class="lbl" style="margin:0">${it.name}</div></div>
        ${ownBadge(it.hasOwn)}
      </div>
      ${it.note ? T.body(it.note) : ''}
      ${it.hasOwn && it.signatures && it.signatures.length ? sigGroups(it.signatures) : ''}
      ${!it.hasOwn ? `<div class="flow">${T.lbl('O que diferencia')}${T.hint(it.diferencial || '[preencher: nome, ícone, cor ou conjunto de cores]')}${it.pattern ? '' : nameplate(it)}</div>` : ''}
      ${it.pattern ? `<div class="flow">${T.lbl('Padrão de assinatura')}${T.pic(it.pattern, 'padrão de assinatura · ' + it.name, 120)}</div>` : ''}
      ${it.hierarchy || it.rules ? `<div class="grid cols-2">
        ${it.hierarchy ? `<div class="flow">${T.lbl(it.hierarchyTitle || 'Hierarquia de cores')}${hierarchy(it.hierarchy)}</div>` : ''}
        ${it.rules ? `<div class="flow">${T.lbl('Regras de aplicação')}<ul class="lvl-rules">${it.rules.map((t) => `<li>${t}</li>`).join('')}</ul></div>` : ''}
      </div>` : ''}
      ${it.dos && it.dos.length ? `<div class="flow">${T.lbl('Nome da iniciativa')}${dos(it.dos)}</div>` : ''}
      ${it.palette && it.palette.length ? `<div class="flow">${T.lbl('Paleta de cores')}${palette(it.palette)}</div>` : ''}
      ${it.editions && it.editions.length ? `<div class="flow">${T.lbl('Edições')}<div class="grid cols-4">${it.editions.map(([src, alt]) => T.pic(src, alt, 220)).join('')}</div>${it.editionsNote ? T.hint(it.editionsNote) : ''}</div>` : ''}
      ${it.images && it.images.length ? `<div class="flow">${T.lbl('Aplicações')}${pics(it.images)}</div>` : ''}
    </div>`;
  window.SUB = {
    ph: phArt,
    hero(lv, art) {
      return `<div class="lvl-hero">
        <div class="lvl-txt flow">
          <div class="lvl-eyebrow">${lv.eyebrow}</div>
          <div class="lvl-title">${lv.title}</div>
          ${(Array.isArray(lv.desc) ? lv.desc : [lv.desc]).map(T.body).join('')}
        </div>
        <div class="lvl-art">${art}</div>
      </div>`;
    },
    rules(lv) {
      if (!(lv.rules && lv.rules.length) && !lv.grid) return '';
      return `<div class="grid cols-2">
        <div class="box flow">${(lv.rules || []).map((r) => `<div class="flow">${T.lbl(r.title)}${T.body(r.text)}</div>`).join('')}</div>
        ${lv.grid ? `<div class="box flow">${T.lbl('Grid e variações')}${T.pic(lv.grid, 'grid · ' + lv.title, 260)}${lv.gridNote ? T.hint(lv.gridNote) : ''}</div>` : ''}
      </div>`;
    },
    render(lv) {
      const items = lv.groups ? lv.groups.flatMap((g) => g.items || []) : (lv.items || []);
      const art = items.length
        ? `<div class="lvl-stack">${items.map((it) => it.hasOwn && it.signatures && it.signatures[0] ? `<div class="lvl-stack-i">${it.signatures[0].src ? `<img src="${it.signatures[0].src}" alt="${it.name}" onerror="this.outerHTML=window.SUB.ph('${it.name}', false)">` : phArt(it.name)}</div>` : nameplate(it)).join('')}</div>`
        : '';
      return `<div class="flow">
        ${this.hero(lv, art)}
        ${this.rules(lv)}
        ${lv.groups ? lv.groups.map((g) => `<div class="flow lvl-group">
          <div class="lvl-ghead" style="--c:${g.color || 'var(--accent)'}"><div class="lvl-title" style="font-size:30px">${g.title}</div>${g.eyebrow ? `<div class="lvl-eyebrow" style="color:var(--c)">${g.eyebrow}</div>` : ''}${(Array.isArray(g.desc) ? g.desc : [g.desc || '']).map(T.body).join('')}</div>
          ${(g.items || []).length ? g.items.map(itemBox).join('') : '<div class="box"><div class="hint empty-cat">Não há sub-marca deste tipo.</div></div>'}
        </div>`).join('') : (items.length ? items.map(itemBox).join('') : '<div class="box"><div class="hint empty-cat">Não há sub-marca deste tipo.</div></div>')}
      </div>`;
    },
  };
})();
