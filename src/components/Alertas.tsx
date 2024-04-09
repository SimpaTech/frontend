import React, { Component } from "react"
import Sidebar from "./Sidebar"
import "../styles/Alertas.css"
import { Container } from "react-bootstrap"
import Navbar from "./Navbar"
import Header from "./Header"
import AlertasCadastro from "./AlertasCadastro"
import AlertasConsultar from "./AlertasConsultar"

interface AlertasState {
    currentPage: string
    hasDashboard: boolean
}

export default class Alertas extends Component<{}, AlertasState> {
    state: AlertasState = {
        currentPage: "Cadastrar",
        hasDashboard: false,
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
            case "Cadastrar":
                currentPageContent = <AlertasCadastro />
                break
            case "Consultar":
                currentPageContent = <AlertasConsultar />
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
