import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import InputMask from "react-input-mask";
import '../styles/Login.css'
import { login } from '../services/apiService';
import { Link, Navigate, useNavigate } from 'react-router-dom';

interface State {
  CPF_Usuario: string;
  Senha: string;
  validated: boolean;
  loggedIn: boolean;
}

function Login() {
  const [state, setState] = useState<State>({ CPF_Usuario: '', Senha: '', validated: false, loggedIn: false });
  const navigate = useNavigate();

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
      
      try {
        const data = {
          Nome_Usuario: '',
          CPF_Usuario: state.CPF_Usuario.replace(/\D/g, ''),
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
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
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
                  <Form.Control as={InputMask} mask="999.999.999-99" maskChar="" type='text' name='CPF_Usuario' value={state.CPF_Usuario} onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    CPF inválido. Por favor, insira um CPF com 11 dígitos.
                  </Form.Control.Feedback>
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