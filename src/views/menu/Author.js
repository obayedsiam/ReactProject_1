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
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
} from '@coreui/react';
import AuthorAPI from '../menu/AuthorApi';

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

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm, sortCriteria, sortOrder, pageSize]);

  const fetchAuthors = () => {
    AuthorAPI.getAuthors(currentPage - 1, pageSize, sortCriteria || 'id', sortOrder, searchTerm)
      .then((response) => {
        setAuthors(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching authors:', error);
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
    if (window.confirm('Are you sure?')) {
      setAuthors(authors.filter((a) => a.id !== id));
    }
  };

  const handleUpdate = () => {
    if (editAuthor) {
      const updatePayload = {
        id: editAuthor.id,
        name: formData.name,
        recordStatus: "ACTIVE"
      };

      AuthorAPI.updateAuthor(updatePayload)
        .then(() => {
          fetchAuthors();
          setVisible(false);
        })
        .catch((error) => {
          console.error("Error updating author:", error);
        });

    } else {
      const addPayload = {
        writerName: formData.name
      };

      AuthorAPI.addAuthor(addPayload)
        .then(() => {
          fetchAuthors();
          setVisible(false);
        })
        .catch((error) => {
          console.error("Error adding author:", error);
        });
    }
  };


  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <strong>Authors</strong>
              <div
                className="d-flex align-items-center gap-2"
                style={{ flexWrap: 'nowrap', overflowX: 'auto' }}
              >
                <CFormInput
                  size="sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
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
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
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
                  + Add Author
                </CButton>
              </div>
            </div>
          </CCardHeader>

          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {authors.map((author) => (
                  <CTableRow key={author.id}>
                    <CTableDataCell>{author.name}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(author)}
                        style={{ minWidth: '60px' }}
                      >
                        Edit
                      </CButton>

                      <CButton
                        color="secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDelete(author.id)}
                        style={{ minWidth: '60px' }}
                      >
                        Book
                      </CButton>

                      <CButton
                        color="secondary" // Different color for distinction
                        size="sm"
                        className="me-2"
                        onClick={() => handleDetails(author.id)}
                        style={{ minWidth: '60px' }}
                      >
                        Details
                      </CButton>

                      <CButton
                        color="danger"
                        size="sm"

                        onClick={() => handleDelete(author.id)}
                        style={{ minWidth: '60px' }}
                      >
                        Delete
                      </CButton>


                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editAuthor ? 'Edit Author' : 'Add New Author'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Author Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-3"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleUpdate}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default Author;
