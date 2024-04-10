import React, { Component } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { listarEstacoes } from "../services/apiService"; 

type Estacao = {
  id: number;
  Nome: string;
  Latitude: string;
  Longitude: string;
  Data_Instalacao: string;
  Tipo_Estacao: string;
}

type State = {
  estacoes: Estacao[];
}

export default class EstacoesConsultar extends Component<{}, State> {
  state: State = {
    estacoes: []
  };

  async componentDidMount() {
    try {
      const response = await listarEstacoes(); 
      this.setState({ estacoes: response.data });
    } catch (error) {
      console.error("Erro ao buscar estações:", error);
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString("pt-BR"); 
  }

  render() {
    return (
      <Container>
        <Table striped bordered hover style={{ marginTop: '2%' }} className="text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Data de Instalação</th>
              <th>Tipo de Estação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.estacoes.map(estacao => (
              <tr key={estacao.id}>
                <td>{estacao.Nome}</td>
                <td>{estacao.Latitude}</td>
                <td>{estacao.Longitude}</td>
                <td>{this.formatarData(estacao.Data_Instalacao)}</td>
                <td>{estacao.Tipo_Estacao}</td>
                <td>
                  <Button variant="primary" className="mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
