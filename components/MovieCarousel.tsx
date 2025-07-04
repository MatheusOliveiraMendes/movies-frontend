import { useRef } from 'react';
import { Movie } from '../lib/types';

export default function MovieCarousel({
  movies,
  onSelect,
  selectedId,
}: {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  selectedId: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-10 lg:-mt-48 px-4 sm:px-6">


      <h2 className="text-2xl font-bold m-8">Highlights</h2>

      <button
        onClick={() => scroll(-300)}
        className="hidden sm:flex items-center justify-center absolute left-0 top-16 h-48 w-10 bg-black/50 text-white rounded-r z-20"
      >
        &#8249;
      </button>
      <button
        onClick={() => scroll(300)}
        className="hidden sm:flex items-center justify-center absolute right-0 top-16 h-48 w-10 bg-black/50 text-white rounded-l z-20"
      >
        &#8250;
      </button>

      <div className="overflow-x-auto pb-2 scrollbar-hide" ref={scrollRef}>
        <div className="flex gap-4 w-max">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-32 flex-shrink-0 cursor-pointer group transition-transform duration-300"
              onClick={() => onSelect(movie)}
            >
              <img
                src={`https://movies-backend-093v.onrender.com/images/${movie.img}`}
                alt={movie.name}
                className={`w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 
                  ${movie.id === selectedId ? 'scale-110' : 'group-hover:scale-95'}`}
              />
              <p
                className={`text-center mt-3 text-sm ${
                  movie.id === selectedId
                    ? 'text-white font-semibold'
                    : 'text-gray-400'
                }`}
              >
                {movie.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}