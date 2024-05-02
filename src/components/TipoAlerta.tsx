import React, { Component } from "react"
import Sidebar from "./Sidebar"
import "../styles/Alertas.css"
import { Container } from "react-bootstrap"
import Navbar from "./Navbar"
import Header from "./Header"
import AlertasCadastro from "./AlertasCadastro"
import TipoAlertasCadastro from "./TipoAlertasCadastro"

type Props = {}

interface TipoAlertasState {
    currentPage: string
    hasDashboard: boolean
}

export default class TipoAlertas extends Component<Props, TipoAlertasState> {
    state: TipoAlertasState = {
        currentPage: "Cadastro",
        hasDashboard: false
    }

    changePage = (page: string) => {
        this.setState({ currentPage: page })
    }

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
                currentPageContent = <TipoAlertasCadastro />
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

                        {currentPageContent}
                    </Container>
                </Container>
            </div>
        )
    }
}
