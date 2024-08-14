import React, { useState, useEffect } from 'react';
import Radio from './Radio';
import InputFilter from './InputFilter';
import DateFilter from './DateFilter';

function FiltrageDocument({ onFilteredRequests, requests }) {
    const [filterText, setFilterText] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState(''); 

    const filterRequests = () => {
        const filteredRequests = requests.filter(request => {
            return (
                (request.nameTrainee?.toLowerCase().includes(filterText.toLowerCase()) ?? true) &&
                (filterDate === '' || new Date(request.createdDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString()) &&
                (filterStatus === '' || request.status === filterStatus)
            );
        });

        onFilteredRequests(filteredRequests);
    };

    // Update filtered requests whenever filter values change
    useEffect(() => {
        filterRequests();
    }, [filterText, filterDate, filterStatus, requests]);

    return (
        <div className="flex flex-row gap-24 mt-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-md w-full">
            <InputFilter filterText={filterText} onFilterTextChange={setFilterText} />
            <DateFilter filterDate={filterDate} onFilterDateChange={setFilterDate} />
            <Radio filterStatus={filterStatus} onFilterStatusChange={setFilterStatus} /> 
        </div>
    );
}

export default FiltrageDocument;
