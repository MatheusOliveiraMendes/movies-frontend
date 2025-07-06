import MovieModal from '../../components/MovieModal';
import { Movie } from '../../lib/types';

const mockMovie: Movie = {
  id: 1,
  name: 'Deadpool',
  img: 'deadpool.jpg',
  genres: ['Action', 'Comedy'],
  rate: '7.9',
  length: '1hr 48mins',
  description: 'Funny and violent superhero movie.',
  key: 'deadpool-001',
};

describe('<MovieModal />', () => {
  it('renders movie details', () => {
    cy.mount(<MovieModal movie={mockMovie} onClose={() => {}} />);
    cy.contains(mockMovie.name);
    cy.contains(mockMovie.description);
    cy.get('button').click(); // Fecha o modal
  });
});