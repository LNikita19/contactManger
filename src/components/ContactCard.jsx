// src/components/ContactCard.jsx
import useStore from '../store/useStore';

const ContactCard = ({ contact }) => {
  const { setSelectedContactId } = useStore();

  return (
    <div
      onClick={() => setSelectedContactId(contact.id)}
      className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <span className="text-white text-lg font-medium">
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{contact.name}</h3>
            <p className="text-sm text-gray-500">{contact.email}</p>
          </div>
          {contact.favourite && (
            <div className="ml-auto">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ★
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;