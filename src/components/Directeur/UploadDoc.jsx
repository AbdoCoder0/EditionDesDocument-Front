import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
      console.error('There was an error uploading the file!', error);
      setUploadSuccess(false);
      setUploadError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-36">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Document</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="file"
            {...register('file', { required: 'Please select a file' })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">Upload</button>
      </form>

      {uploadProgress > 0 && (
        <div className="mt-4">
          <p>Upload Progress: {uploadProgress}%</p>
          <div className="relative w-full bg-gray-200 rounded">
            <div className="absolute top-0 h-2 bg-blue-500 rounded" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}

      {uploadSuccess && <p className="text-green-500 text-center mt-4">File uploaded successfully!</p>}
      {uploadError && <p className="text-red-500 text-center mt-4">There was an error uploading the file.</p>}
    </div>
  );
}

export default UploadDoc;
