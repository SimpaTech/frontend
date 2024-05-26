import React, { useEffect, useState } from 'react';
import '../../styles/graficos/SelecionarGraficoEstacao.css';
import { listarEstacoes } from '../../services/apiService';

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

interface Props {
  estacoes: Estacao[];
  onSelectEstacao: (id: number | null) => void;
  setEstacoes: React.Dispatch<React.SetStateAction<Estacao[]>>;
}

const SelecionarGraficoEstacao: React.FC<Props> = ({ estacoes, onSelectEstacao, setEstacoes }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await listarEstacoes();
        const estacoesData = response.data;
        setEstacoes(estacoesData);
        if (estacoesData.length > 0) {
          setSelectedOption(estacoesData[0].ID_Estacao);
          onSelectEstacao(estacoesData[0].ID_Estacao);
        } else {
          setSelectedOption(null);
        }
      } catch (error) {
        console.error("Erro ao buscar medidas:", error);
      }
    };

    fetchEstacoes();
  }, [setEstacoes, onSelectEstacao]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedOption(selectedValue);
    onSelectEstacao(selectedValue); // Chama onSelectEstacao passada como propriedade
  };

  if (estacoes.length === 0) {
    return (
      <div className="alert alert-danger" role="alert">
        Não temos dados de nenhuma estação ainda.
      </div>
    );
  }

  return (
    <div>
      <select id="selectEstacao" value={selectedOption !== null ? selectedOption : ''} onChange={handleSelectChange} className='select'>
        {estacoes.map(estacao => (
          <option key={estacao.ID_Estacao} value={estacao.ID_Estacao}>
            {estacao.Nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelecionarGraficoEstacao;
