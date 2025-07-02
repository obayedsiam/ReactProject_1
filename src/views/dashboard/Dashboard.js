import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBook, cilUser, cilUserFemale, cilPeople } from '@coreui/icons'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [bookCount, setBookCount] = useState(0)
  const [authorCount, setAuthorCount] = useState(0)
  const [borrowerCount, setBorrowerCount] = useState(0)
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    setBookCount(120)
    setAuthorCount(35)
    setBorrowerCount(85)
    setUserCount(150)
  }, [])

  const cards = [
    {
      title: 'Total Books',
      count: bookCount,
      icon: cilBook,
      color: 'primary',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    },
    {
      title: 'Total Authors',
      count: authorCount,
      icon: cilUser,
      color: 'success',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    },
    {
      title: 'Total Borrowers',
      count: borrowerCount,
      icon: cilPeople,
      color: 'warning',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    },
    {
      title: 'Total Users',
      count: userCount,
      icon: cilUserFemale,
      color: 'danger',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    },
  ]

  return (
    <CRow className="mb-4">
      {cards.map((card, index) => (
        <CCol sm={6} lg={3} key={index}>
          <CCard
            className="text-white text-center border-0 shadow-lg mb-4"
            style={{
              background: card.gradient,
              transition: 'transform 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <CCardBody className="position-relative">
              <div
                className="position-absolute top-0 start-50 translate-middle opacity-10"
                style={{ fontSize: '6rem', zIndex: 0 }}
              >
                <CIcon icon={card.icon} size="xl" />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <CIcon icon={card.icon} size="xxl" className="mb-2" />
                <h4 className="mt-2">{card.title}</h4>
                <h2 className="fw-bold">{card.count}</h2>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

export default Dashboard
