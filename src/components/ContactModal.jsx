// src/components/ContactModal.jsx
import { useState } from 'react';
import useStore from '../store/useStore';
import { useContacts, useCreateContact, useUpdateContact, useDeleteContact } from '../hooks/useContacts';
import ContactForm from './ContactForm';
import ConfirmationDialog from './ConfirmationDialog'; // We'll create this new component

const ContactModal = () => {
  const { selectedContactId, setSelectedContactId } = useStore();
  const { data: contacts } = useContacts(1, 10, '');
  const createContact = useCreateContact();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();

  const [isEditing, setIsEditing] = useState(selectedContactId === 'new');
  const [isDeleting, setIsDeleting] = useState(false);

  const isNewContact = selectedContactId === 'new';
  const contact = isNewContact
    ? { name: '', email: '', phone: '', address: '', favourite: false }
    : contacts?.contacts.find(c => c.id === selectedContactId);

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

  const handleDeleteConfirm = async () => {
    try {
      await deleteContact.mutateAsync(contact.id);
      handleClose();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!contact) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900">
                {isNewContact ? 'Add New Contact' : isEditing ? 'Edit Contact' : 'Contact Details'}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isEditing || isNewContact ? (
              <ContactForm
                defaultValues={contact}
                onSubmit={handleSubmit}
                onCancel={handleClose}
                isSubmitting={isNewContact ? createContact.isLoading : updateContact.isLoading}
              />
            ) : (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">{contact.name}</h4>
                  {contact.favourite && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      ★ Favourite
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium">{contact.email}</p>
                  </div>
                  {contact.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{contact.phone}</p>
                    </div>
                  )}
                  {contact.address && (
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm font-medium">{contact.address}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {isDeleting && (
        <ConfirmationDialog
          title="Delete Contact"
          message={`Are you sure you want to delete ${contact.name}?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleting(false)}
        />
      )}
    </>
  );
};

export default ContactModal;