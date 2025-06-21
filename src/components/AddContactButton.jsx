import useStore from '../store/useStore';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddContactButton = () => {
  const { setSelectedContactId } = useStore();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => setSelectedContactId('new')}
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: 5,
        backgroundColor: '#1e88e5',
        '&:hover': { backgroundColor: '#1565c0' }
      }}
    >
       ADD CONTACT
    </Button>
  );
};

export default AddContactButton;
