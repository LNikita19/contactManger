import { useState, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useStore from './store/useStore';
import { useContacts } from './hooks/useContacts';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import AddContactButton from './components/AddContactButton';

const queryClient = new QueryClient();

function AppContent() {
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState('light'); // light/dark toggle
  const limit = 10;
  const { searchQuery, showFavoritesOnly } = useStore();

  const { data, isLoading, isError, error } = useContacts(page, limit, searchQuery);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#1e88e5' : '#90caf9',
          },
          secondary: {
            main: '#fdd835',
          },
          background: {
            default: mode === 'light' ? '#ffffff' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
      }),
    [mode]
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  const filteredContacts = (data?.contacts || []).filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || contact.favourite;
    return matchesSearch && matchesFavorite;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ py: 4 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            p: 3,
            backgroundColor: mode === 'light' ? '#2A3342' : '#1e1e1e',
            color: 'white',
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <SearchBar />
            <IconButton onClick={toggleColorMode} color="inherit" size="small">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>

          <Typography variant="h5" fontWeight="bold" gutterBottom color="#fff">
            Names
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} iconImage />
            ))}
          </Box>

          {filteredContacts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              No contacts found.
            </Box>
          )}

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data?.total / limit)}
            onPageChange={setPage}
          />

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <AddContactButton
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#22C55E',
                color: '#ffffff',
                fontWeight: 'bold',
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              + Add to Contact
            </AddContactButton>
          </Box>
        </Paper>

        <ContactModal />
        <ReactQueryDevtools initialIsOpen={false} />
      </Container>
    </ThemeProvider>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
