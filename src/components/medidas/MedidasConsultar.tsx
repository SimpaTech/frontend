import React, { Component } from "react";
import "../../styles/estacao/EstacaoConsultar.css";
import { Container, Table } from "react-bootstrap";
import { listarMedidas } from "../../services/apiService";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


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

export default class MedidasConsultar extends Component<{}, State> {
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
        this.setState({ errorMessage: "Nenhum tipo de medida cadastrada" });
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
        <DataTable value={medidas} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
          <Column field="parametro.estacao.Nome" header="Estação" filter filterPlaceholder="Search"></Column>
          <Column field="parametro.tipoParametro.Nome_Tipo_Parametro" header="Parâmetro" filter filterPlaceholder="Search"></Column>
          <Column field="Valor" header="Valor" sortable style={{ width: '25%' }}></Column>
          <Column field="UnixTime" header="Data" sortable style={{ width: '25%' }}></Column>
          <Column field="UnixTime" header="Hora" sortable style={{ width: '25%' }}></Column>
        </DataTable>
      </Container>
    );
  }
}
