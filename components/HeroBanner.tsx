import { useEffect, useState, ReactNode } from 'react';
import { Movie } from '../lib/types';

export default function HeroBanner({
  movie,
  children,
}: {
  movie: Movie;
  children?: ReactNode[];
}) {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBackground() {
      const apiKey = '08e35b932690010e03e30fe284d07672';
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          movie.name
        )}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const path = result.backdrop_path || result.poster_path;
        if (path) {
          setBackgroundUrl(`https://image.tmdb.org/t/p/original${path}`);
        }
      }
    }
    fetchBackground();
  }, [movie.name]);

  function renderStars(rate: number) {
    const stars = [];
    const rating = Math.round(rate) / 2;
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i}>{i <= Math.floor(rating) ? '★' : '☆'}</span>);
    }
    return stars;
  }

  return (
    <section
      className="relative text-white h-[100vh] flex flex-col justify-between bg-cover bg-center px-8 py-6"
      style={{
        backgroundImage: `url("${backgroundUrl || `http://localhost:3001/images/${movie.img}`}")`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/100 via-black/60 to-transparent z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <div>{children && Array.isArray(children) && children[0]}</div>

        <div className="flex-1 flex items-center">
          <div className="max-w-2xl w-full">
            <h1 className="text-5xl font-bold">{movie.name}</h1>
            <p className="mt-2 text-lg text-gray-300">
              Movie
              {movie.length && (
                <span className="ml-4 text-base text-gray-400">⏱ {movie.length}</span>
              )}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-yellow-400 text-lg">{renderStars(Number(movie.rate))}</div>
              <span className="text-gray-300 text-sm">{movie.rate}/10</span>
            </div>
            <div className="mt-2 text-sm text-gray-300 flex gap-4">
              {movie.genres.map((g, i) => (
                <span key={i}>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-200 leading-relaxed">
              {movie.description}
            </p>
            <div className="mt-6 flex gap-4">
              <button className="bg-teal-500 px-5 py-2 rounded text-white font-semibold">▶ Play</button>
              <button className="bg-teal-700 px-5 py-2 rounded text-white font-semibold">＋ Add</button>
            </div>
          </div>
        </div>

        {/* Carousel (opcional) */}
        <div className="w-full mt-4">{children && Array.isArray(children) && children[1]}</div>
      </div>
    </section>
  );
}