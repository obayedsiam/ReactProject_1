import React from "react";
import { Card, CardBody, Input, Button, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Navbar from "./NavbarComp";
import { useState } from "react";

const Header = (title, name) => {


  const [dropdownOpen, setIsOpen] = useState(true);
  const [menu, setMenu] = useState("Select");

  const setToggle = ()=>{
    setIsOpen(!(dropdownOpen));
  }

  const handleSelect = (e)=>{
    console.log("selected");
    setMenu(e)
  }


  return (<div className = "text-center my-5">
    
    {/* className = "my-2 bg-warning" */}
    <Card >
      <CardBody>
      {/* <h1>Welcome to Courses</h1> */}
    <Row>
    <Col md={2}> 
    <Dropdown isOpen={dropdownOpen} toggle={setToggle}  onselect={handleSelect}>
        <DropdownToggle caret>
        {menu}       
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem eventKey="Menu 1">Menu 1</DropdownItem>
          <DropdownItem eventKey="Menu 2">Menu 2</DropdownItem>
          <DropdownItem eventKey="Menu 3">Menu 3</DropdownItem>
          <DropdownItem eventKey="Menu 4">Menu 4</DropdownItem>
        </DropdownMenu>
      </Dropdown>
     </Col>
      <Col md={8}> 
          <Input type = "search" placeholder = "Search"></Input>
      </Col>
      <Col md = {2}>
          <Button>Search</Button>
      </Col>
      </Row>
      </CardBody>
      <Navbar></Navbar>  
    </Card>
    </div>
     );
};

export default Header;
