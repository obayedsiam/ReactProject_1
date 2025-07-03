import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import AuthorAPI from '../menu/AuthorApi';

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Backend page starts from 0
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm]);

  const fetchAuthors = () => {
    AuthorAPI.getAuthors(currentPage, pageSize, "id", "asc", searchTerm)
      .then((response) => {
        setAuthors(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
      });
  };

  const handleEdit = (id) => {
    console.log("Edit author:", id);
    // You can fetch details using getAuthorById(id)
  };

  const handleDelete = (id) => {
    console.log("Delete author:", id);
  };

  const handleAddNew = () => {
    console.log("Add new author");
  };

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="mb-0">Author List</h5>
        <div className="d-flex gap-2">
          <CFormInput
            size="sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0); // Reset to first page on search
            }}
            style={{ width: '200px' }}
          />
          <CButton size="sm" color="primary" onClick={handleAddNew}>
            + Add Author
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CTable align="middle" hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Details</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {authors.map((author) => (
              <CTableRow key={author.id}>
                <CTableDataCell>{author.id}</CTableDataCell>
                <CTableDataCell>{author.name}</CTableDataCell>
                <CTableDataCell>{author.details}</CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="warning" className="me-2" onClick={() => handleEdit(author.id)}>
                    Edit
                  </CButton>
                  <CButton size="sm" color="danger" onClick={() => handleDelete(author.id)}>
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Pagination */}
        <div className="d-flex justify-content-end align-items-center mt-3">
          <CPagination size="sm">
            {[...Array(totalPages)].map((_, index) => (
              <CPaginationItem
                key={index}
                active={index === currentPage}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
          </CPagination>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default Author;
