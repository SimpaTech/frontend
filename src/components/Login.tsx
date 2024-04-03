import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import InputMask from "react-input-mask";
import '../styles/Login.css'

interface State {
  CPF: string;
  password: string;
  validated: boolean;
}

function Login() {
  const [state, setState] = useState<State>({ CPF: '', password: '', validated: false });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }

    setState(prevState => ({
      ...prevState,
      validated: true
    }));

    if (form.checkValidity()) {

      const data = {
        CPF: state.CPF.replace(/\D/g, ''),
        password: state.password
      };

      console.log(data);

      try {
        const response = await fetch('URL_DO_SEU_BACKEND', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          console.log('Informações enviadas com sucesso!');
        } else {
          console.error('Falha ao enviar informações para o backend');
        }
      } catch (error) {
        console.error('Erro ao enviar informações para o backend:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container fluid>
      <Row>
        <Col className='FundoLogo Col'>
          <Image className='Logo' src="/images/logo.png" alt="Logo" fluid />
        </Col>
        <Col xs={7} className='Col'>
          <Container fluid className='ContainerCaixa'>
            <h1 className='Centralizar'>Tela Login</h1>
            <Container className='ContainerForm'>
              <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                <Form.Group className='Espacamento'>
                  <Form.Label>
                    CPF:
                  </Form.Label>
                  <Form.Control as={InputMask} mask="999.999.999-99" maskChar="" type='text' name='CPF' value={state.CPF} onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    CPF inválido. Por favor, insira um CPF com 11 dígitos.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='Espacamento'>
                  <Form.Label >
                    Senha:
                  </Form.Label>
                  <Form.Control type='password' name='password' value={state.password} onChange={handleChange} required />
                </Form.Group>
                <Container className='Centralizar ContainerBtn'>
                  <Button className='Btn' variant="primary" type="submit">
                    Logar
                  </Button>
                  <Container>
                    Entrar como
                    <a className='LinkVisitante' href="/Visitante">
                      Visitante
                    </a>
                  </Container>
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