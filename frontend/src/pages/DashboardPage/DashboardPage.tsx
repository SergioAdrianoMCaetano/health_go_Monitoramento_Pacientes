// src/pages/DashboardPage/DashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { api } from "../../services/api";
import type { PatientRecord } from "../../types/patient";

import PatientTable from "../../components/PatientTable/PatientTable";
import VitalChart from "../../components/VitalChart/VitalChart";
import MapView from "../../components/MapView/MapView";
import FileList from "../../components/FileList/FileList";

import {
    ChartSection,
    DashboardContainer,
    DashboardGrid,
    DashboardHeader,
    ErrorMessage,
    FileInfo,
    LoadingMessage,
    MapSection,
    TableSection,
} from "./DashboardPage.styles";

export default function DashboardPage() {
    const navigate = useNavigate();
    const { state, setPatientData, setUploadedFiles } = useApp();

    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirecionar se não houver arquivo válido
    useEffect(() => {
        if (!state.isValidFile && state.uploadedFiles.length === 0) {
        console.log("⚠️ Redirecionando para home - nenhum arquivo válido");
        navigate("/");
        }
    }, [state.isValidFile, state.uploadedFiles.length, navigate]);

    // Carregar dados da API real
    useEffect(() => {
        const loadData = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log("📡 Buscando dados da API...");
            const response = await api.get("/patients/records");
            const allData: PatientRecord[] = response.data;

            console.log("📊 Dados recebidos:", allData.length, "registros");

            // Extrair lista de arquivos únicos
            const uniqueFiles = [
            ...new Set(
                allData
                .map((item) => item.source_file)
                .filter((file): file is string => file !== undefined && file !== null)
            ),
            ];
            setUploadedFiles(uniqueFiles);

            // Filtrar dados pelo arquivo selecionado (se houver)
            let filteredData = allData;
            if (state.selectedFile) {
            filteredData = allData.filter(
                (item) => item.source_file === state.selectedFile
            );
            console.log(
                "🔍 Filtrado por arquivo:",
                state.selectedFile,
                "-",
                filteredData.length,
                "registros"
            );
            }

            setPatientData(filteredData);
        } catch (err) {
            const errorMsg =
            err instanceof Error ? err.message : "Erro ao carregar os dados";
            setError(errorMsg);
            console.error("❌ Erro ao carregar dados:", err);
        } finally {
            setLoading(false);
        }
        };

        if (state.isValidFile) {
        loadData();
        }
    }, [state.selectedFile, state.isValidFile, setPatientData, setUploadedFiles, refresh]);

    const handleFileSelect = (filename: string) => {
        console.log("📄 Arquivo selecionado no Dashboard:", filename);
    };

    const handleRefresh = () => {
        setRefresh((prev) => !prev);
        console.log("🔄 Atualizando dados...");
    };

    return (
        <DashboardContainer>
        <DashboardHeader>
            <div>
            <h2>📊 Dashboard de Monitoramento</h2>

            {state.selectedFile ? (
                <FileInfo>
                Visualizando: <strong>{state.selectedFile}</strong>
                <button
                    onClick={handleRefresh}
                    style={{
                    marginLeft: "1rem",
                    padding: "0.3rem 0.8rem",
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    }}
                >
                    🔄 Atualizar
                </button>
                </FileInfo>
            ) : (
                <FileInfo>
                Visualizando: <strong>Todos os arquivos</strong>
                <span style={{ marginLeft: "1rem", color: "#718096" }}>
                    ({state.patientData.length} registros)
                </span>
                </FileInfo>
            )}
            </div>

            <FileList onFileSelect={handleFileSelect} />
        </DashboardHeader>

        {loading && (
            <LoadingMessage>⏳ Carregando dados dos pacientes...</LoadingMessage>
        )}

        {error && (
            <ErrorMessage>
            ❌ Erro ao carregar dados: {error}
            <br />
            <small>Verifique se o backend está rodando na porta 8000</small>
            </ErrorMessage>
        )}

        {!loading && !error && (
            <>
            <ChartSection>
                <VitalChart refresh={refresh} />
            </ChartSection>

            <DashboardGrid>
                <TableSection>
                <PatientTable refresh={refresh} />
                </TableSection>

                <MapSection>
                <MapView patientData={state.patientData} />
                </MapSection>
            </DashboardGrid>
            </>
        )}

        <div
            style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f7fafc",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#4a5568",
            }}
        >
            <strong>ℹ️ Informações de Debug:</strong>
            <br />• Arquivos carregados: {state.uploadedFiles.length}
            <br />• Registros totais: {state.patientData.length}
            <br />• Arquivo selecionado: {state.selectedFile || "Nenhum"}
            <br />• isValidFile: {state.isValidFile ? "✅" : "❌"}
        </div>
        </DashboardContainer>
    );
}
