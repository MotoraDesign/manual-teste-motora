/* ============================================================
   CONTEÚDO · Posicionamento
   Textos de exemplo marcados com [preencher]. Mantenha a
   estrutura (id, label, group, crumb, title, sub, render).
   ============================================================ */
(function () {
  const T = window.T, B = window.BRAND, P = '[preencher]';

  /* "O que é esse texto?" / "Para que serve?" — exibidos no ícone (i).
     Chave = id da seção (ícone no título) ou nome do bloco (ícone no rótulo). */
  const INFO = {
    'pos-posicionamento': { what: 'Texto curto que sintetiza a mensagem central que deve ser comunicada e qual o principal valor entregue ao cliente.', why: 'Orientar estrategicamente a equipe interna, sem nunca perder de vista os objetivos da marca e do negócio.' },
    'pos-manifesto': { what: 'Inspiracional e motivacional, o manifesto comunica o propósito da organização para além do seu serviço ou produto.', why: 'Gerar conexão emocional com a marca. Pode ser usado no site, em vídeos, treinamentos internos, e trechos podem ser aproveitados em materiais promocionais.' },
    slogan: { what: 'Frase curta e de impacto.', why: 'Destaque no site e em materiais promocionais. Deve ser repetida em diferentes materiais, para se fixar na mente dos clientes.' },
    'pos-quemsomos': { what: 'Quem somos e por que existimos.', why: 'Explicar de forma breve quem é a marca. Deve ser usado como base para apresentar a marca no site, redes sociais e materiais comerciais.' },
    'pos-pilares': { what: 'Uma lista de ideias-chave que sustentam a marca.', why: 'Orientar a comunicação da marca. Tudo o que a marca faz deve ser sustentado por seus pilares.' },
    'pos-cliente': { what: 'Descreve quem é o nosso cliente ideal.', why: 'Texto interno. Reúne informações relevantes sobre o cliente final, ajudando a criar empatia, elaborar o discurso de venda e identificar objeções.' },
    'pos-arquitetura': { what: 'Organiza todas as marcas do portfólio e a relação entre elas.', why: 'Orientar a criação de novos produtos/marcas e definir a hierarquia entre eles.' },
    'pos-arvore': { what: 'Ferramenta de apoio para a criação de novas iniciativas: um roteiro de perguntas que indica se algo novo deve virar uma marca, uma submarca ou apenas um nome dentro de uma marca existente.', why: 'Orientar decisões sobre o portfólio com critérios claros, evitando a criação de marcas desnecessárias e mantendo a arquitetura organizada.' },
    novosNomes: { what: 'Diretrizes para batizar novos produtos, serviços e iniciativas.', why: 'Garantir que os novos nomes sigam o tom e a lógica do portfólio.' },
    novasAssinaturas: { what: 'Diretrizes para criar assinaturas visuais de novas marcas e iniciativas.', why: 'Manter coerência visual entre as novas assinaturas e a marca-mãe.' },
    'pos-portfolio': { what: 'Levantamento dos nossos principais produtos e seus atributos.', why: 'Pode ser usado no site e em materiais e treinamentos do time comercial.' },
    'pos-historia': { what: 'Explica como a empresa surgiu e quais desafios enfrentou.', why: 'Documentação; utilização por assessoria de imprensa; pode ser exibido no site.' },
    'pos-valores': { what: 'Os valores direcionam comportamentos que queremos incentivar.', why: 'Registrar a mentalidade que queremos construir dentro do time. O que a empresa valoriza.' },
    'pos-cultura': { what: 'Características que marcam nossa cultura corporativa.', why: 'Descrever como somos e como nos comportamos no dia a dia e diante de desafios; registrar rotinas e rituais importantes.' },
    missao: { what: 'Missão é o nosso objetivo de longo prazo com a empresa: que impacto queremos gerar?', why: 'Engajar os colaboradores de forma alinhada com as expectativas da alta liderança.' },
    'pos-dresscode': { what: 'Descritivo de como esperamos que nossos colaboradores se vistam quando em contato com clientes.', why: 'A forma como nossos colaboradores se apresentam passa uma mensagem para o público sobre a empresa como um todo. Estabelecer um dress code garante maior controle a esse respeito.' },
    'pos-arquetipos': { what: 'O arquétipo é um conceito da psicologia que pode ser utilizado pela comunicação. Representa um padrão de comportamento associado a um personagem ou papel social.', why: 'Texto interno. Ajuda o time de comunicação a dar personalidade à marca em seus diversos pontos de contato.' },
    'pos-persona': { what: 'Uma história fictícia que descreve quem a marca seria se fosse uma pessoa.', why: 'Texto interno. Ajuda o time de comunicação a entender a personalidade e as motivações da marca, gerando mais empatia e conexão com o consumidor final.' },
    'pos-tomdevoz': { what: 'Direcionamentos verbais da marca, seja para a escrita de textos ou para atendimentos por ligação e presenciais.', why: 'Texto interno. Orienta a equipe de comunicação e o comercial na hora de falar em nome da marca, mantendo a consistência da personalidade.' },
    grafias: { what: 'Termos que, por escolha da marca, têm uma escrita específica: nomes de iniciativas, produtos ou palavras muito presentes no vocabulário da marca.', why: 'Garantir que todos escrevam esses termos sempre da mesma forma, em qualquer canal ou material.' },
    'pos-exemplos': { what: 'Exemplos de como a marca se comunica em situações recorrentes: saudações, problemas, elogios, reclamações, agradecimentos e encerramentos.', why: 'Texto interno. Mostra na prática como aplicar o tom de voz, servindo de referência para atendimento, comercial e redes sociais.' },
    digital: { what: 'Direcionamentos para a comunicação em canais digitais.', why: 'Manter a personalidade da marca consistente nas redes sociais, mensagens e e-mails.' },
    hashtags: { what: 'As hashtags oficiais da marca e de suas iniciativas.', why: 'Organizar e agrupar o conteúdo da marca nas redes sociais, facilitando a busca e o reconhecimento.' },
    emojis: { what: 'Diretrizes sobre o uso (ou não) de emojis.', why: 'Definir se e como os emojis reforçam o tom de voz da marca, evitando usos que soem fora da personalidade.' },
    'pos-produto': { what: 'Descreve o que dá identidade aos nossos produtos (formatos, texturas, tamanhos, acabamentos) e o que queremos que o cliente sinta ao entrar em contato com eles, com a loja ou com qualquer ponto de contato.', why: 'Garantir que diferentes produtos e espaços reforcem a mesma narrativa e gerem a mesma experiência de marca.' },
    'pos-atendimento': { what: 'Registro dos padrões que devem se repetir no nosso atendimento.', why: 'Orientar a equipe de atendimento com relação à forma de receber os clientes.' },
    'pos-arquitetura-espaco': { what: 'Diretrizes para projetos de arquitetura e decoração.', why: 'Texto interno. Direcionar arquitetos com relação a materiais, cores e acabamentos que fazem sentido dentro do universo da marca.' },
    'pos-territorio': { what: 'Sobre o que falamos.', why: 'Texto interno. Deve orientar a criação de conteúdo e linhas editoriais para redes sociais, blogs e outros formatos de conteúdo da marca.' },
    repositorio: { what: 'Banco de links com os conteúdos que mais representam a marca ou que tiveram melhor resultado.', why: 'Criar uma memória de referências para orientar a produção de novos conteúdos no futuro.' },
    'pos-imagens': { what: 'Diretrizes para a seleção e produção de imagens.', why: 'Texto interno. Direcionar a seleção de fotografias pela equipe de comunicação e a criação de novas imagens por fotógrafos contratados.' },
  };

  /* ÁRVORE DE DECISÃO — interativa (uma pergunta por vez).
     Nó: { q: 'pergunta', a: [['resposta', próximo nó OU número do resultado], ...] }
     outcomes: { número: 'o que fazer' } */
  const DTREE = {
    title: 'Criar (ou não) uma nova marca, submarca ou iniciativa',
    start: { q: 'Trata-se de uma newsletter?', a: [
      ['Sim', { q: 'Paga ou gratuita?', a: [['Paga', 1], ['Gratuita', 2]] }],
      ['Não', { q: 'Trata-se de um evento?', a: [
        ['Sim', { q: 'Autoral ou patrocinado?', a: [['Autoral', 5], ['Patrocinado', 6]] }],
        ['Não', { q: 'Está dentro da especialidade da marca?', a: [['Sim', 3], ['Não', 4]] }],
      ] }],
    ] },
    outcomes: {
      1: `${P} O que fazer no caso 1.`, 2: `${P} O que fazer no caso 2.`, 3: `${P} O que fazer no caso 3.`,
      4: `${P} O que fazer no caso 4.`, 5: `${P} O que fazer no caso 5.`, 6: `${P} O que fazer no caso 6.`,
    },
  };

  /* Menu inicial da capa (as "pétalas" do manual). goto = id da primeira página de cada parte.
     Itens cuja página não existe (ex.: marca sem sub-marcas) somem sozinhos. */
  window.HOME_MENU = [
    { label: 'Posicionamento', sub: 'Propósito, proposta de valor e cliente ideal.', goto: 'pos-posicionamento' },
    { label: 'Identidade de marca', sub: 'Quem somos e pilares.', goto: 'pos-quemsomos' },
    { label: 'Estrutura', sub: 'Arquitetura de marca e portfólio.', goto: 'pos-arquitetura' },
    { label: 'Cultura corporativa', sub: 'Cultura, história, valores e dress code.', goto: 'pos-cultura' },
    { label: 'Personalidade', sub: 'Arquétipos, persona e tom de voz.', goto: 'pos-arquetipos' },
    { label: 'Experiência', sub: 'Manifesto, características e atendimento.', goto: 'pos-manifesto' },
    { label: 'Expressão visual', sub: 'Marca, cores, tipografia e elementos.', goto: 'conceito' },
    { label: 'Exemplos de layouts', sub: 'Imagens, grid e peças aplicadas.', goto: 'imagens' },
    { label: 'Sub-marcas', sub: 'Os níveis do portfólio.', goto: 'nivel-1' },
    { label: 'Recursos', sub: 'Downloads de arquivos.', goto: 'downloads' },
    { label: 'Créditos do manual', sub: 'Autoria e contatos.', goto: 'creditos' },
  ];
  window.POS_SECTIONS = [
    {
      id: 'capa', label: 'Início', group: 'Início',
      crumb: 'Manual da marca', title: `${B.manualTitle} ${B.name}`, sub: B.audience,
      render: () => T.hero(),
    },

    /* ---------- 01 · Posicionamento ---------- */
    {
      id: 'pos-posicionamento', label: 'Posicionamento', group: '01 · Estratégia',
      crumb: 'Estratégia', title: 'Posicionamento',
      sub: 'Propósito, proposta de valor e Big Idea.',
      render: () => T.sloganBanner() + T.cards([
        ['Nosso propósito', `${P} Por que a marca existe, em uma frase.`],
        ['Nossa proposta de valor', `${P} O que a marca entrega e para quem.`],
        ['Big Idea', `${P} A mensagem central que queremos comunicar.`],
      ], 3, true),
    },
    {
      id: 'pos-cliente', label: 'Cliente ideal', group: '01 · Estratégia',
      crumb: 'Estratégia', title: 'Cliente ideal',
      sub: 'Os públicos prioritários da marca.',
      render: () => `<div class="grid cols-2">
        ${['Primário', 'Secundário'].map((k) => `<div class="box flow">
          ${T.tag(`${k} · [preencher] idade`)}
          ${T.body(`${P} Quem é, o que faz, como é a rotina.`)}
          ${T.body(`${P} O que a marca representa para essa pessoa.`)}
          ${T.body(`<b>${B.name}</b> é a melhor solução porque ${P}`)}
          ${T.chips(['Maior medo: [preencher]', 'Maior desejo: [preencher]'])}
        </div>`).join('')}
      </div>`,
    },

    /* ---------- 02 · Identidade da marca ---------- */
    {
      id: 'pos-quemsomos', label: 'Quem somos', group: '02 · Identidade da marca',
      crumb: 'Identidade da marca', title: 'Quem somos',
      sub: 'A marca, o slogan e o texto institucional em duas versões.',
      render: () => `<div class="flow">
        <div class="grid cols-2">
          <div class="box" style="display:flex; flex-direction:column; justify-content:center">${T.lbl('Slogan', INFO.slogan)}<p class="slogan">${B.slogan.replace(/\*/g, '')}</p></div>
          <div class="box flow">${T.lbl('Quem somos · versão curta')}${T.lead(`${P} Uma ou duas frases sobre ${B.name}.`)}${T.hint('Para headlines e bio de redes sociais.')}</div>
        </div>
        <div class="box flow">
          ${T.lbl('Quem somos · versão longa')}
          ${T.body(`${P} Quem é ${B.name}: o que faz, como faz e para quem.`)}
          ${T.body(`${P} Desde quando atua e o que construiu até aqui.`)}
          ${T.body(`${P} Os grandes temas (eixos) em torno dos quais a marca se organiza.`)}
        </div>
      </div>`,
    },
    {
      id: 'pos-pilares', label: 'Pilares', group: '02 · Identidade da marca',
      crumb: 'Identidade da marca', title: 'Pilares',
      sub: 'As ideias-chave que sustentam a marca.',
      render: () => T.cards([1, 2, 3, 4].map((i) => [`Pilar ${i}`, `${P} O que esse pilar significa e como aparece na marca.`])),
    },

    /* ---------- 03 · Estrutura ---------- */
    {
      id: 'pos-arquitetura', label: 'Arquitetura de marca', group: '03 · Estrutura',
      crumb: 'Estrutura', title: 'Arquitetura de marca',
      sub: 'As marcas do portfólio, organizadas por nível, e a relação entre elas.',
      render: () => {
        /* Portfólio: um objeto por nível. logo = caminho da imagem (opcional; sem logo, mostra o nome). */
        const PORTFOLIO = [
          { level: 'Nível 1', brands: [
            { name: B.fullName, logo: B.logos.principal, role: 'Marca corporativa', desc: `${P} breve descrição da marca`, audience: `${P} a quem se dirige` },
          ] },
          { level: 'Nível 2', brands: [
            { name: 'marca de negócio', role: 'Marca de negócio', desc: `${P} breve descrição`, audience: `${P} público` },
            { name: 'submarca', role: 'Submarca', desc: `${P} breve descrição`, audience: `${P} público` },
          ] },
          { level: 'Nível 3', brands: [
            { name: 'marca de produto', role: 'Marca de produto', desc: `${P} breve descrição`, audience: `${P} público` },
          ] },
        ];
        const brandCell = (b) => b.logo ? `<img src="${b.logo}" alt="${b.name}" style="height:36px; max-width:100%; object-fit:contain">` : `<span class="nt-name">${b.name}</span>`;
        /* Como cada iniciativa se diferencia no portfólio.
           hasOwn: tem assinatura própria?  by: 'logo' | 'icone' | 'cores' | 'nome'
           logo: caminho (vazio = placeholder) · colors: [hex, hex] (para 'icone' usa colors[0]) */
        const IDENT = [
          { name: 'marca de negócio', hasOwn: true, by: 'logo', logo: 'assets/submarcas/marca-de-negocio-logo.svg', note: `${P} quando e onde a assinatura aparece.` },
          { name: 'submarca', hasOwn: false, by: 'icone', colors: [B.themes[1] ? B.themes[1].color : B.ui.accent], note: `${P} ícone da marca-mãe na cor da iniciativa + nome.` },
          { name: 'linha temática', hasOwn: false, by: 'cores', colors: B.themes[2] ? [B.themes[2].color, B.themes[2].palette[1] && B.themes[2].palette[1].hex] : [B.ui.accent], note: `${P} identificada apenas por um conjunto de cores.` },
          { name: 'marca de produto', hasOwn: false, by: 'nome', note: `${P} só o nome, sempre acompanhado de ${B.name}.` },
        ];
        const BY = { logo: 'Logo próprio', icone: 'Ícone', cores: 'Conjunto de cores', nome: 'Só o nome' };
        const identArt = (it) => {
          if (it.by === 'logo') return it.logo ? `<img src="${it.logo}" alt="${it.name}" style="max-height:56px; max-width:100%; object-fit:contain">` : `<span class="imgph" style="min-height:72px; width:100%"><span class="tag">logo · ${it.name}</span></span>`;
          if (it.by === 'icone') return `<span class="nl-sig" style="padding:0; background:none">${T.symbol(it.colors[0])}<span class="nm" style="font-size:22px">${it.name}</span></span>`;
          if (it.by === 'cores') return `<span style="display:flex; gap:8px">${it.colors.filter(Boolean).map((h) => `<button class="swcopy" type="button" data-copy="${h}" style="flex:none; width:64px; height:64px; border-radius:12px; background:${h}; color:${window.isDark(h) ? '#fff' : '#1a1a1a'}; font-size:10px">${h}</button>`).join('')}</span>`;
          return `<span style="font-family:var(--font-display); font-weight:800; font-size:26px; color:var(--ink)">${it.name}</span>`;
        };
        return `<div class="flow">
        <div class="box flow">
          ${T.lbl('As marcas')}
          ${T.table(['Marca', 'Papel', 'Descritivo', 'Público'],
            PORTFOLIO.flatMap((n) => [{ group: n.level }, ...n.brands.map((b) => [brandCell(b), b.role, b.desc, b.audience])]),
            '1.2fr 1fr 1.6fr 1.2fr')}
        </div>
        <div class="box flow">
          ${T.lbl('Como cada marca se diferencia')}
          ${T.body(`${P} Regra geral: quais iniciativas ganham assinatura própria e quais se apoiam na marca ${B.name}.`)}
          <div class="grid cols-2">${IDENT.map((it) => `
            <div class="box alt flow" style="padding:20px">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
                <div class="lbl" style="margin:0">${it.name}</div>${T.tag(it.hasOwn ? 'assinatura própria' : 'sem assinatura própria', !it.hasOwn)}
              </div>
              <div style="min-height:84px; display:flex; align-items:center; justify-content:center; background:var(--paper); border-radius:12px; padding:14px">${identArt(it)}</div>
              <div class="chips"><span class="chip">Diferencia-se por: ${BY[it.by]}</span></div>
              ${it.note ? T.hint(it.note) : ''}
            </div>`).join('')}
          </div>
        </div>
      </div>`;
      },
    },
    {
      id: 'pos-arvore', label: 'Árvore de decisão', group: '03 · Estrutura',
      crumb: 'Estrutura', title: 'Árvore de decisão',
      sub: 'Ferramenta para avaliar a criação de novas iniciativas.',
      render: () => `<div class="flow">
        ${T.decisionTree(DTREE)}
        <div style="margin-top:12px">${T.lbl('Novos nomes e assinaturas')}${T.hint('Direcionamentos para quando a árvore indicar a criação de algo novo.')}</div>
        <div class="grid cols-2">
          <div class="box flow">
            ${T.lbl('Novos nomes', INFO.novosNomes)}
            ${T.body(`${P} Critérios de naming: tom, extensão, idioma, relação com o nome ${B.name}.`)}
            ${T.lbl('Grafia')}
            ${T.body(`${P} Regras de escrita: maiúsculas/minúsculas, hashtag, como citar em texto corrido.`)}
            ${T.beforeAfter('[preencher] exemplo de nome fora do padrão', '[preencher] exemplo de nome no padrão', 'Evite', 'Prefira')}
          </div>
          <div class="box flow">
            ${T.lbl('Novas assinaturas', INFO.novasAssinaturas)}
            ${T.body(`${P} Quando criar uma assinatura própria e quando usar a assinatura padrão (símbolo + nome).`)}
            ${T.lbl('Construção')}
            ${T.body(`${B.fonts.sub ? `Tipografia de sub-marca: <b>${B.fonts.sub.family}</b>. ` : ''}${P} elementos obrigatórios da marca-mãe, cores permitidas e versões necessárias (com e sem a marca ${B.name}, positiva e negativa).`)}
            ${T.lbl('Quem aprova')}
            ${T.body(`${P} Responsável pela criação e aprovação de novas assinaturas.`)}
          </div>
        </div>
        <div class="box flow">
          ${T.lbl('Checklist antes de lançar')}
          ${T.chips(['Passou pela árvore de decisão', 'Nome validado', 'Grafia definida', 'Versões da assinatura', 'Paleta definida', 'Incluída na arquitetura de marca'])}
        </div>
      </div>`,
    },
    {
      id: 'pos-portfolio', label: 'O que fazemos', group: '03 · Estrutura',
      crumb: 'Estrutura', title: 'O que fazemos',
      sub: 'Portfólio de produtos e serviços.',
      render: () => T.cards([
        ['Produto / serviço 1', `${P} Descrição curta e benefício principal.`],
        ['Produto / serviço 2', `${P} Descrição curta e benefício principal.`],
        ['Produto / serviço 3', `${P} Descrição curta e benefício principal.`],
        ['Produto / serviço 4', `${P} Descrição curta e benefício principal.`],
      ]),
    },

    /* ---------- 04 · Cultura ---------- */
    {
      id: 'pos-cultura', label: 'Nossa cultura', group: '04 · Cultura',
      crumb: 'Cultura', title: 'Nossa cultura',
      sub: 'Como a equipe trabalha no dia a dia.',
      render: () => T.banner('Nossa missão é *[preencher]*', { label: 'Missão', info: INFO.missao }) + T.cards([1, 2, 3, 4].map((i) => [`Traço ${i}`, `${P} Descrição e exemplo concreto.`])),
    },
    {
      id: 'pos-historia', label: 'História', group: '04 · Cultura',
      crumb: 'Cultura', title: `História de ${B.name}`,
      sub: 'Origem e marcos da marca.',
      render: () => `<div class="box flow">
        ${T.body(`${P} Como tudo começou.`)}
        ${T.body(`${P} A virada / os marcos principais.`)}
        ${T.body(`${P} O momento atual.`)}
      </div>`,
    },
    {
      id: 'pos-valores', label: 'Valores', group: '04 · Cultura',
      crumb: 'Cultura', title: 'Valores',
      sub: 'Os compromissos que orientam a marca.',
      render: () => `<div class="grid cols-2">${[1, 2, 3, 4].map((i) => `
        <div class="box flow">
          ${T.lbl(`0${i}. Valor ${i}`)}
          ${T.lead(`${P} Breve descritivo do valor.`)}
          <div>
            <div class="hint" style="margin:0 0 4px; font-weight:700; color:var(--ink-soft)">Dentro da ${B.name}:</div>
            ${T.body(`${P} Ações, práticas, condutas, como o time interage, como lida com situações…`)}
          </div>
        </div>`).join('')}</div>`,
    },
    {
      id: 'pos-dresscode', label: 'Dress code', group: '04 · Cultura',
      crumb: 'Cultura', title: 'Dress code',
      sub: 'Como nos apresentamos no contato com clientes.',
      render: () => `<div class="flow">
        <div class="box flow">${T.body(`${P} Diretriz geral: o que a forma de se vestir deve transmitir sobre ${B.name}.`)}</div>
        <div class="grid cols-2">
          ${T.dd(true, 'Prefira', T.body(`${P} peças, cores e estilos recomendados.`))}
          ${T.dd(false, 'Evite', T.body(`${P} o que não combina com a marca.`))}
        </div>
        ${T.cards([
          ['Atendimento e reuniões', `${P} orientação para o contato com clientes.`],
          ['Eventos e gravações', `${P} orientação para eventos, fotos e vídeos.`],
        ])}
        <div class="grid cols-3">${[1, 2, 3].map((i) => T.photo(`assets/fotos/dress-code/dress-code-0${i}.jpg`, `referência de dress code ${i}`, 220)).join('')}</div>
      </div>`,
    },

    /* ---------- 05 · Personalidade ---------- */
    {
      id: 'pos-arquetipos', label: 'Arquétipos', group: '05 · Personalidade',
      crumb: 'Personalidade', title: 'Arquétipos',
      sub: 'Os arquétipos que definem a personalidade da marca.',
      render: () => {
        const arq = [['Arquétipo 1', 32, 26], ['Arquétipo 2', 64, 34]];
        return `<div class="flow">
          <div class="box">
            <div class="arqmap">
              <span class="am-axis am-v"></span><span class="am-axis am-h"></span>
              <span class="am-lbl am-top">Independência</span><span class="am-lbl am-bottom">Estabilidade</span>
              <span class="am-lbl am-left">Autoridade</span><span class="am-lbl am-right">Pertencimento</span>
              ${arq.map(([n, x, y]) => `<span class="am-dot" style="left:${x}%; top:${y}%"><i></i>${n}</span>`).join('')}
            </div>
            ${T.hint(`${P} Por que esses arquétipos se agrupam nesse quadrante.`)}
          </div>
          ${T.cards(arq.map(([n]) => [n, `${P} Como esse arquétipo aparece na marca.`]), 2)}
        </div>`;
      },
    },
    {
      id: 'pos-persona', label: 'Brand persona', group: '05 · Personalidade',
      crumb: 'Personalidade', title: 'Brand persona',
      sub: 'A marca descrita como uma pessoa.',
      render: () => `<div class="grid cols-2">
        ${T.photo('assets/fotos/persona.jpg', 'retrato da persona', 320)}
        <div class="box flow">
          ${T.body(`${P} Apresentação em primeira pessoa: nome, idade, profissão.`)}
          ${T.body(`${P} No que acredita e como se comunica.`)}
          ${T.body(`${P} Com o que se preocupa e quais são seus limites.`)}
        </div>
      </div>`,
    },
    {
      id: 'pos-tomdevoz', label: 'Tom de voz', group: '05 · Personalidade',
      crumb: 'Personalidade', title: 'Tom de voz',
      sub: 'A voz se adapta ao contexto, mas algumas qualidades estão sempre presentes.',
      render: () => `<div class="flow">
        <div class="box flow">
          ${T.lbl('Como nos referimos a nós mesmos')}
          ${T.body(`Escrevemos <b>${B.name}</b> sempre com a grafia oficial. ${P} regras de maiúsculas/minúsculas e destaque.`)}
        </div>
        <div class="box flow">
          ${T.tag(`A voz de ${B.name} É`)}
          ${['Qualidade 1', 'Qualidade 2', 'Qualidade 3'].map((q) => `${T.lbl(q)}${T.beforeAfter('[preencher] frase como NÃO dizer', '[preencher] a mesma frase no tom da marca')}`).join('')}
        </div>
        <div class="box flow">
          <span class="part-tag" style="color:var(--no); border-color:var(--no); background:transparent">A voz NÃO é</span>
          <div class="grid cols-2">
            ${[1, 2, 3, 4].map((i) => T.dd(false, `Traço evitado ${i}`, T.body(`${P} Por que evitamos e o que fazemos no lugar.`))).join('')}
          </div>
        </div>
        <div class="box flow">
          ${T.lbl('Grafias autorais', INFO.grafias)}
          ${T.body(`${P} Regra geral: a grafia do logo nem sempre se transfere para o texto corrido. Liste aqui os termos com escrita própria.`)}
          ${T.table(['Termo', 'Como escrevemos', 'Tipo', 'Observação'], [
            [`<img src="${B.logos.simplificada}" alt="${B.name}" style="height:32px">`, `<span class="no-bold">${B.name}</span>`, 'marca', `${P} ex.: sempre em minúsculas`],
            ['<span class="nt-name">iniciativa 1</span>', 'iniciativa 1', 'iniciativa', P],
            ['<span class="nt-name">produto 1</span>', 'produto 1', 'produto', P],
            ['<span class="nt-name">palavra 1</span>', 'palavra 1', 'vocabulário', P],
          ], '1.1fr 1fr .8fr 1.4fr')}
        </div>
        <div class="grid cols-2">
          <div class="box flow">${T.lbl('Palavras que combinam conosco')}${T.chips(['Palavra 1', 'Palavra 2', 'Palavra 3'])}</div>
          <div class="box flow">${T.lbl('Palavras que evitamos')}<div class="chips">${['Palavra 1', 'Palavra 2', 'Palavra 3'].map((t) => `<span class="chip" style="color:var(--no); border-color:color-mix(in oklch, var(--no) 35%, var(--line)); background:color-mix(in oklch, var(--no) 5%, transparent); text-decoration:line-through">${t}</span>`).join('')}</div>${T.hint(`${P} palavras que não fazem parte do nosso vocabulário e, se possível, o que usar no lugar.`)}</div>
        </div>
      </div>`,
    },
    {
      id: 'pos-exemplos', label: 'Exemplos e situações', group: '05 · Personalidade',
      crumb: 'Personalidade', title: 'Exemplos e situações',
      sub: 'O tom de voz aplicado a situações do dia a dia e à linguagem digital.',
      render: () => `<div class="flow">
        <div>${T.lbl('Situações')}</div>
        ${[
          ['Saudação', 'Como iniciamos uma conversa.'],
          ['Problemas', 'Como lidamos com erros, atrasos ou imprevistos.'],
          ['Elogios', 'Como respondemos a elogios.'],
          ['Reclamações', 'Como acolhemos e respondemos a reclamações.'],
          ['Agradecimentos', 'Como agradecemos.'],
          ['Encerramento', 'Como encerramos uma conversa.'],
        ].map(([t, d]) => `<div class="box flow">
          ${T.lbl(t)}
          ${T.body(`${P} ${d}`)}
          ${T.beforeAfter('[preencher] exemplo fora do tom', '[preencher] exemplo no tom da marca')}
        </div>`).join('')}
        <div style="margin-top:12px">${T.lbl('Linguagem digital', INFO.digital)}</div>
        <div class="box flow">
          ${T.lbl('Hashtags', INFO.hashtags)}
          ${T.body(`${P} Regra geral: quantas usar, onde posicionar, maiúsculas/minúsculas.`)}
          ${T.table(['Hashtag', 'Quando usar'], [
            [`<span class="nt-name no-bold">#${B.name}</span>`, `${P} hashtag institucional`],
            ['<span class="nt-name">#iniciativa1</span>', P],
            ['<span class="nt-name">#iniciativa2</span>', P],
          ], '1fr 2fr')}
        </div>
        <div class="box flow">
          ${T.lbl('Emojis', INFO.emojis)}
          ${T.body(`${P} Regra geral: a marca usa emojis? Em quais canais e com que frequência?`)}
          <div class="grid cols-2">
            ${T.dd(true, 'Prefira', T.body(`${P} emojis e contextos adequados.`))}
            ${T.dd(false, 'Evite', T.body(`${P} emojis e contextos a evitar.`))}
          </div>
        </div>
      </div>`,
    },
    {
      id: 'pos-imagens', label: 'Direção de imagens', group: '05 · Personalidade',
      crumb: 'Personalidade', title: 'Direção de imagens',
      sub: 'Que fotos escolher. O tratamento gráfico fica em Expressão visual → Layouts.',
      render: () => `<div class="flow">
        ${T.cards([
          ['1 · Imagens editoriais', `${P} Critérios de escolha: enquadramento, foco, luz.`],
          ['2 · Imagens institucionais', `${P} Temas, cenários, retratos da equipe.`],
        ])}
        <div class="box flow">
          ${T.lbl('Evite')}
          <div class="grid cols-3">${[1, 2, 3].map((i) => T.dd(false, `Evitar ${i}`, T.body(P))).join('')}</div>
        </div>
        <div class="box flow">
          ${T.lbl('Linguagem fotográfica — exemplos')}
          <div class="grid cols-3">${[1, 2, 3, 4, 5, 6].map((i) => T.photo(`assets/fotos/foto-0${i}.jpg`, `exemplo ${i}`, 180)).join('')}</div>
        </div>
      </div>`,
    },
    {
      id: 'pos-manifesto', label: 'Manifesto', group: '06 · Experiência',
      crumb: 'Experiência', title: 'Manifesto de marca',
      sub: 'O que inspira a todos. Colaboradores, parceiros e clientes.',
      render: () => `<div class="box flow manifesto">
        ${T.body(`${P} Parágrafo de abertura: a origem da ideia por trás de ${B.name}.`)}
        ${T.body(`${P} Parágrafo de contexto: o mundo em que a marca atua e o que está em jogo.`)}
        ${T.body(`${P} Parágrafo de compromisso: o que ${B.name} faz a respeito.`)}
        ${T.body(`${P} Parágrafo de fechamento: a missão em tom inspirador.`)}
      </div>`,
    },
    {
      id: 'pos-produto', label: 'Características', group: '06 · Experiência',
      crumb: 'Experiência', title: 'Características',
      sub: 'O que dá identidade aos nossos produtos e o que queremos que o cliente sinta.',
      render: () => `<div class="flow">
        <div class="box flow">
          ${T.lbl('O que queremos que o cliente sinta')}
          <p class="slogan">${P} uma frase que resume a sensação.</p>
          ${T.body(`${P} O que o cliente deve sentir ao entrar em contato com ${B.name}: ao abrir o produto, ao entrar na loja, ao receber uma entrega, ao usar o serviço.`)}
          ${T.chips(['Sensação 1', 'Sensação 2', 'Sensação 3'])}
        </div>
        <div class="box flow">
          ${T.lbl('O que dá identidade aos nossos produtos')}
          ${T.body(`${P} Os elementos físicos e sensoriais que tornam um produto reconhecível como ${B.name}, mesmo sem o logo.`)}
        </div>
        ${T.cards([
          ['Formatos', `${P} formatos específicos de embalagens, peças ou objetos.`],
          ['Texturas', `${P} texturas, materiais e sensação ao toque.`],
          ['Tamanhos', `${P} tamanhos, proporções e padrões de medida.`],
          ['Acabamentos', `${P} acabamentos, impressão, detalhes.`],
        ])}
        <div class="box flow">
          ${T.lbl('Pontos de contato')}
          ${T.table(['Onde', 'Como a identidade aparece', 'O que o cliente sente'], [
            ['<span class="nt-name">Produto / embalagem</span>', P, P],
            ['<span class="nt-name">Loja / espaço</span>', P, P],
            ['<span class="nt-name">Entrega / unboxing</span>', P, P],
            ['<span class="nt-name">Digital</span>', P, P],
          ], '1fr 1.4fr 1.4fr')}
        </div>
        <div class="grid cols-3">${[1, 2, 3].map((n) => T.photo(`assets/fotos/produto/produto-0${n}.jpg`, `referência ${n}`, 220)).join('')}</div>
      </div>`,
    },
    {
      id: 'pos-atendimento', label: 'Padrão de atendimento', group: '06 · Experiência',
      crumb: 'Experiência', title: 'Padrão de atendimento',
      sub: 'Os padrões que se repetem em todo atendimento.',
      render: () => `<div class="flow">
        <div class="box flow">${T.body(`${P} O que o cliente deve sentir em qualquer contato com ${B.name}.`)}</div>
        <div class="grid cols-3">${[
          ['01. Recepção', 'Como recebemos o cliente.'],
          ['02. Durante o atendimento', 'Postura, linguagem e tempo de resposta.'],
          ['03. Pós-atendimento', 'Acompanhamento e despedida.'],
        ].map(([t, d]) => `<div class="box flow">${T.lbl(t)}${T.body(`${P} ${d}`)}</div>`).join('')}</div>
        <div class="grid cols-2">
          ${T.dd(true, 'Sempre', T.body(`${P} atitudes obrigatórias.`))}
          ${T.dd(false, 'Nunca', T.body(`${P} atitudes a evitar.`))}
        </div>
      </div>`,
    },
    {
      id: 'pos-arquitetura-espaco', label: 'Direcionamento arquitetônico', group: '06 · Experiência',
      crumb: 'Experiência', title: 'Direcionamento arquitetônico',
      sub: 'Materiais, cores e acabamentos que fazem sentido no universo da marca.',
      render: () => `<div class="flow">
        <div class="box flow">${T.body(`${P} A sensação que os espaços de ${B.name} devem transmitir.`)}</div>
        ${T.cards([
          ['Materiais', `${P} materiais recomendados.`],
          ['Cores', `${P} como a paleta da marca se traduz no espaço.`],
          ['Acabamentos', `${P} texturas e acabamentos.`],
          ['Iluminação e mobiliário', `${P} orientações gerais.`],
        ])}
        <div class="grid cols-3">${[1, 2, 3].map((n) => T.photo(`assets/fotos/arquitetura/arquitetura-0${n}.jpg`, `referência ${n}`, 220)).join('')}</div>
      </div>`,
    },
    {
      id: 'pos-territorio', label: 'Território de marca', group: '06 · Experiência',
      crumb: 'Experiência', title: 'Território de marca',
      sub: 'Sobre o que falamos.',
      render: () => `<div class="flow">
        <div class="box flow">${T.lbl('Territórios')}${T.chips(['Território 1', 'Território 2', 'Território 3', 'Território 4'])}</div>
        ${T.cards([1, 2, 3, 4].map((n) => [`Território ${n}`, `${P} O que abordamos e exemplos de pautas/formatos.`]))}
        <div class="box flow">${T.lbl('Fora do nosso território')}${T.body(`${P} Temas sobre os quais a marca não fala.`)}</div>
        <div class="flow">
          <div>${T.lbl('Repositório de referências', INFO.repositorio)}${T.hint(B.agency && B.agency.refsEmail ? 'Cada link adicionado é enviado automaticamente para a agência e passa a aparecer para todos depois de aprovado.' : 'Links salvos neste navegador. Use “Exportar” para enviar à agência e tornar a lista permanente no manual.')}</div>
          ${T.linkRepo({
            id: 'territorio',
            categories: ['Território 1', 'Território 2', 'Território 3', 'Território 4'],
            /* referências permanentes (cole aqui o JSON exportado): { title, url, cat, note } */
            seed: [],
          })}
        </div>
      </div>`,
    },
  ];
  window.POS_SECTIONS.forEach((s) => { s.part = 'pos'; if (s.id !== 'capa') s.copyText = true; if (INFO[s.id] && !s.info) s.info = INFO[s.id]; });
})();
