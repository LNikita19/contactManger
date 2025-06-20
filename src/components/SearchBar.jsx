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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search contacts..."
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
        }}
        fullWidth
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showFavoritesOnly}
            onChange={toggleShowFavoritesOnly}
            color="primary"
          />
        }
        label="Show favorites only"
      />
    </Box>
  );
};

export default SearchBar;