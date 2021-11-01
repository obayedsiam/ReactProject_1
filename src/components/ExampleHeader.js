import React, { useState } from "react";
import { Link } from "react-router-dom";
import MyAccount from "./MyAccount";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Form,
  Input,
  Button,
} from "reactstrap";

const ExampleHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="bg-light variant-dark" light expand="md">
        <NavbarBrand href="/">Ma Book Store</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Books
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Browse the bookshelf</DropdownItem>
                <DropdownItem>FAQ</DropdownItem>
                {/* <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Input type="text" placeholder="Book title"></Input>
            </NavItem>
            <NavItem>
              <Button type="submit">Search</Button>
            </NavItem>

            <ul>
              <li className="nav-item">Shopping Cart</li>

              <Link
                className="list-group-item list-group-item-action"
                tag="a"
                to="/myAccount"
                action="true"
              >
                <li className="nav-item">My Account</li>
              </Link>
              <li className="nav-item">Logout</li>
            </ul>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ExampleHeader;
