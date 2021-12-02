import React from "react";
import { Card, CardBody, Input } from "reactstrap";
import Navbar from "./NavbarComp";

const Header = (title, name) => {
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
    </div>
  );
};

export default Header;
