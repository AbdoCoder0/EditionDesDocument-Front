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
        setFilteredRequests(sortedData); // Initialize filtered requests with all requests
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

  const handlePrint = async () => {
    try {
      const documentId = '41f51970-7ac7-45a8-92f3-41b50173efd2';
      // Fetch document data
      const response = await axios.get(`https://localhost:7153/api/Document/${documentId}`);
      console.log(response.data);
      console.log(response.data.pathFile);
      
      
      const  pathFile  = response.data.pathFile;

      if (pathFile) {
        // Trigger file download
        const fileResponse = await axios.post(`https://localhost:7153/api/Document/getDocumentByURL`, pathFile, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Create a link to download the file
        const url = window.URL.createObjectURL(new Blob([fileResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', pathFile.split('/').pop()); 
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('pathFile is missing in document data');
      }

    } catch (error) {
      console.error('Erreur lors de la récupération du document:', error);
    }
  };

  // document.status logic
  const getDocumentStatus = (status) => {
    switch (status) {
      case 0:
        return { text: "en cours", className: "text-orange" };
      case 1:
        return { text: "validé", className: "text-green-500" };
      case 2:
        return { text: "refusé", className: "text-red-500" };
      default:
        return { text: "unknown", className: "text-gray-500" };
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
                    <td className={`border-t py-3 px-4 border-gris-moyen ${getDocumentStatus(request.documentStatus).className}`}>
                      {getDocumentStatus(request.documentStatus).text}
                    </td>
                    <td className="border-t py-3 px-4 border-gris-moyen flex gap-6">
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
                        onClick={() => handlePrint(request.id)} 
                      >
                        Imprimer
                      </Buttons>
                      <RefuseButton
                        requestId={request.id}
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