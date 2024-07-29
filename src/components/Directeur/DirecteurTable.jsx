import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './TableComponent/Pagination';
import Filtrage from './Fitrage';
import RefuseButton from './TableComponent/RefuseButton';
import Buttons from '../atoms/Buttons';
import H1 from '../atoms/H1';

function DirecteurTable() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7153/Requests/list');
        const sortedData = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setRequests(sortedData);
        // setFilteredRequests(sortedData); // Initialize filtered requests with all requests
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la demande:', error);
      }
    };

    fetchData();
  }, []);

  const handleValidate = async (oldId) => {
    try {
      const updatedRequests = requests.map(request => {
        if (request.id === oldId) {
          return { ...request, documentStatus: 1 };
        }
        return request;
      });

      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests);

      await axios.put(`https://localhost:7153/Requests/update`, {
        id: oldId,
        documentStatus: 1
      });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du document:', error);
    }
  };

  // Pagination logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <>
      <H1 className="mt-10 ">
        Table Directeur en attente de validation
      </H1>

      <div className="flex justify-center items-center mt-32 mb-40">
        <div className="flex flex-col items-center w-full mx-40">

          <Filtrage requests={requests} onFilteredRequests={setFilteredRequests} />
            
        <div className="overflow-x-auto mt-10 w-full">
            <table className="bg-white border border-gray-200 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Nom et Prenom</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Type de Document</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Expéditeur</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Date d'envoie</th>

                  {/* <th className="text-left py-3 pl-16 font-semibold text-sm">Refferens</th> */}
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">état</th>

                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair"></th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request) => (
                  <tr key={request.id}>

                    <td className="border-t py-3 px-4 border-gris-moyen">{request.nameTrainee !== null ? request.nameTrainee : "Stagiaire"}</td>

                    <td className="border-t py-3 px-4 border-gris-moyen">{request.documentType}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{request.role}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{new Date(request.createdDate).toLocaleDateString()}</td>
                    {/* <td className="border-t py-3 px-4 border-gris-moyen">{request.id}</td> */}
                    
                    <td className="border-t py-3 px-4 border-gris-moyen">{request.documentStatus}</td>
                    <td className="border-t py-3 px-4  border-gris-moyen flex gap-6">
                      
                      <Buttons
                        type={request.documentStatus === 1 ? 'primary' : (request.documentStatus === 2 ? 'disabled' : 'primary')}
                        onClick={() => handleValidate(request.id)}
                        disabled={request.documentStatus === 2}
                      >
                        Validé
                      </Buttons>

                      <Buttons
                        type={request.documentStatus === 1 ? 'secondary' : 'disabled'}
                        
                        disabled={request.documentStatus !== 1}
                      >Imprimer
                      </Buttons>
                      
                      <RefuseButton requestId={request.id}
                        requests={requests}
                        setRequests={setRequests}
                        setFilteredRequests={setFilteredRequests}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>

        </div>
      </div>
    </>
  );
}

export default DirecteurTable;
