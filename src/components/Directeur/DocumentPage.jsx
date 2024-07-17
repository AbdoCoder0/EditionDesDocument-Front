import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentPage = () => {
    const { type } = useParams();

    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7153/Requests/list');
                console.log('Requests fetched:', response.data);
                // Filter requests based on type
                const filteredRequests = response.data.filter(request => request.documentType === type);
                setRequests(filteredRequests);
                setFilteredRequests(filteredRequests); // Initialize filtered requests with all requests initially
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchData();
    }, [type]); // Trigger useEffect whenever 'type' changes

    return (
        <div className="p-4 mt-11">
            <h1 className="flex justify-center items-center text-xl font-bold mt-10">{type}</h1>
            <div className="App flex justify-center items-center mt-16">
                <div className="flex flex-col items-center w-full mx-40">
                    <div className="overflow-x-auto mt-10 w-full">
                        <table className="bg-white border border-gray-200 w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Nom et Prenom</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Expéditeur</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Date de validation</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Refference</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">état</th>
                                    <th className="text-left py-3 px-1 font-semibold text-sm"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((request) => (
                                    <tr key={request.id}>
                                        <td className="border-t py-3 px-4">{request.nameTrainee}</td>
                                        <td className="border-t py-3 px-4">{request.role}</td>
                                        <td className="border-t py-3 px-4">{new Date(request.lastModifiedDate).toLocaleDateString()}</td>
                                        <td className="border-t py-3 px-4">{request.id}</td>
                                        <td className="border-t py-3 px-4">{request.documentStatus}</td>
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
    );
};

export default DocumentPage;
