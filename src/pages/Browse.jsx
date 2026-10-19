import { useEffect, useState } from 'react';
import { Box, Chip, MenuItem, Pagination, Select, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { norm } from '../api';
import MovieGrid from '../components/MovieGrid';
import Status from '../components/Status';

export default function Browse({ type }) {
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [page, setPage] = useState(1);

  useEffect(() => { setGenre(''); setPage(1); }, [type]);

  const genres = useFetch(`/genre/${type}/list`);
  const { data, loading, error } = useFetch(`/discover/${type}`, {
    with_genres: genre, sort_by: sort, page, 'vote_count.gte': 50,
  });
  const items = (data?.results || []).map((r) => norm(r, type));

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>{type === 'movie' ? 'Movies' : 'TV Shows'}</Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip label="All" color={genre === '' ? 'primary' : 'default'} onClick={() => { setGenre(''); setPage(1); }} />
        {(genres.data?.genres || []).map((g) => (
          <Chip key={g.id} label={g.name} color={genre === g.id ? 'primary' : 'default'} onClick={() => { setGenre(g.id); setPage(1); }} />
        ))}
      </Box>

      <Select size="small" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} sx={{ mb: 3 }}>
        <MenuItem value="popularity.desc">Most popular</MenuItem>
        <MenuItem value="vote_average.desc">Highest rated</MenuItem>
      </Select>

      <Status loading={loading} error={error} empty={!loading && !error && items.length === 0} emptyText="No titles in this category." />
      {!loading && !error && <MovieGrid items={items} />}

      {data && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={Math.min(data.total_pages || 1, 500)} page={page} siblingCount={0} onChange={(_, p) => { setPage(p); window.scrollTo(0, 0); }} />
        </Box>
      )}
    </Box>
  );
}