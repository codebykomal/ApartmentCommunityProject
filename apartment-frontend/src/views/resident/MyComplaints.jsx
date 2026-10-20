
// import React, { useEffect, useState } from "react";

// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CButton,
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CModal,
//   CModalHeader,
//   CModalBody
// } from "@coreui/react";

// import complaintService from "src/services/complaintService";


// const MyComplaints = () => {


//   const [complaints, setComplaints] = useState([]);

//   const [visible, setVisible] = useState(false);


//   const [form, setForm] = useState({

//     title: "",
//     description: "",
//     category: "",
//     image: null

//   });



//   const fetchComplaints = async () => {

//     try {

//       const response = await complaintService.getMyComplaints();

//       setComplaints(response.data);

//     }
//     catch (error) {

//       console.log(error);

//     }

//   };



//   useEffect(() => {

//     fetchComplaints();

//   }, []);



//   const handleChange = (e) => {

//     setForm({

//       ...form,

//       [e.target.name]: e.target.value

//     });

//   };



//   const handleFileChange = (e) => {

//     setForm({

//       ...form,

//       image: e.target.files[0]

//     });

//   };



//   const handleSubmit = async (e) => {

//     e.preventDefault();


//     const titleRegex = /^[A-Za-z ]+$/;
//     const categoryRegex = /^[A-Za-z ]+$/;



//     if (
//       !form.title.trim() ||
//       !form.category.trim() ||
//       !form.description.trim()
//     ) {

//       alert("All fields are required");

//       return;

//     }



//     if (!titleRegex.test(form.title)) {

//       alert("Title should contain only alphabets");

//       return;

//     }



//     if (form.title.trim().length < 5) {

//       alert("Title must contain at least 5 characters");

//       return;

//     }



//     if (!categoryRegex.test(form.category)) {

//       alert("Category should contain only alphabets");

//       return;

//     }



//     if (form.category.trim().length < 3) {

//       alert("Category must contain at least 3 characters");

//       return;

//     }



//     if (form.description.trim().length < 10) {

//       alert("Description must contain at least 10 characters");

//       return;

//     }



//     try {


//       const data = new FormData();


//       data.append("title", form.title);

//       data.append("description", form.description);

//       data.append("category", form.category);



//       if(form.image){

//         data.append("image", form.image);

//       }



//       await complaintService.createComplaint(data);



//       alert("Complaint raised successfully");



//       setVisible(false);



//       setForm({

//         title:"",
//         description:"",
//         category:"",
//         image:null

//       });



//       fetchComplaints();


//     }
//     catch(error){

//       console.log(error);

//       alert("Failed to raise complaint");

//     }


//   };
//     return (

//     <>

//       <CCard>


//         <CCardHeader className="d-flex justify-content-between">


//           <h5>
//             My Complaints
//           </h5>



//           <CButton

//             color="primary"

//             onClick={() => setVisible(true)}

//           >

//             Raise Complaint

//           </CButton>


//         </CCardHeader>



//         <CCardBody>


//           <CTable bordered hover>


//             <CTableHead>


//               <CTableRow>


//                 <CTableHeaderCell>
//                   Title
//                 </CTableHeaderCell>



//                 <CTableHeaderCell>
//                   Category
//                 </CTableHeaderCell>



//                 <CTableHeaderCell>
//                   Status
//                 </CTableHeaderCell>



//                 <CTableHeaderCell>
//                   Apartment
//                 </CTableHeaderCell>



//                 <CTableHeaderCell>
//                   Image
//                 </CTableHeaderCell>


//               </CTableRow>


//             </CTableHead>



//             <CTableBody>


//               {

//                 complaints.map((complaint)=>(


//                   <CTableRow key={complaint._id}>


//                     <CTableDataCell>

//                       {complaint.title}

//                     </CTableDataCell>



//                     <CTableDataCell>

//                       {complaint.category}

//                     </CTableDataCell>



//                     <CTableDataCell>

//                       {complaint.status}

//                     </CTableDataCell>



//                     <CTableDataCell>

//                       {complaint.apartment?.flatNumber}

//                     </CTableDataCell>



//                     <CTableDataCell>


//                       {

//                         complaint.image ?

//                         <img

//                           src={`http://localhost:5000/${complaint.image}`}

//                           alt="complaint"

//                           width="100"

//                           height="80"

//                         />

//                         :

//                         "No Image"

//                       }


//                     </CTableDataCell>


//                   </CTableRow>


//                 ))

//               }


//             </CTableBody>


//           </CTable>


//         </CCardBody>


//       </CCard>





//       <CModal

//         visible={visible}

//         onClose={() => setVisible(false)}

//       >



//         <CModalHeader>

//           Raise Complaint

//         </CModalHeader>



//         <CModalBody>



//           <form onSubmit={handleSubmit}>


//             <input

//               className="form-control mb-3"

//               name="title"

//               placeholder="Title"

//               value={form.title}

//               onChange={handleChange}

//             />



//             <input

//               className="form-control mb-3"

//               name="category"

//               placeholder="Category"

//               value={form.category}

//               onChange={handleChange}

//             />



//             <textarea

//               className="form-control mb-3"

//               name="description"

//               placeholder="Description"

//               value={form.description}

//               onChange={handleChange}

//             />



//             <input

//               type="file"

//               className="form-control mb-3"

//               onChange={handleFileChange}

//             />



//             <CButton

//               color="success"

//               type="submit"

//             >

//               Submit

//             </CButton>


//           </form>


//         </CModalBody>


//       </CModal>


//     </>

//   );


// };


// export default MyComplaints;


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
  CModalBody
} from "@coreui/react";

import complaintService from "src/services/complaintService";


const MyComplaints = () => {


  const [complaints, setComplaints] = useState([]);

  const [visible, setVisible] = useState(false);



  const [form, setForm] = useState({

    title: "",
    description: "",
    category: "",
    phoneNumber: "",
    image: null

  });



  const fetchComplaints = async () => {

    try {

      const response = await complaintService.getMyComplaints();

      setComplaints(response.data);

    }
    catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    fetchComplaints();

  }, []);




  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };




  const handleFileChange = (e) => {

    setForm({

      ...form,

      image: e.target.files[0]

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();



    const titleRegex = /^[A-Za-z ]+$/;

    const categoryRegex = /^[A-Za-z ]+$/;

    const phoneRegex = /^[0-9]{10}$/;




    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.phoneNumber.trim()
    ) {

      alert("All fields are required");

      return;

    }




    if (!titleRegex.test(form.title)) {

      alert("Title should contain only alphabets");

      return;

    }




    if (!categoryRegex.test(form.category)) {

      alert("Category should contain only alphabets");

      return;

    }




    if (!phoneRegex.test(form.phoneNumber)) {

      alert("Phone number must contain exactly 10 digits");

      return;

    }




    if (form.description.trim().length < 10) {

      alert("Description must contain at least 10 characters");

      return;

    }




    try {


      const data = new FormData();



      data.append("title", form.title);

      data.append("description", form.description);

      data.append("category", form.category);

      data.append("phoneNumber", form.phoneNumber);



      if(form.image){

        data.append("image", form.image);

      }



      await complaintService.createComplaint(data);


      alert("Complaint raised successfully");


      setVisible(false);



      setForm({

        title:"",
        description:"",
        category:"",
        phoneNumber:"",
        image:null

      });



      fetchComplaints();


    }
    catch(error){

      console.log(error);

      alert("Failed to raise complaint");

    }


  };
  return (

    <>

      <CCard>


        <CCardHeader className="d-flex justify-content-between">


          <h5>
            My Complaints
          </h5>



          <CButton

            color="primary"

            onClick={() => setVisible(true)}

          >

            Raise Complaint

          </CButton>


        </CCardHeader>



        <CCardBody>


          <CTable bordered hover>


            <CTableHead>


              <CTableRow>


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
                  Status
                </CTableHeaderCell>



                <CTableHeaderCell>
                  Apartment
                </CTableHeaderCell>



                <CTableHeaderCell>
                  Image
                </CTableHeaderCell>


              </CTableRow>


            </CTableHead>




            <CTableBody>


              {

                complaints.map((complaint)=>(


                  <CTableRow key={complaint._id}>


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
                      {complaint.status}
                    </CTableDataCell>



                    <CTableDataCell>
                      {complaint.apartment?.flatNumber}
                    </CTableDataCell>



                    <CTableDataCell>


                      {

                        complaint.image ?

                        <a

                          href={`http://localhost:5000${complaint.image}`}

                          target="_blank"

                          rel="noopener noreferrer"

                        >

                          <img

                            src={`http://localhost:5000${complaint.image}`}

                            alt="complaint"

                            width="100"

                            height="80"

                            style={{
                              cursor:"pointer"
                            }}

                          />

                        </a>

                        :

                        "No Image"

                      }


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

        onClose={() => setVisible(false)}

      >



        <CModalHeader>

          Raise Complaint

        </CModalHeader>



        <CModalBody>



          <form onSubmit={handleSubmit}>



            <input

              className="form-control mb-3"

              name="title"

              placeholder="Title"

              value={form.title}

              onChange={handleChange}

            />



            <input

              className="form-control mb-3"

              name="category"

              placeholder="Category"

              value={form.category}

              onChange={handleChange}

            />



            <input

              className="form-control mb-3"

              name="phoneNumber"

              placeholder="Phone Number"

              value={form.phoneNumber}

              onChange={handleChange}

            />



            <textarea

              className="form-control mb-3"

              name="description"

              placeholder="Description"

              value={form.description}

              onChange={handleChange}

            />



            <input

              type="file"

              className="form-control mb-3"

              onChange={handleFileChange}

            />



            <CButton

              color="success"

              type="submit"

            >

              Submit

            </CButton>



          </form>


        </CModalBody>


      </CModal>


    </>

  );


};



export default MyComplaints;