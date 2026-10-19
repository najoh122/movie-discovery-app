import { Box, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { norm } from '../api';
import MovieCard from './MovieCard';
import Status from './Status';

export default function MovieRow({ title, path, params, type }) {
  const { data, loading, error } = useFetch(path, params);
  const items = (data?.results || []).filter((r) => r.media_type !== 'person').map((r) => norm(r, type));

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>{title}</Typography>
      <Status loading={loading} error={error} empty={!loading && !error && items.length === 0} />
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
        {items.map((i) => (
          <Box key={`${i.type}-${i.id}`} sx={{ flex: '0 0 auto', width: { xs: 130, sm: 160 } }}>
            <MovieCard item={i} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}