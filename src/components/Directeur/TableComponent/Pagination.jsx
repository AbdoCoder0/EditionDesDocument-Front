function Pagination(){

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);    
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(requests.length / requestsPerPage); i++) {
      pageNumbers.push(i);
    }


    return(
        <>
 <div className="mt-4">
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`px-3 py-1 mx-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              ))}
</div>
</>
    )
}
export default Pagination


