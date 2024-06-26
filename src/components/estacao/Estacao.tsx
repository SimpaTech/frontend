import React, { Component } from "react"
import Sidebar from "../navbar/Sidebar"
import "../../styles/estacao/Estacao.css"
import { Container } from "react-bootstrap"
import EstacaoCadastro from "./EstacaoCadastro"
import EstacaoConsultar from "./EstacaoConsultar"
import EstacaoDashboard from "./EstacaoDashboard"
import Navbar from "../navbar/Navbar"
import Header from "../Header"
import EstacaoEditar from "./EstacaoEditar"
import EstacaoParametro from "./EstacaoParametroAlterar"
import EstacaoAlerta from "./EstacaoAlertas"

type Props = {}

type State = {
  currentPage: string
  hasDashboard: boolean
  editEstacaoId: number
  editParametroId: number
  hasCadastro: boolean
}

export default class Estacao extends Component<Props, State> {
  state: State = {
    currentPage: "Dashboard", // Definindo a página inicial como "Dashboard"
    hasDashboard: true,
    editEstacaoId: 1,
    editParametroId: 1,
    hasCadastro: true,
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

  handleAlertClick = (parametroId: number) => {
    this.setState({ editParametroId: parametroId });
    // Navegue para a página de alerta
    this.changePage("LinkAlerta");
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
      case "Dashboard":
        currentPageContent = <EstacaoDashboard />
        break
      case "Cadastro":
        currentPageContent = <EstacaoCadastro />
        break
      case "Consulta":
        currentPageContent = <EstacaoConsultar onEditClick={this.handleEditClick} />
        break
      case "Editar":
        currentPageContent = <EstacaoEditar estacaoId={this.state.editEstacaoId} onEditClick={() => this.changePage("Consultar")} changePage={this.changePage} 
        onEditParametro={this.handleAlertClick}
        />
        break
      case "LinkParametro":
        //currentPageContent = <EstacaoParametro estacaoId={this.state.editEstacaoId} />
        break
      case "LinkAlerta":
        currentPageContent = <EstacaoAlerta parametroId={this.state.editParametroId} />
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
            <Navbar changePage={this.changePage} hasDashboard={this.state.hasDashboard} currentPage={this.state.currentPage} hasCadastro={true}/>

            {/* Page Content */}
            {currentPageContent} {/* Renderizando o conteúdo da página atual */}
          </Container>
        </Container>
      </div>
    )
  }
}