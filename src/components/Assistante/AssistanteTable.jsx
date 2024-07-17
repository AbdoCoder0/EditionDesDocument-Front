import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filtrage from "../Directeur/Fitrage";

function AssistanteTable() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7153/Requests/list');
        console.log('Demande envoyée:', response.data);
        const filteredRequests = response.data.filter(request => request.documentStatus === 1);
        setRequests(filteredRequests); 
        setFilteredRequests(filteredRequests); // Initialize filtered requests with all requests
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la demande:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold my-6 flex justify-center items-center">
        Table Assistante pour gérer les documents
      </h2>

      <div className="App flex justify-center items-center mt-40">
        <div className="flex flex-col items-center w-full mx-40">
          
          <Filtrage requests={requests} onFilteredRequests={setFilteredRequests} />
          
          <div className="overflow-x-auto mt-10 w-full">
            <table className="bg-white border border-gray-200 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Nom et Prenom</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Type de Document</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Expéditeur</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Date d'envois</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Refference</th>
                  <th className="text-left py-3 px-1 font-semibold text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="border-t py-3 px-4">{request.nameTrainee}</td>
                    <td className="border-t py-3 px-4">{request.documentType}</td>                    
                    <td className="border-t py-3 px-4">{request.role}</td>
                    <td className="border-t py-3 px-4">{new Date(request.lastModifiedDate).toLocaleDateString()}</td>
                    <td className="border-t py-3 px-4">{request.id}</td>
                    <td className="border-t py-3 px-1">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Imprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssistanteTable;
