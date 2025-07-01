import { useState } from 'react';

export default function Header() {
  const [active, setActive] = useState('Tv Shows');

  return (
    <header className="flex justify-between items-center px-8 py-4  text-white">
      <div className="text-2xl font-bold">
        <span className="text-teal-400">Movies</span>
      </div>
      <nav className="flex gap-6 text-sm">
        {['Home', 'Tv Shows', 'Movies', 'Series'].map((item) => (
          <button
            key={item}
            className={`hover:text-teal-400 transition ${
              active === item ? 'text-teal-400 font-semibold' : 'text-white'
            }`}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="text-xl cursor-pointer hover:text-teal-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </header>
  );
}