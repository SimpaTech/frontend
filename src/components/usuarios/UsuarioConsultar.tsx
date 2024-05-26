// UsuarioConsultar.tsx
import React, { Component } from "react";
import "../../styles/usuarios/UsuarioConsultar.css"
import { Container, Table, Modal, Button, Stack } from "react-bootstrap";
import { listarUsuarios, deletarUsuario } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Prime React
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type Props = {
  onEditClick?: (id: number) => void; // Adicione a prop onEditClick
};

type tipoUsuario = {
  ID_Usuario: number;
  Nome_Usuario: string;
  CPF_Usuario: string;
  validated: boolean;
  errorMessage: string | null;
};

type State = {
  tipoUsuario: tipoUsuario[];
  errorMessage?: string;
  showDeleteModal: boolean;
  usuarioToDelete: tipoUsuario | null;
};

function formatCPF(cpf: string): string {
  if (!cpf) return '';

  // Remove caracteres não numéricos do CPF
  const cleanedCPF = cpf.replace(/\D/g, '');

  // Formata o CPF com a máscara
  return cleanedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export default class UsuarioConsultar extends Component<Props, State> {
  state: State = {
    tipoUsuario: [],
    errorMessage: "",
    showDeleteModal: false,
    usuarioToDelete: null,
  };

  async componentDidMount() {
    try {
      const response = await listarUsuarios();
      console.log("Response: " + JSON.stringify(response.data));
      this.setState({ tipoUsuario: response.data });
      if (response.data.length === 0) {
        this.setState({ errorMessage: "Nenhum usuário cadastrado" });
      }
      console.log(this.state.errorMessage);
    } catch (error) {
      console.error("Erro ao buscar parâmetros:", error);
    }
  }

  handleDelete = async (usuario: tipoUsuario) => {
    console.log("Usuário: " + JSON.stringify(usuario));
    try {
      await deletarUsuario(usuario.ID_Usuario);
      console.log(`Usuário ${usuario.Nome_Usuario} deletado com sucesso.`);
      this.setState((prevState) => ({
        tipoUsuario: prevState.tipoUsuario.filter((u) => u.ID_Usuario !== usuario.ID_Usuario),
        showDeleteModal: false,
        usuarioToDelete: null,
      }));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  handleConfirmDelete = () => {
    const { usuarioToDelete } = this.state;
    if (usuarioToDelete) {
      this.handleDelete(usuarioToDelete);
    }
  };

  handleCancelDelete = () => {
    this.setState({ showDeleteModal: false, usuarioToDelete: null });
  };

  render() {
    const { tipoUsuario, errorMessage, showDeleteModal, usuarioToDelete } = this.state;
    const { onEditClick } = this.props;

    const actionBodyTemplate = (rowData: any) => {
      return (
        <React.Fragment>
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" onClick={() => onEditClick && onEditClick(rowData.ID_Usuario)}>
              <FontAwesomeIcon icon={faEdit} style={{ fontSize: "16px" }} />
            </Button>
            <Button className="btn btn-danger" onClick={() => this.setState({ showDeleteModal: true, usuarioToDelete: rowData })}>
              <FontAwesomeIcon icon={faTrash} style={{ fontSize: "16px" }} />
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
        {tipoUsuario.length > 0 && (
          <DataTable value={tipoUsuario} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
            <Column field="Nome_Usuario" header="Nome" filter filterPlaceholder="Pesquisar"></Column>
            <Column field="CPF_Usuario" header="CPF" sortable></Column>
            <Column body={actionBodyTemplate} header="Ações" sortable style={{width: '20%'}}></Column>
          </DataTable>
        )}

        <Modal show={showDeleteModal} onHide={this.handleCancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que quer deletar o usuário: {usuarioToDelete?.Nome_Usuario}?
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
