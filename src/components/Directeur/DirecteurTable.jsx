import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './TableComponent/Pagination';
import Filtrage from './Fitrage';
import RefuseButton from './TableComponent/RefuseButton';
import Buttons from '../atoms/Buttons';
import H1 from '../atoms/H1';
import fileDownload from 'js-file-download';

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
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    };

    fetchData();
  }, []);

  const handleValidate = async (oldId) => {
    try {
      console.log(oldId);

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
        documentStatus: 1,
        reasonRejection: "nonReason"
      });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du document:', error);
    }
  };


  const handlePrint = async (documentId) => {
    try {
      // Step 1: Fetch Document Data
      // console.log('Fetching document data...');
      const documentResponse = await axios.get(`https://localhost:7153/api/Document/${documentId}`);
      const document = documentResponse.data;
      // console.log('Document fetched:', document);

      // Step 2: Request the List of Trainees
      // console.log('Requesting list of trainees...');
      // await axios.post('https://localhost:7153/api/Kafka/RequestListTrainee');
      // console.log('Request for trainees sent.');

      // Step 3: Retrieve the List of Trainees
      console.log('Retrieving list of trainees...');
      const traineeResponse = await axios.get('https://localhost:7153/api/Kafka/RetrieveListTrainee');
      const trainees = traineeResponse.data;
      // console.log('List of trainees retrieved:', trainees);

      const idTrainee = "566cef23-fbef-45fa-a5c2-00ee22975cf0"; // Example trainee ID rachida
      // const idTrainee = "1464a842-6042-4c1c-b5fc-c0a739a3c6cc"; // Example trainee ID abdelkader

      // Debug: Log IDs to ensure they match
      // console.log("idTrainee:", idTrainee);

      const trainee = trainees.find(t => {
        return t.id === idTrainee;
      });
      console.log(trainee.id);

      if (!trainee) {
        console.error('Trainee not found');
        throw new Error('Trainee not found');
      }

      console.log("Filtered trainee:", trainee);

      // Step 4: Update InstantJSON with Trainee Data
      // Update InstantJSON
      const instantJSON = JSON.parse(document.instantJSON);

      // Map through formFieldValues and update fields based on trainee attributes
      const updatedFormFieldValues = instantJSON.formFieldValues.map(field => {
        // Use the field name to get the corresponding value from the trainee object
        const traineeValue = trainee[field.name];

        // If the field exists in the trainee object, update its value
        if (traineeValue !== undefined) {
          return {
            ...field,
            value: traineeValue
          };
        }

        // If the field is not in the trainee object, return it unchanged
        return field;
      });

      // Update instantJSON with modified fields
      instantJSON.formFieldValues = updatedFormFieldValues;
      const updatedInstantJSON = JSON.stringify(instantJSON);

      console.log("updatedInstantJSON   "+  updatedInstantJSON);

      // Update Document
      await axios.put('https://localhost:7153/api/Document/update', {
        id: document.id,
        pathFile: document.pathFile,
        instantJSON: updatedInstantJSON,
        name: document.name
      });
      console.log('Document updated successfully.');

      // Step 6: Download the Updated Document
      console.log('Downloading updated document...');
      const downloadResponse = await axios.get('https://localhost:7153/api/File/download', {
        params: { url: document.pathFile }, // Use document.pathFile as URL query parameter
        responseType: 'blob'
      });

      console.log('Download response status:', downloadResponse.status);
      console.log('Download response headers:', downloadResponse.headers);

      // Use js-file-download to trigger the download
      fileDownload(downloadResponse.data, document.name);


      console.log('Document downloaded successfully.');
    } catch (error) {
      console.error('Error during print operation:', error);
    }
  };




  // document status logic
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
      <H1 className="mt-10">
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
                        onClick={() => handlePrint(request.documentId)}
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




