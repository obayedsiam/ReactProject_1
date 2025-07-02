import { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormSelect,
} from '@coreui/react'

const Books = () => {
  const [books, setBooks] = useState([])
  const [visible, setVisible] = useState(false)
  const [editBook, setEditBook] = useState(null)
  const [formData, setFormData] = useState({ name: '', author: '', genre: '', buyingDate: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [sortCriteria, setSortCriteria] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    setBooks([
      { id: 1, name: 'Book One', author: 'Author A', genre: 'Fiction', buyingDate: '2023-05-01' },
      { id: 2, name: 'Book Two', author: 'Author B', genre: 'Non-Fiction', buyingDate: '2022-11-15' },
      { id: 3, name: 'Book Three', author: 'Author C', genre: 'History', buyingDate: '2023-01-10' },
      { id: 4, name: 'Book Four', author: 'Author D', genre: 'Science', buyingDate: '2021-09-20' },
      { id: 5, name: 'Book Five', author: 'Author E', genre: 'Fantasy', buyingDate: '2024-02-05' },
      { id: 6, name: 'Book Six', author: 'Author F', genre: 'Biography', buyingDate: '2023-07-18' },
    ])
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddNew = () => {
    setEditBook(null)
    setFormData({ name: '', author: '', genre: '', buyingDate: '' })
    setVisible(true)
  }

  const handleEdit = (book) => {
    setEditBook(book)
    setFormData(book)
    setVisible(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setBooks(books.filter((b) => b.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editBook) {
      setBooks(books.map((b) => (b.id === editBook.id ? { ...formData, id: b.id } : b)))
    } else {
      const newBook = { ...formData, id: Date.now() }
      setBooks([...books, newBook])
    }
    setVisible(false)
  }

  const filteredBooks = books
    .filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.genre.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const valA = sortCriteria === 'name' ? a.name.toLowerCase() : a.buyingDate
      const valB = sortCriteria === 'name' ? b.name.toLowerCase() : b.buyingDate
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  const indexOfLastItem = currentPage * pageSize
  const indexOfFirstItem = indexOfLastItem - pageSize
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredBooks.length / pageSize)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <strong>Books</strong>
              <div
                className="d-flex align-items-center gap-2"
                style={{ flexWrap: 'nowrap', overflowX: 'auto' }}
              >
                <CFormInput
                  size="sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '150px' }}
                />

                <CFormSelect
                  size="sm"
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value)}
                  style={{ minWidth: '130px', whiteSpace: 'nowrap' }}
                >
                  <option value="">Sort by</option>
                  <option value="name">Name</option>
                  <option value="buyingDate">Buying Date</option>
                </CFormSelect>

                <CButton
                  color="secondary"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  style={{ minWidth: '80px', whiteSpace: 'nowrap' }}
                >
                  {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                </CButton>

                <CFormSelect
                  size="sm"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  style={{ minWidth: '80px', whiteSpace: 'nowrap' }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </CFormSelect>

                <CButton
                  color="primary"
                  size="sm"
                  onClick={handleAddNew}
                  style={{ minWidth: '100px', whiteSpace: 'nowrap' }}
                >
                  + Add Book
                </CButton>
              </div>
            </div>
          </CCardHeader>

          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Author</CTableHeaderCell>
                  <CTableHeaderCell>Genre</CTableHeaderCell>
                  <CTableHeaderCell>Buying Date</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((book) => (
                  <CTableRow key={book.id}>
                    <CTableDataCell>{book.name}</CTableDataCell>
                    <CTableDataCell>{book.author}</CTableDataCell>
                    <CTableDataCell>{book.genre}</CTableDataCell>
                    <CTableDataCell>{book.buyingDate}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(book)}
                        style={{ minWidth: '60px' }}
                      >
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(book.id)}
                        style={{ minWidth: '60px' }}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <div className="d-flex justify-content-center mt-3 flex-wrap gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <CButton
                  key={page}
                  color={page === currentPage ? 'primary' : 'secondary'}
                  size="sm"
                  style={{ minWidth: '36px' }}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </CButton>
              ))}
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editBook ? 'Edit Book' : 'Add New Book'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Book Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              label="Buying Date"
              name="buyingDate"
              type="date"
              value={formData.buyingDate}
              onChange={handleInputChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Books
