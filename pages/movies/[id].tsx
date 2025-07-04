import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchMovieById } from '../../lib/api';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovieAndBackdrop() {
      if (!id) return;

      const data = await fetchMovieById(Number(id));
      setMovie(data);

      // Busca da imagem no TMDb
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=08e35b932690010e03e30fe284d07672&query=${encodeURIComponent(data.name)}`
      );
      const tmdbData = await tmdbRes.json();

      const result = tmdbData.results?.[0];
      if (result?.backdrop_path || result?.poster_path) {
        const path = result.backdrop_path || result.poster_path;
        setBackgroundUrl(`https://image.tmdb.org/t/p/original${path}`);
      }
    }

    loadMovieAndBackdrop();
  }, [id]);

  if (!movie) return <p className="text-white p-4">Loading...</p>;

  return (
    <main
      className="relative min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: `url("${backgroundUrl || `http://localhost:3001/images/${movie.img}`}")`,
      }}
    >
      {/* Overlay escura */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />

      <div className="relative z-10 p-6 max-w-4xl mx-auto flex flex-col gap-4">
        <button
          onClick={() => router.back()}
          className="text-teal-400 text-sm hover:underline w-fit"
        >
          ← Back 
        </button>

        <h1 className="text-4xl font-bold">{movie.name}</h1>

        <p className="text-gray-300">{movie.description}</p>

        <div className="flex gap-6 text-sm text-gray-400">
          <span><strong>Genres:</strong> {movie.genres.join(', ')}</span>
          <span><strong>Rate:</strong> {movie.rate}/10</span>
          <span><strong>Length:</strong> {movie.length}</span>
        </div>

        <img
          src={`http://localhost:3001/images/${movie.img}`}
          alt={movie.name}
          className="mt-6 rounded-lg max-w-xs shadow-xl"
        />
      </div>
    </main>
  );
}