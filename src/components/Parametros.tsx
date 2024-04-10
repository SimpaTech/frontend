import React, { Component } from "react"
import Sidebar from "./Sidebar"
import "../styles/Parametros.css"
import { Container } from "react-bootstrap"
import ParametrosCadastro from "./ParametrosCadastro"
import ParametrosConsultar from "./ParametrosConsultar"
import NavbarParametros from "./NavbarParametros"
import Header from "./Header"

interface ParametrosState {
    currentPage: string
}

export default class Parametros extends Component<{}, ParametrosState> {
    state: ParametrosState = {
        currentPage: "Cadastrar",
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
                currentPageContent = <ParametrosCadastro /> 
                break
            case "Consultar":
                currentPageContent = <ParametrosConsultar />
                break
        }

        return (
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <Sidebar />

                <Container className="background-content p-0">
                    {/* Header */}
                    <Header title="Controle de Parâmetros" username={username} />

                    <Container>
                        <NavbarParametros changePage={this.changePage} />

                        {currentPageContent}
                    </Container>
                </Container>
            </div>
        )
    }
}
