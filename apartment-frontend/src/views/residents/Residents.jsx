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
  CModalBody
} from "@coreui/react";

import userService from "src/services/userService";


const Residents = () => {


  const [residents, setResidents] = useState([]);

  const [visible, setVisible] = useState(false);

  const [selectedResident, setSelectedResident] = useState(null);


  const [form, setForm] = useState({

    name:"",
    email:"",
    role:"RESIDENT"

  });



  const fetchResidents = async()=>{

    try{

      const response = await userService.getAllUsers();


      const onlyResidents = response.data.filter(

        user => user.role === "RESIDENT" && user.active !== false

      );


      setResidents(onlyResidents);


    }
    catch(error){

      console.log("RESIDENT FETCH ERROR:",error);

    }

  };



  useEffect(()=>{

    fetchResidents();

  },[]);



  const handleEdit = (resident)=>{


    setSelectedResident(resident);


    setForm({

      name:resident.name,

      email:resident.email,

      role:resident.role

    });


    setVisible(true);


  };



  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:e.target.value

    });


  };



  const handleUpdate = async(e)=>{


    e.preventDefault();



    const nameRegex = /^[A-Za-z ]+$/;


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if(!form.name.trim() || !form.email.trim()){


      alert("Name and Email are required");

      return;

    }



    if(form.name.trim().length < 3){


      alert("Name must contain at least 3 characters");

      return;


    }



    if(!nameRegex.test(form.name)){


      alert("Name should contain only alphabets");

      return;


    }



    if(!emailRegex.test(form.email)){


      alert("Enter valid email");

      return;


    }



    try{


      await userService.updateResident(

        selectedResident._id,

        form

      );



      alert("Resident updated successfully");



      setVisible(false);



      setSelectedResident(null);



      setForm({

        name:"",

        email:"",

        role:"RESIDENT"

      });



      fetchResidents();


    }
    catch(error){


      console.log("UPDATE RESIDENT ERROR:",error);



      alert(

        error.response?.data?.message ||

        "Failed to update resident"

      );


    }


  };
    const handleDelete=async(id)=>{


    const confirmDelete = window.confirm(

      "Are you sure you want to deactivate this resident?"

    );



    if(!confirmDelete){

      return;

    }



    try{


      await userService.deleteResident(id);



      alert("Resident deactivated successfully");



      fetchResidents();


    }
    catch(error){


      console.log("DELETE RESIDENT ERROR:",error);



      alert(

        error.response?.data?.message ||

        "Failed to deactivate resident"

      );


    }


  };



  return (

    <>


      <CCard>


        <CCardHeader>


          <h5>

            Residents Management

          </h5>


        </CCardHeader>



        <CCardBody>


          <CTable bordered hover>


            <CTableHead>


              <CTableRow>


                <CTableHeaderCell>

                  Name

                </CTableHeaderCell>



                <CTableHeaderCell>

                  Email

                </CTableHeaderCell>



                <CTableHeaderCell>

                  Role

                </CTableHeaderCell>



                <CTableHeaderCell>

                  Action

                </CTableHeaderCell>


              </CTableRow>


            </CTableHead>



            <CTableBody>


              {


                residents.map((resident)=>(


                  <CTableRow key={resident._id}>


                    <CTableDataCell>

                      {resident.name}

                    </CTableDataCell>



                    <CTableDataCell>

                      {resident.email}

                    </CTableDataCell>



                    <CTableDataCell>

                      {resident.role}

                    </CTableDataCell>



                    <CTableDataCell>


                      <CButton

                        color="warning"

                        size="sm"

                        className="me-2"

                        onClick={()=>handleEdit(resident)}

                      >

                        Edit

                      </CButton>




                      <CButton

                        color="danger"

                        size="sm"

                        onClick={()=>handleDelete(resident._id)}

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

        onClose={()=>{

          setVisible(false);

          setSelectedResident(null);

        }}

      >



        <CModalHeader>


          Edit Resident


        </CModalHeader>



        <CModalBody>


          <form onSubmit={handleUpdate}>


            <input


              className="form-control mb-3"


              name="name"


              value={form.name}


              onChange={handleChange}


              placeholder="Name"


            />



            <input


              className="form-control mb-3"


              name="email"


              value={form.email}


              onChange={handleChange}


              placeholder="Email"


            />



            <CButton

              color="success"

              type="submit"

            >

              Update

            </CButton>



          </form>


        </CModalBody>


      </CModal>



    </>

  );


};



export default Residents;