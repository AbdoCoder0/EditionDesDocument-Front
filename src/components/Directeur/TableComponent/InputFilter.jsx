
// import { IoSearch } from 'react-icons/io5';


// function InputFilter(){
//     return(
//         <>
//         <div className="flex mx-0 w-full items-center ">
// <div className="relative block">
//   <span className="absolute inset-y-0 left-0 flex items-center pl-2 h-8 w-8 mt-1">
//     <IoSearch />
//   </span>
//   <input
//     className="placeholder:italic placeholder:text-slate-400 block bg-white w-[400px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm"
//     placeholder="Entrer le nom de stagiaire"
//     type="text"
//     name="search"
//   />
// </div>
// </div>
        
//         </>
//     )
// }
// export default InputFilter


import React from 'react';

const InputFilter = ({ filterText, onFilterTextChange }) => {
  return (
    <input
      type="text"
      placeholder="Filtrer par nom"
      value={filterText}
      onChange={e => onFilterTextChange(e.target.value)}
      className="mt-2 p-2 border rounded w-[400px]"
    />
  );
};

export default InputFilter;
