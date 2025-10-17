import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';
import useSWR from 'swr';
import { fetchMovies } from '../lib/api';
import { Movie } from '../lib/types';

type SearchPageProps = {
    initialMovies: Movie[];
};

const REVALIDATE_SECONDS = 60;

export default function SearchPage({ initialMovies }: SearchPageProps) {
    const { data: movies = [], error } = useSWR<Movie[]>(
        'movies',
        () => fetchMovies(),
        {
            fallbackData: initialMovies,
            revalidateOnFocus: true,
        }
    );
    const [selectedGenre, setSelectedGenre] = useState<string>('All');
    const [query, setQuery] = useState('');

    const router = useRouter();

    const genres = useMemo(() => {
        const unique = new Set<string>();
        movies.forEach((movie) => {
            movie.genres.forEach((genre) => unique.add(genre));
        });
        return ['All', ...Array.from(unique).sort()];
    }, [movies]);

    const filtered = useMemo(() => {
        return movies.filter((movie) => {
            const matchesGenre =
                selectedGenre === 'All' || movie.genres.includes(selectedGenre);
            const matchesQuery = movie.name
                .toLowerCase()
                .includes(query.toLowerCase());

            return matchesGenre && matchesQuery;
        });
    }, [movies, query, selectedGenre]);

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

            <input
                type="text"
                placeholder="Search movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full max-w-md bg-gray-800 px-4 py-2 rounded focus:outline-none mb-4"
            />

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

            {error && (
                <p className="text-sm text-red-400 mb-4">
                    Não foi possível atualizar a lista agora. Exibindo últimos dados.
                </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filtered.map((movie) => (
                    <div
                        key={movie.id}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => router.push(`/movies/${movie.id}`)}
                    >
                        <img
                            src={`https://movies-backend-093v.onrender.com/images/${movie.img}`}
                            alt={movie.name}
                            className="w-full h-48 object-cover rounded mb-2"
                        />
                        <h3 className="text-sm text-center">{movie.name}</h3>
                    </div>
                ))}
            </div>

            {!filtered.length && (
                <p className="text-center text-gray-400 mt-8">
                    Nenhum filme encontrado com os filtros selecionados.
                </p>
            )}
        </main>
    );
}

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
    try {
        const movies = await fetchMovies();

        return {
            props: { initialMovies: movies },
            revalidate: REVALIDATE_SECONDS,
        };
    } catch (error) {
        console.error('Erro ao gerar página de busca estaticamente:', error);
        return {
            props: { initialMovies: [] },
            revalidate: REVALIDATE_SECONDS,
        };
    }
};
