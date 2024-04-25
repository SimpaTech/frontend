import React, { Component } from "react"
import Sidebar from "./Sidebar"
import "../styles/Estacao.css"
import { Container } from "react-bootstrap"
import EstacaoCadastro from "./EstacaoCadastro"
import EstacaoConsultar from "./EstacaoConsultar"
import EstacaoDashboard from "./EstacaoDashboard"
import Navbar from "./Navbar"
import Header from "./Header"
import EstacaoEditar from "./EstacaoEditar"
import EstacaoParametro from "./EstacaoParametro"
import EstacaoAlerta from "./EstacaoAlerta"

type Props = {}

type State = {
  currentPage: string
  hasDashboard: boolean
  editEstacaoId: number
}

export default class Estacao extends Component<Props, State> {
  state: State = {
    currentPage: "Dashboard", // Definindo a página inicial como "Dashboard"
    hasDashboard: true,
    editEstacaoId: 1,
  }

  // Método para alterar a página atual
  changePage = (page: string) => {
    this.setState({ currentPage: page })
  }

  // Função para lidar com o clique no botão de edição
  handleEditClick = (estacaoId: number) => {
    // Atualize o estado com o ID do usuário para edição
    this.setState({ editEstacaoId: estacaoId });
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

    let currentPageContent // Variável para armazenar o conteúdo da página atual

    // Renderizar o conteúdo da página com base na página atual
    switch (this.state.currentPage) {
      case "Cadastro":
        currentPageContent = <EstacaoCadastro />
        break
      case "Consultar":
        currentPageContent = <EstacaoConsultar onEditClick={this.handleEditClick} />
        break
      case "Dashboard":
        currentPageContent = <EstacaoDashboard />
        break
      case "Editar":
        currentPageContent = <EstacaoEditar estacaoId={this.state.editEstacaoId} onEditClick={() => this.changePage("Consultar")} changePage={this.changePage} />
        break
      case "LinkParametro":
        currentPageContent = <EstacaoParametro estacaoId={this.state.editEstacaoId}/>
        break
      case "LinkAlerta":
        currentPageContent = <EstacaoAlerta />
        break
    }

    return (
      <div className="d-flex" id="wrapper">
        {/* Sidebar */}
        <Sidebar />

        <Container className="background-content p-0">
          {/* Header */}
          <Header title="Controle de Estações" username={username} />

          <Container>
            {/* Navbar */}
            <Navbar changePage={this.changePage} hasDashboard={this.state.hasDashboard} /> {/* Passando a função changePage para a Navbar */}

            {/* Page Content */}
            {currentPageContent} {/* Renderizando o conteúdo da página atual */}
          </Container>
        </Container>
      </div>
    )
  }
}
