// src/hooks/useContacts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContacts, createContact, updateContact, deleteContact } from '../api/contacts';

export const useContacts = (page, limit, search) => {
    return useQuery({
        queryKey: ['contacts', { page, limit, search }],
        queryFn: () => getContacts({ page, limit, search }),
        keepPreviousData: true,
    });
};

export const useCreateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
        onError: (error) => {
            console.error('Error creating contact:', error);
            throw error; // Re-throw to handle in component
        }
    });
};

export const useUpdateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
        onError: (error) => {
            console.error('Error updating contact:', error);
            throw error;
        }
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
        onError: (error) => {
            console.error('Error deleting contact:', error);
            throw error;
        }
    });
};