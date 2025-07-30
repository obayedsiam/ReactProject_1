import { useState, useEffect } from 'react';

const usePaginatedList = (fetchFn, fetchAllFunction = null, defaultSort = 'id', defaultSize = 5) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState(defaultSort);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultSize);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const refetch = () => {
    const handleSuccess = (res) => {
      const { data = [], totalPages = 1 } = res.data || {};
      setData(data);
      setTotalPages(totalPages);
      setTotalElements(res.data.totalElements || 0)
    };

    const handleError = (message) => (err) => {
      console.error(message, err);
    };

    if (pageSize === 'all' && fetchAllFunction) {
      fetchAllFunction(searchTerm)
        .then(handleSuccess)
        .catch(handleError('Fetch all failed'));
    } else {
      fetchFn(currentPage - 1, pageSize, sortCriteria, sortOrder, searchTerm)
        .then(handleSuccess)
        .catch(handleError('Fetch error:'));
    }
  };


  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchTerm, sortCriteria, sortOrder]);

  return {
    data,
    searchTerm, setSearchTerm,
    sortCriteria, setSortCriteria,
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    totalElements,
    totalPages,
    refetch
  };
};

export default usePaginatedList;
