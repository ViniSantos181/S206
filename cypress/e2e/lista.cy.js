describe('Testes no Google', () => {
  
  // Teste 1: Busca simples por um termo comum
  it('Busca no Google por "Testes de Software"', () => {
    cy.visit('https://www.google.com');
    cy.get('input[name="q"]').type('Testes de Software{enter}');
    cy.url().should('include', '/search');
    cy.get('#search').should('be.visible');
  });

  // Teste 2: Busca específica e validação de um termo encontrado
  it('Busca por "Programação em JavaScript" e verifica resultado específico', () => {
    cy.visit('https://www.google.com');
    cy.get('input[name="q"]').type('Programação em JavaScript{enter}');
    cy.url().should('include', '/search');
    cy.contains('JavaScript').should('exist'); // Verifica se há algum resultado com o texto "JavaScript"
  });

  // Teste 3: Teste do botão "Estou com sorte"
  it('Busca com "Estou com sorte" usando "Documentação Cypress"', () => {
    cy.visit('https://www.google.com');
    cy.get('input[name="q"]').type('Documentação Cypress');
    cy.get('input[name="btnI"]').click();
    cy.url().should('not.include', '/search'); // Verifica se não está na página de resultados de busca padrão
  });

  // Teste 4: Busca sem inserir nenhum termo
  it('Busca sem inserir nenhum termo', () => {
    cy.visit('https://www.google.com');
    cy.get('input[name="q"]').type('{enter}');
    cy.url().should('include', '/webhp'); // Verifica se a URL permanece na página principal
  });

  // Teste 5: Verificação de elemento inexistente (Teste propositalmente falho)
  it('Teste falho - Verifica uma seção inexistente na busca por "Testes Automatizados"', () => {
    cy.visit('https://www.google.com');
    cy.get('input[name="q"]').type('Testes Automatizados{enter}');
    cy.get('#search').should('be.visible');
    cy.get('.seção-inexistente').should('exist'); // Propositalmente incorreto para falhar
  });

  // Teste 6: Verifica se o logotipo do Google está visível na página inicial
  it('Verifica o logotipo do Google na página inicial', () => {
    cy.visit('https://www.google.com');
    cy.get('img[alt="Google"]').should('be.visible'); // Verifica se o logo do Google está visível
  });
});
