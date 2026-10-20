import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  useColorModes,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'


const AppHeader = () => {


  const headerRef = useRef()


  const { colorMode, setColorMode } = useColorModes(
    'coreui-free-react-admin-template-theme'
  )


  const dispatch = useDispatch()


  const sidebarShow = useSelector(
    (state) => state.sidebarShow
  )



  useEffect(() => {


    const handleScroll = () => {


      headerRef.current &&

      headerRef.current.classList.toggle(
        'shadow-sm',
        document.documentElement.scrollTop > 0
      )


    }


    document.addEventListener(
      'scroll',
      handleScroll
    )


    return () => {

      document.removeEventListener(
        'scroll',
        handleScroll
      )

    }


  }, [])



  return (

    <CHeader
      position="sticky"
      className="mb-4 p-0"
      ref={headerRef}
    >


      <CContainer
        className="border-bottom px-4"
        fluid
      >


        <CHeaderToggler

          onClick={() =>
            dispatch({
              type:'set',
              sidebarShow:!sidebarShow
            })
          }

        >

          <CIcon
            icon={cilMenu}
            size="lg"
          />

        </CHeaderToggler>



        <CHeaderNav className="ms-auto">


          <CDropdown
            variant="nav-item"
            placement="bottom-end"
          >


            <CDropdownToggle
              caret={false}
            >

              {
                colorMode === "dark"

                ?

                <CIcon
                  icon={cilMoon}
                  size="lg"
                />

                :

                <CIcon
                  icon={cilSun}
                  size="lg"
                />

              }


            </CDropdownToggle>



            <CDropdownMenu>


              <CDropdownItem

                active={
                  colorMode === "light"
                }

                as="button"

                type="button"

                onClick={() =>
                  setColorMode("light")
                }

              >

                <CIcon
                  icon={cilSun}
                  className="me-2"
                />

                Light

              </CDropdownItem>



              <CDropdownItem

                active={
                  colorMode === "dark"
                }

                as="button"

                type="button"

                onClick={() =>
                  setColorMode("dark")
                }

              >

                <CIcon
                  icon={cilMoon}
                  className="me-2"
                />

                Dark

              </CDropdownItem>



              <CDropdownItem

                active={
                  colorMode === "auto"
                }

                as="button"

                type="button"

                onClick={() =>
                  setColorMode("auto")
                }

              >

                <CIcon
                  icon={cilContrast}
                  className="me-2"
                />

                Auto

              </CDropdownItem>


            </CDropdownMenu>


          </CDropdown>



          <AppHeaderDropdown />


        </CHeaderNav>



      </CContainer>



      <CContainer
        className="px-4"
        fluid
      >

        <AppBreadcrumb />

      </CContainer>



    </CHeader>

  )

}


export default AppHeader