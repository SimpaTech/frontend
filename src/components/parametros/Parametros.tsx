import React, { Component } from "react"
import Sidebar from "../navbar/Sidebar"
import "../styles/Parametros.css"
import { Container } from "react-bootstrap"
import ParametrosCadastro from "./ParametrosCadastro"
import ParametrosConsultar from "./ParametrosConsultar"
import NavbarParametros from "../navbar/NavbarParametros"
import Header from "../Header"
import ParametroEditar from "./ParametrosEditar"
import Navbar from "../navbar/Navbar"

type Props = {  }

type State = {
    currentPage: string
    hasDashboard: boolean
    editParametroId: number
    hasCadastro: boolean
  }

export default class Parametros extends Component<Props, State> {
    state: State = {
        currentPage: "Cadastro",
        hasDashboard: false,
        editParametroId: 1,
        hasCadastro: true,
    }

    changePage = (page: string) => {
        this.setState({ currentPage: page })
    }

    // Função para lidar com o clique no botão de edição
    handleEditClick = (parametroId: number) => {
        // Atualize o estado com o ID do usuário para edição
        this.setState({ editParametroId: parametroId });
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

        let currentPageContent
        switch (this.state.currentPage) {
            case "Cadastro":
                currentPageContent = <ParametrosCadastro />
                break
            case "Consultar":
                currentPageContent = <ParametrosConsultar onEditClick={this.handleEditClick} />
                break
            case "Editar":
                currentPageContent = <ParametroEditar parametroId={this.state.editParametroId} onEditClick={() => this.changePage("Consultar")} />;
                break;
        }

        return (
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <Sidebar />

                <Container className="background-content p-0">
                    {/* Header */}
                    <Header title="Controle de Parâmetros" username={username} />

                    <Container>
                        <Navbar changePage={this.changePage} hasDashboard={this.state.hasDashboard} currentPage={this.state.currentPage} hasCadastro={true} />

                        {currentPageContent}
                    </Container>
                </Container>
            </div>
        )
    }
}
