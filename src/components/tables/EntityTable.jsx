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
import {
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaBookReader,
  FaGift,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBookOpen,
  FaUser,
  FaPhone,
} from 'react-icons/fa'
import { MoreVertical } from 'lucide-react'
import defaultBookImage from '../../assets/images/book/book.png'

const EntityTable = ({ items, onEdit, onDelete, onDetails, viewMode = 'grid' }) => {
  const renderInfoColumn = (item, type) => {
    const fontSize = { fontSize: '0.85rem' }

    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      color: '#666',
    }

    return (
      <div style={wrapperStyle}>
        {type === 'meta' && (
          <>
            <div style={fontSize}>
              <FaStar className="me-1 text-warning" />
              Rating: {item.rating ?? 'N/A'}
            </div>
            <div style={fontSize}>
              <FaBookOpen className="me-1" />
              Progress: {item.readingPercentage != null ? `${item.readingPercentage}%` : '0%'}
            </div>
            <div style={fontSize}>
              <FaBookReader className="me-1" />
              {item.read ? 'Read' : 'Unread'}
            </div>
          </>
        )}
        {type === 'ownership' && (
          <>
            {item.giftedBy && (
              <div style={fontSize}>
                <FaGift className="me-1" />
                Gifted by: {item.giftedBy}
              </div>
            )}
            {item.buyingDate && (
              <div style={fontSize}>
                <FaCalendarAlt className="me-1" />
                Bought: {item.buyingDate}
              </div>
            )}
            {item.buyingLocation && (
              <div style={fontSize}>
                <FaMapMarkerAlt className="me-1" />
                Place: {item.buyingLocation}
              </div>
            )}
            {item.currentBookLocation && (
              <div style={fontSize}>
                <FaMapMarkerAlt className="me-1 text-info" />
                Current: {item.currentBookLocation}
              </div>
            )}
            <div style={fontSize}>
              {item.borrowed ? (
                <>
                  <FaCheckCircle className="me-1 text-success" />
                  Borrowed
                </>
              ) : (
                <>
                  <FaTimesCircle className="me-1 text-danger" />
                  Available
                </>
              )}
            </div>
            {item.borrowed && item.borrowerName && (
              <div style={fontSize}>
                <FaUser className="me-1" />
                {item.borrowerName}
              </div>
            )}
            {item.borrowed && item.borrowerPhone && (
              <div style={fontSize}>
                <FaPhone className="me-1" />
                {item.borrowerPhone}
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  if (viewMode === 'grid') {
    return (
      <CRow className="px-2 py-4" style={{ flexWrap: 'wrap', overflowX: 'hidden', margin: 0 }}>
        {items.map((item) => (
          <CCol key={item.id} sm={6} className="mb-3">
            <div className="d-flex flex-column border p-3 rounded shadow-sm h-100">
              <div className="d-flex align-items-center mb-2">
                <img
                  src={item.image || defaultBookImage}
                  alt={item.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    marginRight: '12px',
                    borderRadius: '4px',
                  }}
                />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.writer?.name}</div>
                </div>
              </div>

              {renderInfoColumn(item, 'meta')}
              <hr />
              {renderInfoColumn(item, 'ownership')}

              <div className="d-flex justify-content-end mt-auto">
                <CDropdown placement="bottom-end">
                  <CDropdownToggle color="light" size="sm" className="border-0 shadow-none" caret={false}>
                    <MoreVertical size={18} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => onDetails(item.id)}>Details</CDropdownItem>
                    <CDropdownItem onClick={() => onEdit(item)}>Edit</CDropdownItem>
                    <CDropdownItem onClick={() => onDelete(item.id)}>Delete</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
            </div>
          </CCol>
        ))}
      </CRow>
    )
  }

  // List view with 3-column layout
  return (
    <div className="px-2 py-4">
      <CTable striped responsive>
        <CTableHead />
        <CTableBody>
          {items.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan={3} className="text-center">
                No data available
              </CTableDataCell>
            </CTableRow>
          ) : (
            items.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell style={{ width: '30%' }}>
                  <div className="d-flex align-items-start gap-3">
                    <img
                      src={item.image || defaultBookImage}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <div className="d-flex flex-column">
                      <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>{item.writer?.name}</div>
                    </div>
                  </div>
                </CTableDataCell>
                <CTableDataCell style={{ width: '35%' }}>{renderInfoColumn(item, 'meta')}</CTableDataCell>
                <CTableDataCell style={{ width: '35%' }}>
                  <div className="d-flex justify-content-between align-items-start">
                    {renderInfoColumn(item, 'ownership')}
                    <CDropdown placement="bottom-end">
                      <CDropdownToggle color="light" size="sm" className="border-0 shadow-none" caret={false}>
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
    </div>
  )
}

export default EntityTable
