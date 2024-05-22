import React, { useEffect, useRef, useState } from "react";
import "../../styles/estacao/EstacaoDashboard.css";
import { Container, Row, Col } from "react-bootstrap";
import { Chart, registerables } from "chart.js";
import { listarMedidas } from "../../services/apiService";
import SelecionarGraficoEstacao from "../graficos/SelecionarGraficoEstacao";

// Registrar todos os módulos do Chart.js
Chart.register(...registerables);

interface Estacao {
  ID_Estacao: number;
  UID: string;
  Nome: string;
  Latitude: number;
  Longitude: number;
  Data_Instalacao: string;
  Tipo_Estacao: string;
  Indicativo_Ativa: boolean;
}

interface TipoParametro {
  ID_Tipo_Parametro: number;
  Fator: number;
  Offset: number;
  Unidade: string;
  Json: string;
  Nome_Tipo_Parametro: string;
  Indicativo_Ativa: boolean;
}

interface Parametro {
  ID_Parametro: number;
  estacao: Estacao;
  tipoParametro: TipoParametro;
}

interface Medida {
  ID_Medida: number;
  UnixTime: number;
  Valor: number;
  parametro: Parametro;
}

const EstacaoDashboard: React.FC = () => {
  const [medidas, setMedidas] = useState<Medida[]>([]);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [selectedEstacao, setSelectedEstacao] = useState<number | null>(null);
  const chartRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});
  const chartInstances = useRef<{ [key: number]: Chart | null }>({});

  useEffect(() => {
    const fetchMedidas = async () => {
      try {
        const response = await listarMedidas();
        setMedidas(response.data);
      } catch (error) {
        console.error("Erro ao buscar medidas:", error);
      }
    };

    fetchMedidas();
  }, []);

  useEffect(() => {
    const filteredMedidas = selectedEstacao
      ? medidas.filter(medida => medida.parametro.estacao.ID_Estacao === selectedEstacao)
      : medidas;

    const groupedMedidas = filteredMedidas.reduce((acc, medida) => {
      const tipoParametroId = medida.parametro.tipoParametro.ID_Tipo_Parametro;
      if (!acc[tipoParametroId]) {
        acc[tipoParametroId] = [];
      }
      acc[tipoParametroId].push(medida);
      return acc;
    }, {} as { [key: number]: Medida[] });

    Object.keys(groupedMedidas).forEach((tipoParametroId) => {
      const medidasByTipo = groupedMedidas[parseInt(tipoParametroId)];
      const ctx = chartRefs.current[parseInt(tipoParametroId)]?.getContext("2d");

      if (ctx && medidasByTipo.length > 0) {
        if (chartInstances.current[parseInt(tipoParametroId)]) {
          chartInstances.current[parseInt(tipoParametroId)]?.destroy();
        }

        const labels = medidasByTipo.map((medida) => new Date(medida.UnixTime * 1000).toLocaleString());

        chartInstances.current[parseInt(tipoParametroId)] = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: `${medidasByTipo[0]?.parametro.tipoParametro.Nome_Tipo_Parametro ?? ''}`,
                data: medidasByTipo.map((medida) => medida.Valor),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Estação: ${medidasByTipo[0]?.parametro.estacao.Nome ?? ''}`,
              },
            },
            scales: {
              x: {
                title: {
                  display: false,
                  text: "Tempo",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Valor",
                },
              },
            },
          },
        });
      }
    });
  }, [medidas, selectedEstacao]);

  return (
    <Container>
      <SelecionarGraficoEstacao 
        estacoes={estacoes} 
        setEstacoes={setEstacoes} 
        onSelectEstacao={setSelectedEstacao} 
      />
      <Row>
        {Object.keys(medidas.reduce((acc, medida) => {
          if (selectedEstacao === null || medida.parametro.estacao.ID_Estacao === selectedEstacao) {
            acc[medida.parametro.tipoParametro.ID_Tipo_Parametro] = true;
          }
          return acc;
        }, {} as { [key: number]: boolean })).map((tipoParametroId) => (
          <Col key={tipoParametroId} xs={12} md={6} lg={4}>
            <canvas
              className="bg-white rounded h-100 w-100 p-3 mt-5"
              ref={(el) => chartRefs.current[parseInt(tipoParametroId)] = el}
            ></canvas>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EstacaoDashboard;
