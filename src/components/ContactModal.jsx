import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useStore from '../store/useStore';
import { useContacts, useCreateContact, useUpdateContact, useDeleteContact } from '../hooks/useContacts';
import ContactForm from './ContactForm';

const ContactModal = () => {
  const { selectedContactId, setSelectedContactId } = useStore();
  const { data: contacts } = useContacts(1, 10, '');
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isNewContact = selectedContactId === 'new';
  const contact = isNewContact
    ? { name: '', email: '', phone: '', address: '', favourite: false }
    : contacts?.contacts?.find(c => c.id === selectedContactId);

  const handleClose = () => {
    setSelectedContactId(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleSubmit = async (data) => {
    try {
      if (isNewContact) {
        await createContact.mutateAsync(data);
      } else {
        await updateContact.mutateAsync({ id: contact.id, ...data });
      }
      handleClose();
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContact.mutateAsync(contact.id);
      handleClose();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (!contact) return null;

  return (
    <>
      {/* Contact Dialog */}
      <Dialog open={!!selectedContactId} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isNewContact ? 'Add New Contact' : isEditing ? 'Edit Contact' : 'Contact Details'}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ px: 4, py: 3 }}>
          {isEditing || isNewContact ? (
            <ContactForm
              defaultValues={contact}
              onSubmit={handleSubmit}
              onCancel={handleClose}
              isSubmitting={isNewContact ? createContact.isLoading : updateContact.isLoading}
            />
          ) : (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" gutterBottom>{contact.name}</Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography>{contact.email}</Typography>
              </Box>

              {contact.phone && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                  <Typography>{contact.phone}</Typography>
                </Box>
              )}

              {contact.address && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Address</Typography>
                  <Typography>{contact.address}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        {!isEditing && !isNewContact && (
          <DialogActions sx={{ px: 4, pb: 3 }}>
            <Button
              onClick={() => setIsEditing(true)}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#1e88e5',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsDeleting(true)}
              variant="outlined"
              color="error"
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                '&:hover': {
                  backgroundColor: '#ffe5e5',
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                }
              }}
            >
              Delete
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          <Typography>
            Are you sure you want to delete <strong>{contact.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 2 }}>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteContact.isLoading}
            startIcon={deleteContact.isLoading ? <CircularProgress size={20} /> : null}
            sx={{
              backgroundColor: '#f44336',
              '&:hover': { backgroundColor: '#d32f2f' }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactModal;
