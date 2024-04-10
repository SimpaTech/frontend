import React, { Component } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { listarAlertas } from "../services/apiService"; 

type Alerta = {
  id: number;
  Nome_Tipo_Alerta: string;
  Valor: number;
  Operador_Condicional: string;
}

type State = {
  alertas: Alerta[];
}

export default class AlertasConsultar extends Component<{}, State> {
  state: State = {
    alertas: []
  };

  async componentDidMount() {
    try {
      const response = await listarAlertas();
      this.setState({ alertas: response.data });
    } catch (error) {
      console.error("Erro ao buscar alertas:", error);
    }
  }

  render() {
    return (
      <Container>
        <Table striped bordered hover style={{ marginTop: '2%' }} className="text-center">
          <thead>
            <tr>
              <th>Nome do Alerta</th>
              <th>Valor</th>
              <th>Operador Condicional</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.alertas.map(alerta => (
              <tr key={alerta.id}>
                <td>{alerta.Nome_Tipo_Alerta}</td>
                <td>{alerta.Valor}</td>
                <td>{alerta.Operador_Condicional}</td>
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
