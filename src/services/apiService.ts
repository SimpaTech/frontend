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