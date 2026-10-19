import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Box, InputBase, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useWatchlist } from '../context/WatchlistContext';

const W = 220;
const links = [
  { label: 'Home', to: '/', icon: <HomeIcon /> },
  { label: 'Movies', to: '/movies', icon: <MovieIcon /> },
  { label: 'TV Shows', to: '/tv', icon: <TvIcon /> },
  { label: 'My Watchlist', to: '/watchlist', icon: <BookmarkIcon /> },
];

export default function Layout() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { items } = useWatchlist();

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const drawer = (
    <Box sx={{ pt: { xs: 1, md: 9 } }}>
      <List>
        {links.map((l) => (
          <ListItemButton
            key={l.to} component={Link} to={l.to} onClick={() => setOpen(false)}
            selected={l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)}
          >
            <ListItemIcon>{l.icon}</ListItemIcon>
            <ListItemText primary={l.label + (l.to === '/watchlist' && items.length ? ` (${items.length})` : '')} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: '#10131a' }}>
        <Toolbar sx={{ gap: 1 }}>
          {!desktop && (
            <IconButton edge="start" aria-label="Open menu" onClick={() => setOpen(true)}><MenuIcon /></IconButton>
          )}
          <Typography component={Link} to="/" variant="h6" fontWeight={800} color="primary" sx={{ textDecoration: 'none', mr: 2 }}>
            REELBOX
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: 480, bgcolor: 'background.paper', borderRadius: 5, px: 1.5 }}>
            <InputBase fullWidth placeholder="Search movies & TV shows" value={q} onChange={(e) => setQ(e.target.value)} inputProps={{ 'aria-label': 'search' }} />
            <IconButton type="submit" aria-label="Search" size="small"><SearchIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={desktop ? 'permanent' : 'temporary'}
        open={desktop || open}
        onClose={() => setOpen(false)}
        sx={{ width: desktop ? W : 0, '& .MuiDrawer-paper': { width: W, bgcolor: '#10131a', borderRight: '1px solid #222' } }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, md: 3 }, pt: { xs: 10, md: 11 } }}>
        <Outlet />
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 6, textAlign: 'center' }}>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </Typography>
      </Box>
    </Box>
  );
}