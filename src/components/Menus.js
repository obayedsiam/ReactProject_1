import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
const Menus = () => {
  return (
    <ListGroup>
      {/* <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/"
        action="true"
      >
        Home
      </Link> */}
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add-customer"
        action="true"
      >
        Add Single Customer
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/add-file"
        action="true"
      >
        Add Customer Detail File
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/search"
        action="true"
      >
        Search and Export Customer Data
      </Link>

      {/* <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/view-course"
        action="true"
      >
        View Course
      </Link> 
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/about"
        action="true"
      >
        About
      </Link>
      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/contact"
        action="true"
      >
        Contact
      </Link>

      <Link
        className="list-group-item list-group-item-action"
        tag="a"
        to="/login"
        action="true"
      >
        Login
      </Link>
      */}
    </ListGroup>
  );
};
export default Menus;
