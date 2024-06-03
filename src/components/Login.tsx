import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';
import InputMask from "react-input-mask";
import '../styles/Login.css'
import { login } from '../services/apiService';
import { Navigate, useNavigate } from 'react-router-dom';

interface State {
  CPF_Usuario: string;
  Senha: string;
  validated: boolean;
  loggedIn: boolean;
  errorMessage: string;
}

function Login() {
  const [state, setState] = useState<State>({ CPF_Usuario: '', Senha: '', validated: false, loggedIn: false, errorMessage: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      validated: true,
    }));

    const CPFNoMask = state.CPF_Usuario.replace(/\D/g, '');

    // Verifica se o CPF está totalmente preenchido
    if (CPFNoMask.length !== 11) {
      console.error('Erro: CPF incompleto.');
      return;
    }

    if (form.checkValidity()) {

      try {
        const data = {
          Nome_Usuario: '',
          CPF_Usuario: CPFNoMask,
          Senha: state.Senha,
          Role: ''
        };

        const response = await login(data);
        console.log("response:", response); // Adicione este console.log

        if (response.status === 201) {
          console.log('Login bem-sucedido!');
          setState(prevState => ({
            ...prevState,
            loggedIn: true
          }));
          // Salvar os detalhes do usuário e o token no localStorage
          localStorage.setItem('userDetails', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token);
          navigate('/estacoes');
        } else {
          console.error('Falha ao fazer login:', response.data.error);
          setState(prevState => ({
            ...prevState,
            errorMessage: 'CPF ou senha incorretos.'
          }));
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        setState(prevState => ({
          ...prevState,
          errorMessage: 'CPF ou senha incorretos.'
        }));
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

  if (state.loggedIn) {
    return <Navigate to="/estacoes" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col className='FundoLogo Col'>
          <Image className='Logo' src="/images/Logo.png" alt="Logo" fluid />
        </Col>
        <Col xs={7} className='Col'>
          <Container fluid className='ContainerCaixa'>
            <h1 className='Centralizar'>Tela Login</h1>
            <Container className='ContainerForm'>
              {state.errorMessage && <Alert variant="danger">{state.errorMessage}</Alert>}
              <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                <Form.Group className='Espacamento'>
                  <Form.Label>
                    CPF:
                  </Form.Label>
                  <Form.Control
                    as={InputMask}
                    mask="999.999.999-99"
                    maskChar=""
                    type='text'
                    name='CPF_Usuario'
                    value={state.CPF_Usuario}
                    onChange={handleChange}
                    required
                    className={state.validated && state.CPF_Usuario.replace(/\D/g, '').length !== 11 ? 'is-invalid' : ''}
                  />
                  {state.validated && state.CPF_Usuario.replace(/\D/g, '').length !== 11 && (
                    <Form.Control.Feedback type="invalid">
                      CPF inválido. Por favor, insira um CPF com 11 dígitos.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className='Espacamento'>
                  <Form.Label >
                    Senha:
                  </Form.Label>
                  <Form.Control type='password' name='Senha' value={state.Senha} onChange={handleChange} required />
                </Form.Group>
                <Container className='Centralizar ContainerBtn'>
                  <Button className='Btn' variant="primary" type="submit">
                    Logar
                  </Button>
                  <Container>
                    Entrar como
                    <a className='LinkVisitante' href="/">
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