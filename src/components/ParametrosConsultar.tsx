import React, { Component } from "react";
import "../styles/EstacaoConsultar.css";
import { Container, Table, Modal, Button } from "react-bootstrap";
import { listarParametros, removerTipoParametro } from "../services/apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onEditClick?: (id: number) => void; // Adicione a prop onEditClick
};

type TipoParametro = {
  ID_Tipo_Parametro: number;
  Nome_Tipo_Parametro: string;
  Fator: number;
  Offset: number;
  Unidade: string;
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
      const tiposParametro = response.data; // Ajuste para acessar os dados corretamente
      this.setState({ tiposParametro });
      if (tiposParametro.length === 0) { // Ajuste para verificar o comprimento dos dados
        this.setState({ errorMessage: "Nenhum tipo de parâmetro cadastrado" });
      }
    } catch (error) {
      console.error("Erro ao buscar parâmetros:", error);
      this.setState({ errorMessage: "Erro ao buscar parâmetros" });
    }
  }

  handleDelete = async (parametro: TipoParametro | null) => {
    if (!parametro) return; // Verificação para evitar erros se parametro for nulo
    console.log("Parâmetro: " + JSON.stringify(parametro));
    try {
      await removerTipoParametro(parametro.ID_Tipo_Parametro);
      console.log(`Parâmetro ${parametro.Nome_Tipo_Parametro} deletado com sucesso.`);
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
        {tiposParametro.length > 0 && (
          <Table striped bordered hover style={{ marginTop: '2%' }} className="text-center">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Fator</th>
                <th>Offset</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tiposParametro.map(tipo => (
                <tr key={tipo.ID_Tipo_Parametro}>
                  <td>{tipo.Nome_Tipo_Parametro}</td>
                  <td>{tipo.Fator}</td>
                  <td>{tipo.Offset}</td>
                  <td>{tipo.Unidade}</td>
                  <td>
                    <Button variant="primary" onClick={() => onEditClick && onEditClick(tipo.ID_Tipo_Parametro)}>
                      <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px' }} />
                    </Button>
                    <Button variant="danger" onClick={() => this.setState({ showDeleteModal: true, parametroToDelete: tipo })}>
                      <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
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