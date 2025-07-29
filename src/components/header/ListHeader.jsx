import { CFormInput, CFormSelect, CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import { List, Grid3x3, Grid2x2 } from 'lucide-react'

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
  setCurrentPage, // Needed to reset page
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
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-1 p-3 border-bottom">
      <strong>{title}</strong>

        {/* Search */}
        <CFormInput
          size="sm"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '600px' }}
        />

      <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>

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

        {showPageSize && (
          <CFormSelect
            size="sm"
            value={pageSize}
            onChange={(e) => {
              const value = e.target.value
              setPageSize(value === 'all' ? 'all' : parseInt(value))
              setCurrentPage(1)
            }}
            style={{ minWidth: '80px', whiteSpace: 'nowrap' }}
          >
            {(viewMode === 'list' ? listViewPaginationOptions : gridViewPaginationOptions).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CFormSelect>
        )}

          <CButton
          color="secondary"
          size="sm"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{ minWidth: '80px' }}
        >
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </CButton>

        {/* Add New Button */}
        <CButton
          color="primary"
          size="sm"
          onClick={onAddNew}
          style={{ minWidth: '100px' }}
        >
          {addButtonText}
        </CButton>
                {/* View Mode Toggle */}
        <CButton
          color="light"
          size="sm"
          onClick={() => handleViewChange(viewMode === 'list' ? 'grid' : 'list')}
        >
          {viewMode === 'list' ? <List size={25} /> : <Grid2x2 size={25} />}
        </CButton>

      </div>
    </div>
  )
}

export default ListHeader
