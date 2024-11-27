/// <reference = cypress>

describe("Testes Negativos", () => {
    // Função para verificar se a data de introdução é posterior à data de descontinuação
    function verificarDataInvalida(introduced, discontinued) {
        const introducedDate = new Date(introduced);
        const discontinuedDate = new Date(discontinued);
        return introducedDate > discontinuedDate;
    }

    it('Deve falhar ao adicionar um computador com data de introdução posterior à data de descontinuação', () => {
        cy.visit('https://computer-database.gatling.io/computers');
        
        // Clica no botão "Adicionar novo computador"
        cy.get('#add').click();
    
        // Preenche o campo de nome com um nome válido
        cy.get('#name').type('Computador com Data Inválida');
    
        // Preenche o campo de data de introdução com uma data posterior à data de descontinuação
        const introducedDate = '2023-12-31';
        const discontinuedDate = '2023-01-01';
        cy.get('#introduced').type(introducedDate);
        cy.get('#discontinued').type(discontinuedDate);
    
        // Verifica se a data de introdução é posterior à data de descontinuação
        if (verificarDataInvalida(introducedDate, discontinuedDate)) {
          // Seleciona uma empresa válida
          cy.get('#company').select('IBM');
    
          // Clica no botão "Criar este computador"
          cy.get('.btn.primary').click();
    
          // Verifica se a mensagem de erro é exibida
          cy.get('.error > .input').should('be.visible');
        } else {
          throw new Error('A data de introdução não é posterior à data de descontinuação');
        }
    });

    it('Deve falhar ao adicionar um computador com dados inválidos', () => {
        cy.visit('https://computer-database.gatling.io/computers');
        cy.get('#add').click();
        cy.get('#name').type('Computador Inválido');
        cy.get('#introduced').type('data-invalida');
        cy.get('#discontinued').type('data-invalida');
        cy.get('#company').select('IBM');
        cy.get('.btn.primary').click();
        cy.get('.error > .input').should('be.visible');
    });

    it('Deve falhar ao editar um computador com dados inválidos', () => {
        cy.visit('https://computer-database.gatling.io/computers');
        cy.get('a').contains('ACE').click();
        cy.get('#name').clear().type('Computador Inválido');
        cy.get('#introduced').clear().type('data-invalida');
        cy.get('#discontinued').clear().type('data-invalida');
        cy.get('.btn.primary').click();
        cy.get('.error > .input').should('be.visible');
    });  
  })