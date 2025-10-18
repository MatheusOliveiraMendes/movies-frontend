import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';
import useSWR from 'swr';
import Header from '../components/Header';
import { fetchMovies } from '../lib/api';
import { Movie } from '../lib/types';
import { useLanguage } from '../contexts/LanguageContext';

type SearchPageProps = {
  initialMovies: Movie[];
};

const REVALIDATE_SECONDS = 60;

export default function SearchPage({ initialMovies }: SearchPageProps) {
  const { data: movies = [], error } = useSWR<Movie[]>(
    'movies',
    () => fetchMovies(),
    {
      fallbackData: initialMovies,
      revalidateOnFocus: true,
    }
  );
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [query, setQuery] = useState('');

  const router = useRouter();
  const { t } = useLanguage();

  const genres = useMemo(() => {
    const unique = new Set<string>();
    movies.forEach((movie) => {
      movie.genres.forEach((genre) => unique.add(genre));
    });
    return ['All', ...Array.from(unique).sort()];
  }, [movies]);

  const filtered = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre =
        selectedGenre === 'All' || movie.genres.includes(selectedGenre);
      const matchesQuery = movie.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesGenre && matchesQuery;
    });
  }, [movies, query, selectedGenre]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f0f] text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/30 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-700/20 blur-[140px]" />

      <Header />

      <section className="relative z-10 px-6 pt-32 pb-16 md:px-14 md:pt-40 lg:px-24">
        <div className="max-w-4xl">
          <button
            onClick={() => router.push('/')}
            className="text-sm font-semibold uppercase tracking-widest text-gray-300 transition hover:text-white"
          >
            ← {t('common.backHome')}
          </button>
          <h1 className="mt-6 text-3xl font-black md:text-5xl">
            {t('searchPage.heading')}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-gray-300 md:text-base">
            {t('searchPage.description')}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-[0.3rem] text-gray-400">
              {t('searchPage.searchLabel')}
            </label>
            <input
              type="text"
              placeholder={t('searchPage.placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full max-w-3xl rounded-md border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-gray-400 transition focus:border-white focus:outline-none focus:ring-2 focus:ring-red-500/60"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-gray-400">
              {t('searchPage.genresLabel')}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    selectedGenre === genre
                      ? 'bg-white text-black shadow-[0_12px_40px_rgba(255,255,255,0.18)]'
                      : 'border border-white/15 text-gray-300 hover:border-white/40 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre === 'All'
                    ? t('common.all')
                    : genre.charAt(0).toUpperCase() + genre.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="rounded border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
              {t('searchPage.error')}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              onClick={() => router.push(`/movies/${movie.id}`)}
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <div className="absolute inset-0 rounded-2xl border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <img
                  src={`https://movies-backend-093v.onrender.com/images/${movie.img}`}
                  alt={movie.name}
                  className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-200">
                  <span className="rounded-full bg-red-600/90 px-3 py-0.5 text-[10px] shadow-lg">
                    {Math.round(Number(movie.rate) * 10)}
                  </span>
                  <span className="rounded-full bg-black/60 px-3 py-0.5 text-[10px]">
                    {t('common.imdb')} {movie.rate}
                  </span>
                </div>
              </div>

              <div className="space-y-2 px-4 py-5">
                <h3 className="truncate text-lg font-semibold text-white">
                  {movie.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  {(movie.genres || []).slice(0, 3).join(' • ')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!filtered.length && (
          <p className="mt-16 text-center text-sm text-gray-400">
            {t('common.noResults')}
          </p>
        )}
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
  try {
    const movies = await fetchMovies();

    return {
      props: { initialMovies: movies },
      revalidate: REVALIDATE_SECONDS,
    };
  } catch (error) {
    console.error('Erro ao gerar página de busca estaticamente:', error);
    return {
      props: { initialMovies: [] },
      revalidate: REVALIDATE_SECONDS,
    };
  }
};
