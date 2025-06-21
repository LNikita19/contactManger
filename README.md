# Getting Started with Create React App

npx create react app used material ui tanstact and zustand for store managment.

 //Master Branch code is available 
 
## Available Scripts

In the project directory, you can run:

- **Contact Management**: Add, edit, view, and delete contacts
- **Search functionality**: Real-time search with server-side filtering
- **Favorites System**: Mark contacts as favorites and filter by favorites
- **Responsive Design**: Works perfectly on desktop and mobile

- **Modern UI**: Clean, professional interface with Material-UI
- **State Management**: Efficient state management with Zustand and TanStack Query
- **Pagination**: Smooth pagination for large contact lists


## Techstack which is used
-**React 18** - Version 18 used of react
--**MUI Library (v5.x)** -for components across app. 
--**• Zustand (v5.x)**  - for client-side UI state 
--**TanStack React Query (v5.x)** - for server-side state management (fetching, mutations, cache) link
--**React Hook Form (v7.x)** - for form handling and validation link
   


## ⚡ Quick Start

Follow these steps to run both the mock API server and the React app:

### 1. Install dependencies
```bash
npm install
```

### 2. Start the Mock API Server (json-server)
In a terminal, run:
```bash
npx json-server --watch db.json --port 3001 
```
- This starts the backend at [http://localhost:3001](http://localhost:3001).
- API endpoints will be available under `/api` (e.g., `http://localhost:3001/contacts`).

### 3. Start the React Development Server
In a **separate terminal**, run:
```bash
npm run start
```

## 🎯 Usage

### Adding Contacts
1. Click the "Add Contact" button
2. Fill in the contact information
3. Optionally mark as favorite
4. Click "Create" to save

### Editing Contacts
1. Click on any contact card to open details
2. Click the "Edit" button in the modal
3. Update the information
4. Click "Update" to save changes

### Search and Filter
- Use the search bar to find contacts by name
- Toggle "Show Favourites Only" to filter favorites
- Search is performed server-side with real-time results

### Managing Favorites
- Click the heart icon on any contact card or in the detail modal
- Use the "Show Favourites Only" toggle to filter favorites
