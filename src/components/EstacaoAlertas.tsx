import React, { useState, FormEvent, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../styles/TipoAlertasCadastro.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { cadastrarAlerta, listarAlertas } from "../services/apiService";

interface State {
  validated: boolean;
  errorMessage: string | null;
  tipoAlertas: TipoAlerta[];
}

interface TipoAlerta {
  Nome_Tipo_Alerta: string;
  Valor: string;
  Operador_Condicional: string;
  ID_Tipo_Alerta: number;
}

interface Props {
  parametroId: number;
}

const EstacaoAlertas: React.FC<Props> = ({ parametroId }) => {
  const [state, setState] = useState<State>({
    validated: false,
    errorMessage: null,
    tipoAlertas: []
  });

  useEffect(() => {
    const fetchTipoAlertas = async () => {
      try {
        const response = await listarAlertas();
        const tipoAlertas = response.data

        setState((prevState) => ({
          ...prevState,
          tipoAlertas: tipoAlertas
        }));
      } catch (error) {
        console.error("Erro ao buscar tipos de alertas:", error);
      }
    };

    fetchTipoAlertas();
  }, []);



  return (
    <Container className="tipoalerta">
      <h1 className="text-center">Selecionar Alertas</h1>
      {/* {parametroId} */}
      <Form className="mt-5" noValidate validated={state.validated}>
        {state.errorMessage && (
          <div
            className={`alert ${state.errorMessage.includes("Erro") ? "alert-danger" : "alert-success"}`}
            role="alert"
          >
            {state.errorMessage}
          </div>
        )}
        <Row>
          <Col>
            <Form.Group>
              <table className="table">
                <thead>
                  <tr>
                    <th>Selecionar</th>
                    <th>ID</th>
                    <th>Nome do Tipo de Alerta</th>
                  </tr>
                </thead>
                <tbody>
                  {state.tipoAlertas.map((tipoAlerta) => (
                    <tr key={tipoAlerta.ID_Tipo_Alerta}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          id={`checkbox_${tipoAlerta.ID_Tipo_Alerta}`}
                          label=""
                          
                        />
                      </td>
                      <td>{tipoAlerta.ID_Tipo_Alerta}</td>
                      <td>{tipoAlerta.Nome_Tipo_Alerta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
          Continuar
        </Button>
      </Form>
    </Container>
  );
};

export default EstacaoAlertas;