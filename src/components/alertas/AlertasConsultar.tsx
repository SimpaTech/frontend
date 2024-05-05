import React, { Component } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { listarAlertas, deletarTipoAlerta } from "../../services/apiService"; 

type Props = {
  onEditClick?: (id: number) => void;
}

type Alerta = {
  ID_Tipo_Alerta: number;
  Nome_Tipo_Alerta: string;
  Valor: string;
  Operador_Condicional: string;
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
      console.log("Response: " + JSON.stringify(response.data));
      this.setState({ alertas: response.data });
      if (response.data.length === 0) {
        this.setState({ errorMessage: "Nenhum tipo de alerta cadastrada" });
      }
      console.log(this.state.errorMessage);
    } catch (error) {
      console.error("Erro ao buscar tipos de alerta:", error);
    }
  }

  handleDelete = async (alerta: Alerta) => {
    console.log("Alerta: " + JSON.stringify(alerta));
    try {
      await deletarTipoAlerta(alerta.ID_Tipo_Alerta);
      console.log(`Alerta ${alerta.Nome_Tipo_Alerta} deletado com sucesso.`);
      this.setState((prevState) => ({
        alertas: prevState.alertas.filter((u) => u.ID_Tipo_Alerta !== alerta.ID_Tipo_Alerta),
        showDeleteModal: false,
        alertasToDelete: null,
      }));
    } catch (error) {
      console.error("Erro ao deletar tipo de alerta:", error);
    }
  };

  handleConfirmDelete = () => {
    const { alertasToDelete } = this.state;
    if (alertasToDelete) {
      this.handleDelete(alertasToDelete);
    }
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteModal: false, alertasToDelete: null });
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
                  <Button variant="primary" className="mr-2" onClick={() => onEditClick && onEditClick(alerta.ID_Tipo_Alerta)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger" onClick={() => this.setState({ showDeleteModal: true, alertasToDelete: alerta })}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}

        <Modal show={showDeleteModal} onHide={this.handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que quer deletar o Alerta: {alertasToDelete?.Nome_Tipo_Alerta}?
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
