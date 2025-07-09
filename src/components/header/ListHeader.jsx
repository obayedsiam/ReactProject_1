import React from 'react';
import { CFormInput, CFormSelect, CButton } from '@coreui/react';

const ListHeader = ({
  title = 'List',
  searchTerm,
  setSearchTerm,
  sortCriteria,
  setSortCriteria,
  sortOrder,
  setSortOrder,
  pageSize,
  setPageSize,
  onAddNew,
  sortOptions = [], // e.g. [{ label: 'Name', value: 'name' }, { label: 'Date', value: 'createdAt' }]
  showSort = true,
  showPageSize = true,
  showAdd = true,
  addButtonText = '+ Add New',
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-3 border-bottom">
      <strong>{title}</strong>

      <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
        {/* Search */}
        <CFormInput
          size="sm"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '150px' }}
        />

        {/* Sort Dropdown */}
        {showSort && (
          <CFormSelect
            size="sm"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            style={{ minWidth: '130px' }}
          >
            <option value="">Sort by</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </CFormSelect>
        )}

        {/* Sort Direction Button */}
        {showSort && (
          <CButton
            color="secondary"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{ minWidth: '80px' }}
          >
            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </CButton>
        )}

        {/* Page Size Dropdown */}
        {showPageSize && (
          <CFormSelect
            size="sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            style={{ minWidth: '80px' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </CFormSelect>
        )}

        {/* Add New Button */}
        {showAdd && (
          <CButton
            color="primary"
            size="sm"
            onClick={onAddNew}
            style={{ minWidth: '100px' }}
          >
            {addButtonText}
          </CButton>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
