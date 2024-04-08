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
  ID_Parametro: number
}

export async function cadastrarUsuario(data: UserData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuario/cadastrarUsuario`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function cadastrarAlerta(data: AlertData): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(`${API_BASE_URL}/tipoAlerta/criar`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function listarTipoParametro(): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tipoParametro/`);
    return response;
  } catch (error) {
    throw error;
  }
}