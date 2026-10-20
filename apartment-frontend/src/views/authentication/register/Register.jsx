import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { logo } from 'src/assets/brand/logo'

import userService from 'src/services/userService'


const Register = () => {

  const navigate = useNavigate()

  const [name,setName] = useState("")

  const [email,setEmail] = useState("")

  const [password,setPassword] = useState("")


  const handleSubmit = async(event)=>{

    event.preventDefault()


    const nameRegex = /^[A-Za-z ]+$/

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!&*]).{8,}$/


    if(!name.trim() || !email.trim() || !password.trim()){

      alert("All fields are required")

      return

    }


    if(!nameRegex.test(name)){

      alert("Name should contain only alphabets")

      return

    }


    if(name.trim().length < 3){

      alert("Name must contain at least 3 characters")

      return

    }


    if(passwordRegex.test(password) === false){

      alert(
        "Password must contain minimum 8 characters with uppercase, lowercase, number and special character"
      )

      return

    }


    try{


      await userService.register({

        name,

        email,

        password

      })


      alert("Registration Successful")

      navigate("/authentication/login")


    }
    catch(error){


      console.log(error)


      alert(
        error.response?.data?.message || "Registration failed"
      )


    }

  }



  return (

    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">

      <CContainer>

        <CRow className="justify-content-center">

          <CCol md={8} lg={6} xl={5}>

            <CCard className="p-4">

              <CCardBody>


                <div className="text-center mb-4">

                  <CIcon 
                    icon={logo} 
                    height={48}
                  />

                </div>


                <h2 className="h5 text-center">

                  Create new account

                </h2>



                <CForm onSubmit={handleSubmit}>


                  <CFormLabel>
                    Name
                  </CFormLabel>


                  <CFormInput

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                    placeholder="Your name"

                  />



                  <CFormLabel className="mt-3">

                    Email address

                  </CFormLabel>


                  <CFormInput

                    type="email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    placeholder="your@email.com"

                  />



                  <CFormLabel className="mt-3">

                    Password

                  </CFormLabel>


                  <CFormInput

                    type="password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    placeholder="Your password"

                  />



                  <CButton

                    color="primary"

                    type="submit"

                    className="w-100 mt-4"

                  >

                    Create new account

                  </CButton>



                </CForm>



                <div className="text-center mt-3">


                  Already have an account?


                  <Link to="/authentication/login">

                    Sign in

                  </Link>


                </div>



              </CCardBody>


            </CCard>

          </CCol>

        </CRow>

      </CContainer>


    </div>

  )

}


export default Register