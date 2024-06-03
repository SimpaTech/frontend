import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavbarVisitante.css'; // Arquivo CSS para estilos adicionais

const NavbarVisitante: React.FC = () => {
  return (
    <Navbar bg="light" variant="light" className="navbar-custom m-0">
      <Navbar.Brand href="/">Logo</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/sobre">Sobre</Nav.Link>
        <Nav.Link href="/contato">Contato</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarVisitante;
