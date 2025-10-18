import { useEffect, useMemo, useState } from 'react';
import type { GetStaticProps } from 'next';
import useSWR from 'swr';
import { fetchMovies } from '../lib/api';
import { Movie } from '../lib/types';
import HeroBanner from '../components/HeroBanner';
import MovieCarousel from '../components/MovieCarousel';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import { useLanguage } from '../contexts/LanguageContext';

type HomeProps = {
  initialMovies: Movie[];
};

const REVALIDATE_SECONDS = 60;

export default function Home({ initialMovies }: HomeProps) {
  const { t } = useLanguage();
  const { data: movies = [], error } = useSWR<Movie[]>(
    'movies',
    () => fetchMovies(),
    {
      fallbackData: initialMovies,
      revalidateOnFocus: true,
    }
  );

  const [selectedId, setSelectedId] = useState<number | null>(
    initialMovies[0]?.id ?? null
  );

  useEffect(() => {
    if (!movies.length) {
      if (selectedId !== null) {
        setSelectedId(null);
      }
      return;
    }

    if (!selectedId || !movies.some((movie) => movie.id === selectedId)) {
      setSelectedId(movies[0].id);
    }
  }, [movies, selectedId]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return movies.find((movie) => movie.id === selectedId) ?? null;
  }, [movies, selectedId]);

  if (!selected) {
    if (error) {
      return (
        <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
          <p>{t('common.errorMovies')}</p>
        </main>
      );
    }
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <HeroBanner movie={selected}>
        {[<Header key="header" />]}
      </HeroBanner>
      <MovieCarousel
        movies={movies}
        onSelect={(movie) => setSelectedId(movie.id)}
        selectedId={selected.id}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const movies = await fetchMovies();

    return {
      props: { initialMovies: movies },
      revalidate: REVALIDATE_SECONDS,
    };
  } catch (error) {
    console.error('Erro ao gerar a Home estaticamente:', error);
    return {
      props: { initialMovies: [] },
      revalidate: REVALIDATE_SECONDS,
    };
  }
};
