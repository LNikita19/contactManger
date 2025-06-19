// src/App.jsx
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useStore from './store/useStore';
import { useContacts } from './hooks/useContacts';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { searchQuery, showFavoritesOnly } = useStore();
  const { data, isLoading, isError, error } = useContacts(page, limit, searchQuery);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;
  const filteredContacts = showFavoritesOnly
    ? data?.contacts?.filter(contact => contact.favourite) || []
    : data?.contacts || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Manager</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <SearchBar />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts?.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>

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

export default App;