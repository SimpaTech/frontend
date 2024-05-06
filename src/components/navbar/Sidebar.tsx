import React, { useState, useEffect } from "react";
import { Container, Image, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faUser, faCog, faBell, faList } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/navbar/Sidebar.css"
import { logout, obterInformacoesUsuarioPeloToken } from '../../services/apiService';

const Sidebar = () => {
  const [logoutMessage, setLogoutMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setCurrentPage(window.location.pathname);
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
          const userData = JSON.parse(storedUserDetails);
          setUserDetails(userData);
          if(userData.id_usuario) {
            setUserId(userData.id_usuario);
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário", error);
      }
    }
  
    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await obterInformacoesUsuarioPeloToken(token);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        navigate('/');
      }
    }
  
    fetchUserData();
    checkTokenValidity();
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
      <Container fluid className="bg-custom sidebar p-0" id="sidebar-wrapper">
        <div className="sidebar-heading mb-3">
          <Image src="/images/SidebarLogo.png" alt="SidebarLogo Logo" fluid style={{ width: "px" }} />
        </div>
        <div className="list-group-flush">
          <Container className="d-flex flex-column gap-3">
            <Link to="/estacoes" className={`text-decoration-none list-group-background ${currentPage === "/estacoes" ? "active-page" : ""}`}>
              <FontAwesomeIcon className="icon list-group-inner" icon={faCloud} /> Estações
            </Link>
            <Link to="/usuarios" className={`text-decoration-none list-group-background ${currentPage === "/usuarios" ? "active-page" : ""}`}>
              <FontAwesomeIcon className="icon list-group-inner" icon={faUser} /> Usuários
            </Link>
            <Link to="/parametros" className={`text-decoration-none list-group-background ${currentPage === "/parametros" ? "active-page" : ""}`}>
              <FontAwesomeIcon className="icon list-group-inner" icon={faCog} /> Parâmetros
            </Link>
            <Link to="/alertas" className={`text-decoration-none list-group-background ${currentPage === "/alertas" ? "active-page" : ""}`}>
              <FontAwesomeIcon className="icon list-group-inner" icon={faBell} /> Alertas
            </Link>
            <Link to="/medidas" className={`text-decoration-none list-group-background ${currentPage === "/medidas" ? "active-page" : ""}`}>
              <FontAwesomeIcon className="icon list-group-inner" icon={faList} /> Medidas
            </Link>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default Sidebar;
