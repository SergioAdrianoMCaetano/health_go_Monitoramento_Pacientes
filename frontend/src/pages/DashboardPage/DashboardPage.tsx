import axios from "axios";
import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { api } from "../../services/api";

import type { PatientRecord } from "../../types/patient";

import { PatientTable } from "../../components/PatientTable/PatientTable";
import { VitalChart } from "../../components/VitalChart/VitalChart";
import { MapView } from "../../components/MapView/MapView";
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
    TableSection
} from "./DashboardPage.styles";

export function DashboardPage() {
    const navigate = useNavigate();
    const { state, setPatientData, setUploadedFiles, setLoading, setError } = useApp();
    
    //CONTROLE CENTRALIZADO DE ESTADO
    const hasLoadedPatients = useRef(false);
    const hasLoadedFiles = useRef(false);
    const isFetching = useRef(false);

    //FUNÇÃO ÚNICA PARA CARREGAR ARQUIVOS
    const loadFiles = useCallback(async () => {
        if (hasLoadedFiles.current) {
            console.log("⏩ Lista de arquivos já carregada, ignorando...");
            return;
        }

        try {
            console.log("📁 Buscando lista de arquivos...");
            const response = await api.get("/upload/files");
            const files = response.data.files || [];
            console.log("✅ Arquivos encontrados:", files);
            
            setUploadedFiles(files);
            hasLoadedFiles.current = true;
        } catch (error) {
            console.error("❌ Erro ao carregar arquivos:", error);
            // Não seta error global para não quebrar o dashboard
        }
    }, [setUploadedFiles]);

    // 🔥 FUNÇÃO ÚNICA PARA CARREGAR PACIENTES
    const loadPatients = useCallback(async () => {
        if (isFetching.current || hasLoadedPatients.current) {
            console.log("⏩ Dados de pacientes já carregados, ignorando...");
            return;
        }

        isFetching.current = true;
        setLoading(true);
        setError(null);

        try {
            console.log("📊 Buscando dados de pacientes...");
            const response = await api.get("/patients/records");
            const allData: PatientRecord[] = response.data;
            console.log("✅ Dados de pacientes recebidos:", allData.length, "registros");

            // 🔥 FILTRAGEM CENTRALIZADA
            let filteredData = allData;
            if (state.selectedFile) {
                filteredData = allData.filter(item => item.source_file === state.selectedFile);
                console.log("🔍 Filtrado por arquivo:", state.selectedFile, "-", filteredData.length, "registros");
            }

            setPatientData(filteredData);
            hasLoadedPatients.current = true;

        } catch (error) {
            let msg = "Erro ao carregar os dados";
            if (axios.isAxiosError(error)) {
                console.error("AxiosError:", error.message);
                msg = `Erro de conexão: ${error.message}`;
            } else {
                console.error("Erro desconhecido:", error);
                msg = error instanceof Error ? error.message : msg;
            }
            setError(msg);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [state.selectedFile, setPatientData, setLoading, setError]);

    // 🔥 CARREGAMENTO INICIAL - UMA ÚNICA VEZ
    useEffect(() => {
        const initializeDashboard = async () => {
            if (!state.isValidFile) {
                console.log("⚠️ Redirecionando para home - arquivo não válido");
                navigate("/");
                return;
            }

            console.log("🚀 INICIANDO DASHBOARD - Carregamento inicial");
            await loadFiles();
            await loadPatients();
        };

        initializeDashboard();
    }, [state.isValidFile, navigate]); // 🔥 DEPENDÊNCIAS MÍNIMAS

    // 🔥 ATUALIZAÇÃO QUANDO ARQUIVO SELECIONADO MUDAR
    useEffect(() => {
        if (hasLoadedPatients.current && state.selectedFile) {
            console.log("🔄 Arquivo selecionado mudou, recarregando dados...");
            hasLoadedPatients.current = false; // Permite recarregar
            loadPatients();
        }
    }, [state.selectedFile, loadPatients]);

    // 🔥 REFRESH MANUAL - CONTROLADO
    const handleRefresh = useCallback(async () => {
        console.log("🔄 SOLICITAÇÃO DE REFRESH MANUAL");
        
        // Reset dos controles para permitir recarregamento
        hasLoadedPatients.current = false;
        hasLoadedFiles.current = false;
        
        await loadFiles();
        await loadPatients();
    }, [loadFiles, loadPatients]);

    // 🔥 DEBUG: Monitoramento do estado
    useEffect(() => {
        console.log("📊 ESTADO DO DASHBOARD:", {
            isValidFile: state.isValidFile,
            loading: state.loading,
            patientData: state.patientData.length,
            uploadedFiles: state.uploadedFiles.length,
            selectedFile: state.selectedFile,
            hasLoadedPatients: hasLoadedPatients.current,
            hasLoadedFiles: hasLoadedFiles.current,
            isFetching: isFetching.current
        });
    }, [state.isValidFile, state.loading, state.patientData.length, state.uploadedFiles.length, state.selectedFile]);

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
                                disabled={state.loading}
                                style={{
                                    marginLeft: "1rem",
                                    padding: "0.3rem 0.8rem",
                                    background: state.loading ? "#ccc" : "#667eea",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: state.loading ? "not-allowed" : "pointer"
                                }}
                            >
                                {state.loading ? "⏳..." : "🔄 Atualizar"}
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
                {/* 🔥 FileList agora é apenas UI - não carrega dados */}
                <FileList />
            </DashboardHeader>

            {state.loading && <LoadingMessage>⏳ Carregando dados...</LoadingMessage>}
            
            {state.error && (
                <ErrorMessage>
                    ❌ {state.error}
                    <br />
                    <small>Verifique se o backend está rodando</small>
                </ErrorMessage>
            )}

            {/* RENDERIZAÇÃO DOS COMPONENTES */}
            {!state.loading && !state.error && state.patientData.length > 0 && (
                <>
                    <ChartSection>
                        <VitalChart />
                    </ChartSection>
                    
                    <DashboardGrid>
                        <TableSection>
                            <PatientTable />
                        </TableSection>
                        
                        <MapSection>
                            <MapView />
                        </MapSection>
                    </DashboardGrid>
                </>
            )}

            {!state.loading && !state.error && state.patientData.length === 0 && (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    <p>📝 Nenhum dado disponível para exibição</p>
                    <button 
                        onClick={handleRefresh}
                        style={{
                            marginTop: "1rem",
                            padding: "0.5rem 1rem",
                            background: "#667eea",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        🔄 Tentar Novamente
                    </button>
                </div>
            )}
        </DashboardContainer>
    );
}
