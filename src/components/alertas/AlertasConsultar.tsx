import React, { Component } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { listarAlertas, deletarTipoAlerta, alternarStatusTipoAlerta } from "../../services/apiService"; 
import "../../styles/alertas/AlertasConsultar.css";

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
        <Table striped bordered hover style={{ marginTop: '2%' }} className="text-center">
          <thead>
            <tr>
              <th>Nome do Alerta</th>
              <th>Valor</th>
              <th>Operador Condicional</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.alertas.map(alerta => (
              <tr key={alerta.ID_Tipo_Alerta}>
                <td>{alerta.Nome_Tipo_Alerta}</td>
                <td>{alerta.Valor}</td>
                <td>{alerta.Operador_Condicional}</td>
                <td>
                  <Button
                    variant={alerta.Indicativo_Ativa ? "success" : "secondary"}
                    onClick={() => this.handleToggleStatus(alerta.ID_Tipo_Alerta, alerta.Indicativo_Ativa)}
                  >
                    {alerta.Indicativo_Ativa ? "Ativo" : "Inativo"}
                  </Button>
                </td>
                <td>
                  <Button variant="primary" className="mr-2" onClick={() => onEditClick && onEditClick(alerta.ID_Tipo_Alerta)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}
      </Container>
    );
  }
}
