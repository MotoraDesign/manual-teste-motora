/* ============================================================
   MOTOR · admin (não editar por marca)
   Modo de edição para a agência: textos, imagens, remover e adicionar blocos.
   - Alterações ficam num RASCUNHO no navegador até "Publicar".
   - Publicar grava content/overrides.js (+ imagens novas em assets/uploads/)
     direto no GitHub, usando um token pessoal salvo só neste navegador.
   - A senha (brand.admin.passwordHash) só esconde os controles; quem protege
     de verdade é o token do GitHub.
   Config em content/brand.js → admin.
   ============================================================ */
(function () {
  const B = window.BRAND || {}, CFG = B.admin || {};
  const PUB = Object.assign({ texts: {}, titles: {}, subs: {}, images: {}, removed: [], added: {}, dtrees: {}, positions: {}, colors: {} }, window.OVERRIDES || {});
  const KEY = 'manual-admin:' + (B.name || 'marca');
  const TEXT_SEL = '.copytext, .lbl, .hint, .quote, .sb-txt, li, .lvl-title, .lvl-eyebrow, figcaption, .hc-tt, .hc-sb, .hero-line, .hero-intro, .dt-q, h2, h3';
  const BLOCK_SEL = '.box, figure, .slogan-banner';
  const $ = (s, r = document) => r.querySelector(s);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const store = {
    get draft() { try { return JSON.parse(localStorage.getItem(KEY + ':draft')); } catch (e) { return null; } },
    set draft(v) { v ? localStorage.setItem(KEY + ':draft', JSON.stringify(v)) : localStorage.removeItem(KEY + ':draft'); },
    get hist() { try { return JSON.parse(localStorage.getItem(KEY + ':hist')) || []; } catch (e) { return []; } },
    set hist(v) { localStorage.setItem(KEY + ':hist', JSON.stringify(v.slice(-40))); },
    /* token compartilhado com o Painel de manuais (mesmo endereço no GitHub Pages): 'motora-gh' */
    get gh() {
      let own = {}, shared = {};
      try { own = JSON.parse(localStorage.getItem(KEY + ':gh')) || {}; } catch (e) {}
      try { shared = JSON.parse(localStorage.getItem('motora-gh')) || {}; } catch (e) {}
      return Object.assign({ repo: CFG.repo || '', branch: CFG.branch || 'main', path: CFG.path || '' }, own, { token: own.token || shared.token || '' });
    },
    set gh(v) { localStorage.setItem(KEY + ':gh', JSON.stringify(v)); },
    get on() { return sessionStorage.getItem(KEY + ':on') === '1'; },
    set on(v) { v ? sessionStorage.setItem(KEY + ':on', '1') : sessionStorage.removeItem(KEY + ':on'); },
  };
  /* entrada vinda do Painel de manuais: ?admin=1 + sessão do painel válida (12 h) */
  try {
    const q = new URLSearchParams(location.search);
    if (q.get('admin') === '1') {
      const ses = +localStorage.getItem('motora-painel-session') || 0;
      if (Date.now() - ses < 12 * 3600 * 1000) store.on = true;
      q.delete('admin'); history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '') + location.hash);
    }
  } catch (e) {}
  const isAdmin = store.on;
  let D = isAdmin ? (store.draft || clone(PUB)) : PUB;
  D.dtrees = D.dtrees || {}; D.positions = D.positions || {}; D.colors = D.colors || {};

  /* ---------- chaves estáveis por ordem no DOM de cada painel ---------- */
  function index() {
    document.querySelectorAll('#panels > .panel').forEach((p) => {
      const sid = p.dataset.id;
      let t = 0, b = 0;
      p.querySelectorAll(TEXT_SEL).forEach((el) => {
        if (el.closest('.info, .adm-added, .adm-dte, button.tcopy, [data-repo] form') || el.parentElement.closest(TEXT_SEL)) return;
        el.dataset.kt = `${sid}|t|${t++}`;
      });
      p.querySelectorAll(BLOCK_SEL).forEach((el) => { if (!el.closest('.adm-added')) el.dataset.kb = `${sid}|b|${b++}`; });
      p.querySelectorAll('img').forEach((img) => { if (!img.dataset.orig) img.dataset.orig = img.getAttribute('src') || ''; });
    });
  }

  /* ---------- aplica overrides (todos os visitantes) ---------- */
  function addedHTML(sid, it) {
    const k = `add|${sid}|${it.id}`;
    if (it.type === 'image') return `<div class="box flush" data-added="${k}"><img src="${esc(it.src)}" alt="" data-orig="${k}" style="width:100%; display:block"></div>`;
    return `<div class="box flow" data-added="${k}"><p class="copytext" data-kt="${k}">${it.html || ''}</p></div>`;
  }
  function apply() {
    index();
    document.querySelectorAll('[data-kt]').forEach((el) => { const v = D.texts[el.dataset.kt]; if (v != null) el.innerHTML = v; });
    document.querySelectorAll('img[data-orig]').forEach((img) => {
      const v = D.images[img.dataset.orig];
      if (v != null) { img.setAttribute('src', v); img.style.display = ''; img.removeAttribute('onerror'); }
    });
    (D.removed || []).forEach((k) => {
      const el = document.querySelector(`[data-kb="${k}"], [data-kt="${k}"]`);
      if (el) el.remove();
    });
    document.querySelectorAll('#panels > .panel').forEach((p) => {
      const list = (D.added || {})[p.dataset.id] || [];
      let wrap = p.querySelector(':scope > .adm-added');
      if (!wrap) { wrap = document.createElement('div'); wrap.className = 'adm-added flow'; p.appendChild(wrap); }
      wrap.innerHTML = list.map((it) => addedHTML(p.dataset.id, it)).join('');
      if (isAdmin) addTools(p);
    });
    document.querySelectorAll('[data-dt]').forEach((box) => { const def = D.dtrees[dtKey(box)]; if (def) dtRefresh(box, def); });
    recolor();
    /* matriz de arquétipos: posição (x/y em %) e nome de cada ponto */
    document.querySelectorAll('#panels > .panel').forEach((p) => p.querySelectorAll('.arqmap').forEach((m, mi) => m.querySelectorAll('.am-dot').forEach((dot, di) => {
      const k = `${p.dataset.id}|pos|${mi}|${di}`; dot.dataset.kp = k;
      const v = D.positions[k]; if (!v) return;
      if (v.x != null) dot.style.left = v.x + '%'; if (v.y != null) dot.style.top = v.y + '%';
      if (v.label != null) { const i = dot.querySelector('i'); dot.textContent = v.label; if (i) dot.prepend(i); }
    })));
    page();
  }
  /* cores: troca um HEX em todo o manual (blocos, faixas, exemplos, textos) + dados do swatch */
  const isHex = (v) => /^#[0-9a-f]{6}$/i.test(v || '');
  function recolor() {
    const map = Object.entries(D.colors || {}).filter(([o, v]) => v && isHex(v.hex));
    if (!map.length) return;
    const root = document.getElementById('panels');
    const rx = new RegExp(map.map(([o]) => o.replace('#', '#')).join('|'), 'gi');
    const to = (m) => (map.find(([o]) => o.toUpperCase() === m.toUpperCase()) || [, { hex: m }])[1].hex;
    root.querySelectorAll('[style]').forEach((el) => { const s = el.getAttribute('style'); if (rx.test(s)) el.setAttribute('style', s.replace(rx, to)); rx.lastIndex = 0; });
    root.querySelectorAll('[data-copy]').forEach((el) => { if (rx.test(el.dataset.copy)) el.dataset.copy = el.dataset.copy.replace(rx, to); rx.lastIndex = 0; });
    root.querySelectorAll('[fill], [stroke], [stop-color]').forEach((el) => ['fill', 'stroke', 'stop-color'].forEach((at) => { const v = el.getAttribute(at); if (v && rx.test(v)) el.setAttribute(at, v.replace(rx, to)); rx.lastIndex = 0; }));
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { if (rx.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(rx, to); rx.lastIndex = 0; }
    const rs = document.documentElement.style;
    for (let i = 0; i < rs.length; i++) { const p = rs[i], v = rs.getPropertyValue(p); if (rx.test(v)) rs.setProperty(p, v.replace(rx, to)); rx.lastIndex = 0; }
    map.forEach(([, v]) => root.querySelectorAll(`.swatch .copybtn[data-copy="${v.hex}"]`).forEach((b) => {
      const sw = b.closest('.swatch'), btns = sw.querySelectorAll('.copybtn');
      if (v.name != null) { const h = sw.querySelector('.hexname'); if (h) h.textContent = v.name; }
      if (v.sub != null) { const s = sw.querySelector('.meta .name'); if (s) s.textContent = v.sub; }
      const fill = sw.querySelector('.fill'); if (fill && window.isDark) fill.style.color = window.isDark(v.hex) ? '#fff' : '#1a1a1a';
      btns.forEach((x) => {
        if (v.rgb && /^RGB/.test(x.textContent)) { x.dataset.copy = v.rgb; x.textContent = `RGB ${v.rgb} ⧉`; delete x.dataset.orig; }
        if (v.cmyk && /^CMYK/.test(x.textContent)) { x.dataset.copy = v.cmyk; x.textContent = `CMYK ${v.cmyk} ⧉`; delete x.dataset.orig; }
      });
    }));
  }
  /* árvore de decisão: chave por página + ordem; troca a definição e redesenha */
  function dtKey(box) { const p = box.closest('.panel'); return p.dataset.id + '|dt|' + [...p.querySelectorAll('[data-dt]')].indexOf(box); }
  function dtRefresh(box, def) {
    window.__DT[box.dataset.dt] = def; box.dataset.path = '';
    const st = box.querySelector('.dt-steps'); if (st) st.innerHTML = window.T.dtSteps(def, []);
    const g = box.querySelector('.dt-all .grid');
    if (g) g.innerHTML = Object.entries(def.outcomes || {}).map(([n, t]) => `<div class="dt-card"><span class="dt-n">${n}</span><p class="copytext">${t}</p></div>`).join('');
  }
  const currentId = () => (document.querySelector('#panels > .panel.active') || {}).dataset?.id;
  function page() {
    const id = currentId(); if (!id) return;
    const t = $('#pageTitle'), s = $('#pageSub');
    if (D.titles[id] != null && t && t.firstChild && t.firstChild.nodeType === 3) t.firstChild.textContent = D.titles[id];
    if (D.subs[id] != null && s) s.innerHTML = D.subs[id];
    if (isAdmin && s) s.contentEditable = 'true';
  }
  document.addEventListener('manual:page', page);

  function modal(html) {
    const m = document.createElement('div');
    m.className = 'adm-modal';
    m.innerHTML = `<div class="adm-card">${html}</div>`;
    m.addEventListener('click', (e) => { if (e.target === m || e.target.dataset.close != null) m.remove(); });
    document.body.appendChild(m);
    return m;
  }
  /* substitutos de alert/confirm/prompt (bloqueados em alguns navegadores/iframes) */
  const uiAlert = (msg) => new Promise((res) => { const m = modal(`<p>${esc(msg)}</p><div class="adm-row"><button type="button" class="pri" data-close>Ok</button></div>`); m.addEventListener('click', () => { if (!document.body.contains(m)) res(); }); m.querySelector('.pri').addEventListener('click', () => res()); });
  const uiConfirm = (msg) => new Promise((res) => {
    const m = modal(`<p>${esc(msg)}</p><div class="adm-row"><button type="button" data-no>Cancelar</button><button type="button" class="pri" data-yes>Confirmar</button></div>`);
    m.querySelector('[data-yes]').addEventListener('click', () => { m.remove(); res(true); });
    m.querySelector('[data-no]').addEventListener('click', () => { m.remove(); res(false); });
  });
  const uiPrompt = (label, value = '', type = 'text') => new Promise((res) => {
    const m = modal(`<label>${esc(label)}<input type="${type}" value="${esc(value)}"></label><div class="adm-row"><button type="button" data-no>Cancelar</button><button type="button" class="pri" data-yes>Ok</button></div>`);
    const inp = m.querySelector('input'); setTimeout(() => inp.focus(), 30);
    const done = (v) => { m.remove(); res(v); };
    m.querySelector('[data-yes]').addEventListener('click', () => done(inp.value));
    m.querySelector('[data-no]').addEventListener('click', () => done(null));
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') done(inp.value); if (e.key === 'Escape') done(null); });
  });

  /* ---------- link discreto no rodapé ---------- */
  const foot = $('#sideFoot');
  if (foot) {
    const a = document.createElement('button');
    a.type = 'button'; a.className = 'adm-link'; a.textContent = isAdmin ? 'Sair do modo edição' : 'Área do administrador';
    a.addEventListener('click', async () => {
      if (isAdmin) { store.on = false; location.reload(); return; }
      if (!CFG.passwordHash) { uiAlert('Defina admin.passwordHash em content/brand.js.'); return; }
      const pw = await uiPrompt('Senha do administrador', '', 'password');
      if (pw == null) return;
      if (fnv(pw) !== CFG.passwordHash) { uiAlert('Senha incorreta.'); return; }
      store.on = true; location.reload();
    });
    foot.appendChild(a);
  }

  apply();
  if (!isAdmin) return;

  /* ============================================================
     A PARTIR DAQUI: só no modo edição
     ============================================================ */
  document.body.classList.add('adm');
  const commit = (fn) => {
    const h = store.hist; h.push(JSON.stringify(D)); store.hist = h;
    fn(D); store.draft = D; bar();
  };
  const changes = () => {
    const d = D, p = PUB, n = (a, b) => Object.keys(Object.assign({}, a, b)).filter((k) => a[k] !== b[k]).length;
    return {
      texts: n(d.texts, p.texts) + n(d.titles, p.titles) + n(d.subs, p.subs),
      images: n(d.images, p.images),
      removed: d.removed.filter((k) => !p.removed.includes(k)).length + p.removed.filter((k) => !d.removed.includes(k)).length,
      added: JSON.stringify(d.added) === JSON.stringify(p.added) ? 0 : Object.values(d.added).flat().length,
      colors: Object.keys(Object.assign({}, d.colors, p.colors || {})).filter((k) => JSON.stringify(d.colors[k]) !== JSON.stringify((p.colors || {})[k])).length,
      positions: Object.keys(Object.assign({}, d.positions, p.positions || {})).filter((k) => JSON.stringify(d.positions[k]) !== JSON.stringify((p.positions || {})[k])).length,
      trees: Object.keys(Object.assign({}, d.dtrees, p.dtrees || {})).filter((k) => JSON.stringify(d.dtrees[k]) !== JSON.stringify((p.dtrees || {})[k])).length,
    };
  };

  /* ---------- barra inferior ---------- */
  const B_ = document.createElement('div');
  B_.className = 'adm-bar';
  document.body.appendChild(B_);
  function bar() {
    const c = changes(), total = c.texts + c.images + c.removed + c.added + c.trees + c.positions + c.colors;
    B_.innerHTML = `
      <span class="adm-st"><b>Modo edição</b> · ${total ? `rascunho com ${total} alteração(ões) não publicada(s)` : 'sem alterações pendentes'}</span>
      <span class="adm-actions">
        <button type="button" data-adm="undo" ${store.hist.length ? '' : 'disabled'}>Desfazer</button>
        <button type="button" data-adm="restore">Restaurar original desta página</button>
        <button type="button" data-adm="discard" ${total ? '' : 'disabled'}>Descartar rascunho</button>
        <button type="button" data-adm="gh">GitHub</button>
        <button type="button" class="pri" data-adm="review" ${total ? '' : 'disabled'}>Revisar e publicar</button>
        <button type="button" data-adm="exit">Sair</button>
      </span>`;
  }
  bar();

  /* ---------- edição de texto ---------- */
  document.addEventListener('click', (e) => {
    if (e.target.closest('.adm-bar, .adm-float, .adm-modal, .adm-tools, .adm-link')) return;
    const t = e.target.closest('[data-kt]');
    if (t) {
      e.preventDefault(); e.stopPropagation();
      if (t.contentEditable !== 'true') { t.dataset.before = t.innerHTML; t.contentEditable = 'true'; t.focus(); }
      return;
    }
    if (e.target.closest('#pageTitle') && !e.target.closest('.info')) {
      const id = currentId(), tn = $('#pageTitle').firstChild;
      uiPrompt('Título da página', tn ? tn.textContent : '').then((v) => { if (v != null && tn) { tn.textContent = v; commit((d) => { d.titles[id] = v; }); } });
    }
  }, true);
  document.addEventListener('focusout', (e) => {
    const t = e.target;
    if (t.id === 'pageSub') { const id = currentId(); if (t.dataset.before != null && t.innerHTML !== t.dataset.before) commit((d) => { d.subs[id] = t.innerHTML; }); delete t.dataset.before; return; }
    if (!t.dataset || !t.dataset.kt) return;
    t.contentEditable = 'false';
    if (t.innerHTML === t.dataset.before) return;
    const k = t.dataset.kt, html = t.innerHTML;
    commit((d) => {
      if (k.startsWith('add|')) { const [, sid, id] = k.split('|'); const it = (d.added[sid] || []).find((x) => String(x.id) === id); if (it) it.html = html; }
      else d.texts[k] = html;
    });
  });
  document.addEventListener('focusin', (e) => { if (e.target.id === 'pageSub') e.target.dataset.before = e.target.innerHTML; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.activeElement && document.activeElement.isContentEditable) document.activeElement.blur(); });

  /* ---------- imagens e blocos: barra flutuante ---------- */
  const F = document.createElement('div');
  F.className = 'adm-float'; F.hidden = true;
  document.body.appendChild(F);
  let target = null;
  const fileIn = Object.assign(document.createElement('input'), { type: 'file', accept: 'image/*', hidden: true });
  document.body.appendChild(fileIn);
  const readImg = (file) => new Promise((res, rej) => {
    if (file.size > 3 * 1024 * 1024) { uiAlert('Imagem acima de 3 MB. Comprima antes de enviar.'); return rej(); }
    const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file);
  });
  const pick = () => new Promise((res) => { fileIn.value = ''; fileIn.onchange = () => fileIn.files[0] && readImg(fileIn.files[0]).then(res).catch(() => {}); fileIn.click(); });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.adm-float, .adm-bar, .adm-modal')) return;
    const col = e.target.closest('#panels .swatch, #panels [data-copy]');
    const colHex = col && (col.classList.contains('swatch') ? (col.querySelector('.copybtn') || {}).dataset?.copy : col.dataset.copy);
    const img = isHex(colHex) ? null : e.target.closest('#panels img, #panels .imgph');
    const blk = e.target.closest('#panels [data-kb], #panels [data-added]');
    const el = (isHex(colHex) && col) || img || blk;
    if (!el || el === target) return;
    target = el;
    const r = el.getBoundingClientRect();
    F.style.top = Math.max(8, r.top + 8) + 'px';
    F.style.left = Math.max(8, r.right - 8) + 'px';
    F.innerHTML = el === col
      ? `<button type="button" data-f="color">Editar cor</button>`
      : img
      ? `<button type="button" data-f="swap">Trocar imagem</button><button type="button" data-f="del">Remover</button>`
      : `<button type="button" data-f="del">Remover bloco</button>`;
    F.hidden = false;
  });
  document.querySelector('.main').addEventListener('scroll', () => { F.hidden = true; target = null; }, { passive: true });
  window.addEventListener('scroll', () => { F.hidden = true; target = null; }, { passive: true });
  F.addEventListener('click', async (e) => {
    const act = e.target.dataset.f; if (!act || !target) return;
    const el = target;
    const added = el.closest('[data-added]');
    if (act === 'del') {
      if (!(await uiConfirm('Remover este item? Dá para desfazer.'))) return;
      if (added) { const [, sid, id] = added.dataset.added.split('|'); commit((d) => { d.added[sid] = (d.added[sid] || []).filter((x) => String(x.id) !== id); }); added.remove(); }
      else {
        const blk = el.closest('[data-kb]');
        if (!blk) return;
        commit((d) => { if (!d.removed.includes(blk.dataset.kb)) d.removed.push(blk.dataset.kb); });
        blk.remove();
      }
      F.hidden = true; target = null; return;
    }
    if (act === 'color') { colorEditor(el); F.hidden = true; target = null; return; }
    if (act === 'swap') {
      const src = await pick();
      let img = el.tagName === 'IMG' ? el : el.querySelector('img');
      const orig = img ? img.dataset.orig : el.dataset.src;
      if (!orig) { uiAlert('Não foi possível identificar esta imagem.'); return; }
      if (!img) { img = document.createElement('img'); img.dataset.orig = orig; img.style.cssText = 'width:100%; display:block; object-fit:cover; min-height:' + (el.offsetHeight || 140) + 'px'; el.replaceWith(img); }
      img.src = src; img.style.display = '';
      if (orig.startsWith('add|')) { const [, sid, id] = orig.split('|'); commit((d) => { const it = (d.added[sid] || []).find((x) => String(x.id) === id); if (it) it.src = src; }); }
      else commit((d) => { d.images[orig] = src; });
    }
  });

  /* ---------- adicionar blocos no fim de cada página ---------- */
  function addTools(p) {
    if (p.querySelector(':scope > .adm-tools')) return;
    const t = document.createElement('div');
    t.className = 'adm-tools';
    t.innerHTML = `<button type="button" data-add="text">+ Bloco de texto</button><button type="button" data-add="image">+ Imagem</button>`;
    t.addEventListener('click', async (e) => {
      const type = e.target.dataset.add; if (!type) return;
      const sid = p.dataset.id, id = Date.now();
      let it = { id, type, html: 'Novo texto. Clique para editar.' };
      if (type === 'image') { const src = await pick(); it = { id, type, src }; }
      commit((d) => { (d.added[sid] = d.added[sid] || []).push(it); });
      p.querySelector(':scope > .adm-added').insertAdjacentHTML('beforeend', addedHTML(sid, it));
    });
    p.appendChild(t);
  }
  document.querySelectorAll('#panels > .panel').forEach(addTools);

  /* ---------- árvore de decisão: fluxo completo editável ---------- */
  const getAt = (o, path) => path.split('.').reduce((x, k) => x[/^\d+$/.test(k) ? +k : k], o);
  const firstOut = (def) => Object.keys(def.outcomes || {})[0] || '1';
  function dteHTML(def) {
    const outs = Object.keys(def.outcomes || {});
    const opts = (next) => `<option value="__q"${typeof next === 'object' ? ' selected' : ''}>→ próxima pergunta</option>` + outs.map((n) => `<option value="${n}"${String(next) === n ? ' selected' : ''}>→ resultado ${n}</option>`).join('');
    const node = (nd, path, depth) => `<div class="dte-q">
      <div class="dte-row"><span class="dte-tag">Pergunta</span><div class="dte-txt" contenteditable="true" data-dte="${path}|q">${nd.q}</div></div>
      <ul class="dte-ans">${nd.a.map(([label, next], j) => { const p = `${path}.a.${j}`; return `<li>
        <div class="dte-row"><span class="dte-tag alt">Resposta</span><div class="dte-txt" contenteditable="true" data-dte="${p}|0">${label}</div>
          <select data-dte-target="${p}">${opts(next)}</select><button type="button" class="dte-x" data-dte-del="${p}" title="Remover resposta">✕</button></div>
        ${typeof next === 'object' ? node(next, p + '.1', depth + 1) : ''}</li>`; }).join('')}</ul>
      <button type="button" class="dte-add" data-dte-add="${path}">+ resposta</button>
    </div>`;
    return `<div class="adm-dte flow">
      <div class="lbl" style="margin:0">Fluxo completo (modo edição)</div>
      ${node(def.start, 'start', 0)}
      <div class="lbl" style="margin:8px 0 0">Resultados</div>
      <div class="dte-outs">${outs.map((n) => `<div class="dte-row"><span class="dt-n">${n}</span><div class="dte-txt" contenteditable="true" data-dte="outcomes|${n}">${def.outcomes[n]}</div><button type="button" class="dte-x" data-dte-odel="${n}" title="Remover resultado">✕</button></div>`).join('')}</div>
      <button type="button" class="dte-add" data-dte-oadd>+ resultado</button>
    </div>`;
  }
  function dteMount(box) {
    const k = dtKey(box), def = clone(D.dtrees[k] || window.__DT[box.dataset.dt]);
    let ed = box.querySelector('.adm-dte'); const html = dteHTML(def);
    if (ed) ed.outerHTML = html; else box.insertAdjacentHTML('beforeend', html);
    ed = box.querySelector('.adm-dte'); ed._def = def; ed._key = k;
  }
  const dteSave = (ed, box) => { const def = clone(ed._def); commit((d) => { d.dtrees[ed._key] = def; }); dtRefresh(box, def); dteMount(box); };
  document.querySelectorAll('[data-dt]').forEach(dteMount);
  document.addEventListener('focusin', (e) => { if (e.target.dataset && e.target.dataset.dte) e.target.dataset.before = e.target.innerHTML; });
  document.addEventListener('focusout', (e) => {
    const t = e.target; if (!t.dataset || !t.dataset.dte || t.innerHTML === t.dataset.before) return;
    const ed = t.closest('.adm-dte'), box = t.closest('[data-dt]');
    const [path, key] = t.dataset.dte.split('|');
    getAt(ed._def, path)[/^\d+$/.test(key) && path !== 'outcomes' ? +key : key] = t.innerHTML;
    dteSave(ed, box);
  });
  document.addEventListener('change', (e) => {
    const s = e.target.closest('[data-dte-target]'); if (!s) return;
    const ed = s.closest('.adm-dte'), box = s.closest('[data-dt]'), ans = getAt(ed._def, s.dataset.dteTarget);
    const f = firstOut(ed._def);
    ans[1] = s.value === '__q' ? { q: 'Nova pergunta', a: [['Sim', f], ['Não', f]] } : s.value;
    dteSave(ed, box);
  });
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-dte-add], [data-dte-del], [data-dte-oadd], [data-dte-odel]'); if (!b) return;
    const ed = b.closest('.adm-dte'), box = b.closest('[data-dt]'), def = ed._def;
    if (b.dataset.dteAdd) getAt(def, b.dataset.dteAdd).a.push(['Nova resposta', firstOut(def)]);
    if (b.dataset.dteDel) {
      const parts = b.dataset.dteDel.split('.'), j = +parts.pop(); parts.pop();
      const nd = getAt(def, parts.join('.'));
      if (nd.a.length <= 1) { uiAlert('Cada pergunta precisa de pelo menos uma resposta.'); return; }
      if (!(await uiConfirm('Remover esta resposta e tudo que vem depois dela?'))) return;
      nd.a.splice(j, 1);
    }
    if (b.dataset.dteOadd != null) {
      const ks = Object.keys(def.outcomes || {});
      const nk = ks.every((x) => /^\d+$/.test(x)) ? String(Math.max(0, ...ks.map(Number)) + 1) : String.fromCharCode((ks[ks.length - 1] || '@').charCodeAt(0) + 1);
      (def.outcomes = def.outcomes || {})[nk] = 'Novo resultado.';
    }
    if (b.dataset.dteOdel) {
      const n = b.dataset.dteOdel;
      if (JSON.stringify(def.start).includes(`"${n}"`) || new RegExp(`,${n}\\]`).test(JSON.stringify(def.start))) { uiAlert(`O resultado ${n} ainda é usado por alguma resposta. Mude essas respostas antes de remover.`); return; }
      delete def.outcomes[n];
    }
    dteSave(ed, box);
  });

  /* ---------- editor de cor ---------- */
  const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rgbCmyk = ([r, g, b]) => { const k = 1 - Math.max(r, g, b) / 255; if (k >= 1) return '0, 0, 0, 100'; return [r, g, b].map((x) => Math.round(((1 - x / 255 - k) / (1 - k)) * 100)).concat(Math.round(k * 100)).join(', '); };
  function colorEditor(el) {
    const sw = el.classList.contains('swatch') ? el : el.closest('.swatch');
    const cur = (sw ? sw.querySelector('.copybtn').dataset.copy : el.dataset.copy).toUpperCase();
    const orig = (Object.entries(D.colors).find(([, v]) => v.hex.toUpperCase() === cur) || [cur])[0];
    const prev = D.colors[orig] || {};
    const txt = (sel) => sw && sw.querySelector(sel) ? sw.querySelector(sel).textContent.replace(/^(RGB|CMYK)\s*|\s*⧉$/g, '').trim() : '';
    const btnTxt = (re) => { const b = sw && [...sw.querySelectorAll('.copybtn')].find((x) => re.test(x.textContent)); return b ? b.dataset.copy : ''; };
    const m = modal(`<h3>Editar cor</h3>
      <p class="hint">A nova cor substitui ${orig} em todo o manual: paleta, combinações, exemplos e faixas.</p>
      <div class="adm-row" style="justify-content:flex-start; align-items:center"><input type="color" name="pick" value="${cur.toLowerCase()}" style="width:56px; height:40px; padding:2px"><label style="flex:1">HEX<input name="hex" value="${cur}"></label></div>
      ${sw ? `<label>Nome<input name="name" value="${esc(prev.name ?? txt('.hexname'))}"></label>
      <label>RGB<input name="rgb" value="${esc(prev.rgb ?? btnTxt(/^RGB/))}"></label>
      <label>CMYK<input name="cmyk" value="${esc(prev.cmyk ?? btnTxt(/^CMYK/))}"></label>
      <label>Uso · Pantone<input name="sub" value="${esc(prev.sub ?? txt('.meta .name'))}"></label>` : ''}
      <div class="adm-row"><button type="button" data-close>Cancelar</button><button type="button" class="pri" data-save>Salvar</button></div>`);
    const f = (n) => m.querySelector(`[name="${n}"]`);
    const sync = (hex) => { if (!isHex(hex)) return; f('pick').value = hex.toLowerCase(); if (f('rgb')) { const rgb = hexRgb(hex); f('rgb').value = rgb.join(', '); f('cmyk').value = rgbCmyk(rgb); } };
    f('pick').addEventListener('input', () => { f('hex').value = f('pick').value.toUpperCase(); sync(f('hex').value); });
    f('hex').addEventListener('input', () => sync(f('hex').value.trim()));
    m.querySelector('[data-save]').addEventListener('click', () => {
      const hex = f('hex').value.trim().toUpperCase();
      if (!isHex(hex)) { uiAlert('Use um HEX de 6 dígitos, ex.: #1F3A5F.'); return; }
      const v = { hex }; ['name', 'rgb', 'cmyk', 'sub'].forEach((k) => { if (f(k)) v[k] = f(k).value.trim(); });
      commit((d) => { if (hex === orig.toUpperCase() && !sw) delete d.colors[orig]; else d.colors[orig] = v; });
      location.reload();
    });
  }

  /* ---------- matriz de arquétipos: arrastar pontos, duplo clique renomeia ---------- */
  document.addEventListener('pointerdown', (e) => {
    const dot = e.target.closest('.arqmap .am-dot'); if (!dot) return;
    e.preventDefault();
    const map = dot.closest('.arqmap'), r = map.getBoundingClientRect();
    let moved = false;
    const move = (ev) => {
      moved = true;
      const x = Math.min(98, Math.max(2, ((ev.clientX - r.left) / r.width) * 100));
      const y = Math.min(98, Math.max(2, ((ev.clientY - r.top) / r.height) * 100));
      dot.style.left = x.toFixed(1) + '%'; dot.style.top = y.toFixed(1) + '%';
    };
    const up = () => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      if (!moved) return;
      const k = dot.dataset.kp, x = parseFloat(dot.style.left), y = parseFloat(dot.style.top);
      commit((d) => { d.positions[k] = Object.assign({}, d.positions[k], { x, y }); });
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
  document.addEventListener('dblclick', async (e) => {
    const dot = e.target.closest('.arqmap .am-dot'); if (!dot) return;
    const v = await uiPrompt('Nome do arquétipo', dot.textContent.trim()); if (v == null) return;
    const i = dot.querySelector('i'); dot.textContent = v; if (i) dot.prepend(i);
    commit((d) => { d.positions[dot.dataset.kp] = Object.assign({}, d.positions[dot.dataset.kp], { label: v }); });
  });

  /* ---------- ações da barra ---------- */
  function ghForm() {
    const g = store.gh;
    const m = modal(`<h3>Publicação no GitHub</h3>
      <p class="hint">O token fica salvo só neste navegador. Crie em GitHub → Settings → Developer settings → Fine-grained tokens, com permissão <b>Contents: Read and write</b> no repositório do manual.</p>
      <label>Repositório (dono/nome)<input name="repo" value="${esc(g.repo || CFG.repo || '')}" placeholder="motora/manual-marca"></label>
      <label>Branch<input name="branch" value="${esc(g.branch || CFG.branch || 'main')}"></label>
      <label>Pasta do manual no repositório (vazio = raiz)<input name="path" value="${esc(g.path ?? CFG.path ?? '')}" placeholder="ex.: aurora/"></label>
      <label>Token<input name="token" type="password" value="${esc(g.token || '')}" placeholder="github_pat_…"></label>
      <div class="adm-row"><button type="button" data-close>Cancelar</button><button type="button" class="pri" data-save>Salvar</button></div>`);
    m.querySelector('[data-save]').addEventListener('click', () => {
      const v = {}; m.querySelectorAll('input').forEach((i) => { v[i.name] = i.value.trim(); });
      if (v.path && !v.path.endsWith('/')) v.path += '/';
      store.gh = v; m.remove(); bar();
    });
  }
  async function gh(path, body) {
    const g = store.gh, url = `https://api.github.com/repos/${g.repo}/contents/${g.path || ''}${path}`;
    const h = { Authorization: `Bearer ${g.token}`, Accept: 'application/vnd.github+json' };
    let sha;
    const cur = await fetch(`${url}?ref=${encodeURIComponent(g.branch || 'main')}`, { headers: h, cache: 'no-store' });
    if (cur.ok) sha = (await cur.json()).sha;
    else if (cur.status !== 404) throw new Error(`GitHub ${cur.status}: verifique repositório e token.`);
    const r = await fetch(url, { method: 'PUT', headers: h, body: JSON.stringify({ message: body.message, content: body.content, branch: g.branch || 'main', sha }) });
    if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.json().catch(() => ({}))).message || 'falha ao gravar'}`);
  }
  const b64 = (s) => btoa(unescape(encodeURIComponent(s)));
  async function publish(btn) {
    const g = store.gh;
    if (!g.repo || !g.token) { ghForm(); return; }
    btn.disabled = true; btn.textContent = 'Publicando…';
    try {
      const out = clone(D); let n = 0;
      const up = async (data) => {
        const m = /^data:image\/(\w+);base64,(.+)$/.exec(data); if (!m) return data;
        const ext = m[1] === 'jpeg' ? 'jpg' : m[1].replace('svg+xml', 'svg');
        const path = `assets/uploads/upload-${Date.now()}-${n++}.${ext}`;
        await gh(path, { message: `manual: imagem ${path}`, content: m[2] });
        return path;
      };
      for (const k of Object.keys(out.images)) out.images[k] = await up(out.images[k]);
      for (const sid of Object.keys(out.added)) for (const it of out.added[sid]) if (it.src) it.src = await up(it.src);
      const file = `/* GERADO PELO MODO EDIÇÃO (engine/admin.js). Não edite à mão: use "Área do administrador". */\nwindow.OVERRIDES = ${JSON.stringify(out, null, 1)};\n`;
      await gh('content/overrides.js', { message: 'manual: atualização pelo modo edição', content: b64(file) });
      store.draft = out; store.hist = [];
      Object.assign(PUB, clone(out)); D = out;
      modal(`<h3>Publicado</h3><p class="hint">O site atualiza em cerca de 1 minuto. As alterações já estão salvas no repositório.</p><div class="adm-row"><button type="button" class="pri" data-close>Ok</button></div>`);
      bar();
    } catch (err) {
      uiAlert(err.message || 'Falha ao publicar.');
      btn.disabled = false; btn.textContent = 'Publicar';
    }
  }
  B_.addEventListener('click', async (e) => {
    const a = e.target.dataset.adm; if (!a) return;
    if (a === 'undo') { const h = store.hist; const prev = h.pop(); store.hist = h; if (prev) { store.draft = JSON.parse(prev); location.reload(); } }
    if (a === 'discard' && await uiConfirm('Descartar todas as alterações não publicadas?')) { store.draft = null; store.hist = []; location.reload(); }
    if (a === 'restore') {
      const id = currentId(); if (!id || !(await uiConfirm('Voltar esta página à versão original do template? Fica no rascunho até publicar.'))) return;
      commit((d) => {
        Object.keys(d.texts).forEach((k) => { if (k.startsWith(id + '|')) delete d.texts[k]; });
        d.removed = d.removed.filter((k) => !k.startsWith(id + '|'));
        delete d.added[id]; delete d.titles[id]; delete d.subs[id];
        Object.keys(d.dtrees).forEach((k) => { if (k.startsWith(id + '|')) delete d.dtrees[k]; });
        Object.keys(d.positions).forEach((k) => { if (k.startsWith(id + '|')) delete d.positions[k]; });
        document.querySelectorAll(`#panels > .panel[data-id="${id}"] img[data-orig]`).forEach((img) => { delete d.images[img.dataset.orig]; });
      });
      location.reload();
    }
    if (a === 'gh') ghForm();
    if (a === 'exit') { store.on = false; location.reload(); }
    if (a === 'review') {
      const c = changes();
      const m = modal(`<h3>Revisar alterações</h3>
        <ul class="adm-sum"><li>Textos alterados: <b>${c.texts}</b></li><li>Imagens trocadas: <b>${c.images}</b></li><li>Itens removidos ou restaurados: <b>${c.removed}</b></li><li>Blocos adicionados: <b>${c.added}</b></li><li>Árvores de decisão alteradas: <b>${c.trees}</b></li><li>Pontos da matriz movidos: <b>${c.positions}</b></li><li>Cores alteradas: <b>${c.colors}</b></li></ul>
        <p class="hint">Publicar grava as alterações no repositório${store.gh.repo ? ` <b>${esc(store.gh.repo)}</b>` : ''} e elas ficam visíveis para todos.</p>
        <div class="adm-row"><button type="button" data-close>Continuar editando</button><button type="button" class="pri" data-pub>Publicar</button></div>`);
      m.querySelector('[data-pub]').addEventListener('click', (ev) => publish(ev.target));
    }
  });
})();
