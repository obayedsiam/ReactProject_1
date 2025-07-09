import React, { useState } from 'react';
import {
    CCard, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell,
    CTableBody, CTableDataCell, CModal, CModalHeader, CModalTitle,
    CModalBody, CModalFooter, CButton, CForm, CFormInput
} from '@coreui/react';

import ListHeader from '../../../components/header/ListHeader';
import usePaginatedList from '../../../hooks/usePaginatedList';
import AuthorAPI from '../../../api/AuthorAPI';

const Author = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editAuthor, setEditAuthor] = useState(null);
    const [formData, setFormData] = useState({ name: '' });

    const {
        data: authors,
        searchTerm, setSearchTerm,
        sortCriteria, setSortCriteria,
        sortOrder, setSortOrder,
        currentPage, setCurrentPage,
        pageSize, setPageSize,
        totalPages,
        refetch
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
            AuthorAPI.deleteAuthor(id).then(() => refetch());
        }
    };

    const handleSave = () => {
        const payload = { ...formData };
        if (editAuthor) payload.id = editAuthor.id;

        const action = editAuthor ? AuthorAPI.updateAuthor : AuthorAPI.addAuthor;
        action(payload).then(() => {
            refetch();
            setModalVisible(false);
        });
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

            {/* Table */}
            <CCard className="mt-3">
                <CCardBody>
                    <CTable striped responsive>
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

                    {/* Pagination */}
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

            {/* Add/Edit Modal */}
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
        </>
    );
};

export default Author;
