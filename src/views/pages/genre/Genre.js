import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ListHeader from '../../../components/header/ListHeader'
import usePaginatedList from '../../../hooks/usePaginatedList'
import GenreAPI from '../../../api/GenreAPI'
import ConfirmModal from '../../../components/modals/ConfirmModal'
import GenreFormModal from '../../../components/modals/GenreFormModal'
import EntityTable from '../../../components/tables/EntityTable'
import PaginationControls from '../../../components/tables/PaginationControls'
import useToast from '../../../hooks/useToast'

import './Genre.css' // 🔸 import the custom scroll CSS

const Genre = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editGenre, setEditGenre] = useState(null)
  const [formData, setFormData] = useState({ name: '' })
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [GenreToDelete, setGenreToDelete] = useState(null)

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
    data: Genres,
    searchTerm, setSearchTerm,
    sortCriteria, setSortCriteria,
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    totalPages,
    refetch
  } = usePaginatedList(GenreAPI.getGenres, GenreAPI.getAllGenres)

  const handleAddNew = () => {
    setEditGenre(null)
    setFormData({ name: '' })
    setModalVisible(true)
  }

  const handleEdit = (Genre) => {
    setEditGenre(Genre)
    setFormData({ name: Genre.name })
    setModalVisible(true)
  }

  const handleDelete = (id) => {
    setGenreToDelete(id)
    setConfirmDeleteVisible(true)
  }

  const handleSave = () => {
    const payload = { ...formData }
    if (editGenre) payload.id = editGenre.id

    const action = editGenre ? GenreAPI.updateGenre : GenreAPI.addGenre
    action(payload)
      .then(() => {
        refetch()
        setModalVisible(false)
        showToast(`Genre ${editGenre ? 'updated' : 'added'} successfully`, 'success')
      })
      .catch(() => {
        showToast(`Failed to ${editGenre ? 'update' : 'add'} Genre`, 'error')
      })
  }

  return (
    <>
      <ListHeader
        title="Genre List"
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
              items={Genres}
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
      <GenreFormModal
        visible={modalVisible}
        setVisible={setModalVisible}
        isEdit={!!editGenre}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSave}
      />

      <ConfirmModal
        visible={confirmDeleteVisible}
        setVisible={setConfirmDeleteVisible}
        title="Confirm Delete"
        message="Are you sure you want to delete this Genre?"
        onConfirm={() => {
          GenreAPI.deleteGenre(GenreToDelete)
            .then(() => {
              refetch()
              showToast('Genre deleted successfully', 'success')
            })
            .catch(() => {
              showToast('Failed to delete Genre', 'error')
            })
        }}
        confirmText="Delete"
        confirmColor="danger"
      />
      <ToastContainer />
    </>
  )
}

export default Genre
