import { useEffect, useState } from 'react';
import { Movie } from '../lib/types';

export default function MovieModal({
  movie,
  onClose,
}: {
  movie: Movie;
  onClose: () => void;
}) {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBackdrop() {
      const apiKey = '08e35b932690010e03e30fe284d07672';
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie.name)}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const path = data.results[0].backdrop_path || data.results[0].poster_path;
        if (path) {
          setBannerUrl(`https://image.tmdb.org/t/p/w780${path}`);
        }
      }
    }

    fetchBackdrop();
  }, [movie.name]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden max-w-3xl w-full relative text-white shadow-2xl">

        {/* Imagem do banner */}
        <div className="h-56 md:h-72 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerUrl || `https://movies-backend-093v.onrender.com/images/${movie.img}`})`,
          }}
        />

        {/* Botão de fechar - fora da imagem */}
        <button
          className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center z-20"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Conteúdo */}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{movie.name}</h2>
          <p className="text-sm text-gray-400 mb-4">{movie.genres.join(', ')}</p>
          <p className="text-gray-300 mb-4 leading-relaxed">{movie.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span><strong>Rate:</strong> {movie.rate}/10</span>
            <span><strong>Length:</strong> {movie.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}