import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ListHeader from '../../../components/header/ListHeader'
import usePaginatedList from '../../../hooks/usePaginatedList'
import BookAPI from '../../../api/BookAPI'
import ConfirmModal from '../../../components/modals/ConfirmModal'
import BookFormModal from '../../../components/modals/BookFormModal'
import EntityTable from '../../../components/tables/EntityTable'
import PaginationControls from '../../../components/tables/PaginationControls'
import useToast from '../../../hooks/useToast'

import './Book.css' // 🔸 import the custom scroll CSS

const Book = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editBook, setEditBook] = useState(null)
  const [formData, setFormData] = useState({ name: '' })
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [BookToDelete, setBookToDelete] = useState(null)

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
    data: Books,
    searchTerm, setSearchTerm,
    sortCriteria, setSortCriteria,
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    totalPages,
    refetch
  } = usePaginatedList(BookAPI.getBooks, BookAPI.getAllBooks)

  const handleAddNew = () => {
    setEditBook(null)
    setFormData({ name: '' })
    setModalVisible(true)
  }

  const handleEdit = (book) => {
    setEditBook(book)
    setFormData({ name: book.name })
    setModalVisible(true)
  }

  const handleDelete = (id) => {
    setBookToDelete(id)
    setConfirmDeleteVisible(true)
  }

  const handleSave = () => {
    const payload = { ...formData }
    if (editBook) payload.id = editBook.id

    const action = editBook ? BookAPI.updateBook : BookAPI.addBook
    action(payload)
      .then(() => {
        refetch()
        setModalVisible(false)
        showToast(`Book ${editBook ? 'updated' : 'added'} successfully`, 'success')
      })
      .catch(() => {
        showToast(`Failed to ${editBook ? 'update' : 'add'} book`, 'error')
      })
  }

  return (
    <>
      <ListHeader
        title="Book List"
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
              items={Books}
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
      <BookFormModal
        visible={modalVisible}
        setVisible={setModalVisible}
        isEdit={!!editBook}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSave}
      />

      <ConfirmModal
        visible={confirmDeleteVisible}
        setVisible={setConfirmDeleteVisible}
        title="Confirm Delete"
        message="Are you sure you want to delete this book?"
        onConfirm={() => {
          BookAPI.deleteBook(BookToDelete)
            .then(() => {
              refetch()
              showToast('Book deleted successfully', 'success')
            })
            .catch(() => {
              showToast('Failed to delete book', 'error')
            })
        }}
        confirmText="Delete"
        confirmColor="danger"
      />
      <ToastContainer />
    </>
  )
}

export default Book
