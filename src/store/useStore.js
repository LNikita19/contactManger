import { create } from 'zustand';

const useStore = create((set) => ({
    searchQuery: '',
    showFavoritesOnly: false,
    selectedContactId: null,
    setSearchQuery: (query) => set({ searchQuery: query }),
    toggleShowFavoritesOnly: () => set((state) => ({ showFavoritesOnly: !state.showFavoritesOnly })),
    setSelectedContactId: (id) => set({ selectedContactId: id }),
}));

export default useStore;