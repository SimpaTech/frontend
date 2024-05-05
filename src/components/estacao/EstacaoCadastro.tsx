import React, { FormEvent, useState } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import "../styles/EstacaoCadastro.css"
import { cadastrarEstacao } from "../../services/apiService"

interface State {
  Nome: string
  Tipo_Estacao: string
  Latitude: string
  Longitude: string
  Data_Instalacao: string
  Indicativo_Ativa: Boolean
  errorMessage: string | null
  validated: boolean
}

const CadastroPage: React.FC = () => {
  const [state, setState] = useState<State>({
    Nome: "",
    Tipo_Estacao: "Opção 1", // Mudar para a primeira Option
    Latitude: '0',
    Longitude: '0',
    Data_Instalacao: new Date().toLocaleDateString("pt-BR"),
    Indicativo_Ativa: true,
    errorMessage: null,
    validated: false,
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
        Nome: state.Nome,
        Tipo_Estacao: state.Tipo_Estacao,
        Latitude: state.Latitude,
        Longitude: state.Longitude,
        Data_Instalacao: state.Data_Instalacao,
        Indicativo_Ativa: state.Indicativo_Ativa,
      }

      console.log(data)

      try {
        const response = await cadastrarEstacao(data)
        console.log("Response: " + JSON.stringify(response))
        if (response.status === 201) {
          setState((prevState) => ({
            ...prevState,
            errorMessage: "Estação criada com sucesso!",
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
    if (name === 'Data_Instalacao') {
      const date = new Date(value); 
      const formattedDate = date.toISOString().split('T')[0]; 
      setState(prevState => ({
        ...prevState,
        [name]: formattedDate
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        [name]: value !== undefined ? value : ""
      }));
    }
  }


  return (
    <Container className="estacao">
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
                name="Nome"
                value={state.Nome}
                onChange={handleChange}
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
            <Form.Group controlId="formTipoEstacao">
              <Form.Label>Tipo Estação</Form.Label>
              <Form.Control
                as="select"
                name="Tipo_Estacao"
                value={state.Tipo_Estacao}
                onChange={handleChange}
              >
                <option>Opção 1</option>
                <option>Opção 2</option>
                <option>Opção 3</option>
              </Form.Control>
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
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
          Continuar
        </Button>
      </Form>
    </Container>
  )
}

export default CadastroPage
