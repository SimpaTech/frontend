import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import '../styles/Login.css'

type Props = {};

type State = {
  CPF: string;
  password: string;
};

const Login: React.FC<Props> = () => {
  const [state, setState] = useState<State>({ CPF: '', password: '' });
  const { CPF, password } = state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container fluid>
      <Row>
        <Col className='FundoLogo Col'>
          <Image className='Logo' src="/images/logo.png" alt="Logo" fluid />
        </Col>
        <Col xs={7} className='Col'>
          <Container fluid className='ContainerForm'>
            <h1 className='Centralizar'>Tela Login</h1>
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='Espacamento'>
                  <Form.Label>
                    CPF:
                  </Form.Label>
                  <Form.Control type='text' />
                </Form.Group>
                <Form.Group className='Espacamento'>
                  <Form.Label >
                    Senha:
                  </Form.Label>
                  <Form.Control type='password' />
                </Form.Group>
                <Container className='Centralizar Espacamento'>
                  <Button className='Btn' variant="primary" type="submit">
                    Logar
                  </Button>
                </Container>
                <Container className='Centralizar Espacamento'>
                  <a href="/otherPage">
                    Entrar como Visitante
                  </a>
                </Container>
              </Form>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;