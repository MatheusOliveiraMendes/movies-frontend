import Header from '../../components/Header';

describe('<Header />', () => {
  it('should render logo and menu', () => {
    cy.mount(<Header />);
    cy.get('header').should('exist');
    cy.contains('Movies');
  });
});