// src/App.jsx
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
  const [page, setPage] = useState();
  const limit = 10;
  const { searchQuery, showFavoritesOnly } = useStore();

  const { data, isLoading, isError, error } = useContacts(page, limit);

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  // Apply search and favorites filters
  const filteredContacts = (data?.contacts || []).filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || contact.favourite;
    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800">Contact Manager</h1>
          <AddContactButton />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <SearchBar />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No contacts found. Try adjusting your search or add a new contact.
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data?.total / limit)}
            onPageChange={setPage}
          />
        </div>
      </div>

      <ContactModal />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
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