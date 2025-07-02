import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CAvatar
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilUser, cilSettings, cilLockLocked, cilUserPlus, cilInfo } from '@coreui/icons'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = ({ isLoggedIn, username }) => {
  const [hoverItem, setHoverItem] = useState(null)
  const navigate = useNavigate()

  const getItemStyle = (index) => ({
    cursor: 'pointer',
    backgroundColor: hoverItem === index ? '#e4e7eb' : 'transparent',
    color: '#000'
  })

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar
          color="primary"
          size="md"
          className="me-2"
          style={{ backgroundColor: '#3c4b64', color: 'white', cursor: 'pointer' }}
        >
          {isLoggedIn ? username?.charAt(0).toUpperCase() : <CIcon icon={cilUser} />}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        {isLoggedIn ? (
          <>
            <CDropdownItem
              style={getItemStyle(1)}
              onMouseEnter={() => setHoverItem(1)}
              onMouseLeave={() => setHoverItem(null)}
            >
              <CIcon icon={cilUser} className="me-2" />
              Dashboard
            </CDropdownItem>
            <CDropdownItem
              style={getItemStyle(2)}
              onMouseEnter={() => setHoverItem(2)}
              onMouseLeave={() => setHoverItem(null)}
            >
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>
            <CDropdownItem divider />
            <CDropdownItem
              style={getItemStyle(3)}
              onMouseEnter={() => setHoverItem(3)}
              onMouseLeave={() => setHoverItem(null)}
            >
              <CIcon icon={cilAccountLogout} className="me-2" />
              Logout
            </CDropdownItem>
          </>
        ) : (
          <>
            <CDropdownItem
              style={getItemStyle(4)}
              onMouseEnter={() => setHoverItem(4)}
              onMouseLeave={() => setHoverItem(null)}
              onClick={() => navigate('/login')}
            >
              <CIcon icon={cilLockLocked} className="me-2" />
              Login
            </CDropdownItem>
            <CDropdownItem
              style={getItemStyle(5)}
              onMouseEnter={() => setHoverItem(5)}
              onMouseLeave={() => setHoverItem(null)}
              onClick={() => navigate('/register')}
            >
              <CIcon icon={cilUserPlus} className="me-2" />
              Register
            </CDropdownItem>
            <CDropdownItem divider />
            <CDropdownItem
              style={getItemStyle(6)}
              onMouseEnter={() => setHoverItem(6)}
              onMouseLeave={() => setHoverItem(null)}
            >
              <CIcon icon={cilInfo} className="me-2" />
              About
            </CDropdownItem>
          </>
        )}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown












// import React from 'react'
// import {
//   CAvatar,
//   CBadge,
//   CDropdown,
//   CDropdownDivider,
//   CDropdownHeader,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
// } from '@coreui/react'
// import {
//   cilBell,
//   cilCreditCard,
//   cilCommentSquare,
//   cilEnvelopeOpen,
//   cilFile,
//   cilLockLocked,
//   cilSettings,
//   cilTask,
//   cilUser,
// } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/8.jpg'

// const AppHeaderDropdown = () => {
//   return (
//     <CDropdown variant="nav-item">
//       <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
//         <CAvatar src={avatar8} size="md" />
//       </CDropdownToggle>
//       <CDropdownMenu className="pt-0" placement="bottom-end">
//         <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
//         <CDropdownItem href="#">
//           <CIcon icon={cilBell} className="me-2" />
//           Updates
//           <CBadge color="info" className="ms-2">
//             42
//           </CBadge>
//         </CDropdownItem>
//         <CDropdownItem href="#">
//           <CIcon icon={cilEnvelopeOpen} className="me-2" />
//           Messages
//           <CBadge color="success" className="ms-2">
//             42
//           </CBadge>
//         </CDropdownItem>
//         <CDropdownItem href="#">
//           <CIcon icon={cilTask} className="me-2" />
//           Tasks
//           <CBadge color="danger" className="ms-2">
//             42
//           </CBadge>
//         </CDropdownItem>
//         <CDropdownItem href="#">
//           <CIcon icon={cilCommentSquare} className="me-2" />
//           Comments
//           <CBadge color="warning" className="ms-2">
//             42
//           </CBadge>
//         </CDropdownItem>
//         <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
//         <CDropdownItem href="#">
//           <CIcon icon={cilUser} className="me-2" />
//           Profile
//         </CDropdownItem>
//         <CDropdownItem href="#">
//           <CIcon icon={cilSettings} className="me-2" />
//           Settings
//         </CDropdownItem>
//         <CDropdownItem href="#">
//           <CIcon icon={cilCreditCard} className="me-2" />
//           Payments
//           <CBadge color="secondary" className="ms-2">
//             42
//           </CBadge>
//         </CDropdownItem>
//         <CDropdownItem href="#">
//           <CIcon icon={cilFile} className="me-2" />
//           Projects
//           <CBadge color="primary" className="ms-2">
//             42
//           </CBadge>
//         </CDropdownItem>
//         <CDropdownDivider />
//         <CDropdownItem href="#">
//           <CIcon icon={cilLockLocked} className="me-2" />
//           Lock Account
//         </CDropdownItem>
//       </CDropdownMenu>
//     </CDropdown>
//   )
// }

// export default AppHeaderDropdown
