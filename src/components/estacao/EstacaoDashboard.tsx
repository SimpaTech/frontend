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

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const EstacaoDashboard: React.FC = () => {
  const [medidas, setMedidas] = useState<Medida[]>([]);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [selectedEstacao, setSelectedEstacao] = useState<number | null>(null);
  const chartRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});
  const chartInstances = useRef<{ [key: number]: Chart | null }>({});
  const colorMap = useRef<{ [key: number]: string }>({});
  const [rowIndex, setRowIndex] = useState<number>(0); // Índice da linha atual

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
    const filteredMedidas = selectedEstacao !== null
      ? medidas.filter(medida => medida.parametro.estacao.ID_Estacao === selectedEstacao)
      : [];

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

        if (!colorMap.current[parseInt(tipoParametroId)]) {
          colorMap.current[parseInt(tipoParametroId)] = getRandomColor();
        }

        const labels = medidasByTipo.map((medida) => new Date(medida.UnixTime * 1000).toLocaleString());
        const data = medidasByTipo.map((medida) => medida.Valor);
        const borderColor = colorMap.current[parseInt(tipoParametroId)];
        const backgroundColor = `${borderColor}33`; // cor com transparência

        chartInstances.current[parseInt(tipoParametroId)] = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: `${medidasByTipo[0]?.parametro.tipoParametro.Nome_Tipo_Parametro ?? ''}`,
                data: data,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
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

  const calculateColWidth = () => {
    const chartCount = Object.keys(medidas.reduce((acc, medida) => {
      if (selectedEstacao === null || medida.parametro.estacao.ID_Estacao === selectedEstacao) {
        acc[medida.parametro.tipoParametro.ID_Tipo_Parametro] = true;
      }
      return acc;
    }, {} as { [key: number]: boolean })).length;

    if (chartCount === 1) {
      return 12; // ocupa 100% da largura
    } else if (chartCount === 2) {
      return 6; // ocupa 50% da largura
    } else if (chartCount === 3) {
      return 4; // ocupa 33% da largura
    } else {
      return 4; // fallback para o caso de mais de 3 gráficos
    }
  };

  const isDataAvailable = () => {
    if (selectedEstacao !== null && estacoes.find(estacao => estacao.ID_Estacao === selectedEstacao)) {
      const availableData = medidas.some(medida => medida.parametro.estacao.ID_Estacao === selectedEstacao);
      return availableData;
    }
    return false;
  };

  return (
    <Container>
      <SelecionarGraficoEstacao 
        estacoes={estacoes} 
        setEstacoes={setEstacoes} 
        onSelectEstacao={setSelectedEstacao} 
      />
      {selectedEstacao === null && estacoes.length === 0 ? (
        <div className="alert alert-danger mt-3" role="alert">
          Não temos dados de nenhuma estação ainda.
        </div>
      ) : isDataAvailable() ? (
        <Row>
          {Object.keys(medidas.reduce((acc, medida) => {
            if (selectedEstacao === null || medida.parametro.estacao.ID_Estacao === selectedEstacao) {
              acc[medida.parametro.tipoParametro.ID_Tipo_Parametro] = true;
            }
            return acc;
          }, {} as { [key: number]: boolean })).map((tipoParametroId) => (
            <Col key={tipoParametroId} xs={12} md={calculateColWidth()} className="my-2">
              <canvas
                className="bg-white rounded h-100 w-100 p-3"
                ref={(el) => chartRefs.current[parseInt(tipoParametroId)] = el}
              ></canvas>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="alert alert-warning mt-3" role="alert">
          Não há dados disponíveis para exibir gráficos.
        </div>
      )}
    </Container>
  );
};

export default EstacaoDashboard;
