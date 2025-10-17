import { useEffect, useState } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetchMovieById, fetchMovies } from '../../lib/api';
import { Movie } from '../../lib/types';

type MovieDetailProps = {
  initialMovie: Movie;
};

const REVALIDATE_SECONDS = 60;

export default function MovieDetail({ initialMovie }: MovieDetailProps) {
  const router = useRouter();
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  const movieId = (() => {
    if (typeof router.query.id === 'string') {
      return Number(router.query.id);
    }
    return initialMovie?.id;
  })();

  const { data: movie, error } = useSWR<Movie>(
    movieId ? ['movie', movieId] : null,
    ([, id]) => fetchMovieById(Number(id)),
    {
      fallbackData: initialMovie,
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    async function loadBackdrop(currentMovie: Movie | undefined) {
      if (!currentMovie) return;

      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=08e35b932690010e03e30fe284d07672&query=${encodeURIComponent(
          currentMovie.name
        )}`
      );
      const tmdbData = await tmdbRes.json();

      const result = tmdbData.results?.[0];
      if (result?.backdrop_path || result?.poster_path) {
        const path = result.backdrop_path || result.poster_path;
        setBackgroundUrl(`https://image.tmdb.org/t/p/original${path}`);
      } else {
        setBackgroundUrl(null);
      }
    }

    loadBackdrop(movie);
  }, [movie?.name]);

  if (router.isFallback) {
    return <p className="text-white p-4">Loading...</p>;
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Não foi possível carregar o filme.</p>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: `url("${
          backgroundUrl ||
          `https://movies-backend-093v.onrender.com/images/${movie.img}`
        }")`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />

      <div className="relative z-10 p-6 max-w-4xl mx-auto flex flex-col gap-4">
        <button
          onClick={() => router.back()}
          className="text-teal-400 text-sm hover:underline w-fit"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">{movie.name}</h1>

        <p className="text-gray-300">{movie.description}</p>

        <div className="flex gap-6 text-sm text-gray-400">
          <span>
            <strong>Genres:</strong> {movie.genres.join(', ')}
          </span>
          <span>
            <strong>Rate:</strong> {movie.rate}/10
          </span>
          <span>
            <strong>Length:</strong> {movie.length}
          </span>
        </div>

        <img
          src={`https://movies-backend-093v.onrender.com/images/${movie.img}`}
          alt={movie.name}
          className="mt-6 rounded-lg max-w-xs shadow-xl"
        />
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const movies = await fetchMovies();
    const paths = movies.map((movie) => ({
      params: { id: movie.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Erro ao gerar caminhos estáticos para filmes:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<MovieDetailProps> = async ({
  params,
}) => {
  const idParam = params?.id;
  const id =
    typeof idParam === 'string'
      ? Number(idParam)
      : Array.isArray(idParam)
      ? Number(idParam[0])
      : NaN;

  if (!id || Number.isNaN(id)) {
    return { notFound: true };
  }

  try {
    const movie = await fetchMovieById(id);

    return {
      props: { initialMovie: movie },
      revalidate: REVALIDATE_SECONDS,
    };
  } catch (error) {
    console.error(`Erro ao gerar página estática para o filme ${id}:`, error);
    return {
      notFound: true,
    };
  }
};
