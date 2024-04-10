import React, {FormEvent, useState } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import "../styles/ParametrosCadastro.css"
import { cadastrarTipoParametro } from "../services/apiService"

interface State {
    Nome_Tipo_Parametro: string
    Unidade: string
    Offset: number
    Fator: number
    errorMessage: string | null
}

const ParametrosCadastrar: React.FC = () => {
    const [state, setState] = useState<State>({
        Nome_Tipo_Parametro: "",
        Unidade: "",
        Offset: 0,
        Fator: 0,
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
                Nome_Tipo_Parametro: state.Nome_Tipo_Parametro,
                Unidade: state.Unidade,
                Offset: state.Offset,
                Fator: state.Fator,
            }

            console.log(data)

            try {
                const response = await cadastrarTipoParametro(data)
                console.log("Response: " + JSON.stringify(response))
                if (response.status === 200) {
                    setState((prevState) => ({
                        ...prevState,
                        errorMessage: "Parâmetro criada com sucesso!",
                    }))
                }
            } catch (error: any) {
                console.error("Erro ao enviar informações para o backend:", error)
                if (error.response.status === 500) {
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
        setState(prevState => ({
            ...prevState,
            [name]: value !== undefined ? value : ""
        }));
    }

    return (
        <Container className="parametros">
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
                                name="Nome_Tipo_Parametro"
                                value={state.Nome_Tipo_Parametro}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFator" style={{ marginTop: '2%' }}>
                            <Form.Label>Fator</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Fator"
                                name="Fator"
                                value={state.Fator}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formUnidade">
                            <Form.Label>Unidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Unidade (exemplo: m/s, km/h)"
                                name="Unidade"
                                value={state.Unidade}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formOffset" style={{ marginTop: '2%' }}>
                            <Form.Label>Offset</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Offset"
                                name="Offset"
                                value={state.Offset}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
                    Cadastrar
                </Button>
            </Form>
        </Container >
    )
}

export default ParametrosCadastrar
