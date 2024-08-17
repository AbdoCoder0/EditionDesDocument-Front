import React, { useState, useEffect } from'react';
import axios from'axios';
import H1 from'../atoms/H1';

const TraineeTable = () => {
  const [trainees, setTrainees] = useState([]);
  const [filteredTrainees, setFilteredTrainees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7153/api/Trainees/list');
        console.log("Fetched trainees:", response.data);

        // Correct sorting of data by createdDateconst sortedData = response.data.sort((a, b) =>newDate(b.createdDate) - newDate(a.createdDate));
        const sortedData = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setTrainees(sortedData);
        setFilteredTrainees(sortedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des stagiaires:', error);
        setError('Erreur lors de la récupération des stagiaires');
      }
    };

    fetchData();
  }, []);

  return (
    <><H1 className="mt-10">Liste des Stagiaires</H1><div className="flex justify-center items-center mt-32 mb-40"><div className="flex flex-col items-center w-full mx-40">
          {error && <div className="text-red-500">{error}</div>}
          <div className="overflow-x-auto mt-10 w-full"><table className="bg-white border border-gray-200 w-full"><thead><tr className="bg-gray-100"><th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Nom</th><th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Prénom</th><th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Email</th><th className="text-left py-3 px-4 font-semibold text-lg bg-darkBlue text-gris-clair">Téléphone</th></tr></thead><tbody>
                {filteredTrainees.map((trainee) => (
                  <tr key={trainee.id}><td className="border-t py-3 px-4 border-gris-moyen">{trainee.lastName}</td><td className="border-t py-3 px-4 border-gris-moyen">{trainee.firstName}</td><td className="border-t py-3 px-4 border-gris-moyen">{trainee.email}</td><td className="border-t py-3 px-4 border-gris-moyen">{trainee.gsm}</td></tr>
                ))}
              </tbody></table></div></div></div></>
  );
};

export default TraineeTable;
