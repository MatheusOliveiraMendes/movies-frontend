import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMovies } from '../lib/api';
import { Movie } from '../lib/types';

export default function SearchPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filtered, setFiltered] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>('All');
    const [query, setQuery] = useState('');

    const router = useRouter();

    useEffect(() => {
        fetchMovies().then((data) => {
            setMovies(data);
            setFiltered(data);
            const allGenres = Array.from(
                new Set(data.flatMap((m) => m.genres as string[]))
            ).sort();
            setGenres(['All', ...(allGenres as string[])]);
        });
    }, []);

    useEffect(() => {
        let results = movies;

        if (selectedGenre !== 'All') {
            results = results.filter((movie) =>
                movie.genres.includes(selectedGenre)
            );
        }

        if (query) {
            results = results.filter((movie) =>
                movie.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        setFiltered(results);
    }, [query, selectedGenre, movies]);

    return (
        <main className="min-h-screen bg-gray-950 text-white p-6">
            {router.pathname === '/search' ? (
                <button
                    onClick={() => router.push('/')}
                    className="text-sm text-teal-400 hover:underline"
                >
                    ← Back
                </button>
            ) : (
                <div
                    className="text-2xl font-bold text-teal-400 cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    Movies
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Search & Filter Movies</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full max-w-md bg-gray-800 px-4 py-2 rounded focus:outline-none mb-4"
            />

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className={`px-4 py-1 rounded-full border text-sm transition
      ${selectedGenre === genre
                            ? 'bg-teal-500 text-white border-teal-500'
                            : 'text-gray-300 border-gray-600 hover:bg-gray-800'}`}
                        onClick={() => setSelectedGenre(genre)}
                    >
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </button>
                ))}
            </div>

            {/* Movie List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filtered.map((movie) => (
                    <div
                        key={movie.id}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => router.push(`/movie/${movie.id}`)}
                    >
                        <img
                            src={`http://localhost:3001/images/${movie.img}`}
                            alt={movie.name}
                            className="w-full h-48 object-cover rounded mb-2"
                        />
                        <h3 className="text-sm text-center">{movie.name}</h3>
                    </div>
                ))}
            </div>
        </main>
    );
}
