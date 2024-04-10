import React, { useState, FormEvent, useEffect } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import InputMask from "react-input-mask"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import "../styles/UsuarioEditar.css"
import { buscarUsuario, editarUsuario } from "../services/apiService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface State {
  Nome_Usuario: string
  CPF_Usuario: string
  Senha: string
  Role: string
  validated: boolean
  errorMessage: string | null
}

interface Props {
  userId: number
  onEditClick?: () => void
}

const UsuarioEditar: React.FC<Props> = ({ userId, onEditClick }) => {
  const [state, setState] = useState<State>({
    validated: false,
    Nome_Usuario: "",
    CPF_Usuario: "",
    Senha: "",
    Role: "Teste",
    errorMessage: null,
  })

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await buscarUsuario(userId)
        const usuario = response.data
        
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
      }
    }

    fetchUsuario()
  }, [userId])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    if (!form.checkValidity()) {
      e.stopPropagation()
    }

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
          Nome_Usuario: state.Nome_Usuario,
          Senha: state.Senha,
          Role: state.Role,
          CPF_Usuario: state.CPF_Usuario.replace(/\D/g, ""),
        }

        const response = await editarUsuario(userId, data)
        if (response.status === 200) {
          console.log("Status 200")
          console.log(response)

          setState((prevState) => ({
            ...prevState,
            errorMessage: response.data.message,
          }))
        }
      } catch (error: any) {
        console.error("Erro ao editar usuário:", error)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log("Nome do campo:", name)
    console.log("Novo valor:", value)
    setState((prevState) => {
      const newState = {
        ...prevState,
        [name]: value !== undefined ? value : "",
      }
      console.log("Novo estado:", newState)
      return newState
    })
  }

  return (
    <Container className="usuario">
      <h1 className="text-center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={onEditClick}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />{" "}
        Editar
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
                placeholder="Nome"
                name="Nome_Usuario"
                value={state.Nome_Usuario}
                onChange={handleChange}
              />
            </Form.Group>
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
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
          Continuar
        </Button>
      </Form>
    </Container>
  )
}

export default UsuarioEditar
