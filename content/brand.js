/* ============================================================
   CONTEÚDO · brand.js — ÚNICO lugar com dados da marca.
   O motor (engine/) lê tudo daqui. Ao duplicar o template,
   comece por este arquivo. Ver TEMPLATE.md.
   Marca de exemplo: "aurora" (fictícia).
   ============================================================ */
window.BRAND = {
  /* ---- identidade ---- */
  name: 'Teste Motora',                       // grafia OFICIAL (respeite minúsculas/maiúsculas)
  fullName: 'Teste Motora',           // nome completo / razão de uso institucional
  tagline: '[preencher] descrição curta da marca em uma linha',
  slogan: 'Uma frase que *resume* a marca',   // *palavra* = destaque na cor de acento
  manualTitle: 'Manual da marca',
  audience: 'Guia de uso exclusivo da equipe.',
  updatedAt: '',                        // opcional 'AAAA-MM-DD': fixa a data de "Última atualização". Vazio = automática.
  boldNameInText: true,                 // nome da marca em negrito no texto corrido
  meta: ['[preencher] Agência', 'Brandbook · mês/ano', 'Expressão visual · mês/ano'],
  sidebarFoot: ['Brandbook + Expressão visual', '[preencher] Agência'],

  /* ---- cores da interface do manual ---- */
  ui: {
    primary: '#1F3A5F',   // títulos, nav ativa, fundos escuros
    accent: '#E2725B',    // rótulos, destaques, crumb
    ink: '#14202E',       // texto
    paper: '#FFFFFF',     // fundo
  },

  /* ---- paleta (HEX/RGB/CMYK — sempre com copiar) ---- */
  colors: {
    principais: [
      { name: 'Azul noite', hex: '#1F3A5F', rgb: '31, 58, 95', cmyk: '67, 39, 0, 63', pantone: 'PANTONE [preencher]', use: 'principal' },
      { name: 'Terracota', hex: '#E2725B', rgb: '226, 114, 91', cmyk: '0, 50, 60, 11', pantone: 'PANTONE [preencher]', use: 'acento' },
    ],
    secundarias: [
      { name: 'Âmbar', hex: '#F2C14E', rgb: '242, 193, 78', cmyk: '0, 20, 68, 5', use: 'apoio' },
      { name: 'Verde-água', hex: '#3FA796', rgb: '63, 167, 150', cmyk: '62, 0, 10, 35', use: 'apoio' },
    ],
    neutras: [
      { name: 'Preto', hex: '#000000', rgb: '0, 0, 0', cmyk: '0, 0, 0, 100' },
      { name: 'Branco', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0' },
      { name: 'Areia', hex: '#F4F1EC', rgb: '244, 241, 236', cmyk: '0, 1, 3, 4', use: 'fundo claro' },
      { name: 'Grafite', hex: '#14202E', rgb: '20, 32, 46', cmyk: '57, 30, 0, 82', use: 'texto' },
    ],
    /* Figura e fundo (Expressão visual → Figura e fundo). Cores sempre em HEX da paleta acima.
       layouts: combinações por layout · impacto / denso: exemplos de combinações principais
       backgrounds: cores que podem ser fundo (vazio = todas)
       exemplos: legendas dos exemplos aplicados (imagens em assets/diagramas/figura-fundo/) */
    figuraFundo: {
      maxCores: 3,      // PLACEHOLDER: varia por marca (definir com a agência)
      /* combinações de cores por layout (até maxCores cores cada), em HEX da paleta */
      layouts: [
        ['#1F3A5F', '#3FA796', '#F4F1EC'],
        ['#14202E', '#E2725B', '#FFFFFF'],
        ['#F4F1EC', '#F2C14E', '#1F3A5F'],
        ['#E2725B', '#1F3A5F', '#14202E'],
      ],
      /* exemplos { bg, figure (grafismo), text } */
      impacto: {
        text: '[preencher] cores de fundo recomendadas e as cores de texto que funcionam sobre elas.',
        combos: [
          { bg: '#1F3A5F', figure: '#3FA796', text: '#F4F1EC' },
          { bg: '#14202E', figure: '#E2725B', text: '#FFFFFF' },
          { bg: '#E2725B', figure: '#1F3A5F', text: '#14202E' },
        ],
      },
      denso: {
        text: '[preencher] fundo claro com texto em cor escura da paleta.',
        combos: [
          { bg: '#F4F1EC', figure: '#F2C14E', text: '#1F3A5F' },
          { bg: '#FFFFFF', figure: '#3FA796', text: '#14202E' },
          { bg: '#F4F1EC', figure: '#E2725B', text: '#14202E' },
        ],
      },
      minContrast: 3,   // combinações abaixo disso não aparecem em "Combinações possíveis"
      backgrounds: ['#1F3A5F', '#E2725B', '#F2C14E', '#3FA796', '#F4F1EC', '#14202E'],
      overrides: {},    // { 'BG|FG': 'evitar' } para esconder uma combinação manualmente
      exemplos: {
        ok: ['[preencher] Grafismo em X e texto em Y sobre fundo Z.', '[preencher] Grafismo em X e texto em Y sobre fundo Z.', '[preencher] Grafismo em X e texto em Y sobre fundo Z.'],
        no: ['[preencher] Não utilize elementos em X sobre fundo Y.', '[preencher] Não utilize texto em X sobre fundo Y: contraste insuficiente.', '[preencher] Não utilize X como cor de fundo.'],
      },
    },
    /* Aplicação da marca (Expressão visual → Aplicação da marca). TODOS os valores abaixo são PLACEHOLDER e variam por marca.
       Cores em HEX. Logo em duas cores = [cor do símbolo, cor do nome]; uma cor = mesmo HEX nas duas posições.
       A matriz decide sozinha o que é recomendado pelo contraste (minContrast para o nome, minSecondary para o símbolo).
       overrides: { 'FUNDO|SIMBOLO|NOME': 'ok' | 'no' } para decisões manuais. */
    aplicacao: {
      minContrast: 3,
      minSecondary: 1.8,
      destaques: [
        { label: 'Fundo areia', bg: '#F4F1EC', logos: [['#E2725B', '#1F3A5F'], ['#3FA796', '#14202E']] },
        { label: 'Fundo azul noite', bg: '#1F3A5F', logos: [['#E2725B', '#F4F1EC']] },
        { label: 'Fundo grafite', bg: '#14202E', logos: [['#F2C14E', '#FFFFFF']] },
        { label: 'Fundo terracota', bg: '#E2725B', logos: [['#1F3A5F', '#14202E']] },
        { label: 'Fundo âmbar', bg: '#F2C14E', logos: [['#E2725B', '#1F3A5F']] },
      ],
      backgrounds: ['#1F3A5F', '#14202E', '#E2725B', '#F2C14E', '#3FA796', '#F4F1EC', '#FFFFFF'],
      pn: ['#000000', '#FFFFFF'],
      colorido: [['#E2725B', '#1F3A5F'], ['#E2725B', '#F4F1EC'], ['#F2C14E', '#FFFFFF'], ['#3FA796', '#14202E']],
      mono: ['#1F3A5F', '#E2725B', '#F2C14E', '#F4F1EC'],
      overrides: {},
      importante: '[preencher] Observação importante, se houver (ex.: versões claras sobre fundos escuros com compensação óptica de espessura). Deixe vazio para ocultar.',
      textos: {
        colorido: 'Abaixo, combinações de cor de assinatura e cor de fundo recomendadas e não recomendadas, dentro da paleta de cor da marca. [preencher] regra específica, se houver (ex.: qual parte da assinatura fica na cor de maior contraste).',
        pn: 'A versão positiva (preta) e a negativa (branca) da marca devem ser usadas quando [preencher].',
        mono: 'Nas aplicações monocromáticas, a marca é aplicada em uma única cor da paleta. [preencher] quando usar.',
      },
      foraPaleta: {
        texts: ['Para aplicações sobre fundos fora da paleta de cor, utilize a versão da marca em preto ou branco, levando sempre em consideração os contrastes.'],
        exemplos: [{ bg: '#8B74E0' }, { bg: '#CC8A2E' }, { bg: '#5FD068' }, { bg: '#3AD6F0' }, { bg: '#C46FC8' }, { bg: '#F2CC4A' }],
      },
      /* fotos: { photo, logo } — logo = cor da marca sobre a foto */
      fotos: {
        texts: ['Sobre fotos, utilize a versão da marca em preto ou branco, escolhendo a de maior contraste com a área da imagem onde a marca será aplicada.', 'Para raras aplicações em tons de cinza, utilize a versão positiva (preta) da marca.'],
        exemplos: [
          { photo: 'assets/fotos/aplicacao/aplicacao-foto-01.jpg', logo: '#FFFFFF' },
          { photo: 'assets/fotos/aplicacao/aplicacao-foto-02.jpg', logo: '#000000' },
        ],
      },
    },
    /* Cores por produto / serviço / editoria (opcional).
       groups: [{ label, note?, palette: [{ name, hex, rgb, cmyk, use }] }]
       groups: null → usa as paletas de "themes" abaixo. groups: [] → oculta o bloco. */
    porAplicacao: {
      title: 'Cores por produto, serviço ou editoria',
      intro: '',
      groups: null,
    },
  },

  /* ---- cores das sub-marcas (OPCIONAL: só marcas com arquitetura de sub-marcas) ----
     Cada sub-marca em content/sections-sub.js aponta para um id daqui (campo theme). group = nível, só referência. */
  themes: [
    {
      id: 'tema-institucional', label: 'aurora institucional', group: 'Nível 1 · Institucional',
      color: '#E2725B',
      palette: [
        { name: 'Terracota', hex: '#E2725B', rgb: '226, 114, 91', cmyk: '0, 50, 60, 11', use: 'principal' },
        { name: 'Terracota escuro', hex: '#B5503C', rgb: '181, 80, 60', cmyk: '0, 56, 67, 29', use: 'sobretom' },
      ],
    },
    {
      id: 'tema-a', label: 'produto/serviço A', group: 'Nível 2 · Produtos/serviços',
      color: '#3FA796',
      palette: [
        { name: 'Verde-água', hex: '#3FA796', rgb: '63, 167, 150', cmyk: '62, 0, 10, 35', use: 'principal' },
        { name: 'Verde-água escuro', hex: '#2A7A6C', rgb: '42, 122, 108', cmyk: '66, 0, 11, 52', use: 'sobretom' },
      ],
    },
    {
      id: 'tema-b', label: 'produto/serviço B', group: 'Nível 2 · Produtos/serviços',
      color: '#F2C14E',
      palette: [
        { name: 'Âmbar', hex: '#F2C14E', rgb: '242, 193, 78', cmyk: '0, 20, 68, 5', use: 'principal' },
        { name: 'Âmbar escuro', hex: '#C9952A', rgb: '201, 149, 42', cmyk: '0, 26, 79, 21', use: 'sobretom' },
      ],
    },
    {
      id: 'tema-c', label: 'iniciativa A', group: 'Nível 3 · Iniciativas',
      color: '#7B6CF6',
      palette: [
        { name: 'Violeta', hex: '#7B6CF6', rgb: '123, 108, 246', cmyk: '50, 56, 0, 4', use: 'principal' },
        { name: 'Violeta escuro', hex: '#5644C9', rgb: '86, 68, 201', cmyk: '57, 66, 0, 21', use: 'sobretom' },
      ],
    },
  ],

  /* ---- tipografia ----
     files: [{ src:'assets/fonts/arquivo-sem-acento.otf', weight:400, style:'normal' }]
     Sem arquivos, o manual usa o fallback. cssLinks: folhas externas opcionais (ex.: Google Fonts). */
  fonts: {
    /* download: arquivo ou .zip em assets/fonts/ · license: arquivo de licença ou URL do site da fundição. Vazio = botão desativado. */
    display: { family: 'Fonte Display', download: 'assets/fonts/fonte-display.zip', license: 'assets/fonts/fonte-display-licenca.txt', role: 'títulos', weights: [800], files: [], fallback: "'Trebuchet MS', system-ui, sans-serif" },
    text:    { family: 'Fonte Texto', download: 'assets/fonts/fonte-texto.zip', license: 'assets/fonts/fonte-texto-licenca.txt', role: 'texto corrido', weights: [300, 400, 700], files: [], fallback: "system-ui, -apple-system, 'Segoe UI', sans-serif" },
    /* OPCIONAL: só para marcas com sub-marcas e orientações de arquitetura. Sem sub-marcas, apague esta linha (o box some da Tipografia). */
    sub:     { family: 'Fonte Sub-marca', download: 'assets/fonts/fonte-sub-marca.zip', license: 'assets/fonts/fonte-sub-marca-licenca.txt', role: 'exclusiva para novas assinaturas de sub-marcas', weights: [600], files: [], fallback: "Georgia, 'Times New Roman', serif" },
    cssLinks: [],
  },

  /* ---- logos (caminhos relativos, nomes sem acento) ---- */
  logos: {
    principal: 'assets/logos/logo-principal.svg',
    simplificada: 'assets/logos/logo-simplificada.svg',
    negativo: 'assets/logos/logo-negativo.svg',
    simbolo: 'assets/logos/simbolo.svg',
    sidebar: 'assets/logos/logo-principal.svg',
    favicon: 'assets/logos/simbolo.svg',
    /* símbolo em SVG inline com fill="currentColor": recolorido na assinatura padrão de newsletter.
       Funciona abrindo o index.html localmente (file://). Se vazio, usa máscara CSS de logos.simbolo. */
    simboloSvg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M50 6a44 44 0 1 1 0 88a44 44 0 0 1 0-88zm0 24a20 20 0 1 0 0 40a20 20 0 0 0 0-40z"/></svg>',
    /* logo principal em SVG inline para os exemplos de Aplicação da marca.
       Troque os fills por style="fill:var(--c1)" (símbolo) e style="fill:var(--c2)" (nome) — o manual recolore sozinho.
       Se vazio, usa máscara CSS de logos.principal (uma cor só). */
    principalSvg: '<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg"><path style="fill:var(--c1)" fill-rule="evenodd" d="M50 6a44 44 0 1 1 0 88a44 44 0 0 1 0-88zm0 24a20 20 0 1 0 0 40a20 20 0 0 0 0-40z"/><text x="110" y="68" font-family="Trebuchet MS, Arial, sans-serif" font-size="56" font-weight="700" letter-spacing="-1" style="fill:var(--c2)">aurora</text></svg>',
  },

  /* ---- assinaturas (Expressão visual → Assinaturas) ----
     Cada uma tem 3 arquivos em signaturesDir: <id>-colorida.svg, <id>-positivo.svg, <id>-negativo.svg.
     Remova as que a marca não tiver. A primeira é exibida em destaque.
     Em "use", {marca} é trocado automaticamente pelo nome da marca.
     Opcionais: minPrint (mm) e minDigital (px) → Redução; alignBad: 1 → Alinhamento com só 1 exemplo indevido. */
  signaturesDir: 'assets/logos/assinaturas',
  signatureFormats: ['svg', 'png', 'pdf'],   // botões em Downloads; arquivos em <signaturesDir>/pacotes/<id>-<formato>.zip
  signaturesZip: '',   // opcional: caminho de um .zip pronto. Vazio = o manual monta o zip com todos os SVGs da pasta.
  signatures: [
    { id: 'horizontal', label: 'Horizontal', use: 'A assinatura principal deve estar presente em todos os layouts corporativos, como contratos, timbrado, propostas para clientes, e em especial, materiais em que a marca vai ser apresentada pela primeira vez ou cujo público-alvo não está familiarizado com a {marca}.' },
    { id: 'horizontal-tagline', label: 'Horizontal com tagline', use: 'A assinatura com tagline reforça o posicionamento da {marca} junto ao nome. É a versão mais indicada para materiais institucionais e de apresentação, como capas, abertura de vídeos, site e peças de lançamento, em que há espaço suficiente para que a tagline seja lida com conforto. Evite em tamanhos reduzidos, quando a tagline perde a legibilidade.' },
    { id: 'vertical', label: 'Vertical', use: 'A assinatura vertical é a alternativa à horizontal para formatos mais altos ou quadrados, como posts e stories, avatares, crachás, embalagens, cartazes e fachadas. Use quando a versão horizontal ficaria pequena demais por falta de largura ou quando precisar aplicar a marca centralizada.' },
    { id: 'vertical-tagline', label: 'Vertical com tagline', use: 'Une o formato vertical ao reforço de posicionamento da tagline. Indicada para peças verticais de destaque, como cartazes, banners de evento, encerramento de vídeos e capas, em que a {marca} precisa se apresentar por completo. Assim como na horizontal com tagline, evite em tamanhos reduzidos.' },
    { id: 'simbolo', label: 'Símbolo', use: "O símbolo é uma opção de assinatura minimalista e funciona muito bem em layouts limpos ou sobre fundos complexos (como fotos). Ele é a versão mais indicada para aplicação em marca d'água, assinaturas laterais em slides ou cards e outras mídias que exijam sua reprodução em tamanhos extremamente reduzidos (como no canto superior desse manual)." },
  ],

  /* ---- imagens de apoio ---- */
  images: {
    sloganBg: '',   // ex.: 'assets/fotos/slogan-fundo.jpg' (vazio = fundo na cor primária)
  },

  /* ---- modo edição (Área do administrador, link no rodapé da barra lateral) ----
     passwordHash: hash da senha. Senha padrão do template: motora-admin.
       Para trocar: abra o console do navegador no manual e rode  T.adminHash('nova-senha')  e cole o resultado aqui.
     repo / branch / path: onde publicar (path = pasta do manual dentro do repositório, vazio = raiz).
     O token do GitHub é informado no próprio manual e fica salvo só no navegador de quem publica. */
  admin: {
    passwordHash: '1f7589a3',
    repo: 'MotoraDesign/manual-teste-motora',        // ex.: 'motora/manual-aurora'
    branch: 'main',
    path: '',
  },

  /* ---- créditos ---- */
  agency: {
    name: 'Motora',
    email: 'contato@motoradesign.com',
    date: '[preencher] mês/ano',
    contacts: ['contato@agencia.com', 'www.agencia.com', '[preencher] cidade-UF'],
    /* E-mail que recebe as referências enviadas pelo cliente (Território de marca → Repositório).
       Usa o serviço gratuito FormSubmit (formsubmit.co): no 1º envio chega um e-mail de ativação — clique em "Activate".
       Vazio = os links ficam salvos só no navegador do cliente. */
    refsEmail: 'contato@motoradesign.com',
  },
};
