import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const TraineeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      role: 'stagiaire',
      idTrainee: uuidv4(),
      modeleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      documentStatus: 0
    };

    console.log('Données soumises:', requestData);

    try {
      const response = await axios.post('https://localhost:7153/Requests/list', requestData);
      console.log('Demande envoyée:', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Formulaire de Demande</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div className='mb-4'>
          <label htmlFor="typeDocument" className="block text-gray-700">Type de Document</label>
          <select
            id="typeDocument"
            className={`w-full px-3 py-2 border ${errors.typeDocument ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            {...register('typeDocument', { required: true })}
          >
            <option value="">Sélectionnez un type de document</option>
            <option value="Contrat">Contrat</option>
            <option value="demande de stage">Demande de stage</option>
            <option value="convention de stage">Convention de stage</option>
            <option value="Attestation d'inscription">Attestation d'inscription</option>
            <option value="attestation de scolarité">Attestation de scolarité</option>
          </select>
          {errors.typeDocument && <span className="text-red-500 text-sm">Ce champ est requis</span>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Envoyer la Demande
        </button>
      </form>
    </div>
  );
};

export default TraineeForm;
