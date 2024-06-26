import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { buscarTipoParametro, editarTipoParametro } from "../../services/apiService";
import "../../styles/parametros/ParametroEditar.css"

interface State {
  Nome_Tipo_Parametro: string;
  Fator: string;
  Offset: string;
  Unidade: string;
  Json: string;
  validated: boolean
  errorMessage: string | null
}

interface Props {
  parametroId: number;
  onEditClick?: () => void;
}

const ParametroEditar: React.FC<Props> = ({ parametroId, onEditClick }) => {
  const [state, setState] = useState<State>({
    Nome_Tipo_Parametro: "",
    Fator: '0',
    Offset: '0',
    Unidade: "",
    Json: "",
    validated: false,
    errorMessage: null
  });

  useEffect(() => {
    const fetchParametro = async () => {
      try {
        const response = await buscarTipoParametro(parametroId);
        const parametro = response.data;

        // Verifica se o parametro não é undefined antes de acessar suas propriedades
        if (parametro) {
          setState((prevState) => ({
            ...prevState,
            Nome_Tipo_Parametro: parametro.Nome_Tipo_Parametro,
            Fator: parametro.Fator,
            Offset: parametro.Offset,
            Unidade: parametro.Unidade,
            Json: parametro.Json,
          }));
        } else {
          console.error("O objeto parametro está vazio.");
        }
      } catch (error) {
        console.error("Erro ao buscar parâmetro:", error);
      }
    };

    fetchParametro();
  }, [parametroId]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget

    setState((prevState) => ({
      ...prevState,
      validated: true,
    }))

    // Verifica se todos os campos obrigatórios foram preenchidos
    const isAllFieldsFilled = Array.from(form.elements).every((element: any) => {
      if (element.tagName === "INPUT" && element.required && element.value.trim() === "") {
        setState((prevState) => ({
          ...prevState,
          errorMessage: `Erro: Preencha o campo ${element.name.replace("_", " ")}`,
        }))
        return false
      }
      return true
    })

    if (isAllFieldsFilled) {

      try {
        const data = {
          Nome_Tipo_Parametro: state.Nome_Tipo_Parametro,
          Fator: state.Fator,
          Offset: state.Offset,
          Unidade: state.Unidade,
          Json: state.Json,
        }

        const response = await editarTipoParametro(parametroId, data)
        if (response.status === 200) {
          console.log("Status 200")
          console.log(response)

          setState((prevState) => ({
            ...prevState,
            errorMessage: "Alerta editado com sucesso!",
          }))
        }
      } catch (error: any) {
        console.error("Erro ao editar tipo de parâmetro:", error)
        if (error.response.status === 400) {
          console.log("Status 400")
          console.log(error.response)
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Erro: " + error.response.data.error,
          }))
        } else {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Erro na requisição. Por favor, tente novamente mais tarde.",
          }))
        }
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value !== undefined ? value : "",
    }));
  };

  return (
    <Container className="tipoparametro">
      <h1 className="text-center">
        <FontAwesomeIcon icon={faArrowLeft}
          onClick={onEditClick}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />{" "}
        Editar Parâmetro
      </h1>
      <Form className="mt-5" onSubmit={handleSubmit} noValidate validated={state.validated}>
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
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder={state.Nome_Tipo_Parametro}
                name="Nome_Tipo_Parametro"
                value={state.Nome_Tipo_Parametro}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFator">
              <Form.Label>Fator</Form.Label>
              <Form.Control
                type="number"
                name="Fator"
                value={state.Fator}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formJson">
              <Form.Label>Tipo de Sensor</Form.Label>
              <Form.Control
                type="text"
                placeholder={state.Json}
                name="Json"
                value={state.Json}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formOffset">
              <Form.Label>Offset</Form.Label>
              <Form.Control
                type="number"
                name="Offset"
                value={state.Offset}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUnidade">
              <Form.Label>Unidade</Form.Label>
              <Form.Control
                type="text"
                placeholder={state.Unidade}
                name="Unidade"
                value={state.Unidade}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
          Continuar
        </Button>
      </Form>
    </Container>
  );
};
export default ParametroEditar;
