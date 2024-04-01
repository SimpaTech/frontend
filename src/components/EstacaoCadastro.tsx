import React, { Component } from "react"
import "../styles/EstacaoCadastro.css"
import { Container } from "react-bootstrap"
import Sidebar from "./Sidebar"

type Props = {}

type State = {}

export default class EstacaoCadastro extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="d-flex" id="wrapper">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <Container fluid id="page-content-wrapper">
          <Container fluid className="mt-4">
            <h1>Content</h1>
          </Container>
        </Container>
      </div>
    )
  }
}
