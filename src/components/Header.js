import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "./NavbarComp";
import { useState } from "react";
import Login from "./Login";

import { BsCartFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';


const Header = (title, name) => {
  // const setToggle = ()=>{
  //   setIsOpen(!(dropdownOpen));
  // }

  const handleSelect = (e) => {
    console.log(e.target.value, "Selected");
    //  setMenu(e.target.value)
  };

  return (
    <div className="text-center my-5">
      {/* className = "my-2 bg-warning" */}
      <Card>
        <CardBody>
          {/* <h1>Welcome to Courses</h1> */}
          <Row>
            <Col md={2}>
              <select
                id="dropdown"
                onChange={handleSelect}
                style={{ height: "100%", width: "100%" }}
              >
                <option value="All Category">All Category</option>
                <option value="1">Electronic</option>
                <option value="2">Fashion Item</option>
                <option value="3">Shoe</option>
                <option value="4">Cloth</option>
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
             <div className="rowC">
              <Input
                type="search"
                placeholder="Search"
               
              ></Input>
               <Button>Search</Button>
               </div>
            </Col>
            <Col md={3}>
            <BsCartFill size={50}  style={{ paddingRight: "20px"}} ></BsCartFill>
              <Link to={`/login`}>
                {/* <Button>Sign in</Button> */}
                <MdAccountCircle size={32}></MdAccountCircle>
              </Link>
            </Col>
          </Row>
        </CardBody>
        <Navbar></Navbar>
      </Card>
    </div>
  );
};

export default Header;
