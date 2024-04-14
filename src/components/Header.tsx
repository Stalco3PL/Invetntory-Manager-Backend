import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import logo from "../assets/stalco logo.png"

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                alt="Vehicle Inventory Logo"
                height="50"
                style={{ marginRight: "15px"}}
              />
              <span>Inventory Manager</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
