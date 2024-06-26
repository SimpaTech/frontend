import React, { useState, FormEvent, useEffect } from "react";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { buscarEstacao, deleteParametroEstacao, editarEstacao, postParametroEstacao } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface State {
  UID: number;
  Nome: string;
  Tipo_Estacao: string;
  Latitude: string;
  Longitude: string;
  Data_Instalacao: string;
  Indicativo_Ativa: Boolean;
  validated: boolean;
  errorMessage: string | null;
}

interface Parametro {
  ID_Parametro: number;
  tipoParametro: {
    ID_Tipo_Parametro: number;
    Nome_Tipo_Parametro: string;
  };
}

interface Props {
  estacaoId: number;
  onEditClick?: () => void;
  changePage: (page: string) => void;
  onEditParametro?: (id: number) => void;
}

const EstacaoEditar: React.FC<Props> = ({ estacaoId, onEditClick,  onEditParametro }) => {
  const [showParametroModal, setShowParametroModal] = useState(false);
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [show, setShow] = useState(false);
  const [parametrosSelecionados, setParametrosSelecionados] = useState<number[]>([]);
  const [parametroSelecionado, setParametroSelecionado] = useState<number | null>(null);
  const [parametrosDaEstacao, setParametrosDaEstacao] = useState<Parametro[]>([]);
  const [state, setState] = useState<State>({
    validated: false,
    UID: 0,
    Nome: "",
    Tipo_Estacao: "Opção 1",
    Latitude: "0",
    Longitude: "0",
    Data_Instalacao: new Date().toLocaleDateString("pt-BR"),
    Indicativo_Ativa: true,
    errorMessage: null
  });

  useEffect(() => {
    const fetchEstacao = async () => {
      try {
        const response = await buscarEstacao(estacaoId);
        const estacao = response.data;
        const parametros = estacao.parametros;
        const dataInstalacao = new Date(estacao.Data_Instalacao);
        const formattedDataInstalacao = dataInstalacao.toISOString().split("T")[0];
        setState({
          ...estacao,
          Data_Instalacao: formattedDataInstalacao
        });
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    fetchEstacao();
  }, [estacaoId]);

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const response = await fetch(`http://localhost:4000/parametro/listarporestacao/${estacaoId}`);
        const data = await response.json();
        setParametrosDaEstacao(data);
      } catch (error) {
        console.error("Erro ao buscar parâmetros:", error);
      }
    };
    fetchParametros();
  }, [estacaoId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/tipoParametro/");
        const data = await response.json();
        const parametros = data.map((tipo: any) => ({
          ID_Parametro: tipo.ID_Tipo_Parametro,
          tipoParametro: {
            ID_Tipo_Parametro: tipo.ID_Tipo_Parametro,
            Nome_Tipo_Parametro: tipo.Nome_Tipo_Parametro,
          },
        }));
        setParametros(parametros);
        console.log("Parametros: " + JSON.stringify(parametros));
      } catch (error) {
        console.error("Erro ao buscar tipos de parâmetros:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState((prevState) => ({
      ...prevState,
      validated: true,
    }));
    const isAllFieldsFilled = Array.from(form.elements).every((element: any) => {
      if (element.tagName === "INPUT" && element.required && element.value.trim() === "") {
        setState((prevState) => ({
          ...prevState,
          errorMessage: `Erro: Preencha o campo ${element.name.replace("_", " ")}`,
        }));
        return false;
      }
      return true;
    });
    if (isAllFieldsFilled) {
      const data = {
        UID: state.UID,
        Nome: state.Nome,
        Tipo_Estacao: state.Tipo_Estacao,
        Latitude: state.Latitude,
        Longitude: state.Longitude,
        Data_Instalacao: state.Data_Instalacao,
        Indicativo_Ativa: state.Indicativo_Ativa,
      };
      try {
        const response = await editarEstacao(estacaoId, data);
        console.log("Response: " + JSON.stringify(response));
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Estação Editada com sucesso!",
          }));
        }
      } catch (error: any) {
        console.error("Erro ao enviar informações para o backend:", error);
        if (error.response.status === 400) {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Erro: " + error.response.data.error,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Erro na requisição. Por favor, tente novamente mais tarde.",
          }));
        }
      }
    }
  };

  const handleEnviar = () => {
    if (parametroSelecionado !== null) {
      onEditParametro && onEditParametro(parametroSelecionado);
      console.log('onEditParametro: ' + onEditParametro)
      console.log('parametroSelecionado: ' + parametroSelecionado)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value !== undefined ? value : "",
    }));
  };

  const handleParametroClick = () => {
    setShowParametroModal(true);
  };

  const handleSelecionarParametro = (parametroId: number) => {
    if (parametrosSelecionados.includes(parametroId)) {
      setParametrosSelecionados(parametrosSelecionados.filter((id) => id !== parametroId));
    } else {
      setParametrosSelecionados([...parametrosSelecionados, parametroId]);
    }
  };

  const handleSalvarParametroNaEstacao = async () => {
    if (parametrosSelecionados.length > 0) {
      try {
        await deleteParametroEstacao(estacaoId);
        await postParametroEstacao(estacaoId, parametrosSelecionados);
        console.log("Parâmetros enviados com sucesso");
        setShowParametroModal(false);
        setState((prevState) => ({
          ...prevState,
          errorMessage: "Parâmetros salvos com sucesso na estação!",
        }));
        const response = await fetch(`http://localhost:4000/parametro/listarporestacao/${estacaoId}`);
        const data = await response.json();
        setParametrosDaEstacao(data);
      } catch (error) {
        console.error("Erro ao enviar parâmetros:", error);
        setState((prevState) => ({
          ...prevState,
          errorMessage: "Erro ao salvar os parâmetros para esta estação.",
        }));
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setShowAlertModal(false);
  };

  const handleShow = () => setShow(true);

  const handleShowAlertModal = () => setShowAlertModal(true);

  return (
    <Container className="estacao">
      <h1 className="text-center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={onEditClick}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />{" "}
        Editar
      </h1>
      <Form id="FormEdit" className="mt-5" onSubmit={handleSubmit} noValidate validated={state.validated}>
        {state.errorMessage && (
          <div
            className={`alert ${state.errorMessage.includes("Erro") ? "alert-danger" : "alert-success"}`}
            role="alert"
          >
            {state.errorMessage}
          </div>
        )}
        <Row>
          <Col>
            <Form.Group controlId="formUID">
              <Form.Label>UID</Form.Label>
              <Form.Control
                type="text"
                placeholder="UID"
                name="UID"
                value={state.UID}
                onChange={handleChange}
                disabled
                required
              />
            </Form.Group>
            <Form.Group controlId="formLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Latitude"
                name="Latitude"
                value={state.Latitude}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDataInstalacao">
              <Form.Label>Data de Instalação</Form.Label>
              <Form.Control
                type="date"
                name="Data_Instalacao"
                value={state.Data_Instalacao}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                name="Nome"
                value={state.Nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Longitude"
                name="Longitude"
                value={state.Longitude}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTipoEstacao">
              <Form.Label>Tipo Estação</Form.Label>
              <Form.Control
                as="select"
                name="Tipo_Estacao"
                value={state.Tipo_Estacao}
                onChange={handleChange}
              >
                <option>Estação Terrestre</option>
                <option>Estação Aquática</option>
                <option>Estação Aérea</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <Button
            variant="primary"
            type="button"
            className="d-block mx-auto mt-5"
            onClick={handleParametroClick}
          >
            Parâmetro
          </Button>
        </Col>
        <Col>
          <Button form="FormEdit" variant="primary" type="submit" className="d-block mx-auto mt-5">
            Alterar
          </Button>
        </Col>
        <Col>
          <Button variant="primary" type="button" className="d-block mx-auto mt-5" onClick={handleShowAlertModal}>
            Alerta
          </Button>
        </Col>
      </Row>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showParametroModal}
        onHide={() => setShowParametroModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Selecione o Parâmetro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {parametros.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Selecionar</th>
                  <th>Nome do Parâmetro</th>
                </tr>
              </thead>
              <tbody>
                {parametros.map((parametro) => (
                  <tr key={parametro.ID_Parametro}>
                    <td>
                      <input
                        type="checkbox"
                        name="parametro"
                        checked={parametrosSelecionados.includes(parametro.ID_Parametro)}
                        onChange={() => handleSelecionarParametro(parametro.ID_Parametro)}
                      />
                    </td>
                    <td>{parametro.tipoParametro.Nome_Tipo_Parametro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Não há parâmetros ligados para esta estação.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowParametroModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSalvarParametroNaEstacao}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showAlertModal}
        onHide={() => setShowAlertModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Selecione o Parâmetro, para adicionar um alerta!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {parametrosDaEstacao.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Selecionar</th>
                  <th>Nome do Parâmetro</th>
                </tr>
              </thead>
              <tbody>
                {parametrosDaEstacao.map(parametro => (
                  <tr key={parametro.ID_Parametro}>
                    <td>
                      <input
                        type="radio"
                        name="parametro"
                        checked={parametro.ID_Parametro === parametroSelecionado}
                        onChange={() => setParametroSelecionado(parametro.ID_Parametro)}
                      />
                    </td>
                    <td>{parametro.tipoParametro.Nome_Tipo_Parametro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Não há parâmetros ligados para esta estação.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlertModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleEnviar}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EstacaoEditar;
