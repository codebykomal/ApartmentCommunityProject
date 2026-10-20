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
import { useAuth } from 'src/context/AuthContext'


const Login = () => {

  const navigate = useNavigate()

  const { login } = useAuth()


  const [email,setEmail] = useState("")

  const [password,setPassword] = useState("")

  const [showPassword,setShowPassword] = useState(false)



  const handleLogin = async(e)=>{

    e.preventDefault()


    if(!email.trim() || !password.trim()){

      alert("Email and Password are required")

      return

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    if(!emailRegex.test(email)){

      alert("Enter valid email address")

      return

    }


    try{

      const response = await userService.login({

        email,

        password

      })


      const token = response.data.token

      const role = response.data.user.role


      login(token, role)



      if(role === "ADMIN"){

        navigate("/dashboard")

      }
      else{

        navigate("/resident-dashboard")

      }


    }
    catch(error){

      console.log(error)

      alert(
        error.response?.data?.message || "Login failed"
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

                  Login to your account

                </h2>



                <CForm onSubmit={handleLogin}>


                  <CFormLabel>

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


                  <div className="position-relative">

                    <CFormInput

                      type={showPassword ? "text" : "password"}

                      value={password}

                      onChange={(e)=>setPassword(e.target.value)}

                      placeholder="Your password"

                    />


                    <span

                      className="position-absolute top-50 end-0 translate-middle-y me-3"

                      style={{cursor:"pointer"}}

                      onClick={()=>setShowPassword(!showPassword)}

                    >

                      {showPassword ? "Hide" : "View"}

                    </span>


                  </div>




                  <CButton

                    color="primary"

                    type="submit"

                    className="w-100 mt-4"

                  >

                    Sign in

                  </CButton>



                </CForm>





                <div className="text-center mt-3">


                  Need an account?


                  <Link to="/authentication/register">

                    Sign up

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


export default Login