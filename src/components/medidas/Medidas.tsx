import React, { Component } from "react"
import Sidebar from "../navbar/Sidebar"
import "../../styles/parametros/Parametros.css"
import { Container } from "react-bootstrap"
import Header from "../Header"
import Navbar from "../navbar/Navbar"
import MedidasConsultar from "./MedidasConsultar"

type Props = {  }

type State = {
    currentPage: string
    hasDashboard: boolean
    editParametroId: number
    hasCadastro: boolean
  }

export default class Medidas extends Component<Props, State> {
    state: State = {
        currentPage: "Consultar",
        hasDashboard: false,
        editParametroId: 1,
        hasCadastro: false,
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
            case "Consultar":
                currentPageContent = <MedidasConsultar />
                break
        }

        return (
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <Sidebar />

                <Container className="background-content p-0">
                    {/* Header */}
                    <Header title="Medidas" username={username} />

                    <Container>
                        <Navbar changePage={this.changePage} hasDashboard={this.state.hasDashboard} currentPage={this.state.currentPage} hasCadastro={false} />

                        {currentPageContent}
                    </Container>
                </Container>
            </div>
        )
    }
}
