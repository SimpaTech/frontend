import React, { useState, useEffect } from "react";
import { Container, Image, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faUser, faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate   } from "react-router-dom";
import "../styles/Sidebar.css";
import { logout, obterInformacoesUsuarioPeloToken } from '../services/apiService';

const Sidebar = () => {
  const [logoutMessage, setLogoutMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null); // Adicione este estado
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserDetails = localStorage.getItem('userDetails');
        console.log("storedUserDetails:", storedUserDetails); // Adicione este console.log
        if (storedUserDetails) {
          const userData = JSON.parse(storedUserDetails);
          setUserDetails(userData);
          if(userData.id_usuario) {
            setUserId(userData.id_usuario);
          }
          console.log("Detalhes do usuário:", userData);
        }
        else {
          console.log("Não há detalhes do usuário no localStorage."); // Adicione este console.log
          // Se não houver detalhes do usuário no localStorage, redirecione para a tela de login
          navigate('/');
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário", error);
      }
    }
  
    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("token:", token); // Adicione este console.log
        if (token) {
          await obterInformacoesUsuarioPeloToken(token);
        } else {
          console.log("Token não encontrado no localStorage."); // Adicione este console.log
          // Se não houver token no localStorage, redirecione para a tela de login
          navigate('/');
        }
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        // Se o token for inválido ou expirado, redirecione para a tela de login
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