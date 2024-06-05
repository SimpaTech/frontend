import React from 'react';
import NavbarVisitante from './NavbarVisitante';
import FooterVisitante from './FooterVisitante';
import Container from 'react-bootstrap/Container';
import '../../styles/visitantes/Visitante.css';
import { Button, Image } from 'react-bootstrap';

const Visitante: React.FC = () => {
  return (
    <div className="visitante-page">
      <NavbarVisitante />

      <Container fluid className="m-0 p-0 w-100">
        <Image fluid src="/images/Banner.png" className="img" />
      </Container>

      <Container fluid className="visitante-content flex justify-center text-center">
        <h1 className="display-4">Sobre nós</h1>
        <p className="lead">Bem-vindo à nossa estação de monitoramento meteorológico, uma aplicação desenvolvida pelos alunos do 4º semestre do curso de Desenvolvimento de Software Multiplataforma da Fatec Jessen Vidal. Esta simulação demonstra o poder da tecnologia em fornecer dados meteorológicos precisos e atualizados, essenciais para diversas aplicações comerciais e ambientais.</p>
      </Container>

      <Container fluid className="buttons flex justify-center text-center">
        <Button className='button' href="/documentacao">Documentação</Button>
        <Button className='button' href="/dados/ocorrencias">Ocorrências</Button>
        <Button className='button' href="/dados/medidas">Medidas</Button>
      </Container>

      <FooterVisitante />
    </div>
  );
};

export default Visitante;
