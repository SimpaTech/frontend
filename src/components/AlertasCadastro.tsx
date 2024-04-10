import React, { useState, useEffect, FormEvent } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import "../styles/AlertasCadastro.css"
import { cadastrarAlerta } from "../services/apiService"

interface State {
  Nome_Tipo_Alerta: string
  Valor: number
  Operador_Condicional: string
  errorMessage: string | null
}

const AlertasCadastro: React.FC = () => {
  const [state, setState] = useState<State>({
    Nome_Tipo_Alerta: "",
    Valor: 0,
    Operador_Condicional: "=",
    errorMessage: null,
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    setState((prevState) => ({
      ...prevState,
      validated: true,
    }))

    if (form.checkValidity()) {

      const data = {
        Nome_Tipo_Alerta: state.Nome_Tipo_Alerta,
        Valor: state.Valor,
        Operador_Condicional: state.Operador_Condicional,
      }

      console.log(data)

      try {
        const response = await cadastrarAlerta(data)
        console.log("Response: " + JSON.stringify(response))
        if (response.status === 201) {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Alerta criado com sucesso!",
          }))
        }
      } catch (error: any) {
        console.error("Erro ao enviar informações para o backend:", error)
        if (error.response.status === 400) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(`Valor selecionado para ${name}: ${value}`);
    setState((prevState) => ({
      ...prevState,
      [name]: value !== undefined ? value : "",
    }))
  }

  return (
    <Container className="usuario">
      <h1 className="text-center">Cadastrar</h1>
      <Form className="mt-5" onSubmit={handleSubmit}>
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
                name="Nome_Tipo_Alerta"
                value={state.Nome_Tipo_Alerta}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor"
                name="Valor"
                value={state.Valor}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Operador Condicional:</Form.Label>
              <Form.Control
                as="select"
                name="Operador_Condicional"
                value={state.Operador_Condicional}
                onChange={handleChange}
              >
                <option>=</option>
                <option>!=</option>
                <option>&gt;</option>
                <option>&lt;</option>
                <option>&lt;=</option>
                <option>&gt;=</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
          Continuar
        </Button>
      </Form>
    </Container>
  )
}

export default AlertasCadastro
