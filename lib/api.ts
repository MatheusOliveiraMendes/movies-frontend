export const API_URL = 'http://localhost:3001/api/movies';

export async function fetchMovies(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}?${query}`);
  return await res.json();
}

export async function fetchMovieById(id: number) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}
