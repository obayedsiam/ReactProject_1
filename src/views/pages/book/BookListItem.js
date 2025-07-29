// src/components/lists/BookListItem.jsx

import React from 'react'
import { CCard, CCardBody, CRow, CCol, CImage, CButton } from '@coreui/react'

const BookListItem = ({ book, onEdit, onDelete, onDetails }) => {
  return (
    <CCard className="mb-3 px-2 py-2 shadow-sm">
      <CCardBody>
        <CRow className="align-items-center">
          <CCol xs={2} md={1}>
            {/* <CImage
              src="/book_icon.png" // Replace with real image path
              alt="Book Icon"
              width={40}
              height={40}
              style={{ borderRadius: '4px' }}
            /> */}
          </CCol>
          <CCol xs={10} md={7}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {book.name}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#555' }}>
              {book.writer?.name || 'Unknown Author'}
            </div>
          </CCol>
          <CCol xs={12} md={4} className="mt-2 mt-md-0 d-flex justify-content-md-end gap-2">
            <CButton color="secondary" size="sm" onClick={() => onDetails(book.id)}>
              Details
            </CButton>
            <CButton color="info" size="sm" className="text-white" onClick={() => onEdit(book)}>
              Edit
            </CButton>
            <CButton color="danger" size="sm" className="text-white" onClick={() => onDelete(book.id)}>
              Delete
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default BookListItem
