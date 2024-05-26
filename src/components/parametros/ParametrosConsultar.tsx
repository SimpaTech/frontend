import React, { Component } from "react";
import "../../styles/parametros/ParametrosConsultar.css"
import { Container, Table, Modal, Button, Stack } from "react-bootstrap";
import { listarParametros, removerTipoParametro } from "../../services/apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Prime React
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type Props = {
  onEditClick?: (id: number) => void;
};

type TipoParametro = {
  ID_Tipo_Parametro: number;
  Nome_Tipo_Parametro: string;
  Fator: number;
  Offset: number;
  Unidade: string;
  Json: string;
  Indicativo_Ativa: number;
  errorMessage: string | null;
}

type State = {
  tiposParametro: TipoParametro[];
  errorMessage: string | null;
  showDeleteModal: boolean;
  parametroToDelete: TipoParametro | null;
};

export default class ParametrosConsultar extends Component<Props, State> {
  state: State = {
    tiposParametro: [],
    errorMessage: "",
    showDeleteModal: false,
    parametroToDelete: null,
  };

  async componentDidMount() {
    try {
      const response = await listarParametros();
      const tiposParametro = response.data;
      this.setState({ tiposParametro });
      if (tiposParametro.length === 0) {
        this.setState({ errorMessage: "Nenhum tipo de parâmetro cadastrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar parâmetros:", error);
      this.setState({ errorMessage: "Erro ao buscar parâmetros" });
    }
  }

  handleDelete = async (parametro: TipoParametro | null) => {
    if (!parametro) return;
    try {
      await removerTipoParametro(parametro.ID_Tipo_Parametro);
      this.setState((prevState) => ({
        tiposParametro: prevState.tiposParametro.filter((p) => p.ID_Tipo_Parametro !== parametro.ID_Tipo_Parametro),
        showDeleteModal: false,
        parametroToDelete: null,
      }));
    } catch (error) {
      console.error("Erro ao deletar parâmetro:", error);
    }
  };

  handleConfirmDelete = () => {
    const { parametroToDelete } = this.state;
    if (parametroToDelete) {
      this.handleDelete(parametroToDelete);
    }
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteModal: false, parametroToDelete: null });
  };

  render() {
    const { tiposParametro, errorMessage, showDeleteModal, parametroToDelete } = this.state;
    const { onEditClick } = this.props;

    const parametrosAtivos = tiposParametro.filter(parametro => parametro.Indicativo_Ativa == 1);

    const actionBodyTemplate = (rowData: any) => {
      return (
        <React.Fragment>
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" onClick={() => onEditClick && onEditClick(rowData.ID_Tipo_Parametro)}>
              <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px' }} />
            </Button>
            <Button variant="danger" onClick={() => this.setState({ showDeleteModal: true, parametroToDelete: rowData })}>
              <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
            </Button>
          </Stack>
        </React.Fragment>
      );
    }

    return (
      <Container>
        {errorMessage && (
          <div
            className={`alert mt-3 ${errorMessage.includes("Nenhum") ? "alert-danger" : "alert-success"}`}
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        {parametrosAtivos.length > 0 ? (
          <DataTable value={parametrosAtivos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
            <Column field="Nome_Tipo_Parametro" header="Nome" filter filterPlaceholder="Pesquisar"></Column>
            <Column field="Fator" header="Fator" sortable></Column>
            <Column field="Offset" header="Offset" sortable></Column>
            <Column field="Unidade" header="Unidade" sortable></Column>
            <Column field="Json" header="Tipo de Sensor" sortable></Column>
            <Column body={actionBodyTemplate} header="Ações" sortable></Column>
          </DataTable>
        ) : (
          <div className="alert alert-danger mt-3" role="alert">
            Nenhum parâmetro ativo cadastrado.
          </div>
        )}

        <Modal show={showDeleteModal} onHide={this.handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que quer deletar o parâmetro: {parametroToDelete?.Nome_Tipo_Parametro}?
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
