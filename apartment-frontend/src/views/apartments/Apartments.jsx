import React, { useEffect, useState } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CForm,
} from "@coreui/react";

import apartmentService from "src/services/apartmentService";
import userService from "src/services/userService";

const Apartments = () => {

  const [apartments, setApartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);//Modal open/close control karta hai.
  const [editId, setEditId] = useState(null);//add mode [Ye decide karta hai:Add kar rahe hain ya Update.]

  const [form, setForm] = useState({
    flatNumber:"",
    block:"",
    floor:"",
    owner:""
  });

  const fetchApartments = async()=>{

    try{
      const response = await apartmentService.getAllApartments();
      setApartments(response.data);
    }
    catch(error){
      console.log(error);
    }

  };

  const fetchUsers = async()=>{

    try{
      const response = await userService.getAllUsers();

      //console.log("USERS:",response.data);

      setUsers(response.data);
    }
    catch(error){
      console.log("USER FETCH ERROR:",error);
    }

  };

  useEffect(()=>{

    fetchApartments();
    fetchUsers();

  },[]);//[] dependency array

  const handleChange=(e)=>{

    setForm({
      ...form,//purani values copy karta hai.
      [e.target.name]:e.target.value
    });

  };
const handleSubmit = async(e)=>{

  e.preventDefault();


  if(
    !form.flatNumber.trim() ||
    !form.block.trim() ||
    !form.floor ||
    !form.owner
  ){

    alert("All fields are required");
    return;

  }


  const flatRegex = /^[A-Z]-\d+$/;
  const blockRegex = /^[A-Z]$/;


  if(!flatRegex.test(form.flatNumber)){

    alert("Flat Number should be like A-101");

    return;

  }


  if(!blockRegex.test(form.block)){

    alert("Block should contain only one capital letter");

    return;

  }


  if(Number(form.floor) < 0){

    alert("Floor cannot be negative");

    return;

  }


  try{

    if(editId){

      await apartmentService.updateApartment(
        editId,
        form
      );

    }
    else{

      await apartmentService.createApartment(form);

    }


    setVisible(false);

    setEditId(null);


    setForm({

      flatNumber:"",
      block:"",
      floor:"",
      owner:""

    });


    fetchApartments();


  }
  catch(error){

    console.log("SAVE ERROR:",error);

    alert(
      error.response?.data?.message || "Failed to save apartment"
    );

  }

};

  const handleEdit=(apt)=>{

    setEditId(apt._id);

    setForm({

      flatNumber:apt.flatNumber,
      block:apt.block,
      floor:apt.floor,
      owner:apt.owner?._id || apt.owner

    });

    setVisible(true);

  };

  const handleDelete=async(id)=>{

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this apartment?"
    );

    if(!confirmDelete){
      return;
    }

    try{

      await apartmentService.deleteApartment(id);
      fetchApartments();

    }
    catch(error){

      console.log(error);

    }

  };

  return (

    <>

      <CCard>

        <CCardHeader className="d-flex justify-content-between">

          <h5>
            Apartments Management
          </h5>

          <CButton
            color="primary"
            onClick={()=>{

              setEditId(null);

              setForm({
                flatNumber:"",
                block:"",
                floor:"",
                owner:""
              });

              setVisible(true);

            }}
          >

            Add Apartment

          </CButton>

        </CCardHeader>

        <CCardBody>

          <CTable bordered hover>

            <CTableHead>

              <CTableRow>

                <CTableHeaderCell>
                  Flat
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Block
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Floor
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Owner
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Action
                </CTableHeaderCell>

              </CTableRow>

            </CTableHead>

            <CTableBody>

              {
                apartments.map((apt)=>(

                  <CTableRow key={apt._id}>

                    <CTableDataCell>
                      {apt.flatNumber}
                    </CTableDataCell>

                    <CTableDataCell>
                      {apt.block}
                    </CTableDataCell>

                    <CTableDataCell>
                      {apt.floor}
                    </CTableDataCell>

                    <CTableDataCell>
                      {apt.owner?.name || "Not Assigned"}
                    </CTableDataCell>

                    <CTableDataCell>

                      <div style={{
                        display:"flex",
                        gap:"10px"
                      }}>

                        <CButton
                          color="warning"
                          size="sm"
                          onClick={()=>handleEdit(apt)}
                        >
                          Edit
                        </CButton>

                        <CButton
                          color="danger"
                          size="sm"
                          onClick={()=>handleDelete(apt._id)}
                        >
                          Delete
                        </CButton>

                      </div>

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

          {
            editId 
            ? "Update Apartment"
            : "Add Apartment"
          }

        </CModalHeader>

        <CModalBody>

          <CForm onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="flatNumber"
              placeholder="Flat Number"
              value={form.flatNumber}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="block"
              placeholder="Block"
              value={form.block}
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mb-3"
              name="floor"
              placeholder="Floor"
              value={form.floor}
              onChange={handleChange}
            />

            <select
              className="form-control mb-3"
              name="owner"
              value={form.owner}
              onChange={handleChange}
            >

              <option value="">
                Select Owner
              </option>

              {
                users
                .filter(user=>user.role==="RESIDENT")
                .map(user=>(

                  <option
                    key={user._id}
                    value={user._id}
                  >

                    {user.name} - {user.email}

                  </option>

                ))
              }

            </select>

            <CButton
              color="success"
              type="submit"
            >

              Save

            </CButton>

          </CForm>

        </CModalBody>

      </CModal>

    </>

  );

};

export default Apartments;