// AuthorHeader.jsx
import {
  CCardHeader,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react';

const AuthorHeader = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  sortCriteria,
  setSortCriteria,
  sortOrder,
  setSortOrder,
  pageSize,
  setPageSize,
  handleAddNew,
}) => {
  return (
    <CCardHeader>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <strong>Authors</strong>
        <div
          className="d-flex align-items-center gap-2 filter-controls"
          style={{ flexWrap: 'nowrap', overflowX: 'auto' }}
        >
          <CFormInput
            size="sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ width: '150px' }}
          />

          <CFormSelect
            size="sm"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            style={{ minWidth: '130px', whiteSpace: 'nowrap' }}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
          </CFormSelect>

          <CButton
            color="secondary"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{ minWidth: '80px', whiteSpace: 'nowrap' }}
          >
            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </CButton>

          <CFormSelect
            size="sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ minWidth: '80px', whiteSpace: 'nowrap' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </CFormSelect>

          <CButton
            color="primary"
            size="sm"
            onClick={handleAddNew}
            style={{ minWidth: '100px', whiteSpace: 'nowrap' }}
          >
            + Add Author
          </CButton>
        </div>
      </div>
    </CCardHeader>
  );
};

export default AuthorHeader;
