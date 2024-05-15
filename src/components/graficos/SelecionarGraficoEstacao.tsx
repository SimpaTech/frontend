import React, { useState } from 'react';
import '../../styles/graficos/SelecionarGraficoEstacao.css';

interface Estacao {
    id: number;
    nome: string;
}

interface Props {
    estacoes: Estacao[];
    onSelect: (id: number | null) => void;
}

const SelecionarGraficoEstacao: React.FC<Props> = ({ estacoes, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value);
        setSelectedOption(selectedValue);
        onSelect(selectedValue);
    };

    return (
        <div>
            <select id="selectEstacao" value={selectedOption || ''} onChange={handleSelectChange} className='select'>
                <option value="" className='option'>Mostrar tudo</option>
                {estacoes.map(estacao => (
                    <option key={estacao.id} value={estacao.id}>
                        {estacao.nome}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelecionarGraficoEstacao;
