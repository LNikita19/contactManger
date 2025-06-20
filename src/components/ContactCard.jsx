import useStore from '../store/useStore';

const ContactCard = ({ contact }) => {
  const { setSelectedContactId } = useStore();

  return (
    <div
      onClick={() => setSelectedContactId(contact.id)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
            <span className="text-indigo-600 text-xl font-medium">
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
              {contact.favourite && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  ★ Favourite
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">{contact.email}</p>
            {contact.phone && (
              <p className="mt-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {contact.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;