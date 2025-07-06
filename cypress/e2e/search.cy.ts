describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/search');
  });

  it('should filter movies by search term', () => {
    cy.get('input[placeholder="Search movie..."]', { timeout: 10000 })
      .should('exist')
      .type('Deadpool');

    cy.get('h3', { timeout: 10000 }).should('contain.text', 'Deadpool');
  });

  it('should filter movies by genre', () => {
    cy.contains('Action').click();

    cy.get('h3', { timeout: 10000 }).should(($titles) => {
      expect($titles.length).to.be.greaterThan(0);
    });
  });

  it('should return to home when clicking back', () => {
    cy.contains('← Back').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});