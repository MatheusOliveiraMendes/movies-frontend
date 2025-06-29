import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchMovieById } from '../../lib/api';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (id) fetchMovieById(Number(id)).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <main className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">← Back</button>
      <h1 className="text-2xl font-bold mb-2">{movie.name}</h1>
      <p className="mb-2">{movie.description}</p>
      <p className="mb-2">Genres: {movie.genres.join(', ')}</p>
      <p className="mb-2">Rate: {movie.rate}</p>
      <p className="mb-2">Length: {movie.length}</p>
      <img src={`http://localhost:3001/images/${movie.img}`} alt={movie.name} className="mt-4 max-w-sm" />
    </main>
  );
}
