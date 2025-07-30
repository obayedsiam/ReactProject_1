import {
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CRow,
} from '@coreui/react'
import { MoreVertical } from 'lucide-react'
import defaultBookImage from '../../assets/images/book/book.png'

const EntityTable = ({ items, onEdit, onDelete, onDetails, viewMode = 'grid' }) => {
  if (viewMode === 'grid') {
    return (
      <CRow
        className="px-3"
        style={{
          flexWrap: 'wrap',
          overflowX: 'hidden',
          margin: 0,
        }}
      >
        {items.map((item) => (
          <CCol key={item.id} sm={6} className="mb-3">
            <div className="d-flex align-items-center justify-content-between border p-2 rounded shadow-sm">
              <div className="d-flex align-items-center">
                <img
                  src={defaultBookImage}
                  alt={item.name}
                  style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '12px', borderRadius: '4px' }}
                />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.writer?.name}</div>
                </div>
              </div>

              <CDropdown placement="bottom-end">
                <CDropdownToggle
                  color="light"
                  size="sm"
                  className="border-0 shadow-none"
                  caret={false}
                >
                  <MoreVertical size={18} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => onDetails(item.id)}>Details</CDropdownItem>
                  <CDropdownItem onClick={() => onEdit(item)}>Edit</CDropdownItem>
                  <CDropdownItem onClick={() => onDelete(item.id)}>Delete</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </CCol>
        ))}
      </CRow>
    )
  }

  // List View
  return (
    <CTable striped responsive>
      <CTableHead />
      <CTableBody>
        {items.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan={2} className="text-center">No data available</CTableDataCell>
          </CTableRow>
        ) : (
          items.map((item) => (
            <CTableRow key={item.id}>
              <CTableDataCell>
                <div className="d-flex align-items-center">
                  <img
                    src={defaultBookImage}
                    alt={item.name}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '12px', borderRadius: '4px' }}
                  />
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.writer?.name}</div>
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="d-flex justify-content-end">
                  <CDropdown placement="bottom-end">
                    <CDropdownToggle
                      color="light"
                      size="sm"
                      className="border-0 shadow-none"
                      caret={false}
                    >
                      <MoreVertical size={18} />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => onDetails(item.id)}>Details</CDropdownItem>
                      <CDropdownItem onClick={() => onEdit(item)}>Edit</CDropdownItem>
                      <CDropdownItem onClick={() => onDelete(item.id)}>Delete</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))
        )}
      </CTableBody>
    </CTable>
  )
}

export default EntityTable
