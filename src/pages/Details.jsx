import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import useFetch from '../hooks/useFetch';
import { IMG, norm } from '../api';
import { useWatchlist } from '../context/WatchlistContext';
import Status from '../components/Status';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { has, toggle } = useWatchlist();
  const { data, loading, error } = useFetch(`/${type}/${id}`);

  if (loading || error) return <Status loading={loading} error={error} />;
  const item = norm(data, type);
  const saved = has(item.id, item.type);
  const extra = type === 'movie'
    ? (data.runtime ? `${data.runtime} min` : '')
    : (data.number_of_seasons ? `${data.number_of_seasons} season(s)` : '');

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' } }}>
        <Box sx={{ width: { xs: 220, sm: 280 }, flexShrink: 0 }}>
          {item.poster_path ? (
            <Box component="img" src={`${IMG}w500${item.poster_path}`} alt={item.title} sx={{ width: '100%', borderRadius: 2 }} />
          ) : (
            <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', bgcolor: '#222', borderRadius: 2 }}>No poster</Box>
          )}
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={800}>{item.title}</Typography>
          <Typography color="text.secondary" sx={{ my: 1 }}>
            {item.date || 'Release date N/A'} {extra && `· ${extra}`} · ★ {item.rating ? item.rating.toFixed(1) : 'N/A'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 2 }}>
            {(data.genres || []).length
              ? data.genres.map((g) => <Chip key={g.id} label={g.name} />)
              : <Typography variant="body2" color="text.secondary">Genre N/A</Typography>}
          </Box>
          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Typography sx={{ mb: 3 }}>{data.overview || 'No overview available.'}</Typography>
          <Button variant="contained" startIcon={saved ? <BookmarkIcon /> : <BookmarkBorderIcon />} onClick={() => toggle(item)}>
            {saved ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}