import React from "react"
import { Container, Image, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloud, faUser, faCog, faBell } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import "../styles/Sidebar.css"

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
            <Link to="/estacoes" className="text-decoration-none list-group-background">
                <FontAwesomeIcon className="icon list-group-inner" icon={faCloud} /> Estações
            </Link>
            <Link to="/usuarios" className="text-decoration-none list-group-background">
              <FontAwesomeIcon className="icon list-group-inner" icon={faUser} /> Usuários
            </Link>
            <Link to="/parametros" className="text-decoration-none list-group-background">
              <FontAwesomeIcon className="icon list-group-inner" icon={faCog} /> Parâmetros
            </Link>
            <Link to="/alertas" className="text-decoration-none list-group-background">
              <FontAwesomeIcon className="icon list-group-inner" icon={faBell} /> Alertas
            </Link>
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
  )
}

export default Sidebar
