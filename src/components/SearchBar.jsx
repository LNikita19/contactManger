import { useState, useEffect } from 'react';
import { TextField, Box, IconButton, Typography } from '@mui/material';
import useStore from '../store/useStore';
import useDebounce from '../hooks/useDebounce';
import StarIcon from '@mui/icons-material/Star';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, showFavoritesOnly, toggleShowFavoritesOnly } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '100%',
      }}
    >
      {/* White background search bar with border */}
      <TextField
        variant="outlined"
        placeholder="Search Contact"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="small"
        fullWidth
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          input: { color: '#1e293b' },
        }}
      />

      {/* Yellow star toggle button */}
      <IconButton
        onClick={toggleShowFavoritesOnly}
        sx={{
          px: 2,
          py: 1,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          border: '2px solid white',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <StarIcon sx={{ color: '#facc15' }} />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: '#1e293b',
            fontSize: '0.75rem',
            textTransform: 'none',
          }}
        >
          Show Favourites
        </Typography>
      </IconButton>
    </Box>
  );
};

export default SearchBar;
