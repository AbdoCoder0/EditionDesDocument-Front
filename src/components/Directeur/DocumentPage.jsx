import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Buttons from '../atoms/Buttons';
import Pagination from './TableComponent/Pagination';
import FiltrageDocument from './TableComponent/FitrageDocument';

const DocumentPage = () => {
    const { type } = useParams();

    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(5);

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

    // Document status logic
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
        <div className="p-4 mt-11 mb-20">
            <h1 className="flex justify-center items-center text-xl font-bold mt-10">{type}</h1>
            <div className="App flex justify-center items-center mt-16">
                <div className="flex flex-col items-center w-full mx-40">
                    <FiltrageDocument requests={requests} onFilteredRequests={setFilteredRequests} />
                    <div className="overflow-x-auto mt-10 w-full">
                        <table className="bg-white border border-gray-200 w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Nom et Prenom</th>
                                    <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Expéditeur</th>
                                    <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Date de validation</th>
                                    <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Refference</th>
                                    <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">état</th>
                                    <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRequests.map((request) => ( // Use currentRequests here for pagination
                                    <tr key={request.id}>
                                        <td className="border-t py-3 px-4 border-gris-moyen">{request.nameTrainee !== null ? request.nameTrainee : "Stagiaire"}</td>
                                        <td className="border-t py-3 px-4">{request.role}</td>
                                        <td className="border-t py-3 px-4">{new Date(request.lastModifiedDate).toLocaleDateString()}</td>
                                        <td className="border-t py-3 px-4">{request.id}</td>
                                        <td className={`border-t py-3 px-4 border-gris-moyen ${getDocumentStatus(request.documentStatus).className}`}>
                                            {getDocumentStatus(request.documentStatus).text}
                                        </td>
                                        <td className="border-t py-3 px-1">
                                            <Buttons type="secondary">
                                                Imprimer
                                            </Buttons>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentPage;
