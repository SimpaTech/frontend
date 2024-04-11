import React, { useState, FormEvent, useEffect } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import InputMask from "react-input-mask"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import "../styles/AlertasEditar.css"
import { buscarAlerta, editarTipoAlerta } from "../services/apiService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface State {
  Nome_Tipo_Alerta: string
  Valor: number
  Operador_Condicional: string
  validated: boolean
  errorMessage: string | null
}

interface Props {
  alertaId: number
  onEditClick?: () => void
}

const TipoAlertaEditar: React.FC<Props> = ({ alertaId, onEditClick }) => {
  const [state, setState] = useState<State>({
    validated: false,
    Nome_Tipo_Alerta: "",
    Valor: 0,
    Operador_Condicional: "",
    errorMessage: null,
  })

  useEffect(() => {
    const fetchTipoAlerta = async () => {
      try {
        const response = await buscarAlerta(alertaId)
        const tipoAlerta = response.data

        // Atualiza o estado com os dados do tipo de alerta
        console.log("Tipo de alerta retornado:", tipoAlerta);
        setState((prevState) => ({
          ...prevState,
          Nome_Tipo_Alerta: tipoAlerta.Nome_Tipo_Alerta,
          Valor: tipoAlerta.Valor,
          Operador_Condicional: tipoAlerta.Operador_Condicional,
        }));
          
      } catch (error) {
        console.error("Erro ao buscar tipo de alerta:", error)
      }
    }

    fetchTipoAlerta()
  }, [alertaId])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    setState((prevState) => ({
      ...prevState,
      validated: true,
  }))
  
    if (form.checkValidity()) {

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
            Nome_Tipo_Alerta: state.Nome_Tipo_Alerta,
            Valor: state.Valor,
            Operador_Condicional: state.Operador_Condicional,
          }

          const response = await editarTipoAlerta(alertaId, data)
          if (response.status === 200) {
            console.log("Status 200")
            console.log(response)

            setState((prevState) => ({
              ...prevState,
              errorMessage: response.data.message,
            }))
          }
        } catch (error: any) {
          console.error("Erro ao editar tipo de alerta:", error)
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
    } else {
      e.stopPropagation()
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
    <Container className="tipoalerta">
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
                placeholder={state.Nome_Tipo_Alerta}
                name="Nome_Tipo_Alerta"
                value={state.Nome_Tipo_Alerta}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                // placeholder={state.Valor}
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

export default TipoAlertaEditar
