import { Movie } from './types';

export const API_URL = 'https://movies-backend-093v.onrender.com/api/movies';
const REVALIDATE_SECONDS = 60;

type ExtendedRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

function buildRequestInit(): ExtendedRequestInit {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      cache: 'force-cache',
      next: { revalidate: REVALIDATE_SECONDS },
    };
  }

  return {
    cache: 'no-store',
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  return (await response.json()) as T;
}

export async function fetchMovies(
  params: Record<string, string> = {}
): Promise<Movie[]> {
  const query = new URLSearchParams(params).toString();
  const requestInit = buildRequestInit();
  const url = query ? `${API_URL}?${query}` : API_URL;
  const res = await fetch(url, requestInit);
  return handleResponse<Movie[]>(res);
}

export async function fetchMovieById(id: number): Promise<Movie> {
  const requestInit = buildRequestInit();
  const res = await fetch(`${API_URL}/${id}`, requestInit);
  return handleResponse<Movie>(res);
}
