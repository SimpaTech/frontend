// Usuario.tsx
import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "../styles/Usuario.css";
import { Container } from "react-bootstrap";
import UsuarioCadastro from "./UsuarioCadastro";
import UsuarioConsultar from "./UsuarioConsultar";
import Navbar from "./Navbar";
import Header from "./Header";
import InputMask from "react-input-mask";
import UsuarioEditar from "./UsuarioEditar";

type Props = {};

type State = {
  currentPage: string;
  hasDashboard: boolean;
  editUserId: number;
};

export default class Usuario extends Component<Props, State> {
  state: State = {
    currentPage: "Cadastro", // Definindo a página inicial como "Cadastro"
    hasDashboard: false,
    editUserId: 1,
  };

  // Método para alterar a página atual
  changePage = (page: string) => {
    this.setState({ currentPage: page });
  };

  // Função para lidar com o clique no botão de edição
  handleEditClick = (userId: number) => {
    // Atualize o estado com o ID do usuário para edição
    this.setState({ editUserId: userId });
    // Navegue para a página de edição
    this.changePage("Editar");
  };

  render() {
    const storedUserDetails = localStorage.getItem('userDetails');
    let username: string = 'Visitante'; // Deixa como Visitante se não achar o Token

    if (storedUserDetails) {
      const userData = JSON.parse(storedUserDetails);
      username = userData.nome;
    }

    let currentPageContent;

    // Renderizar o conteúdo da página com base na página atual
    switch (this.state.currentPage) {
      case "Cadastro":
        currentPageContent = <UsuarioCadastro />;
        break;
      case "Consultar":
        currentPageContent = <UsuarioConsultar onEditClick={this.handleEditClick} />;
        break;
      case "Editar":
        currentPageContent = <UsuarioEditar userId={this.state.editUserId} onEditClick={() => this.changePage("Consultar")} />;
        break;
      default:
        currentPageContent = null;
    }

    return (
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <Container className="background-content p-0">
          <Header title="Controle de Usuários" username={username} />
          <Container>
            <Navbar changePage={this.changePage} hasDashboard={this.state.hasDashboard} />
            {currentPageContent}
          </Container>
        </Container>
      </div>
    );
  }
}
