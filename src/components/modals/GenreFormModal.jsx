import React from 'react'
import {
  CModal, CModalHeader, CModalTitle,
  CModalBody, CModalFooter, CButton, CForm, CFormInput
} from '@coreui/react'

const GenreFormModal = ({ visible, setVisible, isEdit, formData, setFormData, onSubmit }) => (
  <CModal visible={visible} onClose={() => setVisible(false)}>
    <CModalHeader>
      <CModalTitle>{isEdit ? 'Edit Genre' : 'Add New Genre'}</CModalTitle>
    </CModalHeader>
    <CForm onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <CModalBody>
        <CFormInput
          label="Genre Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ name: e.target.value })}
          required
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
        <CButton type="submit" color="primary">Save</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
)

export default GenreFormModal
