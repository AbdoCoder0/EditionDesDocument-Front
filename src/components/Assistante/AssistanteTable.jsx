import { IoSearch } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AssistanteTable(){


  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7153/Requests/list');
        console.log('Demande envoyée:', response.data);
        const filteredRequests = response.data.filter(request => request.documentStatus === 1);
        setRequests(filteredRequests); 
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la demande:', error);
      }
    };

    fetchData();
  
  }, []);
    return(
        <>
         <h2 className="text-2xl font-bold  my-6 flex justify-center items-center">Table Assistante pour gerer les documment</h2>

         <div className="App flex justify-center items-center mt-40 ">
         <div className="flex flex-col items-center w-full mx-40">

         <div className=" flex mx-0 w-full items-center ">
            <div className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 h-8 w-8  mt-1">
                <IoSearch />
              </span>
              <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-[400px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm" 
              placeholder="Entrer le nom de stagiaire" type="text" name="search"/>
            </div>

            {/* <div className="flex w-full justify-end ">
                <input id="draft" className="peer/validée" type="radio" name="status" checked />
                <label htmlFor="draft" className="peer-checked/validée:text-green-500 mx-2">validée</label>

                <input id="published" className="peer/attente ml-7" type="radio" name="status" />
                <label htmlFor="published" className="peer-checked/attente:text-orange-500 mx-2">en attente</label>
            </div> */}

         </div>

         <div className="overflow-x-auto mt-10 w-full">

         <div className="overflow-x-auto my-10 w-full">
            <table className="bg-white border border-gray-200 w-full ">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Nom et Prenom</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Type de Document</th>
                  <th className="text-left py-3 px-1 font-semibold text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="border-t py-3 px-4">{(request.nameTrainee !== null) ? request.nameTrainee : "Stagiaire" }</td>
                    <td className="border-t py-3 px-4">{request.documentType}</td>
                    
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
      </div>
        
        </>
    )
}
export default AssistanteTable;