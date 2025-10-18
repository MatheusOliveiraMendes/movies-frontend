import { useEffect, useMemo, useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Header from '../../components/Header';
import { fetchMovieById, fetchMovies } from '../../lib/api';
import { Movie } from '../../lib/types';
import { useLanguage } from '../../contexts/LanguageContext';

type MovieDetailProps = {
  initialMovie: Movie;
};

const REVALIDATE_SECONDS = 60;

export default function MovieDetail({ initialMovie }: MovieDetailProps) {
  const router = useRouter();
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const { t } = useLanguage();
  const availableLanguages = useMemo(
    () => [
      t('common.languageNames.english'),
      t('common.languageNames.portuguese'),
      t('common.languageNames.spanish'),
    ],
    [t],
  );

  const movieId = (() => {
    if (typeof router.query.id === 'string') {
      return Number(router.query.id);
    }
    return initialMovie?.id;
  })();

  const { data: movie, error } = useSWR<Movie>(
    movieId ? ['movie', movieId] : null,
    ([, id]) => fetchMovieById(Number(id)),
    {
      fallbackData: initialMovie,
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    async function loadBackdrop(currentMovie: Movie | undefined) {
      if (!currentMovie) return;

      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=08e35b932690010e03e30fe284d07672&query=${encodeURIComponent(
          currentMovie.name
        )}`
      );
      const tmdbData = await tmdbRes.json();

      const result = tmdbData.results?.[0];
      if (result?.backdrop_path || result?.poster_path) {
        const path = result.backdrop_path || result.poster_path;
        setBackgroundUrl(`https://image.tmdb.org/t/p/original${path}`);
      } else {
        setBackgroundUrl(null);
      }
    }

    loadBackdrop(movie);
  }, [movie?.name]);

  if (router.isFallback) {
    return <p className="text-white p-4">{t('common.loading')}</p>;
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>{t('common.errorMovie')}</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${
            backgroundUrl ||
            `https://movies-backend-093v.onrender.com/images/${movie.img}`
          }")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-[#0f0f0f]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute -top-32 right-10 h-96 w-96 rounded-full bg-red-600/25 blur-[160px]" />

      <Header />

      <section className="relative z-10 px-6 pt-32 pb-16 md:px-14 md:pt-40 lg:px-24">
        <button
          onClick={() => router.back()}
          className="text-xs font-semibold uppercase tracking-[0.4rem] text-gray-300 transition hover:text-white"
        >
          ← {t('common.backDetail')}
        </button>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35rem] text-gray-300">
                <span className="rounded-sm bg-red-600 px-2 py-1 text-[10px] font-bold text-white">
                  {t('brand')} {t('common.originalBadge')}
                </span>
                <span>{t('movieDetail.top')}</span>
              </div>

              <h1 className="text-4xl font-black drop-shadow md:text-6xl">
                {movie.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
                <span className="rounded bg-white/20 px-2 py-1 font-semibold text-white">
                  {Number(movie.rate) >= 7
                    ? t('common.fansFavorite')
                    : t('common.highlight')}
                </span>
                {movie.length && (
                  <span className="flex items-center gap-2 text-gray-200">
                    <span className="text-white/70">{t('hero.durationLabel')}</span>
                    {movie.length}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <span className="rounded bg-yellow-400/20 px-2 py-1 text-xs font-bold text-yellow-300">
                    {t('common.imdb')} {movie.rate}
                  </span>
                  <span className="text-xs text-gray-300">
                    {t('common.relevance', {
                      value: Math.round(Number(movie.rate) * 10),
                    })}
                  </span>
                </span>
              </div>
            </div>

            <p className="max-w-2xl text-base text-gray-200 leading-relaxed">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-gray-300">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/15 px-3 py-1"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button className="flex items-center gap-2 rounded-md bg-white px-6 py-2 font-semibold text-black transition hover:bg-white/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 4l16 8-16 8z" />
                </svg>
                {t('common.watchNow')}
              </button>
              <button className="flex items-center gap-2 rounded-md border border-white/30 px-6 py-2 font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                {t('common.trailer')}
              </button>
              <button className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">
                + {t('movieDetail.listButton')}
              </button>
            </div>
          </div>

          <div className="flex w-full items-center justify-center lg:w-auto">
            <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
              <img
                src={`https://movies-backend-093v.onrender.com/images/${movie.img}`}
                alt={movie.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />
              <div className="absolute bottom-4 left-1/2 w-11 -translate-x-1/2 rounded-full bg-red-600/90 p-3 text-center text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                16+
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 text-sm text-gray-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.35rem] text-gray-400">
                {t('common.additionalInfo')}
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">
                    {t('common.classification')}:
                  </span>{' '}
                  <span className="font-semibold text-white">16+</span>
                </p>
                {movie.length && (
                  <p>
                    <span className="text-gray-400">
                      {t('common.duration')}:
                    </span>{' '}
                    {movie.length}
                  </p>
                )}
                <div>
                  <span className="text-gray-400">
                    {t('common.languages')}:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {availableLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wider text-white"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.35rem] text-gray-400">
                {t('common.cast')}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-200">
                {['Scarlett Johansson', 'Chris Evans', 'Morgan Freeman'].map(
                  (actor) => (
                    <li
                      key={actor}
                      className="border-b border-white/10 pb-1.5 last:border-none"
                    >
                      {actor}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const movies = await fetchMovies();
    const paths = movies.map((movie) => ({
      params: { id: movie.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Erro ao gerar caminhos estáticos para filmes:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<MovieDetailProps> = async ({
  params,
}) => {
  const idParam = params?.id;
  const id =
    typeof idParam === 'string'
      ? Number(idParam)
      : Array.isArray(idParam)
      ? Number(idParam[0])
      : NaN;

  if (!id || Number.isNaN(id)) {
    return { notFound: true };
  }

  try {
    const movie = await fetchMovieById(id);

    return {
      props: { initialMovie: movie },
      revalidate: REVALIDATE_SECONDS,
    };
  } catch (error) {
    console.error(`Erro ao gerar página estática para o filme ${id}:`, error);
    return {
      notFound: true,
    };
  }
};
