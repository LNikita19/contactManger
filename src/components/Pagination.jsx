import { Box, Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#ffffff', 
            backgroundColor: '#22C55E', 
            borderRadius: '8px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#16a34a',
            },
          },
          '& .Mui-selected': {
            backgroundColor: '#22C55E !important',
            color: '#ffffff',
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
