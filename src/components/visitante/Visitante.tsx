import React from 'react';
import NavbarVisitante from './NavbarVisitante';
import FooterVisitante from './FooterVisitante';
import Container from 'react-bootstrap/Container';
import './Visitante.css';
import { Image } from 'react-bootstrap';

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

      <Container fluid className="sensor-content flex justify-center text-center">
        <h1>Sensores e parâmetros</h1>
        <h2>Termômetro</h2>
        <div className="infos">
          <p>O termômetro é um sensor essencial em uma estação meteorológica, utilizado para medir a temperatura do ar ou de uma superfície. Geralmente, ele é composto por um material termossensível que se expande ou contrai conforme a temperatura varia. A conversão da variação de comprimento desse material em uma medida de temperatura é feita através da equação de calibração do sensor, que se baseia no coeficiente de dilatação do material e na variação de sua resistência elétrica.
          </p>
          <p>A equação utilizada é:</p>
          <p>T = a + bR</p>
          <p>Onde:</p>
          <ul>
            <li>T é a temperatura em °C,</li>
            <li>R é a resistência elétrica do sensor termômetro,</li>
            <li>a é o fator de conversão,</li>
            <li>b é o offset.</li>
          </ul>
        </div>
        <h2>Higrômetro</h2>
        <div className="infos">
          <p>O higrômetro mede a umidade do ar, sendo um dos tipos mais comuns o sensor capacitivo. Esse sensor é composto por duas placas paralelas, uma delas recoberta por um material higroscópico que absorve ou libera água conforme a umidade relativa do ar. A variação da umidade altera a capacitância do sensor, medida eletronicamente.
          </p>
          <p>A fórmula para obter a umidade relativa do ar se baseia na equação de capacidade elétrica de um capacitor:
          </p>
          <p>C = ϵA / d​</p>
          <p>Onde:</p>
          <ul>
            <li>C é a capacitância,</li>
            <li>ϵ é a constante dielétrica,</li>
            <li>A é a área das placas do sensor,</li>
            <li>d é a distância entre as placas.</li>
          </ul>
        </div>
        <h2>Anemômetro</h2>
        <div className="infos">
          <p>Os anemômetros são usados para medir a direção e a velocidade do vento. O anemômetro de direção consiste em uma haste vertical com aletas ou uma hélice que aponta na direção do vento. A direção é determinada por sensores óticos ou magnéticos que detectam a posição das aletas ou da hélice em relação a um ponto de referência, fornecendo a direção em graus (0° ou 360° representa o norte, 90° representa o leste, 180° representa o sul, e 270° representa o oeste).
          </p>
          <p>Para a velocidade do vento, um anemômetro de copos é utilizado. Ele mede a velocidade em unidades como metros por segundo (m/s) ou quilômetros por hora (km/h), através da fórmula:
          </p>
          <p>V = (NxC) / T​</p>
          <p>Onde:</p>
          <ul>
            <li>V é a velocidade do vento,</li>
            <li>N é o número de rotações completas dos copos,</li>
            <li>C é o fator de conversão (determinado pelo design do anemômetro),</li>
            <li>T é o tempo.</li>
          </ul>
        </div>
        <h2>Pluviômetro</h2>
        <div className="infos">
          <p>O pluviômetro por pulso mede a quantidade de chuva. Ele gera um pulso elétrico a cada gota de chuva que atinge o sensor, com cada pulso representando uma unidade de medida pré-determinada, como milímetros. Por exemplo, se cada pulso estiver calibrado para 0,25 mm, cinco pulsos equivalem a 1,25 mm de chuva.
          </p>
          <p>Para uma medida mais realista, a conversão de milímetros para litros é usada:
          </p>
          <p><b>1 mm de precipitação equivale a 1 litro de água por metro quadrado (1 mm = 1 L/m²).</b></p>
        </div>
      </Container>

      <FooterVisitante />
    </div>
  );
};

export default Visitante;
