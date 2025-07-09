import { useState, useEffect } from 'react';
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
  CToast,
  CToastBody,
} from '@coreui/react';
import AuthorAPI from '../menu/AuthorApi';
import AuthorHeader from '../menu/AuthorHeader';

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editAuthor, setEditAuthor] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('success');
  const [totalCount, setTotalCount] = useState(0); // New: total authors count for pagination
  const [totalPages, setTotalPages] = useState(0);

  const showToast = (message, color = 'success') => {
    setToastMessage(message);
    setToastColor(color);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm, sortCriteria, sortOrder, pageSize]);

  const fetchAuthors = () => {
    AuthorAPI.getAuthors(currentPage - 1, pageSize, sortCriteria || 'id', sortOrder, searchTerm)
      .then((response) => {
        const result = response.data;
        setAuthors(result.data);
        setTotalPages(result.totalPages); // <-- THIS IS THE FIX
      })
      .catch((error) => {
        console.error('Error fetching authors:', error);
        showToast('Failed to fetch authors', 'danger');
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNew = () => {
    setEditAuthor(null);
    setFormData({ name: '' });
    setVisible(true);
  };

  const handleEdit = (author) => {
    setEditAuthor(author);
    setFormData(author);
    setVisible(true);
  };

  const handleDelete = (id) => {
    setAuthorToDelete(id);
    setConfirmDeleteVisible(true);
  };

  const handleUpdate = () => {
    if (editAuthor) {
      const updatePayload = {
        id: editAuthor.id,
        name: formData.name,
        recordStatus: 'ACTIVE',
      };
      AuthorAPI.updateAuthor(updatePayload)
        .then((res) => {
          fetchAuthors();
          setVisible(false);
          showToast(res.data?.message || 'Author updated successfully');
        })
        .catch((error) => {
          console.error('Error updating author:', error);
          showToast('Error updating author', 'danger');
        });
    } else {
      const addPayload = { name: formData.name };
      AuthorAPI.addAuthor(addPayload)
        .then((res) => {
          fetchAuthors();
          setVisible(false);
          showToast(res.data?.message || 'Author added successfully');
        })
        .catch((error) => {
          console.error('Error adding author:', error);
          showToast('Error adding author', 'danger');
        });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <CRow>
      <CCol>
        <CCard>
          <AuthorHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
            sortCriteria={sortCriteria}
            setSortCriteria={setSortCriteria}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleAddNew={handleAddNew}
          />
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  {/* <CTableHeaderCell>Actions</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {authors.map((author) => (
                  <CTableRow key={author.id}>
                    <CTableDataCell>{author.name}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-end flex-wrap gap-2">
                        <CButton color="primary" size="sm" onClick={() => handleDelete(author.id)} style={{ minWidth: '60px' }}>Book List</CButton>
                        <CButton color="secondary" size="sm" onClick={() => handleDetails(author.id)} style={{ minWidth: '60px' }}>Details</CButton>
                        <CButton color="info" size="sm" onClick={() => handleEdit(author)} style={{ minWidth: '60px' }}>Edit</CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(author.id)} style={{ minWidth: '60px' }}>Delete</CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3 flex-wrap gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <CButton
                    key={page}
                    color={page === currentPage ? 'primary' : 'secondary'}
                    size="sm"
                    style={{ minWidth: '36px' }}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </CButton>
                ))}
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Add/Edit Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editAuthor ? 'Edit Author' : 'Add New Author'}</CModalTitle>
        </CModalHeader>
        <CForm
          onSubmit={(e) => {
            e.preventDefault();  // Prevent page reload
            handleUpdate();      // Call your save function
          }}
        >
          <CModalBody>
            <CFormInput
              label="Author Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-3"
              autoFocus
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit">  {/* Submit type */}
              Save
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Confirm Delete Modal */}
      <CModal visible={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this author?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="danger"
            onClick={() => {
              AuthorAPI.deleteAuthor(authorToDelete)
                .then((res) => {
                  fetchAuthors();
                  showToast(res.data?.message || 'Author deleted successfully');
                  setConfirmDeleteVisible(false);
                })
                .catch((error) => {
                  console.error('Error deleting author:', error);
                  showToast('Error deleting author', 'danger');
                  setConfirmDeleteVisible(false);
                });
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Toast */}
      {toastVisible && (
        <CToast
          visible={toastVisible}
          color={toastColor}
          autohide
          delay={3000}
          onClose={() => setToastVisible(false)}
          className="position-fixed top-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          <CToastBody
            style={{
              backgroundColor:
                toastColor === 'danger' ? '#dc3545' :
                  toastColor === 'success' ? '#198754' :
                    '#0d6efd',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px 16px',
            }}
          >
            {toastMessage}
          </CToastBody>
        </CToast>
      )}
    </CRow>
  );
};

export default Author;
