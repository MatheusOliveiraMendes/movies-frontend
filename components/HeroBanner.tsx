import { Movie } from '../lib/types';

export default function HeroBanner({ movie }: { movie: Movie }) {
  return (
    <section className="relative text-white h-[65vh] overflow-hidden flex">
      <div className="px-8 py-10 max-w-4xl z-10 flex flex-col justify-center w-1/2">
        <h1 className="text-5xl font-bold">{movie.name}</h1>
        <p className="mt-2 text-lg text-gray-300">Season 1</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="text-yellow-400 text-lg">★★★★☆</div>
        </div>
        <div className="mt-2 text-sm text-gray-300 flex gap-4">
          {movie.genres.map((g, i) => (
            <span key={i}>{g}</span>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-200 leading-relaxed">
          {movie.description}
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-teal-500 px-5 py-2 rounded text-white font-semibold">▶ Play</button>
          <button className="bg-teal-700 px-5 py-2 rounded text-white font-semibold">＋ Add</button>
        </div>
      </div>
      <div className="w-1/2 h-full ">
        <img
          src={`http://localhost:3001/images/${movie.img}`}
          alt={movie.name}
          className="w-full h-full opacity-40"
        />
      </div>
    </section>
  );
}