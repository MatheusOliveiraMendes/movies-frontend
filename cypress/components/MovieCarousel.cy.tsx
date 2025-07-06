import MovieCarousel from '../../components/MovieCarousel';

const movies = [
  {
    id: 1,
    name: 'Deadpool',
    img: 'deadpool.jpg',
    genres: [],
    rate: '7.9', // Corrigido para string
    length: '1hr 48mins',
    description: '',
    key: ''
  },
  {
    id: 2,
    name: 'Avatar',
    img: 'avatar.jpg',
    genres: [],
    rate: '8.1', // Corrigido para string
    length: '2hr 42mins',
    description: '',
    key: ''
  },
];

describe('<MovieCarousel />', () => {
  it('displays movies and handles selection', () => {
    cy.mount(
      <MovieCarousel
        movies={movies}
        selectedId={1}
        onSelect={() => {}}
      />
    );
    cy.get('img').should('have.length', 2);
    cy.contains('Highlights');
  });
});