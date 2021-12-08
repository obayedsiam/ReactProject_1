import React from "react";
import { Card, CardBody, Input, Button, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Navbar from "./NavbarComp";
import { useState } from "react";

const Header = (title, name) => {
<<<<<<< HEAD
  return (
    <div className="text-center my-5">
      {/* className = "my-2 bg-warning" */}
      <Card>
        <CardBody>
          {/* <h1>Welcome to Courses</h1> */}
          <Input type="search" placeholder="Search"></Input>
        </CardBody>
        <Navbar></Navbar>
      </Card>
=======

  // const setToggle = ()=>{
  //   setIsOpen(!(dropdownOpen));
  // }

  const handleSelect = (e)=>{
    console.log(e.target.value,"Selected");
  //  setMenu(e.target.value)
  }


  return (<div className = "text-center my-5">
    
    {/* className = "my-2 bg-warning" */}
    <Card >
      <CardBody>
      {/* <h1>Welcome to Courses</h1> */}
    <Row>
    <Col md={2}> 
    <select id = "dropdown" onChange={handleSelect} style = {{height:"100%", width :"100%"}}>
         <option value="Select">Select</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
    </select>
    {/* <Dropdown isOpen={dropdownOpen} toggle={setToggle}   onClick={handleSelect}>
        <DropdownToggle caret>
        {menu}       
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem eventKey="Menu 1">Menu 1</DropdownItem>
          <DropdownItem eventKey="Menu 2">Menu 2</DropdownItem>
          <DropdownItem eventKey="Menu 3">Menu 3</DropdownItem>
          <DropdownItem eventKey="Menu 4">Menu 4</DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
     </Col>
      <Col md={7}> 
          <Input type = "search" placeholder = "Search"></Input>
      </Col>
      <Col md = {3}>
          <Button>Search</Button>
          <Button>Cart</Button>
          <Button>Sign in</Button>
      </Col>
      </Row>
      </CardBody>
      <Navbar></Navbar>  
    </Card>
>>>>>>> 049a317b5940a9523615239a930e44e96a7803a0
    </div>
  );
};

export default Header;
