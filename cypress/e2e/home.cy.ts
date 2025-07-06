describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the page and show the header', () => {
    cy.get('header').should('exist');
    cy.get('header').contains('Movies');
  });

  it('should display HeroBanner with movie title', () => {
    cy.get('main h1').should('not.be.empty');
  });

  it('should show carousel with multiple movies', () => {
    cy.get('section').contains('Highlights');
    cy.get('section img').its('length').should('be.greaterThan', 1);
  });

  it('should update banner when clicking on a movie', () => {
    cy.get('main h1').invoke('text').then((initialTitle) => {
      cy.get('section img').eq(1).click();

      cy.get('main h1').should(($h1) => {
        expect($h1.text()).to.not.eq(initialTitle);
      });
    });
  });
});