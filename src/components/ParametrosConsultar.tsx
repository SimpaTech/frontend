import React, { Component } from "react";
import "../styles/EstacaoConsultar.css";
import { Container, Table } from "react-bootstrap";
import { listarParametros } from "../services/apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {}

type TipoParametro = {
  id: number;
  Nome_Tipo_Parametro: string;
  Fator: number;
  Offset: number;
  Unidade: string;
}

type State = {
  tiposParametro: TipoParametro[];
}

export default class ParametrosConsultar extends Component<Props, State> {
  state: State = {
    tiposParametro: []
  };

  async componentDidMount() {
    try {
      const response = await listarParametros();
      this.setState({ tiposParametro: response.data });
    } catch (error) {
      console.error("Erro ao buscar parâmetros:", error);
    }
  }

  render() {
    return (
      <Container>
        <Table striped bordered hover style={{ marginTop: '2%' }} className="text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Fator</th>
              <th>Offset</th>
              <th>Unidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tiposParametro.map(tipo => (
              <tr key={tipo.id}>
                <td>{tipo.Nome_Tipo_Parametro}</td>
                <td>{tipo.Fator}</td>
                <td>{tipo.Offset}</td>
                <td>{tipo.Unidade}</td>
                <td>
                  <button className="btn btn-primary mr-2">
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px' }} />
                  </button>
                  <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
