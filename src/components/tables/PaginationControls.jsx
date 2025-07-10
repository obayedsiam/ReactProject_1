// src/components/pagination/PaginationControls.jsx

import React from 'react'
import { CButton } from '@coreui/react'

const PaginationControls = ({ currentPage, totalPages, setCurrentPage, pageSize }) => {
  if (pageSize === 'all' || totalPages <= 1) return null

  return (
    <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap p-3">
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
  )
}

export default PaginationControls
