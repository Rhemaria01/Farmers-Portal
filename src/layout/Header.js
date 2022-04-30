import React,{useContext, useState} from 'react'
import {Link} from "react-router-dom"
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import {FaSignOutAlt} from "react-icons/fa"
import { UserContext } from "../context/UserContext"

import {FaTractor} from "react-icons/fa"
import "../css/header.css"

const Header = () => {
  const context = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
    return (
      <Navbar className="navbar fixed-top" light expand="md">
      <NavbarBrand className="navbar-brand">
          
          <Link to="/" className="text-black ms-5 me-2"> <FaTractor /> Farm Fresh</Link>
      </NavbarBrand>
      <NavbarText className="text-black">{
          context.user?.email ? context.user.email : ""
      }</NavbarText>
      <NavbarToggler onClick={toggle}/>
      <Collapse  isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
                  
                  {
                      context.user ? (
                  <>      
                  <NavItem className="nav-item">
                      <NavLink tag={Link} to="/order" className="fw-bolder text-uppercase">
                        Orders
                      </NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                      <NavLink onClick={()=>(context.setUser(null))} className="fw-bolder text-uppercase">
                        <FaSignOutAlt />  Logout
                      </NavLink>
                  </NavItem>
                  </>    
                  ) : (
                  <>
                  <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="fw-bolder text-uppercase">
                Sign in
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/fsignin">
                  Farmer
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/csignin" >
                  Consumer
                </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="fw-bolder text-uppercase">
                Sign up
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to="/fsignup">
                  Farmer
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/csignup" >
                  Consumer
                </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
                  </>    
                  )
                  }
                  
                                  
          </Nav>
      </Collapse>
  </Navbar>
        )}
      
        

      


   


export default Header
