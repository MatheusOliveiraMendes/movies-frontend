import Image from 'next/image';
import { useRef } from 'react';
import { Movie } from '../lib/types';
import { useLanguage } from '../contexts/LanguageContext';

export default function MovieCarousel({
  movies,
  onSelect,
  selectedId,
}: {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  selectedId: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const isLoading = movies.length === 0;

  const scroll = (offset: number) => {
    if (isLoading) {
      return;
    }
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-20 -mt-40 sm:-mt-48 lg:-mt-52 px-4 pb-12 sm:px-10 lg:px-16">
      <div className="mb-4 mt-8 flex items-center gap-3">
        <span className="h-6 w-1.5 rounded-full bg-red-600" />
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('carousel.title')}
        </h2>
      </div>
      <p className="mb-6 text-sm text-gray-400">
        {t('carousel.subtitle')}
      </p>
      <button
        onClick={() => scroll(-300)}
        className={`hidden sm:flex absolute left-6 top-1/2 z-30 h-24 w-12 -translate-y-1/2 items-center justify-center rounded-r-md bg-black/60 text-3xl text-white shadow-lg transition hover:bg-black/80 ${
          isLoading ? 'cursor-not-allowed opacity-40 hover:bg-black/60' : ''
        }`}
        aria-label={t('common.previous')}
        disabled={isLoading}
      >
        &#8249;
      </button>
      <button
        onClick={() => scroll(300)}
        className={`hidden sm:flex absolute right-6 top-1/2 z-30 h-24 w-12 -translate-y-1/2 items-center justify-center rounded-l-md bg-black/60 text-3xl text-white shadow-lg transition hover:bg-black/80 ${
          isLoading ? 'cursor-not-allowed opacity-40 hover:bg-black/60' : ''
        }`}
        aria-label={t('common.next')}
        disabled={isLoading}
      >
        &#8250;
      </button>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-gray-950 via-gray-950/90 to-transparent sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-gray-950 via-gray-950/90 to-transparent sm:block" />

        <div className="scrollbar-hide flex w-full overflow-x-auto pb-4 pr-2" ref={scrollRef}>
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-10">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="h-9 w-9 animate-spin text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <p className="text-sm text-gray-400">{t('common.loading')}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              {movies.map((movie) => {
                const isSelected = movie.id === selectedId;
                const genresLabel = (movie.genres || [])
                  .slice(0, 2)
                  .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
                  .join(' • ');

                return (
                  <div
                    key={movie.id}
                    className={`group relative w-[160px] flex-shrink-0 cursor-pointer transition-transform duration-300 sm:w-[200px] lg:w-[220px] ${
                      isSelected ? 'scale-[1.03]' : 'hover:-translate-y-1'
                    }`}
                    onClick={() => onSelect(movie)}
                  >
                    <div
                      className={`relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-black/30 transition-all duration-500 ${
                        isSelected
                          ? 'border-white/40 shadow-[0_24px_45px_rgba(0,0,0,0.55)]'
                          : 'group-hover:border-white/30 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]'
                      }`}
                    >
                      <Image
                        src={`https://movies-backend-093v.onrender.com/images/${movie.img}`}
                        alt={movie.name}
                        fill
                        priority={isSelected}
                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 ${
                          isSelected
                            ? 'opacity-80'
                            : 'opacity-0 group-hover:opacity-70'
                        }`}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
                      )}
                    </div>
                    <p
                      className={`mt-3 truncate text-sm font-medium transition ${
                        isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}
                    >
                      {movie.name}
                    </p>
                    {genresLabel && (
                      <span className="mt-1 block text-xs text-gray-400">
                        {genresLabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
