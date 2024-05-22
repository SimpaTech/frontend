import React, { useState, useEffect, FormEvent } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import {
  cadastrarParametroAlerta,
  deletarParametroAlerta,
  listarAlertas,
  listarParametroAlerta,
} from "../../services/apiService";

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
  linkado: boolean;
  ID_ligacao: number;
}

interface Props {
  parametroId: number;
}

const EstacaoAlertas: React.FC<Props> = ({ parametroId }) => {
  const [state, setState] = useState<State>({
    validated: false,
    errorMessage: null,
    tipoAlertas: [],
  });

  useEffect(() => {
    const fetchTipoAlertas = async () => {
      try {
        const responseAlertas = await listarAlertas();
        const responseParametros = await listarParametroAlerta();

        const tipoAlertas = responseAlertas.data;
        const parametroLigados = responseParametros.data;

        const alertasVinculados = tipoAlertas.map((alerta: TipoAlerta) => {
          let idLigacao = null;
          const vinculado = parametroLigados.some((parametro: any) => {
            const resultado =
              parametro.tipoAlerta.ID_Tipo_Alerta == alerta.ID_Tipo_Alerta;
            idLigacao = parametro.ID_Parametro_Alerta;
            return resultado;
          });

          return { ...alerta, linkado: vinculado, ID_ligacao: idLigacao };
        });

        setState((prevState) => ({
          ...prevState,
          tipoAlertas: alertasVinculados,
        }));
      } catch (error) {
        console.error("Erro ao buscar tipos de alertas:", error);
      }
    };

    fetchTipoAlertas();
  }, []);

  const handleVincular = async (parametroId: number, tipoAlertaId: number) => {
    try {
      // Primeiro, faz o cadastro
      await cadastrarParametroAlerta({
        ID_Parametro: parametroId,
        ID_TipoAlerta: tipoAlertaId,
      });

      // Em seguida, atualiza o estado com o novo vínculo
      const responseParametros = await listarParametroAlerta();
      const parametroLigados = responseParametros.data;

      let idLigacao: any = null;
      const vinculado = parametroLigados.some((parametro: any) => {
        const resultado = parametro.tipoAlerta.ID_Tipo_Alerta === tipoAlertaId;
        if (resultado) {
          idLigacao = parametro.ID_Parametro_Alerta;
        }
        return resultado;
      });

      // Atualiza o estado dos alertas para refletir que este alerta está vinculado
      const updatedAlertas = state.tipoAlertas.map((alerta) => {
        if (alerta.ID_Tipo_Alerta === tipoAlertaId) {
          return { ...alerta, linkado: true, ID_ligacao: idLigacao };
        }
        return alerta;
      });

      setState((prevState) => ({ ...prevState, tipoAlertas: updatedAlertas }));
    } catch (error) {
      console.error("Erro ao vincular alerta:", error);
    }
  };

  const handleDesvincular = async (LigacaoId: number) => {
    try {
      await deletarParametroAlerta(LigacaoId);
      // Atualize o estado dos alertas para refletir que este alerta está desvinculado
      const updatedAlertas = state.tipoAlertas.map((alerta) => {
        if (alerta.ID_ligacao === LigacaoId) {
          return { ...alerta, linkado: false };
        }
        return alerta;
      });

      setState((prevState) => ({ ...prevState, tipoAlertas: updatedAlertas }));
    } catch (error) {
      console.error("Erro ao desvincular alerta:", error);
    }
  };

  return (
    <Container className="tipoalerta">
      <h1 className="text-center">Selecionar Alertas</h1>
      {/* {parametroId} */}
      <Form className="mt-5" noValidate validated={state.validated}>
        {state.errorMessage && (
          <div
            className={`alert ${
              state.errorMessage.includes("Erro")
                ? "alert-danger"
                : "alert-success"
            }`}
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
                    <th>ID</th>
                    <th>Nome do Tipo de Alerta</th>
                    <th>Valor</th>
                    <th>Operador_Condicional</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {state.tipoAlertas.length === 0 ? (
                    <div
                      className={`alert mt-3 alert-danger`}
                      role="alert"
                    >
                      Nenhum alerta cadastrado!
                    </div>
                  ) : (
                    state.tipoAlertas.map((tipoAlerta) => (
                      <tr key={tipoAlerta.ID_Tipo_Alerta}>
                        <td>{tipoAlerta.ID_Tipo_Alerta}</td>
                        <td>{tipoAlerta.Nome_Tipo_Alerta}</td>
                        <td>{tipoAlerta.Valor}</td>
                        <td>{tipoAlerta.Operador_Condicional}</td>
                        <td>
                          {tipoAlerta.linkado ? (
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleDesvincular(tipoAlerta.ID_ligacao)
                              }
                            >
                              Desvincular
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={() =>
                                handleVincular(
                                  parametroId,
                                  tipoAlerta.ID_Tipo_Alerta
                                )
                              }
                            >
                              Linkar
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Form.Group>
          </Col>
        </Row>
        {/* <Button variant="primary" type="submit" className="d-block mx-auto mt-5">
          Continuar
        </Button> */}
      </Form>
    </Container>
  );
};

export default EstacaoAlertas;
