import React, { Component } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deletarEstacao, listarEstacoes } from "../services/apiService";

type Props = {
  onEditClick?: (id: number) => void;
}

type Estacao = {
  ID_Estacao: number;
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
          <Table striped bordered hover style={{ marginTop: '2%' }} className="text-center">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Data de Instalação</th>
                <th>Tipo de Estação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.state.estacoes.map(estacao => (
                <tr key={estacao.ID_Estacao}>
                  <td>{estacao.Nome}</td>
                  <td>{estacao.Latitude}</td>
                  <td>{estacao.Longitude}</td>
                  <td>{this.formatarData(estacao.Data_Instalacao)}</td>
                  <td>{estacao.Tipo_Estacao}</td>
                  <td>
                    <Button variant="primary" className="mr-2" onClick={() => onEditClick && onEditClick(estacao.ID_Estacao)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger" onClick={() => this.setState({ showDeleteModal: true, estacoesToDelete: estacao })}>
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
