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
  Valor: number
  Operador_Condicional: string
}

interface TipoParametroData {
  Nome_Tipo_Parametro: string
  Unidade: string
  Offset: Number
  Fator: number
}

interface EstacaoData {
  Nome: string
  Latitude: number
  Longitude: number
  Data_Instalacao: Date
  Tipo_Estacao: string
  Indicativo_Ativa: Boolean
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
    const response = await axios.get(`${API_BASE_URL}/tipoAlerta/listarTipoAlertaPorID/${id}`);
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
  
