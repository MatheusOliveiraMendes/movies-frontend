import { useEffect, useState } from 'react';
import { fetchMovies } from '../lib/api';
import { Movie } from '../lib/types';
import HeroBanner from '../components/HeroBanner';
import MovieCarousel from '../components/MovieCarousel';
import Header from '../components/Header';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data);
      setSelected(data[0]);
    });
  }, []);

  if (!selected) return <p className="text-white p-4">Loading...</p>;

  return (
    <main className="bg-gray-950 min-h-screen text-white">
      <Header />
      <HeroBanner movie={selected} />
      <h2 className="text-xl font-bold mt-6 px-4">More Movies</h2>
      <MovieCarousel
        movies={movies}
        onSelect={setSelected}
        selectedId={selected.id}
      />
    </main>
  );
}
