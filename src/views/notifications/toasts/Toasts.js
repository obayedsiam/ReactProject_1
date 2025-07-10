import React, { useState, useRef } from 'react';
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react';

import ListHeader from '../../../components/headers/ListHeader';
import usePaginatedList from '../../../hooks/usePaginatedList';
import AuthorAPI from '../../../api/AuthorAPI';

const Author = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editAuthor, setEditAuthor] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  const [toast, setToast] = useState(null);
  const toasterRef = useRef();

  const showToast = (message, color = 'primary') => {
    const toast = (
      <CToast autohide={true} delay={3000} color={color} key={Date.now()}>
        <CToastHeader closeButton>
          <strong className="me-auto">Notification</strong>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    );
    setToast(toast);
  };

  const {
    data: authors,
    searchTerm, setSearchTerm,
    sortCriteria, setSortCriteria,
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    totalPages,
    refetch,
  } = usePaginatedList(AuthorAPI.getAuthors);

  const handleAddNew = () => {
    setEditAuthor(null);
    setFormData({ name: '' });
    setModalVisible(true);
  };

  const handleEdit = (author) => {
    setEditAuthor(author);
    setFormData({ name: author.name });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this author?')) {
      AuthorAPI.deleteAuthor(id)
        .then(() => {
          refetch();
          showToast('Author deleted successfully', 'success');
        })
        .catch(() => showToast('Failed to delete author', 'danger'));
    }
  };

  const handleSave = () => {
    const payload = { ...formData };
    if (editAuthor) payload.id = editAuthor.id;

    const action = editAuthor ? AuthorAPI.updateAuthor : AuthorAPI.addAuthor;
    action(payload)
      .then(() => {
        refetch();
        setModalVisible(false);
        showToast(`Author ${editAuthor ? 'updated' : 'added'} successfully`, 'success');
      })
      .catch(() => showToast(`Failed to ${editAuthor ? 'update' : 'add'} author`, 'danger'));
  };

  return (
    <>
      <ListHeader
        title="Author List"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onAddNew={handleAddNew}
        sortOptions={[{ label: 'Name', value: 'name' }]}
      />

      <CCard className="mt-3">
        <CCardBody>
          <CTable striped responsive>
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
                    <CButton size="sm" color="info" className="me-2" onClick={() => handleEdit(author)}>Edit</CButton>
                    <CButton size="sm" color="danger" onClick={() => handleDelete(author.id)}>Delete</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <CButton
                  key={i}
                  color={currentPage === i + 1 ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </CButton>
              ))}
            </div>
          )}
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>{editAuthor ? 'Edit Author' : 'Add New Author'}</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <CModalBody>
            <CFormInput
              label="Author Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              required
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
            <CButton type="submit" color="primary">Save</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Single Toast Toaster */}
      <CToaster ref={toasterRef} push={toast} placement="top-end" />
    </>
  );
};

export default Author;
