import React, { useEffect, useState } from "react";

import api from "src/api/axios";
import noticeService from "src/services/noticeService";

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CBadge,
} from "@coreui/react";

const ResidentDashboard = () => {
  const [apartment, setApartment] = useState(null);

  const [complaints, setComplaints] = useState([]);

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/resident");

        setApartment(response.data.apartment);

        setComplaints(response.data.complaints);

        const noticeResponse = await noticeService.getAllNotices();

        setNotices(noticeResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>

      <CRow className="mb-4">

        <CCol>

          <CCard>

            <CCardHeader>

              <h4 className="mb-0">
                Resident Dashboard
              </h4>

            </CCardHeader>

            <CCardBody>

              <h5>
                Welcome Resident 👋
              </h5>

              <p className="text-medium-emphasis">
                Manage your apartment, complaints and notices from one place.
              </p>

            </CCardBody>

          </CCard>

        </CCol>

      </CRow>





      <CRow>

        <CCol md={6}>

          <CCard className="mb-4">

            <CCardHeader>

              <strong>
                My Apartment
              </strong>

            </CCardHeader>

            <CCardBody>

              {apartment ? (
                <>

                  <p>

                    <strong>
                      Flat Number :
                    </strong>{" "}

                    {apartment.flatNumber}

                  </p>

                  <p>

                    <strong>
                      Block :
                    </strong>{" "}

                    {apartment.block}

                  </p>

                  <p>

                    <strong>
                      Floor :
                    </strong>{" "}

                    {apartment.floor}

                  </p>

                </>
              ) : (
                <p>No apartment assigned.</p>
              )}

            </CCardBody>

          </CCard>

        </CCol>





        <CCol md={6}>

          <CCard className="mb-4">

            <CCardHeader>

              <strong>
                My Complaints
              </strong>

            </CCardHeader>

            <CCardBody>

              {complaints.length > 0 ? (

                <CListGroup>

                  {complaints.map((complaint) => (

                    <CListGroupItem key={complaint._id}>

                      <h6>

                        {complaint.title}

                      </h6>

                      <CBadge
                        color={
                          complaint.status === "RESOLVED"
                            ? "success"
                            : complaint.status === "IN_PROGRESS"
                            ? "warning"
                            : "danger"
                        }
                      >

                        {complaint.status}

                      </CBadge>

                    </CListGroupItem>

                  ))}

                </CListGroup>

              ) : (

                <p>No complaints found.</p>

              )}

            </CCardBody>

          </CCard>

        </CCol>

      </CRow>






      <CRow>

        <CCol>

          <CCard>

            <CCardHeader>

              <strong>
                Community Notices
              </strong>

            </CCardHeader>

            <CCardBody>

              {notices.length > 0 ? (

                <CListGroup>

                  {notices.map((notice) => (

                    <CListGroupItem key={notice._id}>

                      <h5>

                        {notice.title}

                      </h5>

                      <p className="mb-0">

                        {notice.message}

                      </p>

                    </CListGroupItem>

                  ))}

                </CListGroup>

              ) : (

                <p>No notices available.</p>

              )}

            </CCardBody>

          </CCard>

        </CCol>

      </CRow>

    </>
  );
};

export default ResidentDashboard;