// src/test/EstacaoDashboard.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EstacaoDashboard from "../components/estacao/EstacaoDashboard";
import { listarMedidas, listarEstacoes } from "../services/apiService";
import { act } from "react-dom/test-utils";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Mock the listarMedidas and listarEstacoes API functions
jest.mock("../services/apiService", () => ({
  listarMedidas: jest.fn(),
  listarEstacoes: jest.fn(),
}));

const mockMedidas = [
  {
    ID_Medida: 1,
    UnixTime: 1620000000,
    Valor: 10,
    parametro: {
      ID_Parametro: 1,
      estacao: {
        ID_Estacao: 1,
        UID: "estacao1",
        Nome: "Estacao 1",
        Latitude: -23.55052,
        Longitude: -46.633309,
        Data_Instalacao: "2021-01-01",
        Tipo_Estacao: "Tipo 1",
        Indicativo_Ativa: true,
      },
      tipoParametro: {
        ID_Tipo_Parametro: 1,
        Fator: 1,
        Offset: 0,
        Unidade: "°C",
        Json: "{}",
        Nome_Tipo_Parametro: "Temperatura",
        Indicativo_Ativa: true,
      },
    },
  },
  // Add more mock data if needed
];

const mockEstacoes = [
  {
    ID_Estacao: 1,
    UID: "estacao1",
    Nome: "Estacao 1",
    Latitude: -23.55052,
    Longitude: -46.633309,
    Data_Instalacao: "2021-01-01",
    Tipo_Estacao: "Tipo 1",
    Indicativo_Ativa: true,
  },
  // Add more mock data if needed
];

const mockAxiosResponse = (data: any): AxiosResponse => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as InternalAxiosRequestConfig,
});

describe("EstacaoDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component and fetch medidas", async () => {
    (listarMedidas as jest.MockedFunction<typeof listarMedidas>).mockResolvedValue(mockAxiosResponse(mockMedidas));
    (listarEstacoes as jest.MockedFunction<typeof listarEstacoes>).mockResolvedValue(mockAxiosResponse(mockEstacoes));

    await act(async () => {
      render(<EstacaoDashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText("Estacao 1")).toBeInTheDocument();
    });
  });

  it("should display warning when no data is available", async () => {
    (listarMedidas as jest.MockedFunction<typeof listarMedidas>).mockResolvedValue(mockAxiosResponse([]));
    (listarEstacoes as jest.MockedFunction<typeof listarEstacoes>).mockResolvedValue(mockAxiosResponse([]));

    await act(async () => {
      render(<EstacaoDashboard />);
    });

    await waitFor(() => {
      // Verifica se o texto está presente no documento
      const alerts = screen.getAllByText("Não temos dados de nenhuma estação ainda.");
      expect(alerts.length).toBeGreaterThan(0);
    });
  });

  // Add more tests as needed
});
