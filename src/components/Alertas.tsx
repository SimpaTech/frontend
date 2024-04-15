import React, { Component } from "react"
import Sidebar from "./Sidebar"
import "../styles/Alertas.css"
import { Container } from "react-bootstrap"
import Navbar from "./Navbar"
import Header from "./Header"
import AlertasCadastro from "./AlertasCadastro"
import AlertasConsultar from "./AlertasConsultar"
import AlertasEditar from "./AlertasEditar"

type Props = {}

interface AlertasState {
    currentPage: string
    hasDashboard: boolean
    editAlertaId: number
}

export default class Alertas extends Component<Props, AlertasState> {
    state: AlertasState = {
        currentPage: "Cadastro",
        hasDashboard: false,
        editAlertaId: 1
    }

    changePage = (page: string) => {
        this.setState({ currentPage: page })
    }

    // Função para lidar com o clique no botão de edição
    handleEditClick = (alertaId: number) => {
        // Atualize o estado com o ID do usuário para edição
        this.setState({ editAlertaId: alertaId });
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
                currentPageContent = <AlertasCadastro />
                break
            case "Consultar":
                currentPageContent = <AlertasConsultar onEditClick={this.handleEditClick} />
                break
            case "Editar":
                currentPageContent = <AlertasEditar alertaId={this.state.editAlertaId} onEditClick={() => this.changePage("Consultar")}/>
                break
        }

        return (
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <Sidebar />

                <Container className="background-content p-0">
                    {/* Header */}
                    <Header title="Controle de Alertas" username={username} />

                    <Container>
                        <Navbar changePage={this.changePage} hasDashboard={false} />

                        {currentPageContent}
                    </Container>
                </Container>
            </div>
        )
    }
}
