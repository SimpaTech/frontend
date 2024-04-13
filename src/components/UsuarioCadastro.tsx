import React, { useState, FormEvent } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import InputMask from "react-input-mask";
import "../styles/UsuarioCadastro.css";
import { cadastrarUsuario } from "../services/apiService";

interface State {
  Nome_Usuario: string;
  CPF_Usuario: string;
  Senha: string;
  Role: string;
  validated: boolean;
  errorMessage: string | null;
}

const UsuarioCadastro: React.FC = () => {
  const [state, setState] = useState<State>({
    validated: false,
    Nome_Usuario: "",
    CPF_Usuario: "",
    Senha: "",
    Role: "Teste",
    errorMessage: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    setState((prevState) => ({
      ...prevState,
      validated: true,
    }));

    const CPFNoMask = state.CPF_Usuario.replace(/\D/g, '');

    const isAllFieldsFilled = Array.from(form.elements).every((element: any) => {
      if (element.required && element.value.trim() === "") {
        setState((prevState) => ({
          ...prevState,
          errorMessage: `Erro! Preencha o campo: ${element.name.replace("_", " ")}`,
        }))
        return false
      }else{
        if (CPFNoMask.length !== 11) {
          setState((prevState) => ({
            ...prevState,
            errorMessage: `Erro! Preencha o campo do CPF por inteiro.`,
          }))
          return false
        }
      }
      return true
    })

    if (isAllFieldsFilled) {
      try {
        const data = {
          Nome_Usuario: state.Nome_Usuario,
          Senha: state.Senha,
          Role: state.Role,
          CPF_Usuario: CPFNoMask,
        };

        const response = await cadastrarUsuario(data);
        
        if (response.status === 200) {
          console.log("Status 200");
          console.log(response);

          setState((prevState) => ({
            ...prevState,
            errorMessage: response.data.message,
          }));
        }
      } catch (error: any) {
        // Se ocorrer um erro na solicitação, exiba a mensagem de erro
        console.error("Erro ao enviar informações para o backend:", error);
        if (error.response.status === 400) {
          console.log("Status 400");
          console.log(error.response);
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Erro: " + error.response.data.error,
          }));
        } else {
          // Se for outro erro, como um erro de rede, você pode lidar com ele aqui
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
    setState((prevState) => ({
      ...prevState,
      [name]: value !== undefined ? value : "",
    }));
  };

  return (
    <Container className="usuario">
      <h1 className="text-center">Cadastrar</h1>
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
                placeholder="Nome"
                name="Nome_Usuario"
                value={state.Nome_Usuario}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/*             <Form.Group controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="E-mail"
                value={state.}
                onChange={handleChange}
              />
            </Form.Group> */}
            <Form.Group controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                name="Senha"
                value={state.Senha}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                as={InputMask}
                mask="999.999.999-99"
                type="text"
                name="CPF_Usuario"
                value={state.CPF_Usuario}
                onChange={handleChange}
                placeholder="CPF"
                required
              />
              <Form.Control.Feedback type="invalid">
                CPF inválido. Por favor, insira um CPF com 11 dígitos.
              </Form.Control.Feedback>
            </Form.Group>
            {/*             <Form.Group controlId="formDataNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" value={state.}
                onChange={handleChange} />
            </Form.Group> */}
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
          Continuar
        </Button>
      </Form>
    </Container>
  );
};

export default UsuarioCadastro;
