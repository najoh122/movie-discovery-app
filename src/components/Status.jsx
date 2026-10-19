import { Alert, Box, CircularProgress, Typography } from '@mui/material';

export default function Status({ loading, error, empty, emptyText = 'Nothing found.' }) {
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;
  if (empty) return <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>{emptyText}</Typography>;
  return null;
}