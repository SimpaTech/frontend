import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:4000";

interface UserData {
  Nome_Usuario: string;
  CPF_Usuario: string;
  Senha: string;
  Role: string;
}

interface AlertData {
  Nome_Tipo_Alerta: string
  Valor: string
  Operador_Condicional: string
}

interface TipoParametroData {
  Nome_Tipo_Parametro: string
  Unidade: string
  Offset: string
  Fator: string
}

interface EstacaoData {
  Nome: string
  Latitude: string
  Longitude: string
  Data_Instalacao: string
  Tipo_Estacao: string
  Indicativo_Ativa: Boolean
}

interface TipoParametroAlerta {
  ID_Parametro: number;
  ID_TipoAlerta: number;
}

// LOGIN E LOGOUT

export async function login(data: UserData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuario/login`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout(id: String): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuario/logout/${id}`);
    return response.data.message;
  } catch (error) {
    throw error;
  }
}

// USUÁRIO

export async function cadastrarUsuario(data: UserData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuario/cadastrarUsuario`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function listarUsuarios(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuario/`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function buscarUsuario(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuario/buscarUsuario/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function editarUsuario(id: number, data: UserData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.put(`${API_BASE_URL}/usuario/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deletarUsuario(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/usuario/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function obterInformacoesUsuarioPeloToken(token: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuario/informacoesToken`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error;
  }
}

// PARAMETRO

export async function listarParametros(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoParametro/`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function cadastrarParametroAlerta(data: TipoParametroAlerta): Promise<AxiosResponse<any>> {
  try {
    console.log("Data cadastrarParametroAlerta: " + JSON.stringify(data))
    const response = await axios.post(`${API_BASE_URL}/parametroAlerta/criar`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deletarParametroAlerta(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/parametroAlerta/deletar/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function listarParametroAlerta(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/parametroAlerta/Listar`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function postParametroEstacao<T>(estacaoId: number, parametros: T[]): Promise<void> {
  try {
      console.log("estacaoId" + estacaoId);
      console.log("parametros" + parametros);

      // Envia uma requisição para cada ID_TipoParametro na lista
      await Promise.all(parametros.map(async (parametro: T) => {
          const data = {
              ID_Estacao: estacaoId,
              ID_TipoParametro: parametro
          };
          // Envia a requisição para criar o parâmetro na estação
          const response = await axios.post(`${API_BASE_URL}/parametro/criar`, data);
          console.log("Resposta para ID_TipoParametro " + parametro + ": " + response);
      }));
      
      console.log("Todos os parâmetros foram enviados com sucesso");
  } catch (error) {
      throw error;
  }
}

export async function deleteParametroEstacao(estacaoId: number): Promise<void> {
  try {
    // Envia a solicitação para remover os parâmetros associados à estação
    const response = await axios.delete(`${API_BASE_URL}/parametro/deletarporidestacao/${estacaoId}`);
    
    // Verifica se a solicitação foi bem-sucedida
    if (response.status === 200) {
      console.log("Parâmetros removidos com sucesso");
    } else {
      throw new Error("Erro ao remover parâmetros");
    }
  } catch (error) {
    throw error;
  }
}

// TIPO PARAMETRO

export async function listarTipoParametro(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoParametro/`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function cadastrarTipoParametro(data: TipoParametroData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tipoParametro/cadastrarTipoParametro`, data);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function buscarTipoParametro(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoParametro/buscarTipoParametro/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editarTipoParametro = async (id: number, data: TipoParametroData ) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tipoParametro/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function removerTipoParametro(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tipoParametro/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}


// ALERTAS

export async function cadastrarAlerta(data: AlertData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tipoAlerta/criar`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function listarAlertas(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoAlerta/listar`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function buscarAlerta(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoAlerta/listar/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function editarTipoAlerta(id: number, data: AlertData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.put(`${API_BASE_URL}/tipoAlerta/editar/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deletarTipoAlerta(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tipoAlerta/deletar/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

// ESTAÇÕES

export async function cadastrarEstacao(data: EstacaoData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/estacao/criar`, data);
    return response;
  } catch (error) {
    throw error;
  }
}
    
export async function listarEstacoes(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/estacao/listar`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function buscarEstacao(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/estacao/listar/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function editarEstacao(id: number, data: EstacaoData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.put(`${API_BASE_URL}/estacao/editar/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deletarEstacao(id: number): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/estacao/deletar/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
  
// MEDIDAS

export async function listarMedidas(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/medida/listar`);
    return response;
  } catch (error) {
    throw error;
  }
}