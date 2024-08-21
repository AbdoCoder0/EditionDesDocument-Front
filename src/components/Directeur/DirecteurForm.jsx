import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Buttons from '../atoms/Buttons';
import Labels from '../atoms/Labels';
import H1 from '../atoms/H1';
import H3 from '../atoms/H3';
import H2 from '../atoms/H2';

function DirecteurForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [documents, setDocuments] = useState([]);
    const [selectedDocumentId, setSelectedDocumentId] = useState('');

    // Fetch document data when the component mounts
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('https://localhost:7153/api/Document/list');
                setDocuments(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    // Handle document type change
    const handleDocumentTypeChange = (e) => {
        const selectedName = e.target.value;
        const selectedDoc = documents.find(doc => doc.name === selectedName);
        setSelectedDocumentId(selectedDoc ? selectedDoc.id : '');
    };

    const onSubmit = async (data) => {
        const requestData = {
            ...data,
            role: 'assistant',
            idTrainee: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            modeleId: selectedDocumentId, // Using selected document ID
            documentStatus: 1,
            reasonRejection: "string",
            motifRejection: "string",
            documentId: selectedDocumentId,

//   nameTrainee: "string",
//   documentType: "string",
//   documentId: 
        };

        console.log(data);
        console.log(requestData);

        try {
            const response = await axios.post('https://localhost:7153/Requests/add', requestData);
            toast.success('Demande envoyée avec succès!');
            console.log('Demande envoyée:', response.data);
            reset();
        } catch (error) {
            toast.error('Erreur lors de l\'envoi de la demande');
            console.error('Erreur lors de l\'envoi de la demande:', error);
        }
    };

    return (
        <>
            <H1 className='mt-40 mb-4 heading-h1 flex justify-center items-center'>Interface Directeur</H1>
            <H3 color='medium' className='mb-3 font-semibold flex justify-center items-center'>Ce document est automatiquement validé</H3>
            <div className="max-w-md mx-auto mt-10 card p-6">
                <Toaster />
                <H2 color='blue' className="card-title mb-4 text-center">Formulaire de Demande</H2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <div className="mb-4">
                        <Labels 
                            htmlFor="nameTrainee" 
                            className="block pb-2 text-gray-700"
                        >
                            Nom du Stagiaire
                        </Labels>
                        <input 
                            type="text"
                            id="nameTrainee"
                            className={`w-full px-3 py-2 border rounded-md ${errors.nameTrainee ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            {...register('nameTrainee', { required: true })}
                        />
                        {errors.nameTrainee && <span className="text-red-500 text-sm mt-1">Ce champ est requis</span>}
                    </div>

                    <div className='mb-4'>
                        <Labels htmlFor="documentType" className="block text-gray-700 mb-4">Type de Document</Labels>
                        <select
                            id="documentType"
                            className={`w-full px-3 py-2 border ${errors.documentType ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('documentType', { required: true })}
                            onChange={handleDocumentTypeChange}
                        >
                            <option value="">Sélectionnez un type de document</option>
                            {documents.map((document) => (
                                <option key={document.id} value={document.name}>
                                    {document.name}
                                </option>
                            ))}
                        </select>
                        {errors.documentType && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                    </div>

                    <Buttons type="primary" className="w-full py-2">Envoyer la Demande</Buttons>
                </form>
            </div>
        </>
    );
};

export default DirecteurForm;
