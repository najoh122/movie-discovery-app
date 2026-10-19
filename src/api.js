const BASE = 'https://api.themoviedb.org/3';
const KEY = import.meta.env.VITE_TMDB_KEY;
export const IMG = 'https://image.tmdb.org/t/p/';

export async function tmdb(path, params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v != null)
  );
  const qs = new URLSearchParams({ api_key: KEY, language: 'en-US', ...clean });
  const res = await fetch(`${BASE}${path}?${qs}`);
  if (!res.ok) throw new Error(`Request failed (${res.status}). Check your API key / connection.`);
  return res.json();
}

export const norm = (i, type) => ({
  id: i.id,
  type: i.media_type || type,
  title: i.title || i.name || 'Untitled',
  poster_path: i.poster_path || null,
  rating: i.vote_average || 0,
  date: i.release_date || i.first_air_date || '',
});