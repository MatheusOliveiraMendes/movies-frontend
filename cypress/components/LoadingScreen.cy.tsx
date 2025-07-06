import LoadingScreen from '../../components/LoadingScreen';

describe('<LoadingScreen />', () => {
  it('displays loading spinner and text', () => {
    cy.mount(<LoadingScreen />);
    cy.get('svg').should('have.class', 'animate-spin');
    cy.contains('Loading...');
  });
});
