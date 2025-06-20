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
      <Dialog open={!!selectedContactId} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isNewContact ? 'Add New Contact' : isEditing ? 'Edit Contact' : 'Contact Details'}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {isEditing || isNewContact ? (
            <ContactForm
              defaultValues={contact}
              onSubmit={handleSubmit}
              onCancel={handleClose}
              isSubmitting={isNewContact ? createContact.isLoading : updateContact.isLoading}
            />
          ) : (
            <Box sx={{ mt: 2 }}>
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
          <DialogActions>
            <Button onClick={() => setIsEditing(true)} color="primary">
              Edit
            </Button>
            <Button onClick={() => setIsDeleting(true)} color="error">
              Delete
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {contact.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={deleteContact.isLoading}
            startIcon={deleteContact.isLoading ? <CircularProgress size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactModal;