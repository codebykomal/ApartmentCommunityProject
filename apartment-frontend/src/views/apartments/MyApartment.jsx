import React, { useEffect, useState } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner
} from "@coreui/react";

import apartmentService from "src/services/apartmentService";


const MyApartment = () => {


  const [apartment, setApartment] = useState(null);

  const [loading, setLoading] = useState(true);



  const fetchMyApartment = async () => {

    try {
            
      const response = await apartmentService.getMyApartment();

      setApartment(response.data);

    }
    catch(error) {

      console.log("MY APARTMENT ERROR:", error);

    }
    finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchMyApartment();

  }, []);



  if(loading){

    return <CSpinner />;

  }



  return (

    <CCard>

      <CCardHeader>

        <h5>
          My Apartment
        </h5>

      </CCardHeader>



      <CCardBody>


        {
          apartment ? (

            <>

              <h6>
                Flat Number:
              </h6>

              <p>
                {apartment.flatNumber}
              </p>



              <h6>
                Block:
              </h6>

              <p>
                {apartment.block}
              </p>



              <h6>
                Floor:
              </h6>

              <p>
                {apartment.floor}
              </p>



              <h6>
                Owner:
              </h6>

              <p>
                {apartment.owner?.name}
              </p>



              <h6>
                Email:
              </h6>

              <p>
                {apartment.owner?.email}
              </p>


            </>


          ) : (

            <p>
              No Apartment Assigned
            </p>

          )
        }


      </CCardBody>


    </CCard>

  );

};


export default MyApartment;