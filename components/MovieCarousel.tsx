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
    <div className="overflow-x-auto hide-scrollbar">
      <div className="flex gap-4 w-max px-4 pb-6">
        {movies.map((movie) => {
          const isSelected = movie.id === selectedId;

          return (
            <div
              key={movie.id}
              className="w-32 cursor-pointer group"
              onClick={() => onSelect(movie)}
            >
              <img
                src={`http://localhost:3001/images/${movie.img}`}
                alt={movie.name}
                loading="lazy"
                className={`w-full h-48 object-cover rounded transition-transform duration-300
                  ${isSelected ? 'scale-110' : 'scale-100 group-hover:scale-110'}
                `}
              />
              <p
                className={`text-center mt-3 text-sm transition-colors duration-200 ${
                  isSelected
                    ? 'text-gray-200 font-semibold'
                    : 'text-white group-hover:text-white'
                }`}
              >
                {movie.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}