/* ============================================================
   CONTEÚDO · Expressão visual
   Paleta, tipografia e logos são lidos de brand.js
   automaticamente — aqui ficam só os textos e a ordem.
   ============================================================ */
(function () {
  const T = window.T, B = window.BRAND, P = '[preencher]';
  const L = B.logos, F = B.fonts;
  const fontFamily = (k) => `var(--font-${k})`;
  /* botões de download da fonte: fonts.X.download (arquivo/zip) e fonts.X.license (arquivo ou URL) */
  const fontDl = (f) => {
    const btn = (href, label, ext) => href ? `<a class="btn${ext ? '' : ' accent'}" href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ' download'}>${label}</a>` : `<a class="btn${ext ? '' : ' accent'}" aria-disabled="true" title="[preencher] caminho em brand.js">${label}</a>`;
    return `<div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:auto; padding-top:12px">${btn(f.download, '↓ Baixar fonte', false)}${btn(f.license, '↓ Licença', true)}</div>`;
  };

  /* "O que é esse texto?" / "Para que serve?" — ícone (i) no título de cada seção */
  const INFO = {
    conceito: { what: 'Explica o que o logotipo representa, ressaltando suas características mais marcantes, e o conceito de todo o sistema visual.', why: 'Dar sentido às escolhas visuais e alinhar todos sobre o que queremos comunicar com a identidade.' },
    assinaturas: { what: 'As versões oficiais da marca e quando usar cada uma.', why: 'Garantir que a versão certa seja usada em cada contexto, formato e fundo.' },
    'grid-marca': { what: 'A malha de construção que define as proporções do logotipo e, a partir dela, a área de proteção mínima ao redor da marca.', why: 'Preservar a geometria da marca e garantir legibilidade e destaque, evitando que outros elementos invadam seu espaço.' },
    'usos-indevidos': { what: 'Exemplos do que não fazer com a marca.', why: 'Evitar distorções e alterações que enfraquecem o reconhecimento da identidade.' },
    alinhamento: { what: 'Os alinhamentos preferenciais de cada versão da marca.', why: 'Orientar a composição de peças para que a marca se encaixe de forma consistente nos layouts.' },
    reducao: { what: 'Os tamanhos mínimos de reprodução da marca, no impresso e no digital.', why: 'Garantir que a marca continue legível mesmo em aplicações pequenas.' },
    paleta: { what: 'As cores oficiais da marca, com seus códigos HEX, RGB, CMYK e Pantone.', why: 'Garantir fidelidade de cor em qualquer meio. Clique nos códigos para copiar.' },
    'figura-fundo': { what: 'As combinações de cor entre figura (textos, grafismos, ilustrações) e fundo.', why: 'Garantir legibilidade, hierarquia e harmonia, mantendo o equilíbrio e a acessibilidade das peças.' },
    matriz: { what: 'Um guia de consulta rápida com todas as combinações de figura e fundo que funcionam dentro da paleta da marca.', why: 'Garantir legibilidade e equilíbrio nos layouts. As combinações que não aparecem aqui têm contraste insuficiente e não devem ser utilizadas.' },
    'aplicacao-cor': { what: 'A variação da marca indicada para cada tipo de fundo.', why: 'Facilitar a escolha da versão certa do logotipo sobre cores da paleta ou fora dela, fotos e fundos variados.' },
    monocromia: { what: 'O uso da marca em preto e branco.', why: 'Orientar aplicações em uma cor só, como impressões P&B, carimbos e gravações.' },
    'elementos-editoriais': { what: 'Os grafismos e elementos de apoio do sistema visual.', why: 'Enriquecer as peças com elementos próprios da identidade, de forma consistente.' },
    tipografia: { what: 'As famílias tipográficas oficiais e o papel de cada uma.', why: 'Manter a hierarquia e a voz visual da marca em todos os textos.' },
    imagens: { what: 'O tratamento gráfico aplicado às fotografias.', why: 'Garantir que as imagens tenham uma linguagem visual única e reconhecível.' },
    'aplicacao-layout': { what: 'As proporções entre marca, símbolo e texto nas composições.', why: 'Orientar a montagem de peças mantendo o equilíbrio visual.' },
    'grid-layout': { what: 'Como organizar as guias e margens na construção dos layouts.', why: 'Manter a consistência e a organização entre os layouts da marca.' },
    exemplos: { what: 'Peças reais que aplicam o sistema visual.', why: 'Servir de referência prática para novas criações.' },
    downloads: { what: 'A central de arquivos originais da marca.', why: 'Garantir que todos usem sempre os arquivos oficiais e atualizados.' },
  };

  window.VIS_SECTIONS = [
    /* ---------- 01 · Construção ---------- */
    {
      id: 'conceito', label: 'Conceito', group: '01 · Construção',
      crumb: 'Construção', title: 'Conceito',
      sub: 'O que o logotipo representa e o que a identidade comunica.',
      render: () => `<div class="flow">
        ${T.pic('assets/fotos/conceito-destaque.jpg', 'logo aplicado · imagem de destaque', 460)}
        <div class="box flow">
          ${T.lbl('O que o logotipo representa')}
          ${T.lead(`${P} O que o logotipo de ${B.name} representa e de onde vem a ideia.`)}
          ${T.body(`${P} Suas características mais marcantes: forma, símbolo, tipografia, cor.`)}
        </div>
        <div class="box flow">
          ${T.lbl('O sistema visual')}
          ${T.body(`${P} O conceito do sistema visual como um todo e o que queremos comunicar com a identidade.`)}
        </div>
      </div>`,
    },
    {
      id: 'assinaturas', label: 'Assinaturas', group: '01 · Construção',
      crumb: 'Construção', title: 'Assinaturas',
      sub: `A marca da ${B.name} apresenta quatro variações de assinatura. Cada assinatura deve ser utilizada individualmente. Nunca use mais de uma assinatura no mesmo layout.`,
      render: () => {
        const SIG = (B.signatures || []).map((sg) => ({ ...sg, use: String(sg.use || '').replace(/\{marca\}/g, B.name) })), dir = B.signaturesDir || 'assets/logos/assinaturas';
        const img = (sg, h) => `<img data-sig="${sg.id}" src="${dir}/${sg.id}-colorida.svg" alt="${B.name} · ${sg.label}" data-ph="${sg.label} · ${dir}/${sg.id}-colorida.svg" style="max-height:${h}px; max-width:80%; object-fit:contain" onerror="T.__missing(this, ${h})">`;
        const dl = (sg) => `<a class="btn" data-sig-dl="${sg.id}" href="${dir}/${sg.id}-colorida.svg" download="${sg.id}-colorida.svg" style="align-self:flex-start">↓ Baixar <span data-sig-dl-label>colorida</span> · SVG</a>`;
        const [main, ...rest] = SIG;
        return `<div class="flow sig-page" data-sig-page data-sig-dir="${dir}" data-mode="colorida">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap">
          <button class="btn accent" type="button" data-sig-zip>↓ Baixar todas as versões · ZIP</button>
          <div class="seg" data-sig-seg><button class="on" type="button" data-mode="colorida">Colorida</button><button type="button" data-mode="positivo">Positivo</button><button type="button" data-mode="negativo">Negativo</button></div>
        </div>
        ${main ? `<div class="box flow sig-card">
          <div class="lbl" style="margin:0">Assinatura principal · ${main.label}</div>
          <div class="logo-stage sig-stage">${img(main, 110)}</div>
          ${T.hint(main.use)}
          ${dl(main)}
        </div>` : ''}
        <div class="grid cols-2">${rest.map((sg) => `<div class="box flow sig-card" style="padding:16px">
          <div class="lbl" style="margin:0">${sg.label}</div>
          <div class="logo-stage sig-stage" style="min-height:150px">${img(sg, 90)}</div>
          ${T.hint(sg.use)}
          ${dl(sg)}
        </div>`).join('')}</div>
      </div>`;
      },
    },
    {
      id: 'grid-marca', label: 'Grid e arejamento', group: '01 · Construção',
      crumb: 'Construção', title: 'Grid e arejamento',
      sub: 'As proporções que regem o desenho da marca e o espaço de proteção que deriva delas.',
      render: () => `<div class="flow">
        <div class="grid cols-2">
          <div class="box flow">
            ${T.lbl('Grid de construção')}
            ${T.body(`${P} De qual medida o grid parte (ex.: espessura de uma haste) — esse módulo é a unidade x.`)}
            ${T.body(`Para criar novas assinaturas, fale com a ${B.agency.name}: <a href="mailto:${B.agency.email}">${B.agency.email}</a>`)}
          </div>
          <div class="box flow">
            ${T.lbl('Arejamento')}
            ${T.body(`O arejamento é determinado a partir do grid: a área de proteção mede ${P} x ao redor da marca.`)}
            ${T.body(`${P} Exceções por assinatura, se houver (ex.: símbolo isolado).`)}
          </div>
        </div>
        ${(B.signatures || []).map((sg) => `<div class="box flow">
          ${T.lbl(sg.label)}
          <div class="grid cols-2">
            <figure style="margin:0; display:flex; flex-direction:column; gap:8px">${T.pic(`assets/diagramas/grid/${sg.id}-grid.svg`, `grid · ${sg.label}`, 240)}<figcaption class="hint" style="margin:0">Grid</figcaption></figure>
            <figure style="margin:0; display:flex; flex-direction:column; gap:8px">${T.pic(`assets/diagramas/grid/${sg.id}-arejamento.svg`, `arejamento · ${sg.label}`, 240)}<figcaption class="hint" style="margin:0">Arejamento</figcaption></figure>
          </div>
        </div>`).join('')}
      </div>`,
    },
    {
      id: 'usos-indevidos', label: 'Usos indevidos', group: '01 · Construção',
      crumb: 'Construção', title: 'Usos indevidos',
      sub: 'Preserve sempre os elementos e a estrutura da marca. Não distorça ou altere as suas formas, pois isso pode comprometer o seu reconhecimento. Abaixo, uma lista com as principais aplicações a serem evitadas.',
      render: () => `<div class="flow">${[
        ['Não distorcer', 'Não achatar, alongar ou criar perspectivas.'],
        ['Não criar novas assinaturas', 'Não alterar a disposição nem a proporção entre os elementos.'],
        ['Não alterar as cores', 'Use apenas as combinações de cor aprovadas.'],
      ].map(([t, d], i) => {
        const n = String(i + 1).padStart(2, '0');
        return `<div class="dd no flow" style="padding:22px">
          <div class="hd" style="margin:0"><span class="badge">✕</span> ${n}. ${t}</div>
          ${T.hint(d)}
          <div class="grid cols-2">${['a', 'b'].map((v) => T.pic(`assets/diagramas/uso-incorreto-${n}${v}.svg`, `exemplo ${v.toUpperCase()}`, 220)).join('')}</div>
        </div>`;
      }).join('')}</div>`,
    },
    {
      id: 'alinhamento', label: 'Alinhamento', group: '01 · Construção',
      crumb: 'Construção', title: 'Alinhamento da marca',
      sub: 'Cada assinatura possui um alinhamento preferencial indicado. Siga as instruções a seguir para cada uma delas:',
      render: () => {
        /* por assinatura (brand.js → signatures): 1 preferencial, 1 secundário e 1–2 indevidos (alignBad: 1 ou 2) */
        const dir = 'assets/diagramas/alinhamento';
        const tile = (ok, title, file, alt) => `<div class="dd ${ok ? 'ok' : 'no'} flow" style="padding:14px">
          <div class="hd" style="margin:0; font-size:15px"><span class="badge" style="width:20px; height:20px; font-size:11px">${ok ? '✓' : '✕'}</span> ${title}</div>
          ${T.pic(`${dir}/${file}`, alt, 220)}
        </div>`;
        return `<div class="flow">${(B.signatures || []).map((sg) => {
          const bad = sg.alignBad === 1 ? [1] : [1, 2];
          return `<div class="box flow">
            ${T.lbl(sg.label)}
            ${T.hint(`${P} alinhamento preferencial e secundário desta assinatura.`)}
            <div class="grid cols-2">
              ${tile(true, 'Preferencial', `${sg.id}-preferencial.svg`, `${sg.label} · preferencial`)}
              ${tile(true, 'Secundário', `${sg.id}-secundario.svg`, `${sg.label} · secundário`)}
              ${bad.map((n) => tile(false, 'Evite', `${sg.id}-indevido-${n}.svg`, `${sg.label} · indevido ${n}`)).join('')}
            </div>
          </div>`;
        }).join('')}</div>`;
      },
    },
    {
      id: 'reducao', label: 'Redução', group: '01 · Construção',
      crumb: 'Construção', title: 'Redução / tamanho mínimo',
      sub: 'Em caso de dúvida quanto ao limite para reduzir a marca em determinado suporte, seja ele gráfico ou digital, aconselha-se realizar testes para encontrar o tamanho mínimo ideal a ser utilizado.',
      render: () => `<div class="flow">
        <div class="box">${T.body(`Para a marca ${B.name}, em qualquer versão da sua assinatura, os seus tamanhos mínimos foram definidos com base na [preencher: altura/largura] do logotipo.`)}</div>
        <div class="grid cols-2">${(B.signatures || []).map((sg) => `<div class="box flow sig-card" style="padding:18px">
          ${T.lbl(sg.label)}
          ${T.pic(`assets/diagramas/reducao/${sg.id}-reducao.svg`, `redução · ${sg.label}`, 200)}
          ${T.chips([`${sg.minPrint || '[preencher]'} mm impresso`, `${sg.minDigital || '[preencher]'} px digital`])}
        </div>`).join('')}</div>
      </div>`,
    },

    /* ---------- 02 · Cores ---------- */
    {
      id: 'paleta', label: 'Paleta', group: '02 · Cores',
      crumb: 'Cores', title: 'Paleta de cores',
      sub: 'A paleta de cores representa a identidade e personalidade da marca, com tons que se conectam conceitualmente com o propósito da instituição.',
      render: () => `<div class="flow">
        <div>${T.lbl('Principais')}${T.colors(B.colors.principais)}</div>
        ${B.colors.secundarias && B.colors.secundarias.length ? `<div>${T.lbl('Secundárias')}${T.colors(B.colors.secundarias)}</div>` : ''}
        ${B.colors.neutras && B.colors.neutras.length ? `<div>${T.lbl('Neutras')}${T.colors(B.colors.neutras)}</div>` : ''}
        ${(() => {
          const A = B.colors.porAplicacao || {};
          const groups = A.groups || (B.themes || []).map((t) => ({ label: t.label, palette: t.palette }));
          if (!groups.length) return '';
          return `<div class="flow">
            <div>${T.lbl(A.title || 'Cores por produto, serviço ou editoria')}${T.hint(A.intro || `${P} Quando a arquitetura da marca exigir, cada produto, serviço ou editoria tem sua cor ou combinação de cores.`)}</div>
            ${groups.map((g) => `<div class="box flow" style="padding:18px">
              <div class="lbl" style="margin:0">${g.label}</div>
              ${g.note ? T.hint(g.note) : ''}
              ${T.colors(g.palette)}
            </div>`).join('')}
          </div>`;
        })()}
      </div>`,
    },
    {
      id: 'figura-fundo', label: 'Figura e fundo', group: '02 · Cores',
      crumb: 'Cores', title: 'Figura e fundo',
      sub: 'O contraste entre as cores da paleta garante clareza, legibilidade e impacto visual. Ele destaca os elementos principais, cria hierarquia e transmite a personalidade da marca de forma consistente.',
      render: () => {
        const C = B.colors, FF = C.figuraFundo || {};
        const all = [...(C.principais || []), ...(C.secundarias || []), ...(C.neutras || [])];
        const ex = FF.exemplos || { ok: [], no: [] };
        const exPic = (ok, cap, i) => `<figure class="dd ${ok ? 'ok' : 'no'} flow" style="margin:0; padding:14px">
          <div class="hd" style="margin:0; font-size:15px"><span class="badge" style="width:20px; height:20px; font-size:11px">${ok ? '✓' : '✕'}</span> ${ok ? 'Correto' : 'Evite'}</div>
          ${T.pic(`assets/diagramas/figura-fundo/${ok ? 'correto' : 'indevido'}-0${i + 1}.svg`, ok ? 'exemplo correto' : 'exemplo indevido', 280)}
          <figcaption class="hint" style="margin:0">${cap}</figcaption>
        </figure>`;
        const group = (title, g) => g && g.combos && g.combos.length ? `<div class="box flow">
          ${T.lbl(title)}
          ${g.text ? T.body(g.text) : ''}
          <div class="grid cols-3">${g.combos.map((c) => T.comboTile(c, all)).join('')}</div>
        </div>` : '';
        return `<div class="flow">
        <div class="box flow">
          ${T.lbl('Cores por layout')}
          <div class="ff-rule"><span class="ff-num">até ${FF.maxCores || '[preencher]'}</span>${T.hint('cores da paleta num mesmo layout, além de preto e branco. Principais combinações:')}</div>
          <div class="grid cols-2">${(FF.layouts || []).map((l) => T.layoutStrip(l, all)).join('')}</div>
        </div>
        ${group('Layouts de impacto', FF.impacto)}
        ${group('Manchas gráficas densas', FF.denso)}
        <div class="box flow">
          ${T.lbl('Combinações possíveis', INFO.matriz)}
          ${T.body('Cada faixa representa uma cor de fundo. Sobre ela estão as cores que podem ser aplicadas como figura, da combinação de maior contraste para a de menor. Para textos, priorize sempre as primeiras cores de cada faixa: quanto menor o texto, mais o contraste importa.')}
          ${T.contrastMatrix(all, FF)}
        </div>
        <div class="flow">
          ${T.lbl('Exemplos aplicados')}
          <div class="grid cols-3">${ex.ok.map((c, i) => exPic(true, c, i)).join('')}</div>
          <div class="grid cols-3">${ex.no.map((c, i) => exPic(false, c, i)).join('')}</div>
        </div>
      </div>`;
      },
    },
    {
      id: 'aplicacao-cor', label: 'Aplicação da marca', group: '02 · Cores',
      crumb: 'Cores', title: 'Aplicação da marca',
      sub: 'Combinações recomendadas e não recomendadas para aplicação da marca, dentro da paleta de cor institucional.',
      render: () => {
        const A = B.colors.aplicacao || {}, FP = A.foraPaleta || {}, FO = A.fotos || {};
        return `<div class="flow">
        ${A.destaques && A.destaques.length ? `<div class="box flow">
          ${T.lbl('Principais variações')}
          ${T.body(`As assinaturas da ${B.name} possuem variações de cores, recomendadas para diferentes contextos e tipos de fundo. Sempre que possível, priorize a aplicação em [preencher: duas cores], por garantir melhor legibilidade e consistência visual.`)}
          <div class="grid cols-2">${A.destaques.map((d) => `<div class="ap-feature" style="background:${d.bg}; color:${window.isDark(d.bg) ? '#fff' : '#1a1a1a'}${d.logos.length > 1 ? '; grid-column:1 / -1' : ''}">
            <span class="ap-fl">${d.label}</span>
            <div class="ap-flogos">${d.logos.map(([c1, c2]) => T.logoArt(c1, c2)).join('')}</div>
          </div>`).join('')}</div>
        </div>` : ''}
        ${[
          ['Marca colorida', A.colorido || [], 'colorido'],
          ['Positivo e negativo', (A.pn || []).map((h) => [h, h]), 'pn'],
          ['Monocromática', (A.mono || []).map((h) => [h, h]), 'mono'],
        ].filter(([, p]) => p.length).map(([t, p, k]) => `<div class="box flow">
          ${T.lbl(t)}
          ${(A.textos || {})[k] ? T.body(A.textos[k]) : ''}
          ${T.apGroup(p, A)}
        </div>`).join('')}
        ${A.importante ? `<div class="box"><p class="ap-note"><b>IMPORTANTE!</b> ${A.importante}</p></div>` : ''}
        <div class="box flow">
          ${T.lbl('Escala de cinza', INFO.monocromia)}
          ${T.body('Para aplicar a marca em monocromia (preto e branco) sobre um fundo em escala de cinza, deve-se observar onde os contrastes são mais visíveis. São os casos de etiquetas com código de barra, documentos que podem ser fotocopiados ou impressos em preto e branco, entre outros.')}
          <div class="tone-strip">${[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((p) => `<div style="background:rgba(0,0,0,${p / 100}); color:${p >= 60 ? '#fff' : '#000'}">${p}%</div>`).join('')}</div>
          <div class="grid cols-2">
            ${T.dd(true, '≤ 50% preto', `<div class="grid cols-2">${T.apTile('#FFFFFF', '#000000', '#000000', 'ok')}${T.apTile('#808080', '#000000', '#000000', 'ok')}</div>` + T.hint('Marca na versão positiva (preta).'))}
            ${T.dd(true, '≥ 60% preto', `<div class="grid cols-2">${T.apTile('#666666', '#FFFFFF', '#FFFFFF', 'ok')}${T.apTile('#000000', '#FFFFFF', '#FFFFFF', 'ok')}</div>` + T.hint('Marca na versão negativa (branca).'))}
          </div>
        </div>
        ${FP.exemplos && FP.exemplos.length ? `<div class="box flow">
          ${T.lbl('Fundos fora da paleta')}
          ${(FP.texts || []).map(T.body).join('')}
          <div class="ap-grid">${FP.exemplos.map(T.apFree).join('')}</div>
        </div>` : ''}
        ${FO.exemplos && FO.exemplos.length ? `<div class="box flow">
          ${T.lbl('Sobre fotos')}
          ${(FO.texts || []).map(T.body).join('')}
          <div class="grid cols-2">${FO.exemplos.map(T.apFree).join('')}</div>
        </div>` : ''}
      </div>`;
      },
    },

    /* ---------- 03 · Elementos ---------- */
    {
      id: 'tipografia', label: 'Tipografia', group: '03 · Elementos',
      crumb: 'Elementos', title: 'Tipografia',
      sub: `As famílias tipográficas usadas em todas as composições da ${B.name} são ${F.display.family} para títulos e ${F.text.family} para textos corridos, aplicadas com as seguintes recomendações:`,
      render: () => `<div class="flow">
        <div class="fontprev">
          ${T.lbl('Preview ao vivo')}
          <div class="controls">
            <input type="text" data-fontprev-input placeholder="Digite um texto…" value="${B.slogan.replace(/\*/g, '')}">
            <div class="seg" data-fontsize-seg><button type="button" data-size="28">P</button><button class="on" type="button" data-size="44">M</button><button type="button" data-size="72">G</button></div>
          </div>
          <div class="preview" data-fontprev-out style="font-size:44px">${B.slogan.replace(/\*/g, '')}</div>
        </div>
        <div class="grid cols-2">
          <div class="box flow">
            ${T.lbl(`${F.display.family} — ${F.display.role}`)}
            <div class="font-sample" style="font-family:${fontFamily('display')}; font-weight:${F.display.weights[0]}; font-size:48px">Aa Bb Cc</div>
            <div class="font-sample" style="font-family:${fontFamily('display')}; font-weight:${F.display.weights[0]}; font-size:28px"><span class="no-bold">${B.name}</span> 0123456789</div>
            ${fontDl(F.display)}
          </div>
          <div class="box flow">
            ${T.lbl(`${F.text.family} — ${F.text.role}`)}
            ${F.text.weights.map((w) => `<div class="font-sample" style="font-family:${fontFamily('text')}; font-weight:${w}; font-size:22px">Texto de exemplo · peso ${w}</div>`).join('')}
            ${fontDl(F.text)}
          </div>
        </div>
        ${F.sub && F.sub.family ? `        <div class="box flow">
          ${T.lbl(`${F.sub.family} — ${F.sub.role}`)}
          ${T.body(`Reservada à criação de assinaturas de sub-marcas (eventos, experiências, programas). Não é usada em texto corrido nem em títulos institucionais — essa função é da ${F.text.family} e da ${F.display.family}.`)}
          <div class="font-sample" style="font-family:${fontFamily('sub')}; font-weight:${F.sub.weights[0]}; font-size:48px">Aa Bb Cc</div>
          ${fontDl(F.sub)}
        </div>` : ''}
      </div>`,
    },
    {
      id: 'elementos-editoriais', label: 'Elementos gráficos', group: '03 · Elementos',
      crumb: 'Elementos', title: 'Elementos gráficos',
      sub: `Os elementos gráficos da ${B.name} [preencher: de onde vêm e o que representam — ex.: derivados do símbolo, inspirados em…]. Eles complementam a marca em cards, capas e posts, reforçando a identidade visual com as seguintes recomendações:`,
      render: () => {
        /* Grafismos: um grupo por família/configuração. Imagens em assets/diagramas/grafismos/ (placeholders com nome final). */
        const dir = 'assets/diagramas/grafismos';
        const GRUPOS = [
          { nome: 'Grafismo 1', desc: `${P} o que representa e quando usar.` },
          { nome: 'Grafismo 2', desc: `${P} o que representa e quando usar.` },
          { nome: 'Grafismo 3', desc: `${P} o que representa e quando usar.` },
        ];
        const USOS = [
          ['Com texto', `${P} ex.: em larga escala, sangrado nas bordas, mantendo proporção e equilíbrio.`],
          ['Com texto', `${P} ex.: em tamanho médio, sempre seguindo as combinações de cores.`],
          ['Com fotografia e texto', `${P} ex.: nas bordas do layout, como apoio à foto.`],
        ];
        const CORRETOS = [
          `${P} ex.: mantenha sempre uma única cor e utilize os grafismos em alta qualidade.`,
          `${P} ex.: use apenas um grafismo por layout.`,
          `${P} ex.: quando não houver contraste suficiente entre texto e grafismo, aplique um retângulo de cor sólida atrás do texto.`,
        ];
        const INDEVIDOS = [
          `${P} ex.: não utilize os grafismos em baixa qualidade ou resolução.`,
          `${P} ex.: não misture dois grafismos no mesmo layout.`,
          `${P} ex.: não use mais de uma cor no grafismo.`,
          `${P} ex.: não distorça os grafismos (rotacionar é permitido, desde que mantenham a proporção).`,
          `${P} ex.: não utilize molduras ao redor dos grafismos.`,
          `${P} ex.: não utilize os grafismos como máscara de imagem ou em outline.`,
        ];
        const ex = (ok, file, cap, title) => `<figure class="dd ${ok ? 'ok' : 'no'} flow" style="margin:0; padding:14px">
          <div class="hd" style="margin:0; font-size:15px"><span class="badge" style="width:20px; height:20px; font-size:11px">${ok ? '✓' : '✕'}</span> ${title || (ok ? 'Correto' : 'Evite')}</div>
          ${T.pic(`${dir}/${file}`, title || (ok ? 'exemplo correto' : 'exemplo indevido'), 300)}
          <figcaption class="hint" style="margin:0">${cap}</figcaption>
        </figure>`;
        const n2 = (i) => String(i + 1).padStart(2, '0');
        return `<div class="flow">
        <div class="box flow">
          ${T.lbl('Os grafismos')}
          ${T.body(`${P} Quantos grafismos a marca tem e como se dividem (ex.: três famílias, configurações diferentes, ilustrações em grupos).`)}
          <div class="grid cols-3">${GRUPOS.map((g, i) => `<figure class="flow" style="margin:0; gap:10px">
            <div class="lbl" style="margin:0">${g.nome}</div>
            ${T.pic(`${dir}/grafismo-${n2(i)}.svg`, g.nome, 300)}
            <figcaption class="hint" style="margin:0">${g.desc}</figcaption>
          </figure>`).join('')}</div>
        </div>
        <div class="box flow">
          ${T.lbl('Composição')}
          ${T.body('Nas composições, os grafismos podem ser utilizados das seguintes maneiras:')}
          <div class="grid cols-3">${USOS.map(([t, c], i) => ex(true, `composicao-${n2(i)}.svg`, c, t)).join('')}</div>
        </div>
        <div class="box flow">
          ${T.lbl('Aplicações corretas')}
          ${T.body('A seguir, os principais exemplos de aplicações corretas a serem utilizadas nos grafismos.')}
          <div class="grid cols-3">${CORRETOS.map((c, i) => ex(true, `correto-${n2(i)}.svg`, c)).join('')}</div>
        </div>
        <div class="box flow">
          ${T.lbl('Aplicações a evitar')}
          ${T.body('Abaixo, as principais diretrizes sobre aplicações a serem evitadas nos grafismos.')}
          <div class="grid cols-3">${INDEVIDOS.map((c, i) => ex(false, `indevido-${n2(i)}.svg`, c)).join('')}</div>
        </div>
      </div>`;
      },
    },

    /* ---------- 04 · Layouts ---------- */
    {
      id: 'imagens', label: 'Uso de imagens', group: '04 · Layouts',
      crumb: 'Layouts', title: 'Uso de imagens',
      sub: 'Tratamento gráfico das fotos nas peças.',
      render: () => `<div class="flow">
        <div class="grid cols-2">${T.pic('assets/fotos/tratamento-01.jpg', 'foto tratada · filtro 1', 220)}${T.pic('assets/fotos/tratamento-02.jpg', 'foto tratada · filtro 2', 220)}</div>
        <div class="box">${T.body(`${P} Regras de tratamento: P&B, filtros, opacidade, recortes.`)}</div>
      </div>`,
    },
    {
      id: 'aplicacao-layout', label: 'Aplicação em layouts', group: '04 · Layouts',
      crumb: 'Layouts', title: 'Aplicação da marca em layouts',
      sub: 'Nas composições, a marca é alinhada e posicionada de forma proporcional aos outros elementos como textos, ícones e outros símbolos. Abaixo, confira algumas regras que delimitam essa relação.',
      render: () => `<div class="grid cols-2">${[1, 2, 3, 4].map((i) => `
        <div class="box flow" style="padding:16px">${T.lbl(`Composição ${i}`)}${T.pic(`assets/diagramas/layout-0${i}.svg`, 'diagrama de proporção', 110)}${T.hint(`${P} regra de proporção`)}</div>`).join('')}</div>`,
    },
    {
      id: 'grid-layout', label: 'Grid modular', group: '04 · Layouts',
      crumb: 'Layouts', title: 'Grid modular',
      sub: 'Para auxiliar a construção de layouts, crie um grid [preencher: modular 5x5 (5 colunas e 5 linhas) ou de 12 colunas]. Utilize a referência [preencher: dos módulos / das colunas] para criar retângulos e para posicionar caixas de texto. Respeite sempre a área de respiro do layout.',
      render: () => {
        /* formatos de exemplo: ajuste a lista por marca (id = nome do arquivo em assets/diagramas/grid/formatos/) */
        const FORMATOS = [
          { id: 'quadrado', nome: 'Quadrado', ratio: '1 / 1', uso: 'post de feed' },
          { id: 'vertical', nome: 'Vertical', ratio: '4 / 5', uso: 'post vertical, cartaz' },
          { id: 'stories', nome: 'Stories', ratio: '9 / 16', uso: 'stories, reels' },
          { id: 'horizontal', nome: 'Horizontal', ratio: '16 / 9', uso: 'banner, slide, capa de vídeo' },
          { id: 'a4', nome: 'A4', ratio: '210 / 297', uso: 'documentos, impressos' },
        ];
        const dir = 'assets/diagramas/grid/formatos';
        const card = (f) => `<figure class="box flow" style="margin:0; padding:16px">
          ${T.lbl(`${f.nome} · ${f.ratio.replace(/ \/ /, ':')}`)}
          <div style="height:240px; display:flex; align-items:center; justify-content:center; background:var(--paper-2, transparent); border-radius:12px">
            <div style="aspect-ratio:${f.ratio}; width:min(100%, calc(240px * ${f.ratio}));"><img src="${dir}/grid-${f.id}.svg" alt="grid ${f.nome}" data-ph="grid · ${f.nome} · ${dir}/grid-${f.id}.svg" style="width:100%; height:100%; object-fit:cover; display:block; border-radius:12px" onerror="T.__missing(this, 240)"></div>
          </div>
          <figcaption class="hint" style="margin:0">${f.uso}. [preencher: colunas, linhas e margens deste formato]</figcaption>
        </figure>`;
        return `<div class="flow">
          <div class="grid cols-2">
            ${T.pic('assets/diagramas/grid-modular.svg', 'grid base', 240)}
            <div class="box flow">${T.lbl('Grid base')}${T.body('[preencher: estrutura do grid — módulos ou colunas, quantidade e quando usar subgrid.]')}${T.body('[preencher: margens e área de respiro mínima.]')}</div>
          </div>
          <div class="box flow">
            ${T.lbl('Adaptação a diferentes formatos')}
            ${T.hint('[preencher: como o grid se ajusta em cada proporção. O que se mantém (margens, módulo) e o que muda (número de colunas/linhas).]')}
            <div class="grid cols-3">${FORMATOS.map(card).join('')}</div>
          </div>
        </div>`;
      },
    },
    {
      id: 'exemplos', label: 'Exemplos', group: '04 · Layouts',
      crumb: 'Layouts', title: 'Exemplos',
      sub: 'Peças reais aplicando o sistema visual.',
      /* adicione/remova itens à vontade: arquivos em assets/events/exemplo-NN.png (sem acento, sem espaço) */
      render: () => T.carousel([1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
        src: `assets/events/exemplo-${String(i).padStart(2, '0')}.png`,
        cap: `Exemplo ${i} · [preencher: nome da peça e formato]`,
      }))),
    },

    /* ---------- Recursos ---------- */
    {
      id: 'downloads', label: 'Downloads', group: 'Recursos',
      crumb: 'Recursos', title: 'Downloads de assets',
      sub: 'Central de arquivos originais.',
      render: () => {
        /* assinaturas: um box por assinatura (brand.js → signatures), um botão por formato (brand.js → signatureFormats).
           Arquivos: <signaturesDir>/pacotes/<id>-<formato>.zip (todas as cores daquele formato). */
        const FMT = B.signatureFormats || ['svg', 'png', 'pdf'];
        const pk = `${B.signaturesDir}/pacotes`;
        const sigs = `<div class="box flow">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap">
            ${T.lbl('Assinaturas')}
            <button class="btn accent" type="button" data-sig-zip>↓ Baixar tudo · ZIP</button>
          </div>
          ${T.hint('Cada pacote reúne todas as versões de cor da assinatura (colorida, positiva e negativa) no formato escolhido. Em “Baixar tudo”, todas as assinaturas e cores em um único arquivo.')}
          <div class="grid cols-2">${(B.signatures || []).map((sg) => `<div class="box flow" style="padding:16px; display:flex; flex-direction:column; gap:12px">
            <div style="height:140px; border-radius:12px; background:#fff; border:1px solid var(--line); display:flex; align-items:center; justify-content:center; padding:20px"><img src="${B.signaturesDir}/${sg.id}-colorida.svg" alt="${sg.label}" style="max-width:100%; max-height:100%; object-fit:contain; display:block" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'hint',textContent:this.getAttribute('src')}))"></div>
            <div style="font-family:var(--font-display); font-weight:800; font-size:18px; color:var(--primary)">${sg.label}</div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:auto">${FMT.map((f) => `<a class="btn accent" href="${pk}/${sg.id}-${f}.zip" download>↓ ${f.toUpperCase()}</a>`).join('')}</div>
          </div>`).join('')}</div>
        </div>`;
        return sigs + `<div class="grid cols-2" style="margin-top:16px">${[
        ['Tipografia', [F.display, F.text, F.sub].filter(Boolean).map((f) => f.family).join(' · '), ''],
        ['Paleta', 'ASE · HEX · CSS', ''],
        ['Templates', 'peças-modelo editáveis', ''],
      ].map(([t, s, href]) => `<div class="box" style="display:flex; align-items:center; justify-content:space-between; gap:12px">
          <div><div style="font-family:var(--font-display); font-weight:800; font-size:20px; color:var(--primary)">${t}</div>${T.hint(s)}</div>
          <a class="btn accent" ${href ? `href="${href}" download` : 'aria-disabled="true"'}>↓ Baixar</a>
        </div>`).join('')}</div>`;
      },
    },
  ];
  window.VIS_SECTIONS.forEach((s) => { s.part = s.group === 'Recursos' ? 'recursos' : 'vis'; if (INFO[s.id] && !s.info) s.info = INFO[s.id]; });
})();
