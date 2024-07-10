import React from 'react'
import { useForm } from 'react-hook-form';

function AssistanteForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/demandes', data);
            console.log('Demande envoyée:', response.data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la demande:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Formulaire de Demande</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700">Role</label>
                    <input
                        type="text"
                        id="role"
                        className={`w-full px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        defaultValue="assistante"
                        readOnly
                        {...register('role', { required: true })}
                    />
                    {errors.role && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="nom" className="block text-gray-700">Nom du Stagiaire</label>
                    <input
                        type="text"
                        id="nom"
                        className={`w-full px-3 py-2 border  rounded-md`}
                        {...register('nom', { required: true })}
                    />
                    {errors.nom && <span className="text-red-500 text-sm">Ce champ est requis</span>}
                </div>

                <div className='mb-4'>
                    <label htmlFor="typeDocument" className="block text-gray-700 mb-4">Type de Document</label>
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
}

export default AssistanteForm