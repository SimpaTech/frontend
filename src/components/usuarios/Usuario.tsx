// Usuario.tsx
import React, { Component } from "react";
import Sidebar from "../navbar/Sidebar";
import "../../styles/usuarios/Usuario.css"
import { Container } from "react-bootstrap";
import UsuarioCadastro from "./UsuarioCadastro";
import UsuarioConsultar from "./UsuarioConsultar";
import Navbar from "../navbar/Navbar";
import Header from "../Header";
import UsuarioEditar from "./UsuarioEditar";

type Props = {};

type State = {
  currentPage: string;
  hasDashboard: boolean;
  editUserId: number;
  hasCadastro: boolean;
};

export default class Usuario extends Component<Props, State> {
  state: State = {
    currentPage: "Cadastro", // Definindo a página inicial como "Cadastro"
    hasDashboard: false,
    editUserId: 1,
    hasCadastro: true,
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
      case "Consulta":
        currentPageContent = <UsuarioConsultar onEditClick={this.handleEditClick} />;
        break;
      case "Editar":
        currentPageContent = <UsuarioEditar userId={this.state.editUserId} onEditClick={() => this.changePage("Consulta")} />;
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
            <Navbar changePage={this.changePage} hasDashboard={this.state.hasDashboard} currentPage={this.state.currentPage} hasCadastro={true} />
            {currentPageContent}
          </Container>
        </Container>
      </div>
    );
  }
}