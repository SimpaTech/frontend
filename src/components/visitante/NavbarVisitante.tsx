import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./NavbarVisitante.css"; // Arquivo CSS para estilos adicionais
import { Button, Image, NavDropdown } from "react-bootstrap";

const NavbarVisitante: React.FC = () => {
  return (
    <Navbar className="navbar-custom m-0">
      <Navbar.Brand href="/">
        <Image src="/images/NavbarLogo.png" className=""/>
      </Navbar.Brand>
      <Nav className="m-0 p-0">
        <Nav.Link href="/" className="hover-color-white">Ínicio</Nav.Link>
        <Nav.Link href="#documentacao" className="px-2 mx-5 hover-color-white">Documentação</Nav.Link>
        <NavDropdown title="Dados" id="basic-nav-dropdown">
          <NavDropdown.Item href="/dados/ocorrencias" className="hover-color-grey">Ocorrências</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/dados/medidas" className="hover-color-grey">Medidas</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Button variant="outline-primary" href="/login" className="btn-login">
          Login
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavbarVisitante;
