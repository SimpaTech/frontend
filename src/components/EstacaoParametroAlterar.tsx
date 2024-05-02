import React from 'react';

interface Props {
  estacaoId: number;
}

const EstacaoParametro: React.FC<Props> = ({ estacaoId }) => {
  return (
    <div>
      <h1>Parâmetros da Estação</h1>
      {estacaoId}
    </div>
  );
};

export default EstacaoParametro;
