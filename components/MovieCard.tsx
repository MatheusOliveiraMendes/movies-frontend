import Link from 'next/link';

export default function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movies/${movie.id}`} className="block p-4 border rounded hover:shadow">
      <img
        src={`http://localhost:3001/images/${movie.img}`}
        alt={movie.name}
        className="mb-2 w-full h-64 object-cover"
      />
      <h2 className="text-xl font-semibold">{movie.name}</h2>
      <p className="text-sm">{movie.genres.join(', ')}</p>
    </Link>
  );
}
