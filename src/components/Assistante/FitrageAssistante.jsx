import React, { useState, useEffect } from 'react';
import InputFilter from '../Directeur/TableComponent/InputFilter';
import Dropdown from '../Directeur/TableComponent/DropDown';
import DateFilter from '../Directeur/TableComponent/DateFilter';

function FiltrageAssistante({ onFilteredRequests, requests }) {
    const [filterText, setFilterText] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const filterRequests = () => {
        const filteredRequests = requests.filter(request => {
            return (
                (request.nameTrainee?.toLowerCase().includes(filterText.toLowerCase()) ?? true) &&
                (filterType === '' || request.documentType === filterType) &&
                (filterDate === '' || new Date(request.createdDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString())
            );
        });

        onFilteredRequests(filteredRequests);
    };

    // Update filtered requests whenever filter values change
    useEffect(() => {
        filterRequests();
    }, [filterText, filterType, filterDate, requests]);

    return (
        <div className="flex flex-row gap-24 mt-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-md w-full">
            <InputFilter filterText={filterText} onFilterTextChange={setFilterText} />
            <Dropdown filterType={filterType} onFilterTypeChange={setFilterType} />
            <DateFilter filterDate={filterDate} onFilterDateChange={setFilterDate} />
        </div>
    );
}

export default FiltrageAssistante;
