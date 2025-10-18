import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../lib/translations';

export default function Header() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, []);

  const navItems = useMemo(
    () => [
      { key: 'home', label: t('header.nav.home'), path: '/' },
      { key: 'series', label: t('header.nav.series') },
      { key: 'movies', label: t('header.nav.movies'), path: '/movies' },
      { key: 'newPopular', label: t('header.nav.newPopular') },
      { key: 'myList', label: t('header.nav.myList') },
    ],
    [t],
  );

  const languageOptions = useMemo(
    () => [
      {
        code: 'pt' as Language,
        short: 'PT',
        label: t('common.languageNames.portuguese'),
      },
      {
        code: 'en' as Language,
        short: 'EN',
        label: t('common.languageNames.english'),
      },
      {
        code: 'es' as Language,
        short: 'ES',
        label: t('common.languageNames.spanish'),
      },
    ],
    [t],
  );

  function handleNavigation(item: (typeof navItems)[number]) {
    setActive(item.key);
    if (item.path) {
      router.push(item.path);
    }
    setMenuOpen(false);
    setIsLanguageMenuOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 px-4 md:px-10 lg:px-16 py-4 transition-colors duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between text-white">
        <div className="text-2xl font-black tracking-wide text-white">
          <span className="text-red-600">M</span>
          {t('brand').slice(1)}
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive =
              active === item.key ||
              (item.path && router.pathname.startsWith(item.path));
            return (
              <button
                key={item.key}
                className={`uppercase tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white/90'
                }`}
                onClick={() => handleNavigation(item)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <button
            onClick={() => router.push('/search')}
            className="text-lg text-gray-200 transition hover:text-white"
            aria-label={t('common.search')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line
                x1="16.65"
                y1="16.65"
                x2="21"
                y2="21"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <span className="text-gray-300 hover:text-white cursor-pointer transition">
            {t('common.kids')}
          </span>

          <button
            className="text-gray-200 transition hover:text-white"
            aria-label={t('common.notifications')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
              />
            </svg>
          </button>

          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-red-600 via-red-500 to-red-400 flex items-center justify-center text-sm font-semibold">
            M
          </div>

          <div className="relative flex items-center gap-2" ref={languageMenuRef}>
            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-semibold uppercase text-gray-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-haspopup="listbox"
              aria-expanded={isLanguageMenuOpen}
              aria-label={t('header.language')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-gray-300"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Zm0 0c2.5 0 4.5-4.03 4.5-9S14.5 3 12 3 7.5 7.03 7.5 12 9.5 21 12 21Zm0 0c3.314 0 6-4.03 6-9s-2.686-9-6-9-6 4.03-6 9 2.686 9 6 9Zm-9-9h18"
                />
              </svg>
              <span className="tracking-widest text-sm">
                {
                  languageOptions.find((option) => option.code === language)
                    ?.short
                }
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0l-4.24-4.24a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 top-9 w-40 rounded-xl border border-white/10 bg-black/90 p-2 shadow-xl">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                      option.code === language
                        ? 'bg-white/20 text-white'
                        : 'text-gray-200 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setLanguage(option.code);
                      setIsLanguageMenuOpen(false);
                    }}
                  >
                    <span className="font-semibold uppercase">{option.short}</span>
                    <span className="text-xs text-gray-300">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => router.push('/search')}
            className="text-2xl hover:text-white"
            aria-label={t('common.search')}
          >
            🔍
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl hover:text-white focus:outline-none"
            aria-label={t('common.menu')}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute inset-x-4 mt-4 space-y-4 rounded-lg border border-white/10 bg-black/85 p-4 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`block w-full text-left py-2 text-sm uppercase tracking-wide transition-colors ${
                active === item.key ? 'text-white' : 'text-gray-300'
              }`}
              onClick={() => handleNavigation(item)}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center justify-center gap-2 px-3 py-2">
            <div className="flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-gray-200"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Zm0 0c2.5 0 4.5-4.03 4.5-9S14.5 3 12 3 7.5 7.03 7.5 12 9.5 21 12 21Zm0 0c3.314 0 6-4.03 6-9s-2.686-9-6-9-6 4.03-6 9 2.686 9 6 9Zm-9-9h18"
                />
              </svg>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  className={`px-2 py-1 text-xs font-semibold uppercase transition ${
                    option.code === language
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => {
                    setLanguage(option.code);
                    setMenuOpen(false);
                  }}
                >
                  {option.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
