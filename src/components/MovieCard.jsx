import { Link } from 'react-router-dom';
import { Box, Card, CardActionArea, CardMedia, CardContent, IconButton, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MovieIcon from '@mui/icons-material/Movie';
import { IMG } from '../api';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ item }) {
  const { has, toggle } = useWatchlist();
  const saved = has(item.id, item.type);

  return (
    <Card sx={{ position: 'relative', height: '100%', transition: '0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
      <CardActionArea component={Link} to={`/${item.type}/${item.id}`}>
        {item.poster_path ? (
          <CardMedia component="img" loading="lazy" image={`${IMG}w342${item.poster_path}`} alt={item.title} sx={{ aspectRatio: '2/3', objectFit: 'cover' }} />
        ) : (
          <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', bgcolor: '#222', p: 1, textAlign: 'center' }}>
            <Box><MovieIcon /><Typography variant="caption" display="block">No poster</Typography></Box>
          </Box>
        )}
        <CardContent sx={{ p: 1 }}>
          <Typography noWrap variant="body2" fontWeight={600}>{item.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {item.date ? item.date.slice(0, 4) : 'N/A'} · ★ {item.rating ? item.rating.toFixed(1) : 'N/A'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <IconButton
        aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
        onClick={() => toggle(item)}
        size="small"
        sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(0,0,0,.65)', '&:hover': { bgcolor: 'rgba(0,0,0,.85)' } }}
      >
        {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
      </IconButton>
    </Card>
  );
}