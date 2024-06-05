import { Component } from "react";
import "../../styles/estacao/EstacaoConsultar.css";
import { Container } from "react-bootstrap";
import { listarOcorrencias } from "../../services/apiService";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../../styles/visitantes/DadosVisitante.css";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import NavbarVisitante from "./NavbarVisitante";

type OcorrenciaVisitante = {
  ID_Ocorrencia: number;
  medida: {
    ID_Medida: number;
    UnixTime: number;
    Valor: number;
  }
  parametro_alerta: {
    ID_Parametro_Alerta: number;
  };
};

type State = {
    ocorrencias: OcorrenciaVisitante[];
    errorMessage: string | null;
};

export default class OcorrenciasConsultarVisitante extends Component<{}, State> {
  state: State = {
    ocorrencias: [],
    errorMessage: "",
  };

  async componentDidMount() {
    try {
      const response = await listarOcorrencias();
      const ocorrencias = response.data;
      console.log(ocorrencias);
      this.setState({ ocorrencias });
      if (ocorrencias.length === 0) {
        this.setState({ errorMessage: "Nenhum tipo de ocorrência cadastrada!" });
      }
    } catch (error) {
      console.error("Erro ao buscar ocorrências:", error);
      this.setState({ errorMessage: "Erro ao buscar ocorrências!" });
    }
  }

  render() {
    const { ocorrencias, errorMessage } = this.state;

    return (
      <><NavbarVisitante />
      <h1 className="title flex justify-center text-center">Ocorrências</h1>
        <Container>
        {errorMessage && (
          <div
            className={`alert mt-3 ${errorMessage.includes("Nenhum") ? "alert-danger" : "alert-success"}`}
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        <DataTable value={ocorrencias} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
          <Column field="medida.ID_Medida" header="Id medida" filter filterPlaceholder="Pesquisar"></Column>
          <Column field="parametro_alerta.parametro.estacao.Nome" header="Nome da estação" filter filterPlaceholder="Pesquisar" sortable style={{ width: '25%' }}></Column>
          <Column field="medida.Valor" header="Valor da medida" sortable style={{ width: '25%' }}></Column>
          <Column field="parametro_alerta.parametro.tipoParametro.Nome_Tipo_Parametro" header="Nome do parâmetro" sortable style={{ width: '25%' }}></Column>
          <Column field="medida.UnixTime" header="Data" body={rowData => new Date(rowData.medida.UnixTime * 1000).toLocaleDateString()} sortable style={{ width: '25%' }}></Column>
          <Column field="medida.UnixTime" header="Hora" body={rowData => new Date(rowData.medida.UnixTime * 1000).toLocaleTimeString()} sortable style={{ width: '25%' }}></Column>
        </DataTable>
      </Container></>
    );
  }
}
