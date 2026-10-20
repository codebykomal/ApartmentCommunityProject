import React, { useEffect, useState } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from "@coreui/react";

import noticeService from "src/services/noticeService";

const Notices = () => {

  const [notices, setNotices] = useState([]);

  const [visible, setVisible] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    title:"",
    message:""
  });

  const fetchNotices = async()=>{

    try{

      const response = await noticeService.getAllNotices();

      setNotices(response.data);

    }
    catch(error){

      console.log("FETCH NOTICE ERROR:",error);

    }

  };

  useEffect(()=>{

    fetchNotices();

  },[]);

  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };

  const resetForm=()=>{

    setForm({

      title:"",
      message:""

    });

    setEditMode(false);

    setSelectedId(null);

  };

  const openCreateModal=()=>{

    resetForm();

    setVisible(true);

  };

  const openEditModal=(notice)=>{

    setForm({

      title:notice.title,

      message:notice.message

    });

    setSelectedId(notice._id);

    setEditMode(true);

    setVisible(true);

  };

const handleSubmit=async(e)=>{

  e.preventDefault();


  if(
    !form.title.trim() ||
    !form.message.trim()
  ){

    alert("Title and Message are required");

    return;

  }


  const titleRegex = /^[A-Za-z ]+$/;

  const messageRegex = /^[A-Za-z0-9 ]+$/;



  if(!titleRegex.test(form.title)){

    alert("Title should contain only alphabets");

    return;

  }


  if(form.title.trim().length < 5){

    alert("Title must contain at least 5 characters");

    return;

  }



  if(!messageRegex.test(form.message)){

    alert("Message should contain only alphabets and numbers");

    return;

  }



  if(form.message.trim().length < 10){

    alert("Message must contain at least 10 characters");

    return;

  }



  try{

    if(editMode){

      await noticeService.updateNotice(

        selectedId,

        form

      );

    }
    else{

      await noticeService.createNotice(form);

    }


    setVisible(false);

    resetForm();

    fetchNotices();


  }
  catch(error){

    console.log("SAVE NOTICE ERROR:",error);

    alert(
      error.response?.data?.message || "Failed to save notice"
    );

  }

};

  const handleDelete=async(id)=>{

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this notice?"

    );

    if(!confirmDelete){

      return;

    }

    try{

      await noticeService.deleteNotice(id);

      fetchNotices();

    }
    catch(error){

      console.log("DELETE NOTICE ERROR:",error);

    }

  };

  return (

    <>

      <CCard>

        <CCardHeader className="d-flex justify-content-between align-items-center">

          <h5>
            Notice Management
          </h5>

          <CButton

            color="primary"

            onClick={openCreateModal}

          >

            Create Notice

          </CButton>

        </CCardHeader>

        <CCardBody>

          <CListGroup>

            {

              notices.map((notice)=>(

                <CListGroupItem key={notice._id}>

                  <h6>

                    {notice.title}

                  </h6>

                  <p>

                    {notice.message}

                  </p>

                  <small>

                    Created By: {notice.createdBy?.name}

                  </small>

                  <div className="mt-3">

                    <CButton

                      color="warning"

                      size="sm"

                      className="me-2"

                      onClick={()=>openEditModal(notice)}

                    >

                      Edit

                    </CButton>

                    <CButton

                      color="danger"

                      size="sm"

                      onClick={()=>handleDelete(notice._id)}

                    >

                      Delete

                    </CButton>

                  </div>

                </CListGroupItem>

              ))

            }

          </CListGroup>

        </CCardBody>

      </CCard>

      <CModal

        visible={visible}

        onClose={()=>{

          setVisible(false);

          resetForm();

        }}

      >

        <CModalHeader>

          {editMode ? "Edit Notice" : "Create Notice"}

        </CModalHeader>

        <CModalBody>

          <form onSubmit={handleSubmit}>

            <input

              className="form-control mb-3"

              name="title"

              placeholder="Notice Title"

              value={form.title}

              onChange={handleChange}

            />

            <textarea

              className="form-control mb-3"

              name="message"

              placeholder="Notice Message"

              value={form.message}

              onChange={handleChange}

              rows="4"

            />

            <CModalFooter>

              <CButton

                color="secondary"

                onClick={()=>{

                  setVisible(false);

                  resetForm();

                }}

              >

                Cancel

              </CButton>

              <CButton

                color="success"

                type="submit"

              >

                {editMode ? "Update Notice" : "Save Notice"}

              </CButton>

            </CModalFooter>

          </form>

        </CModalBody>

      </CModal>

    </>

  );

};

export default Notices;