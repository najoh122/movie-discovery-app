import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { norm } from '../api';
import MovieGrid from '../components/MovieGrid';
import Status from '../components/Status';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const { data, loading, error } = useFetch('/search/multi', { query: q });
  const items = (data?.results || []).filter((r) => r.media_type === 'movie' || r.media_type === 'tv').map((r) => norm(r));

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Results for "{q}"</Typography>
      {!q ? <Typography color="text.secondary">Type a title in the search box.</Typography> : (
        <>
          <Status loading={loading} error={error} empty={!loading && !error && items.length === 0} emptyText={`No matches found for "${q}".`} />
          {!loading && !error && <MovieGrid items={items} />}
        </>
      )}
    </Box>
  );
}