/* ============================================================
   CONTEÚDO · Créditos / contatos (dados em brand.js → agency)
   ============================================================ */
(function () {
  const T = window.T, B = window.BRAND, A = B.agency || {};
  window.CREDITOS_SECTIONS = [
    {
      id: 'creditos', part: 'creditos', label: 'Créditos', group: 'Créditos',
      crumb: 'Recursos', title: 'Créditos',
      sub: 'Autoria deste manual e contatos.',
      info: { what: 'Quem desenvolveu a estratégia e a identidade visual da marca, e como entrar em contato.', why: `Em caso de dúvida sobre o uso da marca ou se precisar produzir novos materiais, fale com ${A.name || 'a agência'}${A.email ? ` (${A.email})` : ''}.` },
      render: () => `<div class="box flow">
        ${T.body(`A estratégia de marca e a identidade visual apresentadas neste manual foram desenvolvidas por ${A.name} em ${A.date}.`)}
        ${T.chips(A.contacts || [])}
        <div class="hint" style="margin:0">Última atualização em <b data-last-update>…</b></div>
      </div>`,
    },
  ];
})();
