// src/App.jsx
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
  const [mode, setMode] = useState('light');
  const limit = 10;
  const { searchQuery, showFavoritesOnly } = useStore();

  const { data, isLoading, isError, error } = useContacts(page, limit, searchQuery);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

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
            default: mode === 'light' ? '#f1f5f9' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  // ✅ Add this log right after data is confirmed available
  console.log("Received contacts:", data.contacts.length, "Total:", data.total, "Current page:", page);

  // Apply search and favorites filters
  const filteredContacts = (data?.contacts || []).filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || contact.favourite;
    return matchesSearch && matchesFavorite;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={4} sx={{ borderRadius: 4, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
              Contact Manager
            </Typography>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SearchBar />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
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
            <AddContactButton />
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
