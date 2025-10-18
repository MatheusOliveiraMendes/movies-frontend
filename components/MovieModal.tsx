import { useEffect, useMemo, useState } from 'react';
import { Movie } from '../lib/types';
import { useLanguage } from '../contexts/LanguageContext';

export default function MovieModal({
  movie,
  onClose,
}: {
  movie: Movie;
  onClose: () => void;
}) {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const { t } = useLanguage();
  const availableLanguages = useMemo(
    () => [
      t('common.languageNames.english'),
      t('common.languageNames.portuguese'),
      t('common.languageNames.spanish'),
    ],
    [t],
  );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-10">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#121212]/95 text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
        <div
          className="relative h-64 w-full bg-cover bg-center md:h-[320px]"
          style={{
            backgroundImage: `url(${bannerUrl || `https://movies-backend-093v.onrender.com/images/${movie.img}`})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#121212]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-6 flex flex-col gap-3">
            <span className="w-fit rounded bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3rem]">
              {t('common.newBadge')}
            </span>
            <h2 className="text-3xl font-black md:text-4xl">
              {movie.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-gray-300">
              <span className="rounded bg-white/20 px-2 py-1 font-semibold text-white">
                {t('modal.relevance', {
                  value: Math.round(Number(movie.rate) * 10),
                })}
              </span>
              {movie.length && <span>{movie.length}</span>}
              <span className="rounded border border-white/30 px-2 py-1">
                HD
              </span>
            </div>
          </div>
        </div>

        <button
          className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-2xl transition hover:bg-black/80"
          onClick={onClose}
          aria-label={t('common.close')}
        >
          ✕
        </button>

        <div className="grid gap-8 p-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <p className="text-sm text-gray-200 md:text-base leading-relaxed">
              {movie.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="rounded bg-white/10 px-3 py-1 font-semibold text-white">
                {t('modal.imdbScore', { value: movie.rate })}
              </span>
              <span>
                {t('common.audienceScore', {
                  value: Math.round(Number(movie.rate) * 10),
                })}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.35rem] text-gray-400">
                {t('common.genres')}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-wider text-gray-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
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
              <button className="flex items-center gap-2 rounded-md border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
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
                + {t('common.myList')}
              </button>
            </div>
          </div>

          <aside className="space-y-4 text-sm text-gray-300">
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
                    {availableLanguages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wider text-white"
                      >
                        {language}
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
                    <li key={actor} className="border-b border-white/10 pb-1.5 last:border-none">
                      {actor}
                    </li>
                  )
                )}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
