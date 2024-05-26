import React, { Component } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { listarAlertas, alternarStatusTipoAlerta } from "../../services/apiService";
import "../../styles/alertas/AlertasConsultar.css";

// Prime React
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type Props = {
  onEditClick?: (id: number) => void;
}

type Alerta = {
  ID_Tipo_Alerta: number;
  Nome_Tipo_Alerta: string;
  Valor: string;
  Operador_Condicional: string;
  Indicativo_Ativa: boolean;
  errorMessage: string | null;
}

type State = {
  alertas: Alerta[];
  errorMessage?: string;
  showDeleteModal: boolean;
  alertasToDelete: Alerta | null;
}

export default class AlertasConsultar extends Component<Props, State> {
  state: State = {
    alertas: [],
    errorMessage: "",
    showDeleteModal: false,
    alertasToDelete: null,
  };

  async componentDidMount() {
    try {
      const response = await listarAlertas();
      this.setState({ alertas: response.data });
      if (response.data.length === 0) {
        this.setState({ errorMessage: "Nenhum tipo de alerta cadastrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar tipos de alerta:", error);
    }
  }

  handleToggleStatus = async (id: number, isActive: boolean) => {
    try {
      await alternarStatusTipoAlerta(id);
      this.setState((prevState) => ({
        alertas: prevState.alertas.map(alerta =>
          alerta.ID_Tipo_Alerta === id ? { ...alerta, Indicativo_Ativa: !alerta.Indicativo_Ativa } : alerta
        )
      }));
    } catch (error) {
      console.error("Erro ao alterar status do tipo de alerta:", error);
    }
  };

  render() {
    const { alertas, errorMessage, showDeleteModal, alertasToDelete } = this.state;
    const { onEditClick } = this.props;

    console.log('Alertas: ' + JSON.stringify(alertas, null, 2));

    const actionBodyTemplate = (rowData: any) => {
      return (
        <React.Fragment>
          <Button variant="primary" className="mr-2" onClick={() => onEditClick && onEditClick(rowData.ID_Tipo_Alerta)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </React.Fragment>
      );
    }

    const StatusBodyTemplate = (rowData: any) => {
      return (
        <React.Fragment>
          <Button
            variant={rowData.Indicativo_Ativa ? "success" : "secondary"}
            onClick={() => this.handleToggleStatus(rowData.ID_Tipo_Alerta, rowData.Indicativo_Ativa)}
          >
            {rowData.Indicativo_Ativa ? "Ativo" : "Inativo"}
          </Button>
        </React.Fragment>
      )
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
        {alertas.length > 0 && (
          <DataTable value={alertas} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
            <Column field="Nome_Tipo_Alerta" header="Nome do alerta" filter filterPlaceholder="Pesquisar"></Column>
            <Column field="Valor" header="Valor" sortable></Column>
            <Column field="Operador_Condicional" header="Operador Condicional" sortable></Column>
            <Column body={StatusBodyTemplate} header="Status" sortable></Column>
            <Column body={actionBodyTemplate} header="Ações" sortable></Column>
          </DataTable>
        )}
      </Container>
    );
  }
}
