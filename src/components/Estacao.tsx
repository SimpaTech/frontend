import React, { Component } from "react"
import Sidebar from "./Sidebar"
import "../styles/Estacao.css"
import { Container } from "react-bootstrap"
import EstacaoCadastro from "./EstacaoCadastro"
import EstacaoConsultar from "./EstacaoConsultar"
import EstacaoDashboard from "./EstacaoDashboard"
import Navbar from "./Navbar"
import Header from "./Header"

type Props = {}

type State = {
  currentPage: string
  hasDashboard: boolean
}

export default class Estacao extends Component<Props, State> {
  state: State = {
    currentPage: "Dashboard", // Definindo a página inicial como "Dashboard"
    hasDashboard: true,
  }

  // Método para alterar a página atual
  changePage = (page: string) => {
    this.setState({ currentPage: page })
  }

  render() {
    // const { username } = useContext(UserContext); // Usar o useContext quando estiver disponível
    const username = "Felipe AG" // Por enquanto, usarei Felipe AG mockado no Header

    let currentPageContent // Variável para armazenar o conteúdo da página atual

    // Renderizar o conteúdo da página com base na página atual
    switch (this.state.currentPage) {
      case "Cadastro":
        currentPageContent = <EstacaoCadastro />
        break
      case "Consultar":
        currentPageContent = <EstacaoConsultar />
        break
      case "Dashboard":
        currentPageContent = <EstacaoDashboard />
        break
/*       default:
        currentPageContent = <EstacaoDashboard /> */
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
