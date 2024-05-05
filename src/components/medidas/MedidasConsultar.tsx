import React, { Component } from "react";
import "../styles/EstacaoConsultar.css";
import { Container, Table } from "react-bootstrap";
import { listarMedidas } from "../../services/apiService";

type Estacao = {
  Nome: string;
};

type TipoParametro = {
  Nome_Tipo_Parametro: string;
};

type Medida = {
  ID_Medida: number;
  UnixTime: number;
  Valor: number;
  parametro: {
    estacao: Estacao;
    tipoParametro: TipoParametro;
  };
};

type State = {
  medidas: Medida[];
  errorMessage: string | null;
  showDeleteModal: boolean;
  parametroToDelete: Medida | null;
};

export default class MedidasConsultar extends Component<{},State> {
  state: State = {
    medidas: [],
    errorMessage: "",
    showDeleteModal: false,
    parametroToDelete: null,
  };

  async componentDidMount() {
    try {
      const response = await listarMedidas();
      const medidas = response.data;
      this.setState({ medidas });
      if (medidas.length === 0) {
        this.setState({ errorMessage: "Nenhum tipo de parâmetro cadastrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar parâmetros:", error);
      this.setState({ errorMessage: "Erro ao buscar parâmetros" });
    }
  }

  render() {
    const { medidas, errorMessage } = this.state;

    return (
      <Container>
        {errorMessage && (
          <div
            className={`alert mt-3 ${errorMessage.includes("Nenhum") ? "alert-danger" : "alert-success"
              }`}
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        {medidas.length > 0 && (
          <Table striped bordered hover style={{ marginTop: '2%' }} className="text-center">
            <thead>
              <tr>
                <th>Estação</th>
                <th>Parâmetro</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {medidas.map(medida => (
                <tr key={medida.ID_Medida}>
                  <td>{medida.parametro.estacao.Nome}</td>
                  <td>{medida.parametro.tipoParametro.Nome_Tipo_Parametro}</td>
                  <td>{medida.Valor}</td>
                  <td>{new Date(medida.UnixTime * 1000).toLocaleDateString('pt-BR')}</td>
                  <td>{new Date(medida.UnixTime * 1000).toLocaleTimeString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    );
  }
}
