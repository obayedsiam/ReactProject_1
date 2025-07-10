import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'

const ConfirmModal = ({
  visible,
  setVisible,
  title = 'Confirm Action',
  message = 'Are you sure you want to continue?',
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'danger',
}) => {
  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{message}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          {cancelText}
        </CButton>
        <CButton
          color={confirmColor}
          onClick={() => {
            onConfirm()
            setVisible(false)
          }}
        >
          {confirmText}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfirmModal
