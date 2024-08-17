import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Buttons from '../atoms/Buttons';
import H1 from '../atoms/H1';
import H3 from '../atoms/H3';
import Text from '../atoms/Text';

// Liste des types de documents disponibles
const documentTypes = [
    'Contrat',
    'Demande de stage',
    'Convention de stage',
    'Attestation d\'inscription',
    'Attestation de scolarité'
];

const Dashboard = () => {
    // États pour stocker les données des documents, l'état de chargement et les erreurs
    const [documentsData, setDocumentsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hook useEffect pour effectuer une requête API lors du montage du composant
    useEffect(() => {
        // Récupérer les données de l'API
        axios.get('https://localhost:7153/Requests/list')
            .then(response => {
                const documents = response.data;
                // Organiser les données des documents par type
                const organizedData = organizeDocumentsData(documents);
                setDocumentsData(organizedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    // Fonction pour organiser les données des documents par type
    const organizeDocumentsData = (documents) => {
        const data = {};
        documentTypes.forEach(type => {
            data[type] = { validées: 0, enCours: 0, refusées: 0, validéesList: [] };
        });

        documents.forEach(doc => {
            const type = doc.documentType;
            if (data[type]) {
                if (doc.documentStatus === 0) data[type].enCours += 1;
                if (doc.documentStatus === 1) {
                    data[type].validées += 1;
                    data[type].validéesList.push(doc);
                }
                if (doc.documentStatus === 2) data[type].refusées += 1;
            }
        });

        return data;
    };

    // Affichage d'un message de chargement pendant la récupération des données
    if (loading) {
        return <p>Loading...</p>;
    }

    // Affichage d'un message d'erreur en cas de problème lors de la récupération des données
    if (error) {
        return <p>There was an error loading the data.</p>;
    }

    return (
        <div className="p-4">
            <H1 className="mb-4">Tableau de bord</H1>
            <div className="my-16 flex justify-center gap-10">
                <Link to={"/directeurTable"} className='p-2'>
                    <Buttons type='secondary'>Historique des demandes</Buttons>
                </Link>
                <Link to={"/directeurForm"} className='p-2'>
                    <Buttons type='primary'>Ajouter une demande</Buttons>
                </Link>
                <Link to={"/uploadDoc"} className='p-2'>
                    <Buttons type='secondary'>Basculez vers le laboratoire</Buttons>
                </Link>
                <Link to={"/traineeTable"} className='p-2'>
                    <Buttons type='secondary'>list Trainee</Buttons>
                </Link>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {documentTypes.map((type, i) => (
                        <Link key={i} to={`/documents/${encodeURIComponent(type)}`} className="w-80 bg-white rounded-b-lg border-t-8 border-bleu-fonce px-4 py-5 flex flex-col justify-around shadow-md rounded-xl transform transition duration-500 hover:scale-105">
                            <H3 type="medium">{type}</H3>
                            <div className="mt-2">
                                <p className='mb-3 flex justify-between'>
                                    <Text>Validées</Text>
                                    <Text>{documentsData[type]?.validées || 0}</Text>
                                </p>
                                <p className='mb-3 flex justify-between'>
                                    <Text>En cours</Text>
                                    <Text>{documentsData[type]?.enCours || 0}</Text>
                                </p>
                                <p className='mb-3 flex justify-between'>
                                    <Text>Refusées</Text>
                                    <Text>{documentsData[type]?.refusées || 0}</Text>
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
