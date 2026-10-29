/* ============================================================
   CONTEÚDO · Sub-marcas — uma página por nível do portfólio
   OPCIONAL: só para marcas com sub-marcas e orientações de arquitetura.
   Quantidade e nomes dos níveis são PLACEHOLDER (ajustar por marca).

   level = { id, n, label, eyebrow, title, desc, rules: [{ title, text }], grid, gridNote, items: [] }
   item  = {
     name: 'nome na grafia oficial',
     theme: 'tema-a',        // id em brand.js → themes (cor + paleta). Opcional.
     hasOwn: true | false,   // selo assinatura própria / sem assinatura própria
     note: 'texto',
     diferencial: 'texto',   // só sem assinatura própria: nome, ícone, cor ou conjunto de cores
     signatures: [{ group, label, src, bg }],   // arquivos em assets/submarcas/ (placeholder se faltar)
     images: [['assets/submarcas/arquivo.png', 'legenda']],
   }
   Nível sem itens → "Não há sub-marca deste tipo."
   ============================================================ */
(function () {
  const B = window.BRAND, T = window.T;
  const P = '[preencher]';
  const D = 'assets/submarcas';
  const theme = (id) => (B.themes || []).find((t) => t.id === id) || {};
  const sigs = (slug, dark) => [
    { group: 'Assinatura principal', label: 'Positiva', src: `${D}/${slug}-principal.svg` },
    { group: 'Assinatura principal', label: 'Negativa', src: `${D}/${slug}-principal-negativa.svg`, bg: dark },
    { group: 'Assinatura simplificada', label: 'Positiva', src: `${D}/${slug}-simplificada.svg` },
    { group: 'Assinatura simplificada', label: 'Negativa', src: `${D}/${slug}-simplificada-negativa.svg`, bg: dark },
  ];
  /* iniciativa sem assinatura própria: marca-mãe + nome do tipo, hierarquia de cores, regras e certo/errado do nome */
  const initiative = (slug, name, themeId) => ({
    name, theme: themeId, hasOwn: false, note: `${P} Breve descritivo e público-alvo.`,
    diferencial: `${P} Sem assinatura própria: a marca ${B.name} + o tipo da iniciativa (ex.: NEWS, EVENTO), sempre na mesma proporção.`,
    pattern: `${D}/${slug}-padrao.svg`,
    hierarchyTitle: `Hierarquia de cores · ${name}`,
    hierarchy: [
      { hex: B.ui.primary, note: `${P} cor prioritária para o fundo das peças` },
      { hex: (theme(themeId).color || B.ui.accent), note: `${P} cor do nome da iniciativa` },
      { hex: '#FFFFFF', note: `${P} fundo de informações destacadas` },
    ],
    rules: [
      'Mantenha a assinatura sempre no topo das páginas.',
      'Preserve a altura do logo e acrescente o tipo da iniciativa sempre na mesma proporção.',
      `Tipografia do tipo da iniciativa: ${P}.`,
      `Posicione a marca ${B.name} e o nome da iniciativa em cantos opostos. Não posicione o nome imediatamente ao lado da marca.`,
    ],
    dos: [{ ok: true, src: `${D}/${slug}-correto.svg`, cap: `${P} nome na cor e peso corretos` }, { ok: false, src: `${D}/${slug}-indevido.svg`, cap: `${P} cor ou peso fora do padrão` }],
    images: apps(slug),
  });
  const apps = (slug) => [[`${D}/${slug}-aplicacao-01.png`, 'aplicação 1'], [`${D}/${slug}-aplicacao-02.png`, 'aplicação 2']];

  const LEVELS = [
    {
      id: 'nivel-1', n: 1, label: 'Nível 1 · Marca-mãe', eyebrow: 'Nível 1', title: 'Marca-mãe',
      desc: `É a principal representação da marca, responsável por orientar sua identidade e posicionamento. É a partir dela que os serviços e submarcas se conectam, mantendo uma relação consistente e recebendo seu endosso.`,
    },
    {
      id: 'nivel-2', n: 2, label: 'Nível 2 · Produtos/serviços', eyebrow: 'Nível 2', title: 'Produtos e serviços endossados',
      desc: `O nível 2 engloba ${P}: quais produtos ou serviços fazem parte deste nível e o que a identidade visual deles comunica.`,
      rules: [
        { title: 'Construção da assinatura', text: `As novas assinaturas devem ser construídas a partir das proporções do símbolo da marca. ${P}: medidas de referência e área de arejamento.` },
        { title: 'Direcionamento cromático', text: `Toda nova assinatura de nível 2 deve ter ${P} como cor predominante, combinada com uma cor secundária que não se confunda com as cores já utilizadas.` },
      ],
      grid: `${D}/nivel-2-grid.svg`,
      items: [
        { name: 'produto/serviço A', theme: 'tema-a', hasOwn: true, note: `${P} Breve descritivo e público-alvo.`, signatures: sigs('produto-a', '#14202E'), images: apps('produto-a') },
        { name: 'produto/serviço B', theme: 'tema-b', hasOwn: true, note: `${P} Breve descritivo e público-alvo.`, signatures: sigs('produto-b', '#14202E'), images: apps('produto-b') },
      ],
    },
    {
      /* Nível 3: iniciativas organizadas em grupos (ex.: externas, internas, sazonais). Grupos e quantidade são PLACEHOLDER. */
      id: 'nivel-3', n: 3, label: 'Nível 3 · Iniciativas', eyebrow: 'Nível 3', title: 'Iniciativas',
      desc: [
        `Eventos, atividades, ações, conteúdos e curadorias que fortalecem o posicionamento da ${B.name}, mas não têm força suficiente para serem marcas independentes. ${P}`,
        'Não há uma assinatura de marca para as iniciativas, mas sim um padrão de aplicação da identidade visual, conforme detalhado a seguir.',
      ],
      groups: [
        {
          title: 'Iniciativa A', eyebrow: '', color: B.ui.accent,
          desc: `${P} O que é a iniciativa e para quem.`,
          items: [initiative('iniciativa-a', 'iniciativa A', 'tema-c')],
        },
        {
          title: 'Iniciativa B', eyebrow: '', color: B.ui.accent,
          desc: `${P} O que é a iniciativa e para quem.`,
          items: [],
        },
        {
          title: 'Ações sazonais', eyebrow: 'Ações e iniciativas pontuais', color: B.ui.accent,
          desc: `${P} Acontecimentos sazonais que podem ou não demandar novas marcas. A cada edição/ano/temporada, alguns elementos são atualizados.`,
          items: [{
            name: 'ação sazonal A', hasOwn: false, note: `${P} O que é a ação e para quem.`,
            diferencial: `${P} O que se mantém em todas as edições (estrutura, tipografia) e o que muda (ano, fotos, cores do gradiente). Mantenha sempre pelo menos uma cor da paleta institucional.`,
            pattern: `${D}/acao-sazonal-a-padrao.svg`,
            editions: [1, 2, 3, 4].map((i) => [`${D}/acao-sazonal-a-edicao-0${i}.png`, `edição ${i}`]),
            editionsNote: `${P} A estrutura deve se manter consistente em todas as edições, alterando apenas [ano / fotos / cores].`,
          }],
        },
      ],
    },
  ];
  const allItems = (lv) => (lv.groups ? lv.groups.flatMap((g) => g.items || []) : (lv.items || []));
  LEVELS.forEach((lv) => allItems(lv).forEach((it) => { const t = theme(it.theme); it.color = it.color || t.color; it.palette = it.palette || t.palette; }));

  const renderMae = (lv) => {
    const dir = B.signaturesDir || 'assets/logos/assinaturas';
    const main = (B.signatures && B.signatures[0] && B.signatures[0].id) || 'horizontal';
    const logo = `<img src="${dir}/${main}-colorida.svg" alt="${B.name}" onerror="this.outerHTML=window.SUB.ph('${B.name}', false)">`;
    const under = LEVELS.filter((l) => l.n > 1);
    return `<div class="flow">
      ${window.SUB.hero(lv, logo)}
      <div class="grid cols-2">
        <div class="box flow">${T.lbl('Slogan')}<div class="lvl-title" style="font-size:28px">${String(B.slogan || '').replace(/\*(.+?)\*/g, '<span style="color:var(--accent)">$1</span>')}</div></div>
        <div class="box flow">${T.lbl('Propósito')}${T.body(`${P} Por que a marca existe, em uma frase (mesmo texto de Posicionamento).`)}</div>
      </div>
      <div class="box flow">${T.lbl('Cores institucionais')}${T.colors(B.colors.principais)}</div>
      <div class="box flow">
        ${T.lbl('Guarda-chuva da marca')}
        ${T.body(`Todas as demais sub-marcas e iniciativas estão sob o guarda-chuva da ${B.name}, recebendo o seu endosso.`)}
        ${under.map((l) => `<div class="flow"><div class="hint" style="margin:0; font-weight:700">${l.label}</div><div class="lvl-umbrella">${allItems(l).map((it) => `<button type="button" data-goto="${l.id}"><span class="lvl-dot" style="background:${it.color || 'var(--line-2)'}; width:10px; height:10px; flex-basis:10px"></span>${it.name}</button>`).join('') || '<span class="hint empty-cat">Não há sub-marca deste tipo.</span>'}</div></div>`).join('')}
      </div>
    </div>`;
  };

  /* ícone (i) de cada página: o que é / para que serve */
  const INFO = {
    'nivel-1': { what: 'A marca principal do portfólio, que orienta a identidade e o posicionamento de todas as outras.', why: 'Mostrar a base de onde partem as sub-marcas e deixar claro que todas estão sob o seu guarda-chuva.' },
    'nivel-2': { what: 'Os produtos e serviços que têm assinatura própria, endossada pela marca-mãe.', why: 'Orientar como essas assinaturas são construídas, quais cores usam e como se aplicam, mantendo a relação com a marca-mãe.' },
    'nivel-3': { what: 'As iniciativas que fortalecem a marca, mas não têm força para serem marcas independentes.', why: 'Definir um padrão de aplicação da identidade para elas, sem criar novas assinaturas.' },
  };
  window.SUB_SECTIONS = LEVELS.map((lv) => ({
    id: lv.id, part: 'sub', label: lv.label, group: 'Níveis do portfólio',
    crumb: 'Sub-marcas', title: lv.title, sub: '', info: INFO[lv.id],
    render: () => (lv.n === 1 ? renderMae(lv) : window.SUB.render(lv)),
  }));
})();
