import React from 'react';

interface Props {
  parametroId: number;
}

const EstacaoAlerta: React.FC<Props> = ({ parametroId }) => {
  return (
    <div>
      <h1>Alertas da Estação</h1>
      {parametroId}
    </div>
  );
};

export default EstacaoAlerta;
