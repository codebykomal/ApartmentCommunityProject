import React, { useEffect, useState } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CFormSelect,
} from "@coreui/react";

import complaintService from "src/services/complaintService";


const Complaints = () => {


  const [complaints, setComplaints] = useState([]);

  const [visible, setVisible] = useState(false);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [status, setStatus] = useState("");



  const fetchComplaints = async()=>{

    try{

      const response = await complaintService.getAllComplaints();

      setComplaints(response.data);

    }
    catch(error){

      console.log("FETCH COMPLAINT ERROR:",error);

      alert(
        error.response?.data?.message ||
        "Failed to load complaints"
      );

    }

  };

  useEffect(()=>{

    fetchComplaints();

  },[]);


  const handleStatusUpdate = async()=>{

    if(!status){

      alert("Please select complaint status");

      return;

    }

    try{

      await complaintService.updateComplaint(
        selectedComplaint._id,
        {
          status:status
        }
      );

      alert("Complaint status updated successfully");
      setVisible(false);
      setSelectedComplaint(null);
      setStatus("");
      fetchComplaints();
    }
    catch(error){

      console.log("Status update error:",error);

      alert(

        error.response?.data?.message ||

        "Failed to update complaint status"

      );

    }

  };

  const handleDelete = async(id)=>{

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this complaint?"

    );

    if(!confirmDelete){

      return;

    }

    try{

      await complaintService.deleteComplaint(id);

      alert("Complaint deleted successfully");

      fetchComplaints();

    }
    catch(error){

      console.log("DELETE ERROR:",error);

      alert(

        error.response?.data?.message ||

        "Failed to delete complaint"
      );

    }

  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h5>
            Complaints Management
          </h5>
        </CCardHeader>
        <CCardBody>
          <CTable bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>
                  Resident
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Title
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Category
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Phone Number
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Apartment
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Status
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Image
                </CTableHeaderCell>
                <CTableHeaderCell>
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>

              <CTableBody>

              {

                complaints.map((complaint)=>(


                  <CTableRow key={complaint._id}>

                    <CTableDataCell>
                      {complaint.raisedBy?.name}
                    </CTableDataCell>

                    <CTableDataCell>
                      {complaint.title}
                    </CTableDataCell>

                    <CTableDataCell>
                      {complaint.category}
                    </CTableDataCell>

                    <CTableDataCell>
                      {complaint.phoneNumber}
                    </CTableDataCell>

                    <CTableDataCell>
                      {complaint.apartment?.flatNumber}
                    </CTableDataCell>

                    <CTableDataCell>
                      {complaint.status}
                    </CTableDataCell>

                    <CTableDataCell>
                      {
                        complaint.image ?

                        <img

                          src={`http://localhost:5000${complaint.image}`}

                          alt="complaint"

                          width="100"

                          height="80"

                        />

                        :

                        "No Image"

                      }

                    </CTableDataCell>

                    <CTableDataCell>

                      <CButton

                        color="warning"

                        size="sm"

                        onClick={()=>{
                          setSelectedComplaint(complaint);
                          setStatus(complaint.status);
                          setVisible(true);


                        }}>

                        Update Status

                      </CButton>
                      <CButton

                        color="danger"

                        size="sm"

                        style={{
                          marginLeft:"10px"
                        }}

                        onClick={()=>handleDelete(complaint._id)}

                      >
                        Delete

                      </CButton>
                    </CTableDataCell>
                  </CTableRow>

                ))

              }

            </CTableBody>

          </CTable>

        </CCardBody>

      </CCard>

      <CModal

        visible={visible}

        onClose={()=>setVisible(false)}

      >

        <CModalHeader>

          Update Complaint Status

        </CModalHeader>

        <CModalBody>

          <h6>

            Complaint:

            {" "}

            {selectedComplaint?.title}

          </h6>

          <CFormSelect

            value={status}

            onChange={(e)=>setStatus(e.target.value)}

          >

            <option value="">

              Select Status

            </option>

            <option value="OPEN">

              OPEN

            </option>

            <option value="IN_PROGRESS">

              IN_PROGRESS

            </option>

            <option value="RESOLVED">

              RESOLVED

            </option>

          </CFormSelect>

          <br/>

          <CButton

            color="success"

            onClick={handleStatusUpdate}

          >

            Save Status

          </CButton>
        </CModalBody>
      </CModal>
    </>
  );


};

export default Complaints;