import React from 'react';

interface Props {
  estacaoId: number;
}

const EstacaoParametro: React.FC<Props> = ({ estacaoId }) => {
  return (
    <div>
      <h1>Parâmetros da Estação</h1>
      {/* Adicione aqui o conteúdo do componente */}
    </div>
  );
};

export default EstacaoParametro;
