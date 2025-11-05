import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { Movie } from '../lib/types';
import MovieModal from './MovieModal';
import { useLanguage } from '../contexts/LanguageContext';

const TMDB_API_KEY = '08e35b932690010e03e30fe284d07672';

export default function HeroBanner({
  movie,
  children,
}: {
  movie: Movie;
  children?: ReactNode[];
}) {
  const fallbackUrl = useMemo(
    () => `https://movies-backend-093v.onrender.com/images/${movie.img}`,
    [movie.img]
  );
  const [backgroundUrl, setBackgroundUrl] = useState<string>(fallbackUrl);
  const backgroundCache = useRef<Map<number, string>>(new Map());
  const [showModal, setShowModal] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const cached = backgroundCache.current.get(movie.id);
    if (cached) {
      setBackgroundUrl(cached);
      return;
    }

    setBackgroundUrl(fallbackUrl);

    const controller = new AbortController();
    let isMounted = true;

    async function fetchBackground() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            movie.name
          )}`,
          { signal: controller.signal, cache: 'force-cache' }
        );

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        const path = data?.results?.[0]?.backdrop_path ?? data?.results?.[0]?.poster_path;

        if (path) {
          const optimizedUrl = `https://image.tmdb.org/t/p/original${path}`;
          backgroundCache.current.set(movie.id, optimizedUrl);
          if (isMounted) {
            setBackgroundUrl(optimizedUrl);
          }
        } else {
          backgroundCache.current.set(movie.id, fallbackUrl);
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    fetchBackground();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [fallbackUrl, movie.id, movie.name]);

  function renderStars(rate: number) {
    const stars = [];
    const rating = Math.round(rate) / 2;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${i <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-500'}`}
        >
          {i <= Math.floor(rating) ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  }

  return (
    <section
      className="relative min-h-[90vh] overflow-hidden bg-cover bg-center text-white"
    >
      <Image
        src={backgroundUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10 md:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />

      <div className="relative z-10 flex h-full flex-col px-6 pt-28 pb-20 md:px-14 lg:px-24 lg:pt-36">
        <div className="absolute inset-x-0 top-0">
          {children && Array.isArray(children) && children[0]}
        </div>

        <div className="mt-auto max-w-2xl lg:max-w-3xl space-y-6 -translate-y-8 sm:-translate-y-12 lg:-translate-y-16">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3rem] text-gray-300">
            <div className="flex items-center gap-2 text-red-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-red-600 font-semibold text-white">
                M
              </span>
              {t('common.originalBadge')}
            </div>
            <span className="hidden sm:block text-gray-300">
              {t('hero.top10')}
            </span>
          </div>

          <h1 className="text-4xl font-black drop-shadow-md md:text-6xl lg:text-4xl">
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
                <span className="text-white/70">{t('hero.durationLabel')}</span>{' '}
                {movie.length}
              </span>
            )}
            <div className="flex items-center gap-2 text-yellow-400">
              {renderStars(Number(movie.rate))}
              <span className="text-xs text-gray-200">
                {movie.rate}/10 {t('common.imdb')}
              </span>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-gray-200 md:text-base">
            {movie.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
            {movie.genres.map((g, i) => (
              <span
                key={i}
                className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-wider text-xs"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-md bg-white px-6 py-2 font-semibold text-black transition hover:bg-white/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4l16 8-16 8z" />
              </svg>
              {t('common.watch')}
            </button>

            <button
              className="flex items-center gap-2 rounded-md bg-white/20 px-6 py-2 font-semibold text-white transition hover:bg-white/30"
              onClick={() => setShowModal(true)}
            >
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {t('common.moreInfo')}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
}
