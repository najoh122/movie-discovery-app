import { Box, Typography } from '@mui/material';
import MovieRow from '../components/MovieRow';

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>Discover movies & TV</Typography>
      <MovieRow title="Trending This Week" path="/trending/all/week" />
      <MovieRow title="Popular Movies" path="/movie/popular" type="movie" />
      <MovieRow title="Action Movies" path="/discover/movie" params={{ with_genres: 28 }} type="movie" />
      <MovieRow title="Popular TV Shows" path="/tv/popular" type="tv" />
      <MovieRow title="Top Rated Movies" path="/movie/top_rated" type="movie" />
    </Box>
  );
}