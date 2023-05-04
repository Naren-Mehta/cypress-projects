/// <reference types="Cypress" />

describe('Task Page', () => {
  it('should render the main page', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('.main-header img');//.should.length(1);

    cy.get('.main-header').find('img');//.should.length(1);

  });

  it('should display the page title', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('.main-header h1').should.toString('React Tasks');

    cy.get('.main-header h1').contains('React Tasks');
    cy.contains('React Tasks');

    cy.get('h1').should('have.length', 2);


  });
})