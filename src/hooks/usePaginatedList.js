import { useState, useEffect } from 'react';

const usePaginatedList = (fetchFn, fetchAllFunction = null, defaultSort = 'id', defaultSize = 5) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState(defaultSort);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultSize);
  const [totalPages, setTotalPages] = useState(1);

  const refetch = () => {
    if (pageSize === 'all' && fetchAllFunction) {
      fetchAllFunction(searchTerm)
        .then((res) => {
          setData(res.data || []);
          setTotalPages(1);
        })
        .catch((err) => console.error('Fetch all failed', err));
    } else {
      fetchFn(currentPage - 1, pageSize, sortCriteria, sortOrder, searchTerm)
        .then((res) => {
          const r = res.data;
          setData(r.data || []);
          setTotalPages(r.totalPages || 1);
        })
        .catch((err) => console.error('Fetch error:', err));
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
    totalPages,
    refetch
  };
};

export default usePaginatedList;
