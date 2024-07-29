import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filtrage from "../Directeur/Fitrage";
import { Button } from 'flowbite-react';
import Buttons from '../atoms/Buttons';
import H1 from '../atoms/H1';

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
      
      <H1 className='mt-28 mb-2'>Table Assistante pour gérer les documents</H1>

<<<<<<< HEAD

      <div className="App flex justify-center items-center mt-40 mb-32">
=======
      <div className="App flex justify-center items-center mt-4">
>>>>>>> 30bc86569107a445215ed90e676de39fb0c9ad11
        <div className="flex flex-col items-center w-full mx-40">
          
          <Filtrage requests={requests} onFilteredRequests={setFilteredRequests} />
          
          <div className="overflow-x-auto mt-10 w-full">
            <table className="bg-white border border-gris-moyen w-full">
              <thead>
                <tr >
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Nom et Prenom</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Type de Document</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Expéditeur</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Date d'envois</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Refference</th>
                  <th className="text-left py-3 px-1 font-semibold text-lg bg-darkBlue text-gris-clair"></th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="border-t py-3 px-4 border-gris-moyen">{(request.nameTrainee !== null) ? request.nameTrainee : "Stagiaire" }</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{request.documentType}</td>                    
                    <td className="border-t py-3 px-4 border-gris-moyen">{request.role}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{new Date(request.lastModifiedDate).toLocaleDateString()}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{request.id}</td>
                    
                    <td className="border-t py-3 px-1 border-gris-moyen">
                      
                      <Buttons type="secondary" className=' py-2 px-4 '>
                      Imprimer 
                      </Buttons>
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
