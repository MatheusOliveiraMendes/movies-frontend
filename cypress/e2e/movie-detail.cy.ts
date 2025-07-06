describe('Movie Detail Pages', () => {
  const movieIds = Array.from({ length: 24 }, (_, i) => i + 1); // IDs 1 to 24

  movieIds.forEach((id) => {
    it(`should display details for movie ID ${id}`, () => {
      cy.visit(`/movies/${id}`, { failOnStatusCode: false });

      cy.get('h1', { timeout: 10000 }).should('exist');
      cy.contains('Genres:').should('exist');
      cy.contains('Rate:').should('exist');
      cy.contains('Length:').should('exist');
    });
  });
});