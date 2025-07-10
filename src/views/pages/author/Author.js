import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ListHeader from '../../../components/header/ListHeader'
import usePaginatedList from '../../../hooks/usePaginatedList'
import AuthorAPI from '../../../api/AuthorAPI'
import ConfirmModal from '../../../components/modals/ConfirmModal'
import EntityFormModal from '../../../components/modals/EntityFormModal'
import EntityTable from '../../../components/tables/EntityTable'
import PaginationControls from '../../../components/tables/PaginationControls'
import useToast from '../../../hooks/useToast'

import './Author.css' // 🔸 import the custom scroll CSS

const Author = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editAuthor, setEditAuthor] = useState(null)
  const [formData, setFormData] = useState({ name: '' })
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [authorToDelete, setAuthorToDelete] = useState(null)

  const showToast = useToast()

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = 'hidden'
    return () => {
      // Re-enable scroll on unmount
      document.body.style.overflow = 'auto'
    }
  }, [])

  const {
    data: authors,
    searchTerm, setSearchTerm,
    sortCriteria, setSortCriteria,
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    totalPages,
    refetch
  } = usePaginatedList(AuthorAPI.getAuthors, AuthorAPI.getAllAuthors)

  const handleAddNew = () => {
    setEditAuthor(null)
    setFormData({ name: '' })
    setModalVisible(true)
  }

  const handleEdit = (author) => {
    setEditAuthor(author)
    setFormData({ name: author.name })
    setModalVisible(true)
  }

  const handleDelete = (id) => {
    setAuthorToDelete(id)
    setConfirmDeleteVisible(true)
  }

  const handleSave = () => {
    const payload = { ...formData }
    if (editAuthor) payload.id = editAuthor.id

    const action = editAuthor ? AuthorAPI.updateAuthor : AuthorAPI.addAuthor
    action(payload)
      .then(() => {
        refetch()
        setModalVisible(false)
        showToast(`Author ${editAuthor ? 'updated' : 'added'} successfully`, 'success')
      })
      .catch(() => {
        showToast(`Failed to ${editAuthor ? 'update' : 'add'} author`, 'error')
      })
  }

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
        <CCardBody style={{ padding: 0 }}>
          <div className="scrollable-table-container">
            <EntityTable
              items={authors}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDetails={(id) => console.log('Details', id)}
            />
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
          />
        </CCardBody>
      </CCard>
      <EntityFormModal
        visible={modalVisible}
        setVisible={setModalVisible}
        isEdit={!!editAuthor}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSave}
      />

      <ConfirmModal
        visible={confirmDeleteVisible}
        setVisible={setConfirmDeleteVisible}
        title="Confirm Delete"
        message="Are you sure you want to delete this author?"
        onConfirm={() => {
          AuthorAPI.deleteAuthor(authorToDelete)
            .then(() => {
              refetch()
              showToast('Author deleted successfully', 'success')
            })
            .catch(() => {
              showToast('Failed to delete author', 'error')
            })
        }}
        confirmText="Delete"
        confirmColor="danger"
      />
      <ToastContainer />
    </>
  )
}

export default Author
