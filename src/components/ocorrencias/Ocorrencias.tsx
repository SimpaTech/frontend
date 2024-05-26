import React, { Component } from "react"
import Sidebar from "../navbar/Sidebar"
import "../../styles/parametros/Parametros.css"
import { Container } from "react-bootstrap"
import Header from "../Header"
import Navbar from "../navbar/Navbar"
import OcorrenciasConsultar from "./OcorrenciasConsultar"

type Props = {  }

type State = {
    currentPage: string
    hasDashboard: boolean
    editParametroId: number
    hasCadastro: boolean
  }

export default class Ocorrencias extends Component<Props, State> {
    state: State = {
        currentPage: "Consulta",
        hasDashboard: false,
        editParametroId: 1,
        hasCadastro: false,
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
            case "Consulta":
                currentPageContent = <OcorrenciasConsultar />
                break
        }

        return (
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <Sidebar />

                <Container className="background-content p-0">
                    {/* Header */}
                    <Header title="Ocorrências" username={username} />

                    <Container>
                        <Navbar changePage={this.changePage} hasDashboard={this.state.hasDashboard} currentPage={this.state.currentPage} hasCadastro={false} />

                        {currentPageContent}
                    </Container>
                </Container>
            </div>
        )
    }
}
