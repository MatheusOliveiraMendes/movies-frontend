import { Movie } from '../lib/types';

export default function MovieCarousel({
  movies,
  onSelect,
  selectedId
}: {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  selectedId: number;
}) {
  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex gap-4 w-max px-4 pb-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-32 cursor-pointer group"
            onClick={() => onSelect(movie)}
          >
            <img
              src={`http://localhost:3001/images/${movie.img}`}
              alt={movie.name}
              className={`w-full h-48 object-cover rounded transition-transform duration-300
                group-hover:scale-110
                ${movie.id === selectedId ? 'scale-110' : ''}
              `}
            />
            <p className={`text-center mt-5 text-sm ${
              movie.id === selectedId ? 'text-white font-semibold' : 'text-gray-400'
            }`}>
              {movie.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}