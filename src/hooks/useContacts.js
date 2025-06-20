// src/hooks/useContacts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    toggleFavorite
} from '../api/contacts';

export const useContacts = (page, limit, searchQuery) => {
    return useQuery({
        queryKey: ['contacts', page, limit, searchQuery],
        queryFn: () => getContacts({ page, limit, search: searchQuery })
    });
};
export const useCreateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
        },
    });
};

export const useUpdateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateContact,
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
        },
    });
};

export const useToggleFavorite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries(['contacts']);
        },
    });
};