# Template de manual de marca

HTML, CSS e JS puros, sem build. Abra o `index.html` direto no navegador ou publique a pasta no GitHub Pages.


## Checklist · nova marca

1. No **Painel de manuais** (pasta `painel/`), clique em **+ Novo manual**: ele cria o repositório a partir do template, marca a etiqueta `manual-de-marca`, preenche o nome da marca e ativa o GitHub Pages.
   Sem o painel: GitHub → template → *Use this template* → Settings → Pages (branch `main`, pasta `/`) → adicionar o topic `manual-de-marca`.
2. Preencher `content/brand.js`: cores, fontes, assinaturas, `admin.repo` e senha.
3. Substituir as imagens em `assets/` mantendo os nomes.
4. Ajustar textos em `content/sections-*.js` ou pelo modo edição.
5. Remover o que a marca não usa (fonte e páginas de sub-marcas, níveis, cards da capa).
6. Buscar `[preencher]` e conferir que não sobrou nenhum. Deixar `content/overrides.js` como `window.OVERRIDES = {};`.

## Painel de manuais (pasta `painel/`)

Ferramenta interna da Motora, publicada num repositório próprio (ex.: `motora/painel-manuais`), **fora** dos manuais dos clientes.

- Lista todo repositório com o topic `manual-de-marca`, com logo, link, data e avisos (rascunho não publicado, `[preencher]` restantes).
- **Editar** abre o manual já no modo edição (`?admin=1`, válido por 12 h após o login no painel).
- **+ Novo manual** cria e publica um manual novo a partir do template.
- Token: fine-grained, com acesso aos repositórios da Motora e permissões *Administration*, *Contents* e *Pages* (leitura e escrita). Fica salvo só no navegador.
- Publicado no mesmo endereço do GitHub Pages dos manuais (`<dono>.github.io/...`), o token do painel também vale para **Publicar** dentro de cada manual. Manual com domínio próprio pede o token uma vez.
- Senha: `PASSWORD_HASH` no topo de `painel/index.html` (padrão `motora-admin`).
- Ao montar o repositório do template, **não** inclua a pasta `painel/`: ela vai no repositório do painel.

## Estrutura

```
index.html              shell: sidebar, busca, crumb, título, painéis
engine/                 MOTOR — não editar por marca
  app.js                aplica brand.js, monta nav/painéis, rotas (#id), busca, copiar
  wf-lib.js             blocos T.* e renderizador de sub-marcas por nível (SUB.render / SUB.hero)
  styles.css            layout e grid
  hifi.css              visual (cores/fontes via variáveis CSS)
content/                CONTEÚDO — editar por marca
  brand.js              único lugar com dados da marca
  sections-pos.js       Posicionamento
  sections-vis.js       Expressão visual
  sections-sub.js       Sub-marcas por nível do portfólio (opcional)
  sections-creditos.js  Créditos / contatos
assets/
  logos/                logos e símbolo
  fotos/                fotos (persona, direção de imagens, tratamento)
  fotos/dress-code/     referências de dress code (dress-code-01.jpg …)
  diagramas/            diagramas da expressão visual (grid, arejamento, usos, aplicações…)
  submarcas/            assinaturas de sub-marcas e logos do portfólio
  events/               peças aplicadas (exemplos, cards, banners)
  fonts/                arquivos de fonte
```

**Todo arquivo de imagem já existe como PLACEHOLDER**, com o nome final. Para adaptar a uma marca, basta substituir o arquivo mantendo o nome. Cada pasta tem um `LEIA-ME.txt` que mapeia cada arquivo para a seção onde ele aparece. Se um arquivo for apagado, o manual mostra um placeholder com o caminho esperado.

Ordem de carregamento no `index.html`: brand.js → wf-lib.js → sections-* → app.js.

## Regras fixas (valem para todas as marcas)

- **Cantos de 16px** em todos os boxes, que é a variável `--radius` em `engine/styles.css`. Não sobrescreva por marca.
- **Cores sempre com copiar.** Toda cor entra como objeto `{ name, hex, rgb, cmyk, pantone?, use? }` e é exibida com `T.color()`, `T.colors()` ou `T.swatch()`. Isso gera os botões HEX, RGB e CMYK, que copiam ao clicar.
- **Grafia oficial.** `brand.name` é escrito exatamente como a marca se grafa (minúsculas propositais etc.). Com `boldNameInText: true`, o motor deixa o nome em negrito no texto corrido. Para impedir isso num trecho, use `<span class="no-bold">`.
- **Nomes de arquivo sem acento e sem espaço**, como `logo-fundo-claro.svg` e `foto-01.jpg`.
- **Não inventar conteúdo.** Se uma seção não tem material, remova o objeto dela do array; o menu se ajusta sozinho.
- **Fotos para web:** ~1600px, JPG e menos de 1 MB.
- Use caminhos relativos (`assets/...`) e nunca `/assets/...`. Assim o manual funciona localmente e no GitHub Pages.

## 1. brand.js

| campo | o que é |
|---|---|
| `name` / `fullName` | grafia oficial / nome completo |
| `tagline`, `slogan` | no slogan, `*palavra*` vira destaque na cor de acento |
| `manualTitle`, `audience`, `meta`, `sidebarFoot` | textos da capa e do rodapé da sidebar |
| `ui.primary / accent / ink / paper` | cores da interface do manual |
| `colors.principais / secundarias / neutras` | paleta (HEX/RGB/CMYK) |
| `themes[]` | cor e paleta de cada sub-marca: `id`, `label`, `color`, `palette` (referenciado por `theme` em sections-sub.js) |
| `fonts.display / text / sub` | `family`, `role`, `weights`, `files: [{src, weight, style}]`, `fallback` |
| `logos.*` | caminhos: `principal`, `simplificada`, `negativo`, `simbolo`, `sidebar`, `favicon` |
| `logos.principalSvg` | logo principal em SVG inline com `style="fill:var(--c1)"` (símbolo) e `var(--c2)` (nome). Gera todos os exemplos de Aplicação da marca automaticamente, em qualquer combinação de cor |
| `logos.simboloSvg` | SVG inline do símbolo com `fill="currentColor"`, usado para recolorir na assinatura padrão |
| `images.sloganBg` | foto de fundo do banner de slogan (vazio = cor primária) |
| `agency` | créditos: `name`, `date`, `contacts[]` |

Fontes sem arquivos usam o `fallback`. Para Google Fonts, coloque a URL em `fonts.cssLinks` e o nome exato da família em `family`.

## 2. Seções

Cada seção é um objeto:

```js
{ id: 'sem-acento', label: 'Menu', group: '01 · Grupo', crumb: 'Grupo',
  title: 'Título da página', sub: 'Subtítulo', render: () => `...html...` }
```

- O `part` é definido no fim de cada arquivo: `pos`, `vis`, `sub` ou `creditos`.
- Itens consecutivos com o mesmo `group` ficam juntos no menu.
- A numeração é automática. Para fixar um número, use `idx: '07'`.
- A URL de cada seção é `index.html#id`.
- O texto `[preencher …]` aparece destacado em todo o manual. O checklist final é não sobrar nenhum.
- **Ícone (i):** `info: { what: 'O que é esse texto?', why: 'Para que serve?' }` na seção mostra o ícone ao lado do título, com as explicações no hover (e no foco por teclado). Para um bloco dentro da página, use `T.lbl('Rótulo', { what, why })`. Em `sections-pos.js`, os textos ficam no objeto `INFO`, que vem do modelo de Rascunho de Brandbook.

## 3. Blocos disponíveis (`T.*`)

| bloco | uso |
|---|---|
| `T.body(txt)` / `T.lead(txt)` | parágrafo / parágrafo grande |
| `T.lbl(txt)` / `T.hint(txt)` / `T.tag(txt)` | rótulo / nota / etiqueta |
| `T.chips([...])` | lista de chips |
| `T.cards([[título, texto], ...], cols, lead)` | grade de cards |
| `T.img('legenda', altura)` | placeholder de imagem |
| `T.pic(src, alt, altura)` | imagem sem legenda (diagramas, peças). Se o arquivo não existir, mostra placeholder com o caminho |
| `T.photo(src, legenda, altura)` | foto com legenda. Com src vazio, mostra placeholder. Se o arquivo ainda não existe, também mostra placeholder, com o caminho esperado |
| `T.logo(src, alt, altura, fundo)` | logo centralizado |
| `T.color(obj)` / `T.colors(arr)` / `T.swatch(nome, hex, sub, rgb, cmyk)` | cores com copiar |
| `T.pair(nome, hex1, hex2, nota)` | dupla principal + sobretom clicável |
| `T.dd(ok, título, html)` / `T.beforeAfter(evite, diga)` | certo/errado |
| `T.hero()` / `T.sloganBanner()` | capa / banner de slogan (leem brand.js) |
| `T.linkRepo({ id, categories, seed })` | repositório de links interativo (ver abaixo) |

Classes de layout: `.box`, `.box.alt`, `.box.flush` (sem padding, para imagens), `.grid.cols-2|3|4` e `.flow` (espaçamento vertical).

Toggle positivo/negativo: um `.box` com `[data-logo-seg]` (botões `data-bg="light|dark"`) e `[data-logo-stage]` contendo `img[data-logo-pos]` e `img[data-logo-neg]`.

Preview de fonte: `.fontprev` com `input[data-fontprev-input]`, `[data-fontsize-seg] button[data-size]` e `[data-fontprev-out]`.

### Repositório de referências (fluxo de aprovação)

1. Em `brand.js`, preencha `agency.refsEmail` com o e-mail da agência.
2. Na primeira vez que alguém clicar em "Adicionar", o FormSubmit (serviço gratuito) envia um e-mail de **ativação** para esse endereço. Clique em "Activate Form" uma única vez. O primeiro link fica nessa espera até a ativação.
3. A partir daí, cada link adicionado chega por e-mail com título, link, categoria, nota e uma linha pronta "Para colar no manual (seed)".
4. Para aprovar, cole essa linha no array `seed` do repositório (em `sections-pos.js` → Território de marca) e publique de novo. O link passa a aparecer para todos.
5. No navegador de quem enviou, o link aparece na hora com o selo "aguardando aprovação".

Se `refsEmail` ficar vazio, nada é enviado: os links ficam só no navegador, e o cliente usa "Exportar".

## 4. Sub-marcas (sections-sub.js)

**Opcional:** só para marcas com sub-marcas e orientações de arquitetura. Sem isso, remova `sections-sub.js` do index.html.

Uma página por nível do portfólio (`LEVELS`). Nomes e quantidade de níveis são placeholder:

- **Nível 1 · Marca-mãe:** logo, slogan, propósito, cores institucionais e o "guarda-chuva" com todas as sub-marcas abaixo dela (gerado sozinho a partir dos outros níveis).
- **Nível 2 e seguintes:** abertura (nível, título, descrição + assinaturas empilhadas), regras do nível (`rules`: construção da assinatura, direcionamento cromático) com imagem de grid (`grid`) e um box por sub-marca.

Cada sub-marca (`items`):

| campo | uso |
|---|---|
| `name` | grafia oficial |
| `theme` | id em `brand.themes`: cor e paleta |
| `hasOwn` | selo **assinatura própria / sem assinatura própria** |
| `signatures` | `[{ group, label, src, bg }]`, ex.: principal e simplificada, positiva e negativa |
| `diferencial` | só sem assinatura própria: o que a diferencia (nome, ícone, cor ou conjunto de cores) |
| `images` | exemplos de aplicação |

Nível sem itens mostra **"Não há sub-marca deste tipo."** Arquivos em `assets/submarcas/` com o nome final (`<slug>-principal.svg`, `<slug>-aplicacao-01.png`…).

## Modo edição (Área do administrador)

Link discreto no rodapé da barra lateral. Senha padrão: `motora-admin` (troque em `brand.admin.passwordHash` com `T.adminHash('nova-senha')` no console).

- Clique em qualquer texto para editar; título da página abre um campo; passe o mouse em imagens/blocos para **Trocar** ou **Remover**; no fim de cada página, **+ Bloco de texto** / **+ Imagem**.
- Tudo fica num **rascunho** no navegador (Desfazer, Restaurar original da página, Descartar).
- **Revisar e publicar** grava `content/overrides.js` e as imagens novas em `assets/uploads/` direto no GitHub (repositório, branch e token em **GitHub** na barra). O site atualiza em ~1 min.
- A senha só esconde os controles; a proteção real é o token do GitHub (fine-grained, *Contents: Read and write* só no repositório do manual).
- As edições ficam por cima do template: o motor e os arquivos `content/` continuam como estão. Ao criar uma marca nova, deixe `content/overrides.js` como `window.OVERRIDES = {};`.
- Se a estrutura de uma página mudar no código (blocos adicionados ou removidos), edições daquela página podem cair no bloco errado: confira depois de mudar o template.

## 5. Nova marca: passo a passo

1. Duplique o projeto e renomeie para "Manual <marca>".
2. Troque os arquivos em `assets/logos/` (mesmos nomes ou atualize `brand.logos`) e cole o SVG do símbolo em `simboloSvg`.
3. Copie as fontes para `assets/fonts/` e declare em `brand.fonts`.
4. Preencha o `brand.js` inteiro.
5. Preencha as seções na ordem Posicionamento → Expressão visual → Sub-marcas → Créditos.
6. Busque por `[preencher]` e confira que não sobrou nenhum.
7. Publique: envie a pasta para um repositório com o `index.html` na raiz, depois Settings → Pages → branch `main`, pasta `/`.

## Não editar por marca

`engine/*` e `index.html`. Se algo precisar mudar no motor, mude no projeto-matriz e replique.
