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
                px: 6,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                backgroundColor: '#22C55E',
                '&:hover': { backgroundColor: '#1565c0' }
            }}
        >
            ADD CONTACT
        </Button>
    );
};

export default AddContactButton;
