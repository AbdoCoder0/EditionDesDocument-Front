import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function AssistanteForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const requestData = {
            ...data,
            role: 'assistant',
            idTrainee: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            modeleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            documentStatus: 0,
            reasonRejection: "string",
            motifRejection: "string"
        };

        console.log(data);
        "----------------"
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
            <h1 className='mt-40 mb-4 text-[25px] font-bold flex justify-center items-center'>Interface assistante pedagogique</h1>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
                <Toaster /> 
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Formulaire de Demande</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="nameTrainee" className="block text-gray-700 mb-4">Nom du Stagiaire</label>
                        <input
                            type="text"
                            id="nameTrainee"
                            className={`w-full px-3 py-2 border ${errors.nameTrainee ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('nameTrainee', { required: true })}
                        />
                        {errors.nameTrainee && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="documentType" className="block text-gray-700 mb-4">Type de Document</label>
                        <select
                            id="documentType"
                            className={`w-full px-3 py-2 border ${errors.documentType ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('documentType', { required: true })}
                        >
                            <option value="">Sélectionnez un type de document</option>
                            <option value="Contrat">Contrat</option>
                            <option value="Demande de stage">Demande de stage</option>
                            <option value="Convention de stage">Convention de stage</option>
                            <option value="Attestation d'inscription">Attestation d'inscription</option>
                            <option value="Attestation de scolarité">Attestation de scolarité</option>
                        </select>
                        {errors.documentType && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        Envoyer la Demande
                    </button>
                </form>
            </div>
        </>
    );
}

export default AssistanteForm;
