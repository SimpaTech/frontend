import React, { Component } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import "../styles/ParametrosCadastro.css"
import { Props } from "react-input-mask"

export default class ParametrosCadastro extends Component<Props> {
    state = {}

    render() {
        return (
            <Container className="parametros">
                <h1 className="text-center">Cadastrar</h1>
                <Form className="mt-5">
                    <Row>
                        <Col>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome" />
                            </Form.Group>
                            <Form.Group controlId="formFator" style={{ marginTop: '2%' }}>
                                <Form.Label>Fator</Form.Label>
                                <Form.Control type="text" placeholder="Fator" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formUnidade">
                                <Form.Label>Unidade</Form.Label>
                                <Form.Control type="text" placeholder="Unidade (exemplo: m/s, km/h)" />
                            </Form.Group>
                            <Form.Group controlId="formOffset" style={{ marginTop: '2%' }}>
                                <Form.Label>Offset</Form.Label>
                                <Form.Control type="text" placeholder="Offset" />
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
}
