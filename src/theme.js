import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffb400' },
    background: { default: '#0b0d12', paper: '#151922' },
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
});