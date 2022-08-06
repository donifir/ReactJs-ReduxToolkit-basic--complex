import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavbarComponents() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/suplier">Suplier</Link>
          <Link className="nav-link" to="/barang">Barang</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
