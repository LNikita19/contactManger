import { Card, CardContent, Avatar, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import useStore from '../store/useStore';
import { useToggleFavorite } from '../hooks/useContacts';

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
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          {contact.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{contact.name}</Typography>
          <Typography variant="body2" color="text.secondary">{contact.email}</Typography>
        </Box>
        <IconButton onClick={handleFavoriteClick}>
          {contact.favourite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ContactCard;