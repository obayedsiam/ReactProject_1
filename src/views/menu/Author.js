import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'

const Author = () => {
  const [authors, setAuthors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    // Dummy data for now
    setAuthors([
      { id: 1, name: 'J.K. Rowling', details: 'Author of Harry Potter' },
      { id: 2, name: 'George R.R. Martin', details: 'Author of Game of Thrones' },
      { id: 3, name: 'J.R.R. Tolkien', details: 'Author of The Lord of the Rings' },
      { id: 4, name: 'Dan Brown', details: 'Author of The Da Vinci Code' },
      { id: 5, name: 'Agatha Christie', details: 'Famous mystery novelist' },
      { id: 6, name: 'Paulo Coelho', details: 'Author of The Alchemist' },
    ])
  }, [])

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredAuthors.length / pageSize)
  const displayedAuthors = filteredAuthors.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleEdit = (id) => {
    console.log('Edit author:', id)
  }

  const handleDelete = (id) => {
    console.log('Delete author:', id)
  }

  const handleAddNew = () => {
    console.log('Add new author')
  }

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="mb-0">Author List</h5>
        <div className="d-flex gap-2">
          <CFormInput
            size="sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            {displayedAuthors.map((author) => (
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
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
          </CPagination>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default Author
