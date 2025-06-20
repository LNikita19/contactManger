// src/api/contacts.js
const API_URL = 'http://localhost:3001';

export const getContacts = async ({ page = 1, limit = 10, search = '' }) => {
  const url = new URL(`${API_URL}/contacts`);
  url.searchParams.append('_page', page);
  url.searchParams.append('_limit', limit);
  if (search) url.searchParams.append('q', encodeURIComponent(search));

  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error('Failed to fetch contacts');
    error.status = response.status;
    throw error;
  }

  const total = response.headers.get('X-Total-Count');
  const data = await response.json();

  return {
    contacts: data,
    total: parseInt(total) || data.length
  };
};

// Update other methods similarly (remove /api from URLs)
export const createContact = async (contactData) => {
  const response = await fetch(`${API_URL}/contacts`, { // Removed /api
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) throw new Error('Failed to create contact');
  return response.json();
};
export const updateContact = async ({ id, ...contactData }) => {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
};

export const deleteContact = async (id) => {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete contact');
  return id;
};

export const toggleFavorite = async ({ id, favourite }) => {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ favourite }),
  });
  if (!response.ok) throw new Error('Failed to toggle favorite');
  return response.json();
};