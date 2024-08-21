import React, { useState, useEffect } from 'react';
import axios from 'axios';
import H1 from '../atoms/H1';

const TraineeTable = () => {
  const [trainees, setTrainees] = useState([]);
  const [filteredTrainees, setFilteredTrainees] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState('');

  const schoolLevels = [
    { value: '', label: 'All Levels' },
    { value: 0, label: 'Specialization' },
    { value: 1, label: 'Qualification' },
    { value: 2, label: 'Technicien' },
    { value: 3, label: 'Specialized Technician' },
  ];

  const schoolLevelLabels = {
    0: 'Specialization',
    1: 'Qualification',
    2: 'Technicien',
    3: 'Specialized Technician',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7153/api/Trainees/list');
        console.log("Fetched trainees:", response.data);

        const sortedData = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setTrainees(sortedData);
        setFilteredTrainees(sortedData);
      } catch (error) {
        console.error('Error fetching trainees:', error);
        setError('Error fetching trainees. Please try again later.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = trainees.filter(trainee =>
      selectedSchoolLevel === '' || trainee.schoolLevel === Number(selectedSchoolLevel)
    );
    setFilteredTrainees(filtered);
  }, [selectedSchoolLevel, trainees]);

  return (
    <>
      <H1 className="mt-10">Liste des Stagiaires</H1>
      <div className="flex justify-center items-center mt-32 mb-40">
        <div className="flex flex-col items-center w-full mx-40">
          {error && <div className="text-red-500">{error}</div>}

          {/* Dropdown for filtering by SchoolLevel */}
          <div className="mb-4">
            <label htmlFor="schoolLevel" className="mr-2">Filter by School Level:</label>
            <select
              id="schoolLevel"
              value={selectedSchoolLevel}
              onChange={(e) => setSelectedSchoolLevel(e.target.value)}
              className="border rounded p-2"
            >
              {schoolLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto mt-10 w-full">
            <table className="bg-white border border-gray-200 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Prénom</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Téléphone</th>
                  <th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">School Level</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainees.map((trainee) => (
                  <tr key={trainee.id}>
                    <td className="border-t py-3 px-4 border-gris-moyen">{trainee.lastName}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{trainee.firstName}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{trainee.email}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{trainee.gsm}</td>
                    <td className="border-t py-3 px-4 border-gris-moyen">{schoolLevelLabels[trainee.schoolLevel]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TraineeTable;
