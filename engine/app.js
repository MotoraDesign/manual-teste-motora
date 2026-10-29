/* ============================================================
   MOTOR · app (não editar por marca)
   1. aplica brand.js (cores, fontes, logos, títulos)
   2. monta sidebar (parte → grupo → item) + painéis
   3. navegação por hash, busca, copiar cor, demos interativas
   ============================================================ */
(function () {
  const B = window.BRAND || {};
  const $ = (id) => document.getElementById(id);
  const rootStyle = document.documentElement.style;

  /* ---------- 1. marca → variáveis CSS ---------- */
  const ui = B.ui || {};
  const setVar = (k, v) => { if (v) rootStyle.setProperty(k, v); };
  setVar('--primary', ui.primary);
  setVar('--accent', ui.accent);
  setVar('--ink', ui.ink);
  setVar('--paper', ui.paper);
  if (ui.primary) setVar('--on-primary', window.isDark(ui.primary) ? '#fff' : '#111');
  if (ui.accent) setVar('--on-accent', window.isDark(ui.accent) ? '#fff' : '#111');

  const fontCss = [];
  ['display', 'text', 'sub'].forEach((k) => {
    const f = (B.fonts || {})[k];
    if (!f) return;
    (f.files || []).forEach((file) => fontCss.push(
      `@font-face{font-family:'${f.family}';src:url('${file.src}');font-weight:${file.weight || 400};font-style:${file.style || 'normal'};font-display:swap;}`));
    setVar('--font-' + k, `'${f.family}', ${f.fallback || 'sans-serif'}`);
  });
  if (fontCss.length) {
    const st = document.createElement('style');
    st.textContent = fontCss.join('\n');
    document.head.appendChild(st);
  }
  (B.fonts && B.fonts.cssLinks || []).forEach((href) => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l);
  });

  const L = B.logos || {};
  document.title = `${B.manualTitle || 'Manual da marca'} ${B.name || ''}`.trim();
  if (L.favicon) { const fi = document.createElement('link'); fi.rel = 'icon'; fi.href = L.favicon; document.head.appendChild(fi); }
  const sideLogo = $('sideLogo'), sideName = $('sideName');
  if (L.sidebar) { sideLogo.src = L.sidebar; sideLogo.alt = `${B.name} — início`; sideName.remove(); }
  else { sideLogo.remove(); sideName.textContent = B.name || ''; }
  const crumbSym = $('crumbSymbol');
  if (L.simbolo) crumbSym.src = L.simbolo; else crumbSym.remove();
  $('sideFoot').innerHTML = (B.sidebarFoot || []).join('<br>');

  /* ---------- 2. seções ---------- */
  const SECTIONS = [
    ...(window.POS_SECTIONS || []),
    ...(window.VIS_SECTIONS || []),
    ...(window.SUB_SECTIONS || []),
    ...(window.CREDITOS_SECTIONS || []),
  ];
  const PARTS = B.parts || [
    { id: 'pos', label: 'Posicionamento', sub: 'estratégia & marca', desc: '' },
    { id: 'vis', label: 'Expressão visual', sub: 'sistema gráfico', desc: '' },
    { id: 'sub', label: 'Sub-marcas', sub: 'níveis do portfólio', desc: '' },
    { id: 'recursos', label: 'Recursos', sub: 'downloads', desc: '' },
    { id: 'creditos', label: 'Créditos', sub: 'contatos', desc: '' },
  ];

  const highlightTodo = (html) => html.replace(/\[preencher[^\]<]*\]/g, (m) => `<span class="todo">${m}</span>`);
  /* botão "copiar texto" em cada bloco de texto (seções com copyText: true) */
  const TEXT_SEL = '.copytext, .quote, .sb-txt, li';
  function addTextCopy(root) {
    const blocks = [...root.querySelectorAll('.box, .slogan-banner')].filter((b) =>
      b.querySelector(TEXT_SEL) && !b.closest('.repo, [data-dt]') && ![...b.querySelectorAll('.box')].some((x) => x.querySelector(TEXT_SEL)));
    blocks.forEach((b) => {
      b.classList.add('has-tcopy');
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'tcopy'; btn.dataset.tcopy = ''; btn.title = 'Copiar texto'; btn.textContent = 'Copiar texto';
      b.appendChild(btn);
    });
  }
  const blockText = (b) => [...b.querySelectorAll(TEXT_SEL)].filter((el) => !el.closest('.info, .tcopy') && !el.parentElement.closest(TEXT_SEL))
    .map((el) => el.innerText.replace(/\s+\n/g, '\n').trim()).filter(Boolean).join('\n\n');
  const nav = $('nav'), panels = $('panels');
  let n = 0;
  PARTS.forEach((part) => {
    const items = SECTIONS.filter((s) => s.part === part.id);
    if (!items.length) return;
    const ph = document.createElement('div');
    ph.className = 'part-header';
    ph.innerHTML = `<span class="pdot">◆</span><span><span class="plabel">${part.label}</span><span class="psub">${part.sub || ''}</span></span>`;
    nav.appendChild(ph);
    let lastGroup = null;
    items.forEach((s) => {
      if (s.group !== lastGroup) {
        const g = document.createElement('div');
        g.className = 'nav-label'; g.textContent = s.group.replace(/^\s*\d+\s*·\s*/, '');
        nav.appendChild(g); lastGroup = s.group;
      }
      const idx = s.idx || (s.id === 'capa' ? '—' : String(++n).padStart(2, '0'));
      const b = document.createElement('button');
      b.type = 'button'; b.dataset.id = s.id;
      b.innerHTML = `<span class="idx">${idx}</span><span class="txt">${s.label}</span>`;
      b.addEventListener('click', () => go(s.id));
      nav.appendChild(b);
      const p = document.createElement('section');
      p.className = 'panel'; p.dataset.id = s.id; p.dataset.screenLabel = s.label;
      try { p.innerHTML = highlightTodo(s.render()); }
      catch (e) { p.innerHTML = `<div class="box"><p class="copytext">Erro ao montar esta seção: ${e.message}</p></div>`; console.error(s.id, e); }
      if (s.copyText) addTextCopy(p);
      panels.appendChild(p);
    });
  });

  /* "Última atualização em": data mais recente entre os arquivos do manual (cabeçalho Last-Modified no servidor,
     ex.: GitHub Pages). Abrindo localmente (file://), usa a data do index.html. brand.updatedAt fixa a data manualmente. */
  (async function lastUpdate() {
    const els = document.querySelectorAll('[data-last-update]');
    if (!els.length) return;
    const fmt = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    let best = B.updatedAt ? new Date(B.updatedAt + 'T12:00:00') : null;
    if (!best) {
      best = new Date(document.lastModified);
      if (location.protocol.startsWith('http')) {
        const files = [location.pathname, ...[...document.querySelectorAll('script[src], link[rel="stylesheet"][href]')].map((el) => el.getAttribute('src') || el.getAttribute('href')).filter((u) => u && !/^https?:/.test(u))];
        const dates = await Promise.all(files.map((u) => fetch(u, { method: 'HEAD', cache: 'no-store' }).then((r) => r.headers.get('last-modified')).catch(() => null)));
        dates.filter(Boolean).map((d) => new Date(d)).forEach((d) => { if (!isNaN(d) && d > best) best = d; });
      }
    }
    if (isNaN(best)) return;
    els.forEach((el) => { el.textContent = fmt(best); });
  })();

  /* capa: menu inicial. window.HOME_MENU = [{ label, sub, goto }] (content/sections-pos.js); sem ele, um card por parte */
  const HM = (window.HOME_MENU || []).filter((m) => SECTIONS.some((s) => s.id === m.goto));
  if (HM.length) document.querySelectorAll('[data-hero-cards]').forEach((wrap) => {
    wrap.classList.add('is-menu');
    wrap.innerHTML = HM.map((m, i) => `<button class="hero-card" type="button" data-goto="${m.goto}"><span class="hc-num">${String(i + 1).padStart(2, '0')}</span><span class="hc-tt">${m.label}</span>${m.sub ? `<span class="hc-sb">${m.sub}</span>` : ''}<span class="hc-go">Abrir →</span></button>`).join('');
  });
  else document.querySelectorAll('[data-hero-cards]').forEach((wrap) => {
    wrap.innerHTML = PARTS.filter((p) => p.id !== 'creditos').map((p) => {
      const first = SECTIONS.find((s) => s.part === p.id && s.id !== 'capa');
      if (!first) return '';
      return `<button class="hero-card" type="button" data-goto="${first.id}"><span class="hc-dot">◆</span><span class="hc-tt">${p.label}</span><span class="hc-sb">${p.desc || p.sub || ''}</span><span class="hc-go">Começar →</span></button>`;
    }).join('');
  });

  /* grafia oficial: nome da marca em negrito no texto corrido */
  function boldBrand(root) {
    if (!B.name || B.boldNameInText === false || !root) return;
    const esc = B.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(^|[^\\p{L}\\p{N}])(${esc})(?![\\p{L}\\p{N}])`, 'gu');
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(t) {
      re.lastIndex = 0;
      if (!re.test(t.nodeValue)) return NodeFilter.FILTER_REJECT;
      const p = t.parentElement;
      if (!p || p.closest('script,style,input,textarea,button.copybtn,.brand-xb,b,strong,.no-bold')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    } });
    const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach((t) => {
      const span = document.createElement('span');
      span.innerHTML = t.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(re, (m, pre, name) => `${pre}<b class="brand-xb">${name}</b>`);
      t.replaceWith(...span.childNodes);
    });
  }
  boldBrand(panels);

  /* ---------- repositório de links ---------- */
  const repoKey = (id) => `brandmanual:${B.name || 'marca'}:repo:${id}`;
  const repoLoad = (id) => { try { return JSON.parse(localStorage.getItem(repoKey(id)) || '[]'); } catch (e) { return []; } };
  const repoSave = (id, list) => { try { localStorage.setItem(repoKey(id), JSON.stringify(list)); } catch (e) {} };
  const esc = (v) => String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const domain = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return u; } };
  function repoRender(box) {
    const id = box.dataset.repo, def = (window.__REPO || {})[id] || {};
    const filter = box.dataset.filter || '';
    const items = [...(def.seed || []).map((x) => ({ ...x, seed: true })), ...repoLoad(id)].filter((x) => !filter || x.cat === filter);
    box.querySelector('[data-repo-list]').innerHTML = items.length ? items.map((x) => `
      <div class="repo-item">
        <div class="repo-main">
          <a href="${esc(x.url)}" target="_blank" rel="noopener" class="repo-title">${esc(x.title)} ↗</a>
          <span class="hint" style="margin:0">${esc(domain(x.url))}${x.note ? ' · ' + esc(x.note) : ''}</span>
        </div>
        ${x.cat ? `<span class="chip">${esc(x.cat)}</span>` : ''}
        ${x.pending ? '<span class="part-tag muted">aguardando aprovação</span>' : ''}
        ${x.seed ? '' : `<button type="button" class="copybtn" data-repo-del="${esc(x.at)}" title="Remover">✕</button>`}
      </div>`).join('') : '<div class="hint empty-cat">Nenhuma referência ainda. Adicione o primeiro link acima.</div>';
  }
  document.querySelectorAll('[data-repo]').forEach(repoRender);
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-repo-form]');
    if (!form) return;
    e.preventDefault();
    const box = form.closest('[data-repo]'), id = box.dataset.repo, fd = new FormData(form);
    const item = { title: fd.get('title').trim(), url: fd.get('url').trim(), cat: fd.get('cat') || '', note: (fd.get('note') || '').trim(), at: String(Date.now()) };
    const to = (B.agency || {}).refsEmail;
    const status = box.querySelector('[data-repo-status]');
    const setStatus = (t, ok) => { if (status) { status.textContent = t; status.dataset.ok = ok ? '1' : ''; } };
    if (to) {
      item.pending = true;
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; setStatus('Enviando para a agência…', true);
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nova referência · manual ${B.name}`,
          _template: 'table', _captcha: 'false',
          Marca: B.name, Repositorio: id, Titulo: item.title, Link: item.url, Categoria: item.cat, Nota: item.note,
          'Para colar no manual (seed)': JSON.stringify({ title: item.title, url: item.url, cat: item.cat, note: item.note }),
        }),
      }).then((r) => r.json()).then((r) => {
        if (r && (r.success === true || r.success === 'true')) setStatus('✓ Enviado para a agência. Aparecerá para todos depois de aprovado.', true);
        else throw new Error(r && r.message);
      }).catch(() => setStatus('Não foi possível enviar agora. O link ficou salvo neste navegador; use “Exportar” para enviar depois.', false))
        .finally(() => { btn.disabled = false; });
    }
    const list = repoLoad(id);
    list.push(item);
    repoSave(id, list);
    form.reset();
    repoRender(box);
  });

  /* ---------- zip das assinaturas (sem bibliotecas: ZIP sem compressão) ---------- */
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = (u8) => { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function makeZip(files) {
    const enc = new TextEncoder(), parts = [], central = []; let offset = 0;
    files.forEach(({ name, data }) => {
      const nm = enc.encode(name), crc = crc32(data), size = data.length;
      const lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(8, 0, true);
      lh.setUint32(14, crc, true); lh.setUint32(18, size, true); lh.setUint32(22, size, true); lh.setUint16(26, nm.length, true);
      parts.push(new Uint8Array(lh.buffer), nm, data);
      const ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true);
      ch.setUint32(16, crc, true); ch.setUint32(20, size, true); ch.setUint32(24, size, true); ch.setUint16(28, nm.length, true); ch.setUint32(42, offset, true);
      central.push(new Uint8Array(ch.buffer), nm);
      offset += 30 + nm.length + size;
    });
    const cSize = central.reduce((n, x) => n + x.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cSize, true); end.setUint32(16, offset, true);
    return new Blob([...parts, ...central, new Uint8Array(end.buffer)], { type: 'application/zip' });
  }
  async function downloadSignaturesZip(btn) {
    const slug = (v) => String(v || 'marca').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const name = `${slug(B.name)}-assinaturas.zip`;
    if (B.signaturesZip) { const a = document.createElement('a'); a.href = B.signaturesZip; a.download = name; a.click(); return; }
    const dir = B.signaturesDir || 'assets/logos/assinaturas';
    const label = btn.textContent; btn.disabled = true; btn.textContent = 'Preparando…';
    try {
      const files = [];
      for (const sg of B.signatures || []) for (const m of ['colorida', 'positivo', 'negativo']) {
        const r = await fetch(`${dir}/${sg.id}-${m}.svg`);
        if (r.ok) files.push({ name: `${m}/${slug(B.name)}-${sg.id}-${m}.svg`, data: new Uint8Array(await r.arrayBuffer()) });
      }
      if (!files.length) throw new Error('nenhum arquivo');
      const url = URL.createObjectURL(makeZip(files));
      const a = document.createElement('a'); a.href = url; a.download = name; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      btn.textContent = '✓ Download iniciado';
    } catch (err) {
      btn.textContent = 'Indisponível offline — abra o manual publicado';
    }
    setTimeout(() => { btn.textContent = label; btn.disabled = false; }, 2600);
  }

  /* ---------- 3. navegação ---------- */
  const titleEl = $('pageTitle'), crumbEl = $('crumb'), subEl = $('pageSub');
  function go(id) {
    const s = SECTIONS.find((x) => x.id === id) || SECTIONS[0];
    if (!s) return;
    document.querySelectorAll('.nav button').forEach((b) => b.classList.toggle('active', b.dataset.id === s.id));
    document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.dataset.id === s.id));
    const isCapa = s.id === 'capa';
    crumbEl.textContent = s.crumb || '';
    titleEl.textContent = s.title || '';
    if (s.info) titleEl.insertAdjacentHTML('beforeend', window.T.info(s.info));
    subEl.innerHTML = highlightTodo((s.sub || '').replace(/&/g, '&amp;').replace(/</g, '&lt;'));
    [crumbEl, titleEl, subEl, $('crumbSymbol')].forEach((el) => { if (el) el.style.display = isCapa ? 'none' : ''; });
    if (!isCapa) boldBrand(titleEl.parentElement.querySelector('.page-sub'));
    history.replaceState(null, '', '#' + s.id);
    document.dispatchEvent(new CustomEvent('manual:page', { detail: s.id }));
    window.scrollTo({ top: 0 });
    document.querySelector('.main').scrollTop = 0;
  }
  $('homeBtn').addEventListener('click', () => go('capa'));

  /* cópia: execCommand primeiro (funciona em iframes e em file://), Clipboard API como reforço */
  function copyText(v) {
    let ok = false;
    try {
      const ta = document.createElement('textarea');
      ta.value = v; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed; top:0; left:0; opacity:0; pointer-events:none';
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, v.length);
      ok = document.execCommand('copy');
      ta.remove();
    } catch (e) {}
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).catch(() => {});
    return ok;
  }

  function carShow(car, to, step) {
    const slides = car.querySelectorAll('.car-slide'), thumbs = car.querySelectorAll('.car-thumb'), n = slides.length;
    const i = ((to != null ? to : +car.dataset.car + step) % n + n) % n;
    car.dataset.car = i;
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    thumbs.forEach((t, k) => t.classList.toggle('on', k === i));
    car.querySelector('.car-count').textContent = `${i + 1} / ${n}`;
    car.querySelector('.car-cap').innerHTML = highlightTodo((thumbs[i].dataset.cap || '').replace(/&/g, '&amp;').replace(/</g, '&lt;'));
    const t = thumbs[i], row = t.parentElement;
    row.scrollTo({ left: t.offsetLeft - row.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
    const car = document.querySelector('.panel.active .car');
    if (car) carShow(car, null, e.key === 'ArrowRight' ? 1 : -1);
  });
  /* ---------- interações (delegadas, montadas uma vez) ---------- */
  document.addEventListener('click', (e) => {
    const goto = e.target.closest('[data-goto]');
    if (goto) { go(goto.dataset.goto); return; }

    const carBtn = e.target.closest('[data-car-step],[data-car-go]');
    if (carBtn) { carShow(carBtn.closest('.car'), carBtn.dataset.carGo != null ? +carBtn.dataset.carGo : null, +carBtn.dataset.carStep || 0); return; }

    const tc = e.target.closest('[data-tcopy]');
    if (tc) {
      copyText(blockText(tc.parentElement));
      tc.classList.add('copied'); tc.textContent = 'Copiado!';
      clearTimeout(tc._t); tc._t = setTimeout(() => { tc.classList.remove('copied'); tc.textContent = 'Copiar texto'; }, 1200);
      return;
    }

    const cp = e.target.closest('[data-copy]');
    if (cp) {
      const v = cp.dataset.copy;
      copyText(v);
      if (cp.classList.contains('copybtn')) {
        if (!cp.dataset.orig) cp.dataset.orig = cp.textContent;
        cp.classList.add('copied'); cp.textContent = 'copiado!';
        clearTimeout(cp._t); cp._t = setTimeout(() => { cp.classList.remove('copied'); cp.textContent = cp.dataset.orig; }, 1100);
      } else {
        cp.dataset.ok = '1'; clearTimeout(cp._t); cp._t = setTimeout(() => delete cp.dataset.ok, 900);
      }
      return;
    }

    const dtBtn = e.target.closest('[data-dt-ans], [data-dt-reset]');
    if (dtBtn) {
      const box = dtBtn.closest('[data-dt]');
      const def = (window.__DT || {})[box.dataset.dt];
      let path = box.dataset.path ? box.dataset.path.split(',').map(Number) : [];
      path = dtBtn.hasAttribute('data-dt-reset') ? [] : path.slice(0, +dtBtn.dataset.dtStep).concat(+dtBtn.dataset.dtAns);
      box.dataset.path = path.join(',');
      const steps = box.querySelector('.dt-steps');
      steps.innerHTML = highlightTodo(window.T.dtSteps(def, path));
      boldBrand(steps);
      const last = steps.lastElementChild;
      if (last) last.classList.add('dt-new');
      return;
    }

    const repoDel = e.target.closest('[data-repo-del]');
    if (repoDel) {
      const box = repoDel.closest('[data-repo]'), id = box.dataset.repo;
      repoSave(id, repoLoad(id).filter((x) => x.at !== repoDel.dataset.repoDel));
      repoRender(box);
      return;
    }
    const repoF = e.target.closest('[data-repo-filter] button');
    if (repoF) {
      const box = repoF.closest('[data-repo]');
      repoF.parentElement.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === repoF));
      box.dataset.filter = repoF.dataset.cat;
      repoRender(box);
      return;
    }
    const repoX = e.target.closest('[data-repo-export]');
    if (repoX) {
      const box = repoX.closest('[data-repo]'), id = box.dataset.repo, def = (window.__REPO || {})[id] || {};
      const all = [...(def.seed || []), ...repoLoad(id).map(({ at, ...x }) => x)];
      const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = `referencias-${id}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      return;
    }

    const zipBtn = e.target.closest('[data-sig-zip]');
    if (zipBtn) { downloadSignaturesZip(zipBtn); return; }

    const sigBtn = e.target.closest('[data-sig-seg] button');
    if (sigBtn) {
      const page = sigBtn.closest('[data-sig-page]'), mode = sigBtn.dataset.mode, dir = page.dataset.sigDir;
      sigBtn.parentElement.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === sigBtn));
      page.dataset.mode = mode;
      page.querySelectorAll('img[data-sig]').forEach((im) => {
        const src = `${dir}/${im.dataset.sig}-${mode}.svg`;
        im.dataset.ph = `${im.alt} · ${src}`;
        im.src = src;
      });
      page.querySelectorAll('a[data-sig-dl]').forEach((a) => {
        const file = `${a.dataset.sigDl}-${mode}.svg`;
        a.href = `${dir}/${file}`; a.download = file;
        const l = a.querySelector('[data-sig-dl-label]'); if (l) l.textContent = mode;
      });
      return;
    }

    const segBtn = e.target.closest('[data-logo-seg] button');
    if (segBtn) {
      const seg = segBtn.parentElement;
      seg.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === segBtn));
      const stage = seg.closest('.box').querySelector('[data-logo-stage]');
      const dark = segBtn.dataset.bg === 'dark';
      stage.classList.toggle('dark', dark);
      const pos = stage.querySelector('[data-logo-pos]'), neg = stage.querySelector('[data-logo-neg]');
      if (pos) pos.style.display = dark ? 'none' : '';
      if (neg) neg.style.display = dark ? '' : 'none';
      return;
    }

    const sizeBtn = e.target.closest('[data-fontsize-seg] button');
    if (sizeBtn) {
      const box = sizeBtn.closest('.fontprev');
      sizeBtn.parentElement.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === sizeBtn));
      box.querySelector('[data-fontprev-out]').style.fontSize = sizeBtn.dataset.size + 'px';
    }
  });
  /* tooltip (i): vira para a esquerda se não couber na tela */
  const placeInfo = (e) => {
    const el = e.target.closest && e.target.closest('.info');
    if (!el) return;
    el.classList.remove('flip');
    const pop = el.querySelector('.info-pop');
    const limit = Math.min(window.innerWidth, (el.closest('.main') || document.body).getBoundingClientRect().right);
    if (pop.getBoundingClientRect().right > limit - 12) el.classList.add('flip');
  };
  document.addEventListener('mouseover', placeInfo);
  document.addEventListener('focusin', placeInfo);

  document.addEventListener('input', (e) => {
    if (!e.target.matches('[data-fontprev-input]')) return;
    e.target.closest('.fontprev').querySelector('[data-fontprev-out]').textContent = e.target.value || ' ';
  });

  /* ---------- busca (título do item + texto do painel) ---------- */
  const searchInput = $('searchInput');
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  searchInput.addEventListener('input', () => {
    const q = norm(searchInput.value.trim());
    document.querySelectorAll('.nav button').forEach((b) => {
      const p = panels.querySelector(`.panel[data-id="${b.dataset.id}"]`);
      const hit = !q || norm(b.textContent).includes(q) || (p && norm(p.textContent).includes(q));
      b.style.display = hit ? '' : 'none';
    });
    const sweep = (sel, stop) => document.querySelectorAll(sel).forEach((h) => {
      let el = h.nextElementSibling, any = false;
      while (el && !el.matches(stop)) { if (el.tagName === 'BUTTON' && el.style.display !== 'none') any = true; el = el.nextElementSibling; }
      h.style.display = any ? '' : 'none';
    });
    sweep('.nav-label', '.nav-label,.part-header');
    sweep('.part-header', '.part-header');
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const first = [...document.querySelectorAll('.nav button')].find((b) => b.style.display !== 'none');
    if (first) go(first.dataset.id);
  });

  /* ---------- init ---------- */
  const start = (location.hash || '').replace('#', '');
  go(SECTIONS.find((s) => s.id === start) ? start : (SECTIONS[0] && SECTIONS[0].id));
})();
