import React from 'react';
import DataTable from '../../../components/tables/DataTable';
import Pagination from '../../../components/tables/Pagination';
import AddEditModal from '../../../components/modals/AddEditModal';

const AuthorTableSection = ({
  authors,
  currentPage,
  totalPages,
  setCurrentPage,
  onEdit,
  onDelete,
  modalVisible,
  setModalVisible,
  formData,
  setFormData,
  onSave,
  editAuthor,
}) => {
  const columns = ['Name', 'Actions'];

  const renderRow = (author) => (
    <>
      <td>{author.name}</td>
      <td>
        <button className="btn btn-sm btn-info me-2" onClick={() => onEdit(author)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(author.id)}>Delete</button>
      </td>
    </>
  );

  return (
    <>
      <DataTable columns={columns} data={authors} renderRow={renderRow} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <AddEditModal
        title={editAuthor ? 'Edit Author' : 'Add New Author'}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={onSave}
        formData={formData}
        setFormData={setFormData}
        fields={[{ label: 'Author Name', name: 'name', type: 'text' }]}
      />
    </>
  );
};

export default AuthorTableSection;
