import React, { useState, FormEvent, useEffect } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { buscarEstacao, editarEstacao } from "../services/apiService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface State {
    Nome: string
    Tipo_Estacao: string
    Latitude: string
    Longitude: string
    Data_Instalacao: string
    Indicativo_Ativa: Boolean
    validated: boolean
    errorMessage: string | null
}

interface Props {
    estacaoId: number
    onEditClick?: () => void
    changePage: (page: string) => void;
}

const EstacaoEditar: React.FC<Props> = ({ estacaoId, onEditClick, changePage}) => {
    const [state, setState] = useState<State>({
        validated: false,
        Nome: "",
        Tipo_Estacao: "Opção 1", // Mudar para a primeira Option
        Latitude: '0',
        Longitude: '0',
        Data_Instalacao: new Date().toLocaleDateString("pt-BR"),
        Indicativo_Ativa: true,
        errorMessage: null,
    })

    useEffect(() => {
        const fetchEstacao = async () => {
            try {
                const response = await buscarEstacao(estacaoId)
                const estacao = response.data
                console.log(estacao)

                const dataInstalacao = new Date(estacao.Data_Instalacao)
                const formattedDataInstalacao = dataInstalacao.toISOString().split('T')[0]

                setState({
                    ...estacao,
                    Data_Instalacao: formattedDataInstalacao
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
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log("Nome do campo:", name)
        console.log("Novo valor:", value)

        if (name === 'Data_Instalacao') {
            const [year, month, day] = value.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            if (!isNaN(date.getTime())) {
                setState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            } else {
                console.error('Data inválida');
            }
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

    // Função para lidar com o clique no botão "Parâmetro"
    const handleParametroClick = () => {
        changePage("LinkParametro");
    };

    const handleAlertaClick = () => {
        changePage("LinkAlerta");
    };

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
            </Form>
            <Row>
                <Col>
                    <Button variant="primary" type="submit" className="d-block mx-auto mt-5" onClick={handleParametroClick}>
                        Parâmetro
                    </Button>
                </Col>
                <Col>
                    <Button form="FormEdit" variant="primary" type="submit" className="d-block mx-auto mt-5">
                        Alterar
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" className="d-block mx-auto mt-5" onClick={handleAlertaClick}>
                        Alerta
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default EstacaoEditar