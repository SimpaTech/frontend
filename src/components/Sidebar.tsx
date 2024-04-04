import React from "react";
import { Container, Image, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faUser, faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <Container fluid className="bg-custom sidebar p-0" id="sidebar-wrapper">
        <div className="sidebar-heading mb-3">
          <Image src="/images/SidebarLogo.png" alt="SidebarLogo Logo" fluid />
        </div>
        <div className="list-group-flush">
          <Container className="d-flex flex-column gap-3">
            <Nav.Link className="list-group-background" href="#stations">
              <FontAwesomeIcon className="icon list-group-inner" icon={faCloud} /> Estações
            </Nav.Link>
            <Nav.Link className="list-group-background" href="#users">
              <FontAwesomeIcon className="icon list-group-inner" icon={faUser} /> Usuários
            </Nav.Link>
            <Nav.Link className="list-group-background" href="#parameters">
              <FontAwesomeIcon className="icon list-group-inner" icon={faCog} /> Parâmetros
            </Nav.Link>
            <Nav.Link className="list-group-background" href="#alerts">
              <FontAwesomeIcon className="icon list-group-inner" icon={faBell} /> Alertas
            </Nav.Link>
          </Container>
          <Container className="logout-box">
            <Nav.Link className="logout-inner" href="#logout">
              Logout
            </Nav.Link>
          </Container>
        </div>
      </Container>
      {/* /#sidebar-wrapper */}
    </div>
  );
}

export default Sidebar;
