/// <reference types="cypress" />

describe("share location", () => {
  beforeEach(() => {
    cy.clock();
    
    // Load constand values from files cypress/fixtures/user-location.json
    cy.fixture('user-location.json').as('userLocation');

    cy.visit("/").then((win) => {
      cy.get('@userLocation').then(fakePosition => {
        cy.stub(win.navigator.geolocation, "getCurrentPosition")
        .as("getUserPosition")
        .callsFake((cb) => {
          setTimeout(() => {
            cb(fakePosition);
          }, 100);
        });
      })

      cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves();

      cy.spy(win.localStorage, 'setItem').as('storeLocation');
      cy.spy(win.localStorage, 'getItem').as('getStoreLocation');
    });
  });

  it("should fetch the user location", () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getUserPosition").should("have.been.called");
    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').should("contain", "Location fetched!");
  });

  it("should share a location url", () => {
    cy.get('[data-cy="name-input"]').type("Naren");
    cy.get('[data-cy="share-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="actions"]').should("contain", "Location fetched!");
    cy.get('[data-cy="share-loc-btn"]').should("be.enabled");

    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@saveToClipboard").should("have.been.called");

    cy.get('@userLocation').then(fakePosition => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get("@saveToClipboard").should("have.been.calledWithMatch", new RegExp(`${latitude}.*${longitude }.*${'Naren'}`));

      cy.get("@storeLocation").should("have.been.calledWithMatch", /Naren/, new RegExp(`${latitude}.*${longitude }.*${'Naren'}`));

    });

    cy.get('@storeLocation').should('have.been.called');

    cy.get('[data-cy="share-loc-btn"]').should("be.enabled");
    cy.get('@getStoreLocation').should('have.been.called');
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', 'visible');
  
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');


  });
});
