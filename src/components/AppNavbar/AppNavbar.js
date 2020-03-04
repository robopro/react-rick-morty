import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/logo.png';

class AppNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand as={Link} to="/">
          <img 
            src={logo} 
            alt="Rick &amp; Morty"
            height="30"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="https://github.com/robopro/react-rick-morty">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppNavbar;