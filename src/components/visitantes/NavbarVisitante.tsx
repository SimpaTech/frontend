import React from "react";
import { Navbar, Nav, Button, Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/visitantes/NavbarVisitante.css"; // Arquivo CSS para estilos adicionais

const NavbarVisitante: React.FC = () => {
  return (
    <Navbar className="navbar-custom m-0">
      <Navbar.Brand as={Link} to="/">
        <Image src="/images/NavbarLogo.png" className=""/>
      </Navbar.Brand>
      <Nav className="m-0 p-0">
        <Nav.Link as={Link} to="/" className="hover-color-white">Ínicio</Nav.Link>
        <Nav.Link as={Link} to="/documentacao" className="px-2 mx-5 hover-color-white">Documentação</Nav.Link>
        <NavDropdown title="Dados" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/dados/ocorrencias" className="hover-color-grey">Ocorrências</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="/dados/medidas" className="hover-color-grey">Medidas</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Link to="/login">
          <Button variant="outline-primary" className="btn-login">
            Login
          </Button>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarVisitante;
