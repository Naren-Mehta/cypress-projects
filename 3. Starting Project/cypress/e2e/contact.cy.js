/// <reference types="Cypress" />

describe('contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://127.0.0.1:5173/'); 

        // goto about page
        cy.get('[data-cy="header-about-link"]').click()

        // Fill the form
        cy.get('[data-cy="contact-input-message"]').type('This is a test message');
        cy.get('[data-cy="contact-input-name"]').type('Narendra');

        // Submit the form
        // cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
        // cy.get('[data-cy="contact-btn-submit"]').should('not.have.attr', 'disabled');

        // or
        // cy.get('[data-cy="contact-btn-submit"]')
        //   .contains("Send Message")
        //   .and("not.have.attr", "disabled"); // we can use should also

        // or
        cy.get('[data-cy="contact-btn-submit"]').then(el => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message');
        });

        // or
        // cy.get('[data-cy="contact-btn-submit"]')
        //   .contains("Send Message")
        //   .and("not.have.attr", "disabled"); // we can use should also

        // Fill last input field and then click enter
        cy.get('[data-cy="contact-input-email"]').type('narendramehta.singh@gmail.com{enter}');



        // cy.get('[data-cy="contact-btn-submit"]').click();
        // cy.get('[data-cy="contact-btn-submit"]').contains('Sending...');
        
        // // cy.get('[data-cy="contact-btn-submit"]').should('be.disabled', true);
        // // or
        // cy.get('[data-cy="contact-btn-submit"]').should('have.attr', 'disabled');


        // ===========We can create a variable to for button===========
        // const submitBtn = cy.get('[data-cy="contact-btn-submit"]')
        // submitBtn.click();
        // submitBtn.contains('Sending...');
        
        // // submitBtn.should('be.disabled', true);
        // // or
        // submitBtn.should('have.attr', 'disabled');



        // ========Best way to create a alias=========
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        // cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('have.attr', 'disabled');

    })
})