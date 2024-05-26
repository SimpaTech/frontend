import React, { useState, FormEvent } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import "../../styles/alertas/AlertasCadastro.css"
import { cadastrarAlerta } from "../../services/apiService"

interface State {
  Nome_Tipo_Alerta: string
  Valor: string
  Operador_Condicional: string
  validated: boolean
  errorMessage: string | null
}

const AlertasCadastro: React.FC = () => {
  const [state, setState] = useState<State>({
    Nome_Tipo_Alerta: "",
    Valor: '0',
    Operador_Condicional: "=",
    validated: false,
    errorMessage: null,
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    setState((prevState) => ({
      ...prevState,
      validated: true,
    }))

    const isAllFieldsFilled = Array.from(form.elements).every((element: any) => {
      if (element.required && element.value.trim() === "") {
        setState((prevState) => ({
          ...prevState,
          errorMessage: `Erro! Preencha o campo: ${element.name.replace("_", " ")}`,
        }))
        return false
      }
      return true
    })

    if (isAllFieldsFilled) {

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
            errorMessage: "Erro: Dados inválidos!!",
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
    <Container className="tipoalerta">
      <h2 className="text-center">Cadastrar</h2>
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
                name="Nome_Tipo_Alerta"
                value={state.Nome_Tipo_Alerta}
                onChange={handleChange}
                required
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
                required
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
