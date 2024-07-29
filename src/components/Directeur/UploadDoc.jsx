import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import H1 from '../atoms/H1';
import Buttons from '../atoms/Buttons';

function UploadDoc() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    try {
      const response = await axios.post('https://localhost:7153/api/File/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });
      console.log('Server Response:', response);

      if (response.status === 200) {
        setUploadSuccess(true);
        setUploadError(false);
      } else {
        setUploadSuccess(false);
        setUploadError(true);
      }
    } catch (error) {
      console.error('Une erreur s est produite lors du téléchargement du fichier !', error);
      setUploadSuccess(false);
      setUploadError(true);
    }
  };

  return (
    <>
      <H1 className='mt-40 mb-4' color="blue">Ajouter un document</H1>
      

      <div className="max-w-md mx-auto mt-10 card p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div className="mb-4">
          <input
            type="file"
            {...register('file', { required: 'choisi un document' })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
        </div>
        <Buttons type="primary">Envoyer la Demande</Buttons>
        

      </form>

      {uploadProgress > 0 && (
        <div className="mt-4">
          <p>Progression du téléchargement:{uploadProgress}%</p>
          <div className="relative w-full bg-gray-200 rounded">
            <div className="absolute top-0 h-2 bg-blue-500 rounded" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}

      {uploadSuccess && <p className="text-green-500 text-center mt-4">Fichier téléchargé avec succès!</p>}
      {uploadError && <p className="text-red-500 text-center mt-4">Une erreur s'est produite lors du téléchargement du fichier.</p>}
    </div>
    </>
  );
}

export default UploadDoc;
