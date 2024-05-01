import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ParametrosEstacao {
  // Defina a interface para os parâmetros da estação aqui
  id: number;
  nome: string;
  valor: number;
}

const EditarParametrosEstacao: React.FC = () => {
  const history = useHistory();
  const { estacaoId } = useParams<{ estacaoId: string }>();
  const [parametros, setParametros] = useState<ParametrosEstacao[]>([]);

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const response = await fetch(`http://localhost:4000/tipoParametro/${estacaoId}`);
        const data = await response.json();
        setParametros(data);
      } catch (error) {
        console.error("Erro ao buscar parâmetros da estação:", error);
      }
    };

    fetchParametros();
  }, [estacaoId]);

  const handleVoltar = () => {
    history.push(`/editar-estacao/${estacaoId}`);
  };

  return (
    <Container>
      <h1>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={handleVoltar}
          style={{ marginRight: "10px", cursor: "pointer" }}
        />
        Editar Parâmetros da Estação
      </h1>
      {/* Aqui você pode exibir os parâmetros da estação e fornecer opções para edição */}
    </Container>
  );
};

export default EditarParametrosEstacao;
