import React, { useState, useEffect } from "react";
import { Container, Image, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faUser, faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate  } from "react-router-dom";
import "../styles/Sidebar.css";
import { logout } from '../services/apiService';

const Sidebar = () => {
  const [logoutMessage, setLogoutMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null); // Adicione este estado
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
          const userData = JSON.parse(storedUserDetails);
          setUserDetails(userData);
          if(userData.id_usuario) {
            setUserId(userData.id_usuario);
          }
          console.log("Detalhes do usuário:", userData);
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário", error);
      }
    }
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      if (userId) {
        const message = await logout(userId);
        setLogoutMessage(message);
        localStorage.removeItem('userDetails');
        setLoggedOut(true);
      } else {
        console.error("Id do usuário não disponível");
      }
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };
  if (loggedOut) {
    return <Navigate to="/" />;
  }

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
            {userId !== null && (
              <>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
                {logoutMessage && <p>{logoutMessage}</p>}
              </>
            )}
          </Container>
        </div>
      </Container>
      {/* /#sidebar-wrapper */}
    </div>
  );
}

export default Sidebar;