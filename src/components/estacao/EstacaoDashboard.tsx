import React, { Component } from "react"
import "../../styles/estacao/EstacaoDashboard.css"
import { Container } from "react-bootstrap"
import SelecionarGraficoEstacao from "../graficos/SelecionarGraficoEstacao"

type Props = {}

type State = {}

export default class EstacaoDashboard extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Container>
        <SelecionarGraficoEstacao estacoes={[]} onSelect={function (id: number | null): void {
          throw new Error("Function not implemented.")
        } }/>
      </Container>
    )
  }
}
