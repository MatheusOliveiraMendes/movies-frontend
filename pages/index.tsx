import { useEffect, useState } from 'react';
import { fetchMovies } from '../lib/api';
import { Movie } from '../lib/types';
import HeroBanner from '../components/HeroBanner';
import MovieCarousel from '../components/MovieCarousel';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen'; 

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMovies();
        setMovies(data);
        setSelected(data[0]);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading || !selected) return <LoadingScreen />; 

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <HeroBanner movie={selected}>
        {[<Header key="header" />]}
      </HeroBanner>
      <MovieCarousel
        movies={movies}
        onSelect={setSelected}
        selectedId={selected.id}
      />
    </main>
  );
}