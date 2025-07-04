import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [active, setActive] = useState('Movies');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = ['Movies', 'Series', 'Tv Shows'];

  return (
    <header className="text-white px-4 md:px-8 py-4 relative z-20">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-400">Movies</div>

        <nav className="hidden md:flex gap-6 text-sm">
          {navItems.map((item) => (
            <button
              key={item}
              className={`hover:text-teal-400 transition ${active === item ? 'text-teal-400 font-semibold' : 'text-white'
                }`}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/search')}
            className="text-xl cursor-pointer hover:text-teal-400"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl hover:text-teal-400"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center gap-4">
          {navItems.map((item) => (
            <button
              key={item}
              className={`text-center hover:text-teal-400 ${active === item ? 'text-teal-400 font-semibold' : 'text-white'
                }`}
              onClick={() => {
                setActive(item);
                setMenuOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}