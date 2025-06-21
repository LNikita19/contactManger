import { Card, CardContent, Avatar, Typography, IconButton, Box } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import useStore from '../store/useStore';
import { useToggleFavorite } from '../hooks/useContacts';
import { Checkbox } from '@mui/material';

const ContactCard = ({ contact }) => {
  const { setSelectedContactId } = useStore();
  const toggleFavorite = useToggleFavorite();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite.mutate({ id: contact.id, favourite: !contact.favourite });
  };

  return (
    <Card
      sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}
      onClick={() => setSelectedContactId(contact.id)}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
        <Checkbox sx={{ mr: 2 }} />
        {/* <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          {contact.name.charAt(0).toUpperCase()}
        </Avatar> */}

        <Avatar
          alt={contact.name}
          src={contact.image || '/avtar.png'}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">{contact.name}</Typography>
          <Typography variant="body2" color="text.secondary">{contact.email}</Typography>
        </Box>
        <IconButton onClick={handleFavoriteClick}>
          {contact.favourite ? <Star sx={{ color: '#fdd835' }} /> : <StarBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
