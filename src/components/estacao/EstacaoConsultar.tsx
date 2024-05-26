import React, { Component } from "react";
import { Container, Table, Button, Modal, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deletarEstacao, listarEstacoes } from "../../services/apiService";

// Prime React
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type Props = {
  onEditClick?: (id: number) => void;
}

type Estacao = {
  ID_Estacao: number;
  UID: number;
  Nome: string;
  Latitude: string;
  Longitude: string;
  Data_Instalacao: string;
  Tipo_Estacao: string;
  errorMessage: string | null;
}

type State = {
  estacoes: Estacao[];
  errorMessage?: string;
  showDeleteModal: boolean;
  estacoesToDelete: Estacao | null;
}

export default class EstacoesConsultar extends Component<Props, State> {
  state: State = {
    estacoes: [],
    errorMessage: "",
    showDeleteModal: false,
    estacoesToDelete: null,
  };

  async componentDidMount() {
    try {
      const response = await listarEstacoes();
      console.log("Response: " + JSON.stringify(response.data));
      this.setState({ estacoes: response.data });
      if (response.data.length === 0) {
        this.setState({ errorMessage: "Nenhum estação cadastrada" });
      }
      console.log(this.state.errorMessage);
    } catch (error) {
      console.error("Erro ao buscar estações:", error);
    }
  }

  handleDelete = async (estacao: Estacao) => {
    console.log("Estação: " + JSON.stringify(estacao));
    try {
      await deletarEstacao(estacao.ID_Estacao);
      console.log(`Estação ${estacao.Nome} deletado com sucesso.`);
      this.setState((prevState) => ({
        estacoes: prevState.estacoes.filter((u) => u.ID_Estacao !== estacao.ID_Estacao),
        showDeleteModal: false,
        estacoesToDelete: null,
      }));
    } catch (error) {
      console.error("Erro ao deletar estação:", error);
    }
  };

  handleConfirmDelete = () => {
    const { estacoesToDelete } = this.state;
    if (estacoesToDelete) {
      this.handleDelete(estacoesToDelete);
    }
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteModal: false, estacoesToDelete: null });
  };

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  render() {
    const { estacoes, errorMessage, showDeleteModal, estacoesToDelete } = this.state;
    const { onEditClick } = this.props;

    const actionBodyTemplate = (rowData: any) => {
      return (
        <React.Fragment>
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" className="mr-2" onClick={() => onEditClick && onEditClick(rowData.ID_Estacao)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button variant="danger" onClick={() => this.setState({ showDeleteModal: true, estacoesToDelete: rowData })}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Stack>
        </React.Fragment>
      );
    }

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
        {estacoes.length > 0 && (
          <DataTable value={estacoes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
            <Column field="UID" header="UID" filter filterPlaceholder="Pesquisar"></Column>
            <Column field="Nome" header="Nome" sortable></Column>
            <Column field="Latitude" header="Latitude" sortable></Column>
            <Column field="Longitude" header="Longitude" sortable></Column>
            <Column field="Data_Instalacao" header="Data de Instalação" body={ rowData => new Date(rowData.Data_Instalacao).toLocaleDateString("pt-BR")} sortable></Column>
            <Column field="Tipo_Estacao" header="Tipo de Estação" sortable></Column>
            <Column body={actionBodyTemplate} header="Ações" sortable></Column>
          </DataTable>
        )}

        <Modal show={showDeleteModal} onHide={this.handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que quer deletar a estação: {estacoesToDelete?.Nome}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCancelDelete}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={this.handleConfirmDelete}>
              Deletar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
