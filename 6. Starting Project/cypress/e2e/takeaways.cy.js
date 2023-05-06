/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(()=> {
    cy.task('seedDatabase');
  });

  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item" ]').should('have.length', 2);
  });

  it('should add a takeaway', () => {
    cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaway');
    cy.login();

    cy.visit('/takeaways/new');
    cy.get('[data-cy="title"]').click(); 

    cy.get('[data-cy="title"]').type('testtitle1'); 
    cy.get('[data-cy="body"]').type('testbody1'); 
    cy.get('[data-cy="create-takeaway"]').click();

    cy.wait('@createTakeaway').its('request.body').should('match', /testtitle1.*testbody1/);
  });
});