  import React from 'react';

  import { useState } from 'react';
  import Dropdown from './TableComponent/DropDown';
  import InputFilter from './TableComponent/InputFilter';
  import Radio from './TableComponent/Radio';
  import DateFilter from './TableComponent/DateFilter';

  function Filtrage({ onFilteredRequests, requests }) {
      const [filterText, setFilterText] = useState('');
      const [filterType, setFilterType] = useState('');
      const [filterStatus, setFilterStatus] = useState('');
      const [filterDate, setFilterDate] = useState('');
    
      const filterRequests = () => {
        const filteredRequests = requests.filter(request => {
          return (
            (request.nameTrainee?.toLowerCase().includes(filterText.toLowerCase()) ?? true) &&
            (filterType === '' || request.documentType === filterType) &&
            (filterStatus === '' || request.documentStatus.toString() === filterStatus) &&
            (filterDate === '' || new Date(request.createdDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString())
          );
        });
    
        onFilteredRequests(filteredRequests);
      };
    
      // Update filtered requests whenever filter values change
      React.useEffect(() => {
        filterRequests();
      }, [filterText, filterType, filterStatus, filterDate, requests]);
    
      return (
        <div className="flex flex-row gap-24 mt-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-md w-full">
          <InputFilter filterText={filterText} onFilterTextChange={setFilterText} />
          <Dropdown filterType={filterType} onFilterTypeChange={setFilterType} />
          <DateFilter filterDate={filterDate} onFilterDateChange={setFilterDate} />
          <Radio filterStatus={filterStatus} onFilterStatusChange={setFilterStatus} />
        </div>
      );
    }
    
    export default Filtrage;