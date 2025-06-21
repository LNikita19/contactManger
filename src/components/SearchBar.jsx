// src/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useStore from '../store/useStore';
import useDebounce from '../hooks/useDebounce';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, showFavoritesOnly, toggleShowFavoritesOnly } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500ms delay

  // Update store when debounced value changes
  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search contact"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        sx={{ flex: 1 }} // share space with checkbox
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showFavoritesOnly}
            onChange={toggleShowFavoritesOnly}
            color="primary"
          />
        }
        label="Show Favourites"
        sx={{ whiteSpace: 'nowrap', mb: 0 }}
      />
    </Box>
  );
};

export default SearchBar;