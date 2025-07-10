import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react'

const EntityTable = ({ items, onEdit, onDelete, onDetails }) => (
  <CTable striped responsive>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell>Name</CTableHeaderCell>
        <CTableHeaderCell>Actions</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {items.map((item) => (
        <CTableRow key={item.id}>
          <CTableDataCell>{item.name}</CTableDataCell>
          <CTableDataCell>
            <div className="d-flex justify-content-end flex-wrap gap-2">
              <CButton color="secondary" size="sm" onClick={() => onDetails(item.id)}>Details</CButton>
              <CButton color="info" size="sm"  className="text-white" onClick={() => onEdit(item)} style={{ minWidth: '60px' }}>Edit</CButton>
              <CButton color="danger" size="sm"  className="text-white" onClick={() => onDelete(item.id)} style={{ minWidth: '60px' }}>Delete</CButton>
            </div>
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
)

export default EntityTable
