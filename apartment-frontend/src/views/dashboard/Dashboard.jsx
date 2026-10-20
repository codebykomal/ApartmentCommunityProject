import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'

import dashboardService from 'src/services/dashboardService'

const Dashboard = () => {

  const [stats, setStats] = useState(null)

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response = await dashboardService.getDashboardStats()

        setStats(response.data)

      }
      catch(error) {

        console.log(error)

      }

    }

    fetchStats()

  }, [])

  return (

    <CRow>

      <CCol xs={12}>

        <CCard className="mb-4">

          <CCardHeader>
            Apartment Community Dashboard
          </CCardHeader>

          <CCardBody>

            <h3>
              Welcome Admin
            </h3>

            <p>
              Manage apartments, residents, complaints and notices from here.
            </p>

          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} lg={3}>

        <CCard>

          <CCardBody>

            <h5>
              Total Apartments
            </h5>

            <h2>
              {stats?.totalApartments}
            </h2>

          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} lg={3}>

        <CCard>

          <CCardBody>

            <h5>
              Total Residents
            </h5>

            <h2>
              {stats?.totalUsers}
            </h2>

          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} lg={3}>

        <CCard>

          <CCardBody>

            <h5>
              Complaints
            </h5>

            <h2>
              {stats?.totalComplaints}
            </h2>

          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} lg={3}>

        <CCard>

          <CCardBody>

            <h5>
              Notices
            </h5>

            <h2>
              {stats?.totalNotices}
            </h2>

          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} lg={3}>

        <CCard>

          <CCardBody>

            <h5>
              Pending Complaints
            </h5>

            <h2>
              {stats?.pendingComplaints}
            </h2>

          </CCardBody>

        </CCard>

      </CCol>

      <CCol sm={6} lg={3}>

        <CCard>

          <CCardBody>

            <h5>
              Resolved Complaints
            </h5>

            <h2>
              {stats?.resolvedComplaints}
            </h2>

          </CCardBody>

        </CCard>

      </CCol>

    </CRow>

  )

}

export default Dashboard