import React, { Component } from "react"
import "../../styles/estacao/EstacaoDashboard.css"
import { Container } from "react-bootstrap"

type Props = {}

type State = {}

export default class EstacaoDashboard extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Container>
        <h1>EstacaoDashboard</h1>
      </Container>
    )
  }
}
