// src/components/ContactModal.jsx
import { useState } from 'react';
import useStore from '../store/useStore';
import { useContacts } from '../hooks/useContacts';
import { useUpdateContact, useDeleteContact } from '../hooks/useContacts';
import ContactForm from './ContactForm';

const ContactModal = () => {
  const { selectedContactId, setSelectedContactId } = useStore();
  const { data: contacts } = useContacts(1, 10, '');
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const contact = contacts?.contacts.find(c => c.id === selectedContactId);
  
  const handleClose = () => {
    setSelectedContactId(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleUpdate = async (data) => {
    await updateContact.mutateAsync({ id: contact.id, ...data });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteContact.mutateAsync(contact.id);
    handleClose();
  };

  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">
              {isEditing ? 'Edit Contact' : 'Contact Details'}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isEditing ? (
            <ContactForm
              defaultValues={contact}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              isSubmitting={updateContact.isLoading}
            />
          ) : (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-lg font-semibold">{contact.name}</h4>
                {contact.favourite && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Favourite
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium">{contact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-sm font-medium">{contact.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-sm font-medium">{contact.address}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsDeleting(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;