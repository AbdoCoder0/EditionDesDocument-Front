import React from 'react';
import axios from 'axios';

const RefuseButton = ({ requestId, requests, setRequests, setFilteredRequests }) => {
  const handleRefuse = async (oldId) => {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir refuser cette demande ?');
    if (confirmation) {
      const reasonRejection = prompt('Veuillez entrer la raison du refus:');
      if (reasonRejection) {
        try {
          const updatedRequests = requests.map(request => {
            if (request.id === oldId) {
              return { ...request, documentStatus: 2, reasonRejection: reasonRejection };
            }
            return request;
          });

          setRequests(updatedRequests);
          setFilteredRequests(updatedRequests);

          await axios.put(`https://localhost:7153/Requests/update`, {
            id: oldId,
            documentStatus: 2,
            reasonRejection: reasonRejection
          });

        } catch (error) {
          console.error('Erreur lors du refus du document:', error);
        }
      } else {
        alert('Raison du refus non fournie.');
      }
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => handleRefuse(requestId)}
    >
      Refuser
    </button>
  );
};

export default RefuseButton;
