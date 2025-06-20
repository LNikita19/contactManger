// src/App.jsx
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStore from './store/useStore';
import { useContacts } from './hooks/useContacts';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import AddContactButton from './components/AddContactButton';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { searchQuery, showFavoritesOnly } = useStore();
  const { data, isLoading, isError, error } = useContacts(page, limit, searchQuery);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;

  // Apply both search (handled by API) and favorites filter
  const filteredContacts = showFavoritesOnly
    ? data?.contacts?.filter(contact => contact.favourite) || []
    : data?.contacts || [];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" color="primary">
            Contact Manager
          </Typography>
          <AddContactButton />
        </Box>

        <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 1 }}>
          <SearchBar />

          <Box sx={{
            mt: 4,
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            }
          }}>
            {filteredContacts?.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </Box>

          {filteredContacts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
              No contacts found. Try adjusting your search or add a new contact.
            </Box>
          )}

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data?.total / limit)}
            onPageChange={setPage}
          />
        </Box>
      </Container>

      <ContactModal />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;