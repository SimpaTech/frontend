import React, { useState, useEffect, FormEvent } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import {
  cadastrarParametroAlerta,
  deletarParametroAlerta,
  listarAlertas,
  listarParametroAlerta,
} from "../../services/apiService";

// Prime React
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
        const parametroLista = responseParametros.data;

        console.log(JSON.stringify(parametroLista, null, 2));

        const alertasVinculados = tipoAlertas.map((alerta: TipoAlerta) => {
            let idLigacao = null;
            const vinculado = parametroLista.some((parametro: any) => {
                const resultado = parametro.parametro.ID_Parametro === parametroId &&
                                  parametro.tipoAlerta.ID_Tipo_Alerta === alerta.ID_Tipo_Alerta;
                if (resultado) {
                    idLigacao = parametro.ID_Parametro_Alerta;
                }
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
          return { ...alerta, linkado: vinculado, ID_ligacao: idLigacao };
        }
        return alerta;
      });

      setState((prevState) => ({ ...prevState, tipoAlertas: updatedAlertas }));
    } catch (error) {
      console.error("Erro ao vincular alerta:", error);
    }
  };

  const handleDesvincular = async (LigacaoId: number) => {
    console.log(LigacaoId)
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

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        {rowData.linkado ? (
          <Button
            variant="danger"
            onClick={() =>
              handleDesvincular(rowData.ID_ligacao)
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
                rowData.ID_Tipo_Alerta
              )
            }
          >
            Linkar
          </Button>
        )}
      </React.Fragment>
    );
  }

  return (
    <Container className="tipoalerta">
      <h1 className="text-center">Selecionar Alertas</h1>
      {/* {parametroId} */}
      <Form className="mt-5" noValidate validated={state.validated}>
        {state.errorMessage && (
          <div
            className={`alert ${state.errorMessage.includes("Erro")
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
              <DataTable value={state.tipoAlertas} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} style={{ marginTop: '2%' }} className="text-center">
                <Column field="ID_Tipo_Alerta" header="ID" filter filterPlaceholder="Pesquisar"></Column>
                <Column field="Nome_Tipo_Alerta" header="Nome alerta" filter filterPlaceholder="Pesquisar"></Column>
                <Column field="Valor" header="Valor"></Column>
                <Column field="Operador_Condicional" header="Operador"></Column>
                <Column body={actionBodyTemplate} header="Ações" ></Column>
              </DataTable>
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
