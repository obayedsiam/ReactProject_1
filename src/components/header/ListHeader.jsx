import {
  CFormInput,
  CFormSelect,
  CButton
} from '@coreui/react'
import { List, Grid2x2 } from 'lucide-react'

const listViewPaginationOptions = [5, 10, 20, 50, 'all']
const gridViewPaginationOptions = [10, 20, 40, 100, 'all']

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
  sortOptions = [],
  showPageSize = true,
  addButtonText = '+ Add New',
  viewMode,
  setViewMode,
  setCurrentPage
}) => {
  const handleViewChange = (mode) => {
    setViewMode(mode)
    if (mode === 'grid') {
      setPageSize((prev) => (prev === 'all' ? 'all' : prev * 2))
    } else {
      setPageSize((prev) => (prev === 'all' ? 'all' : Math.ceil(prev / 2)))
    }
    setCurrentPage(1)
  }

  return (
    <div className="d-flex px-3 py-2 gap-2" style={{ width: '100%' }}>
      {/* Left - 70% */}
      <div style={{ width: '70%' }} className="d-flex justify-content-between align-items-center gap-2">
        {/* Title - takes 20% of 70% = 14% of total screen width */}
        <div style={{ flex: '0 0 10%' }}>
          <strong style={{ fontSize: '1.1rem' }}>{title}</strong>
        </div>

        {/* Search - takes 50% of 70% = 35% of total screen width */}
        <div style={{ flex: '0 0 80%' }}>
          <CFormInput
            size="sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Right - 30% */}
      <div
        style={{
          width: '40%',
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '0.5rem',
          alignItems: 'center',
          overflowX: 'auto'
        }}
      >
        {/* Sort Criteria */}
        <CFormSelect
          size="sm"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          style={{ minWidth: '90px', maxWidth: '90px'}}
        >
          <option value="">Sort by</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </CFormSelect>

        {/* Page Size */}
        {showPageSize && (
          <CFormSelect
            size="sm"
            value={pageSize}
        
            onChange={(e) => {
              const value = e.target.value
              setPageSize(value === 'all' ? 'all' : parseInt(value))
              setCurrentPage(1)
            }}
            style={{ minWidth: '60px', maxWidth: '60px' }}
          >
            {(viewMode === 'list' ? listViewPaginationOptions : gridViewPaginationOptions).map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </CFormSelect>
        )}

        {/* Sort Order */}
        <CButton
          color="secondary"
          size="sm"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{ minWidth: '50px', maxWidth: '50px' }}
        >
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </CButton>

        {/* Add New */}
        <CButton color="primary" size="sm" onClick={onAddNew}
          style={{ minWidth: '90px', maxWidth: '90px' }}
        >
          {addButtonText}
        </CButton>

        {/* View Toggle */}
        <CButton
          color="light"
          size="sm"
          onClick={() => handleViewChange(viewMode === 'list' ? 'grid' : 'list')}
        >
          {viewMode === 'list' ? <List size={20} /> : <Grid2x2 size={20} />}
        </CButton>
      </div>
    </div>
  )
}

export default ListHeader
