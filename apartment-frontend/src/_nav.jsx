import React from 'react'

import CIcon from '@coreui/icons-react'

import {
  cilSpeedometer,
  cilBuilding,
  cilPeople,
  cilWarning,
  cilNotes,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'

import { CNavItem } from '@coreui/react'



const _nav = (role) => {



  // RESIDENT MENU

  if(role === "RESIDENT") {


    return [


      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/resident-dashboard',
        icon: <CIcon icon={cilSpeedometer} className="nav-icon" />,
      },


      {
        component: CNavItem,
        name: 'My Apartment',
        to: '/my-apartment',
        icon: <CIcon icon={cilBuilding} className="nav-icon" />,
      },


      {
        component: CNavItem,
        name: 'My Complaints',
        to: '/my-complaints',
        icon: <CIcon icon={cilWarning} className="nav-icon" />,
      },


      {
  component: CNavItem,
  name: 'My Notices',
  to: '/my-notices',
  icon: <CIcon icon={cilNotes} className="nav-icon" />,
},


      {
        component: CNavItem,
        name: 'Profile',
        to: '/profile',
        icon: <CIcon icon={cilUser} className="nav-icon" />,
      },


      {
        component: CNavItem,
        name: 'Logout',
        to: '/authentication/logout',
        icon: <CIcon icon={cilAccountLogout} className="nav-icon" />,
      },


    ];


  }





  // ADMIN MENU

  return [


    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} className="nav-icon" />,
    },


    {
      component: CNavItem,
      name: 'Apartments',
      to: '/apartments',
      icon: <CIcon icon={cilBuilding} className="nav-icon" />,
    },


    {
      component: CNavItem,
      name: 'Residents',
      to: '/residents',
      icon: <CIcon icon={cilPeople} className="nav-icon" />,
    },


    {
      component: CNavItem,
      name: 'Complaints',
      to: '/complaints',
      icon: <CIcon icon={cilWarning} className="nav-icon" />,
    },


    {
      component: CNavItem,
      name: 'Notices',
      to: '/notices',
      icon: <CIcon icon={cilNotes} className="nav-icon" />,
    },


    {
      component: CNavItem,
      name: 'Profile',
      to: '/profile',
      icon: <CIcon icon={cilUser} className="nav-icon" />,
    },


    {
      component: CNavItem,
      name: 'Logout',
      to: '/authentication/logout',
      icon: <CIcon icon={cilAccountLogout} className="nav-icon" />,
    },


  ];


}



export default _nav;