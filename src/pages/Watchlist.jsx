import { Box, Typography } from '@mui/material';
import { useWatchlist } from '../context/WatchlistContext';
import MovieGrid from '../components/MovieGrid';
import Status from '../components/Status';

export default function Watchlist() {
  const { items } = useWatchlist();
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>My Watchlist</Typography>
      <Status empty={items.length === 0} emptyText="Your watchlist is empty. Tap the bookmark icon on any poster to save it." />
      <MovieGrid items={items} />
    </Box>
  );
}