import HeroBanner from '../../components/HeroBanner';

const movie = {
  id: 1,
  key: 'deadpool-1', 
  name: 'Deadpool',
  description: 'A smart-ass mercenary',
  genres: ['Action', 'Comedy'],
  rate: '7.9', 
  length: '1hr 48mins',
  img: 'deadpool.jpg',
};

describe('<HeroBanner />', () => {
  it('renders movie data', () => {
    cy.mount(<HeroBanner movie={movie}>{[]}</HeroBanner>);
    cy.contains('Deadpool');
    cy.contains('A smart-ass mercenary');
  });
});