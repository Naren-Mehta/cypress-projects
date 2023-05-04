/// <reference types="Cypress" />

describe('task management', () => {
    it('should open and close the new task modal', () => {
        cy.visit('http://127.0.0.1:5173/');

        //This will click on the Add Task button
        // cy.get('#task-control button').click();

        //==========or===========
        //This will click on the Add Task button
        cy.contains('Add Task').click();

        cy.get('.backdrop').click({ force: true });
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');


        // Close model via clicking cancel button
        cy.contains('Add Task').click();
        cy.get('.actions button').contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should open and close the new task modal via cancel button', () => {
        cy.visit('http://127.0.0.1:5173/');

        //This will click on the Add Task button
        // cy.get('#task-control button').click();

        //==========or===========
        //This will click on the Add Task button
        cy.contains('Add Task').click();

        cy.get('.actions button').contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create a new task ', () => {
        cy.visit('http://127.0.0.1:5173/');

        cy.contains('Add Task').click();
        cy.get('#title').type('New Task Title');
        cy.get('#summary').type('New Task Summary');

        // cy.get('.actions button').contains('Add Task').click();
        // or
        cy.get('.modal').contains('Add Task').click();

        // Modal should close
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        // Should get data in list page
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New Task Title');
        cy.get('.task p').contains('New Task Summary');
    });

    it('should validate user input', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.contains('Add Task').click();

        cy.get('.modal').contains('Add Task').click();

        // Modal should not close
        cy.get('.backdrop').should('exist');
        cy.get('.modal').should('exist');

        cy.get('.modal .error-message').contains('Please provide values');
    });

    it('should filter task', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('Test Task Title');
        cy.get('#summary').type('Test Task summary');
        cy.get('#category').select('urgent');

        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);

        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);
        cy.get('p.no-tasks').contains('No tasks found!');

        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 1);
    });

    it('should add multiple tasks', () => {
        cy.visit('http://127.0.0.1:5173/');

        cy.contains('Add Task').click();
        cy.get('#title').type('First Task Title');
        cy.get('#summary').type('First Task Summary');
        cy.get('.modal').contains('Add Task').click();

        cy.contains('Add Task').click();
        cy.get('#title').type('Second Task Title');
        cy.get('#summary').type('Second Task Summary');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();

        cy.get('.task').should('have.length', 2);

        cy.get('#filter').select('low');
        cy.get('.task').should('have.length', 0);
        cy.get('p.no-tasks').contains('No tasks found!');

        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);

        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 1);

        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 2);

        cy.get('.task').eq(0).contains('First Task Title');
        cy.get('.task').eq(1).contains('Second Task Title');
    });
});