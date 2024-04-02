import React from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import "../styles/EstacaoCadastro.css"

const CadastroPage: React.FC = () => {
  return (
    <Container className="estacao">
      <h1 className="text-center">Cadastrar</h1>
      <Form className="mt-5">
        <Row>
          <Col>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome" />
            </Form.Group>
            <Form.Group controlId="formLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control type="text" placeholder="Latitude" />
            </Form.Group>
            <Form.Group controlId="formDataInstalacao">
              <Form.Label>Data de Instalação</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTipoEstacao">
              <Form.Label>Tipo Estação</Form.Label>
              <Form.Control as="select">
                <option>Opção 1</option>
                <option>Opção 2</option>
                <option>Opção 3</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control type="text" placeholder="Longitude" />
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
