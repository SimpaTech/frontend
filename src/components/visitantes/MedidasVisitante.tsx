import React, { Component } from "react";
import "../../styles/estacao/EstacaoConsultar.css";
import { Container, Navbar, Table } from "react-bootstrap";
import { listarMedidas } from "../../services/apiService";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import NavbarVisitante from "./NavbarVisitante";
import "../../styles/visitantes/DadosVisitante.css";
import FooterVisitante from "./FooterVisitante";

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

export default class MedidasVisitanteConsultar extends Component<{}, State> {
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
        <>
        <NavbarVisitante />
        <h1 className="title flex justify-center text-center">Medidas</h1>
        <Container className="table">
            {errorMessage && (
                <div
                    className={`alert mt-3 ${errorMessage.includes("Nenhum") ? "alert-danger" : "alert-success"}`}
                    role="alert"
                >
                    {errorMessage}
                </div>
            )}
            <DataTable value={medidas} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
                <Column field="parametro.estacao.Nome" header="Estação" filter filterPlaceholder="Pesquisar"></Column>
                <Column field="parametro.tipoParametro.Nome_Tipo_Parametro" header="Parâmetro" filter filterPlaceholder="Pesquisar"></Column>
                <Column field="Valor" header="Valor" sortable style={{ width: '25%' }}></Column>
                <Column field="UnixTime" header="Data" body={rowData => new Date(rowData.UnixTime * 1000).toLocaleDateString()} sortable style={{ width: '25%' }}></Column>
                <Column field="UnixTime" header="Hora" body={rowData => new Date(rowData.UnixTime * 1000).toLocaleTimeString()} sortable style={{ width: '25%' }}></Column>
            </DataTable>
        </Container>
        <FooterVisitante/>
        </>
    );
  }
}
