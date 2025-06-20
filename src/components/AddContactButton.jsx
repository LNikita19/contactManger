// src/components/AddContactButton.jsx
import useStore from '../store/useStore';

const AddContactButton = () => {
    const { setSelectedContactId } = useStore();

    return (
        <button
            onClick={() => setSelectedContactId('new')}
            className="flex items-center gap-2 bg-gradient-to-br from-slate-900 to-slate-800 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all hover:shadow-lg"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Add Contact
        </button>
    );
};

export default AddContactButton;