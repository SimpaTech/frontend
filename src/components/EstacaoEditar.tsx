import React, { useState, FormEvent, useEffect } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { buscarEstacao, editarEstacao } from "../services/apiService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface State {
    Nome: string
    Tipo_Estacao: string
    Latitude: number
    Longitude: number
    Data_Instalacao: Date
    Indicativo_Ativa: Boolean
    validated: boolean
    errorMessage: string | null
}

interface Props {
    estacaoId: number
    onEditClick?: () => void
}

const EstacaoEditar: React.FC<Props> = ({ estacaoId, onEditClick }) => {
    const [state, setState] = useState<State>({
        validated: false,
        Nome: "",
        Tipo_Estacao: "Opção 1", // Mudar para a primeira Option
        Latitude: 0,
        Longitude: 0,
        Data_Instalacao: new Date(),
        Indicativo_Ativa: true,
        errorMessage: null,
    })

    useEffect(() => {
        const fetchEstacao = async () => {
            try {
                const response = await buscarEstacao(estacaoId)
                const estacao = response.data
                console.log(estacao)
                setState({
                    ...estacao,
                    Data_Instalacao: new Date(estacao.Data_Instalacao)
                })
            } catch (error) {
                console.error("Erro ao buscar usuário:", error)
            }
        }

        fetchEstacao()
    }, [estacaoId])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget

        setState((prevState) => ({
            ...prevState,
            validated: true,
        }))

        if (form.checkValidity()) {

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
                const data = {
                    Nome: state.Nome,
                    Tipo_Estacao: state.Tipo_Estacao,
                    Latitude: state.Latitude,
                    Longitude: state.Longitude,
                    Data_Instalacao: state.Data_Instalacao,
                    Indicativo_Ativa: state.Indicativo_Ativa,
                }

                try {
                    const response = await editarEstacao(estacaoId, data)
                    console.log("Response: " + JSON.stringify(response))
                    if (response.status === 200) {
                        setState((prevState) => ({
                            ...prevState,
                            errorMessage: "Estação Editada com sucesso!",
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

        } else {
            e.stopPropagation()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log("Nome do campo:", name)
        console.log("Novo valor:", value)

        if (name === 'Data_Instalacao') {
            const date = new Date(value); // Converte a string de data para um objeto Date
            setState((prevState) => {
                const newState = {
                    ...prevState,
                    [name]: date
                }   
                console.log("Novo estado:", newState)
                return newState
            })
        } else {
            setState((prevState) => {
                const newState = {
                    ...prevState,
                    [name]: value !== undefined ? value : "",
                }
                console.log("Novo estado:", newState)
                return newState
            })
        }
    }

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
                            />
                        </Form.Group>
                        <Form.Group controlId="formLatitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Latitude"
                                name="Latitude"
                                value={state.Latitude}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDataInstalacao">
                            <Form.Label>Data de Instalação</Form.Label>
                            <Form.Control
                                type="date"
                                name="Data_Instalacao"
                                value={state.Data_Instalacao.toISOString().split('T')[0]}
                                onChange={handleChange}
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
                                type="text"
                                placeholder="Longitude"
                                name="Longitude"
                                value={state.Longitude}
                                onChange={handleChange}
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

export default EstacaoEditar