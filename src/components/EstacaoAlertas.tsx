import React, { useState, FormEvent } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../styles/TipoAlertasCadastro.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { cadastrarAlerta } from "../services/apiService";

interface State {
  Nome_Tipo_Alerta: string;
  Valor: string;
  Operador_Condicional: string;
  ID_Tipo_Alerta: number;
  validated: boolean;
  errorMessage: string | null;
  dropdownOpen: boolean;
}

interface Props {
  parametroId: number;
}

const EstacaoAlertas: React.FC<Props> = ({ parametroId }) => {
  const [state, setState] = useState<State>({
    Nome_Tipo_Alerta: "",
    Valor: '0',
    Operador_Condicional: "=",
    ID_Tipo_Alerta: 0,
    validated: false,
    errorMessage: null,
    dropdownOpen: false, // Inicialmente, o dropdown está fechado
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    setState((prevState) => ({
      ...prevState,
      validated: true,
    }));

    const isAllFieldsFilled = Array.from(form.elements).every((element: any) => {
      if (element.required && element.value.trim() === "") {
        setState((prevState) => ({
          ...prevState,
          errorMessage: `Erro! Preencha o campo: ${element.name.replace("_", " ")}`,
        }));
        return false;
      }
      return true;
    });

    if (isAllFieldsFilled) {
      const data = {
        Nome_Tipo_Alerta: state.Nome_Tipo_Alerta,
        Valor: state.Valor,
        Operador_Condicional: state.Operador_Condicional,
        ID_Tipo_Alerta: state.ID_Tipo_Alerta,
      };

      console.log(data);

      try {
        const response = await cadastrarAlerta(data);
        console.log("Response: " + JSON.stringify(response));
        if (response.status === 201) {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Tipo de alerta adicionado com sucesso!",
          }));
        }
      } catch (error: any) {
        console.error("Erro ao enviar informações para o backend:", error);
        if (error.response.status === 400) {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Erro: Dados inválidos!!",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Valor selecionado para ${name}: ${value}`);
    setState((prevState) => ({
      ...prevState,
      [name]: value !== undefined ? value : "",
    }));
  };

  const toggleDropdown = () => {
    setState((prevState) => ({
      ...prevState,
      dropdownOpen: !prevState.dropdownOpen, // Alterna entre aberto e fechado
    }));
  };

  return (
    <Container className="tipoalerta">
      <h1 className="text-center">Selecionar Alertas</h1>
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
            <Form.Group>
              <div className="search-bar">
                <Form.Label className="search-label">Tipo Alerta:</Form.Label>
                <div className="search-input-wrapper">
                  <Form.Control
                    as="select"
                    name="tipo_alerta"
                    onChange={handleChange}
                    className="search-input"
                    onClick={toggleDropdown} // Adiciona o manipulador de evento para alternar o estado do dropdown
                  >
                    <option>Teste 1</option>
                    <option>Teste 2</option>
                    <option>Teste 3</option>
                    <option>Teste 4</option>
                    <option>Teste 5</option>
                    <option>Teste 6</option>
                  </Form.Control>
                  <FontAwesomeIcon icon={faAngleDown} className={`search-icon ${state.dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown} /> {/* Adiciona o manipulador de evento para alternar o estado do dropdown */}
                </div>
              </div>
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

export default EstacaoAlertas;