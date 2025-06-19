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

// Updated mutation hooks for React Query v5
export const useCreateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
    });
};

export const useUpdateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
    });
};