import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const documentTypes = [
    'Contrat',
    'Demande de stage',
    'Convention de stage',
    'Attestation d\'inscription',
    'Attestation de scolarité'
];

const Dashboard = () => {
    const [documentsData, setDocumentsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        axios.get('https://localhost:7153/Requests/list')
            .then(response => {
                const documents = response.data;
                const organizedData = organizeDocumentsData(documents);
                setDocumentsData(organizedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setError(error);
                setLoading(false);
            });
    }, [documentsData]);

    const organizeDocumentsData = (documents) => {
        const data = {};
        documentTypes.forEach(type => {
            data[type] = { validées: 0, enCours: 0, refusées: 0, validéesList: [] };
        });

        documents.forEach(doc => {
            const type = doc.documentType;
            if (data[type]) {
                if (doc.documentStatus === 1) data[type].enCours += 1;
                if (doc.documentStatus === 0) {
                    data[type].validées += 1;
                    data[type].validéesList.push(doc);
                }
                if (doc.documentStatus === 2) data[type].refusées += 1;
            }
        });

        return data;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>There was an error loading the data.</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Tableau de bord</h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {documentTypes.map((type) => (
                        <div key={type} className="w-80 bg-white rounded-b-lg border-t-8 border-blue-500 px-4 py-5 flex flex-col justify-around shadow-md rounded-xl transform transition duration-500 
                            hover:scale-105">
                            <h2 className="text-lg font-semibold">{type}</h2>
                            <div className="mt-2">
                                <p className='mb-3 flex justify-between'>
                                    <span>Validées</span>
                                    <span>{documentsData[type]?.validées || 0}</span>
                                </p>
                                <p className='mb-3 flex justify-between'>
                                    <span>En cours</span>
                                    <span>{documentsData[type]?.enCours || 0}</span>
                                </p>
                                <p className='mb-3 flex justify-between'>
                                    <span>Refusées</span>
                                    <span>{documentsData[type]?.refusées || 0}</span>
                                </p>
                            </div>
                            {/* <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => console.log(`Voir les documents validés pour ${type}`)}
              >
                Voir les documents validés
              </button> */}
                        </div>
                    ))}
                </div>
            </div>
            <Link to={"/directeurTable"} className=' bg-red-500 rounded-lg p-2'> Directeur Table</Link>
        </div>
    );
};

export default Dashboard;
