import React, { useEffect, useState } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem
} from "@coreui/react";

import noticeService from "src/services/noticeService";

const MyNotices = () => {

  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {

    try {

      const response = await noticeService.getAllNotices();

      setNotices(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchNotices();

  }, []);

  return (

    <CCard>

      <CCardHeader>

        <h5>Community Notices</h5>

      </CCardHeader>

      <CCardBody>

        <CListGroup>

          {
            notices.map((notice) => (

              <CListGroupItem key={notice._id}>

                <h6>{notice.title}</h6>

                <p>{notice.message}</p>

              </CListGroupItem>

            ))
          }

        </CListGroup>

      </CCardBody>

    </CCard>

  );

};

export default MyNotices;