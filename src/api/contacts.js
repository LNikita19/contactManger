const API_URL = 'http://localhost:3001'; // Remove /api since json-server serves from root

export const getContacts = async ({ page = 1, limit = 10, search = '' }) => {
  const url = new URL(`${API_URL}/contacts`);
  url.searchParams.append('_page', page);
  url.searchParams.append('_limit', limit);
  if (search) url.searchParams.append('q', encodeURIComponent(search));

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch contacts');

  // Get total count from headers for pagination
  const total = response.headers.get('X-Total-Count');
  const data = await response.json();

  return {
    contacts: data,
    total: parseInt(total) || data.length
  };
};

// Keep other methods but update their URLs to remove /api
export const createContact = async (contactData) => {
  const response = await fetch(`${API_URL}/contacts`, {
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