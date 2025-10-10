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
    
    // 🔥 CONTROLE CENTRALIZADO DE ESTADO
    const hasLoadedPatients = useRef(false);
    const hasLoadedFiles = useRef(false);
    const isFetching = useRef(false);

    // 🔥 FUNÇÃO ÚNICA PARA CARREGAR ARQUIVOS
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























// import axios from "axios";
// import { useEffect, useState, useRef } from "react"; // ← Adicionei useRef
// import { useNavigate } from "react-router-dom";

// import { useApp } from "../../hooks/useApp";
// import { api } from "../../services/api";

// import type { PatientRecord } from "../../types/patient";

// import { PatientTable } from "../../components/PatientTable/PatientTable";
// import { VitalChart } from "../../components/VitalChart/VitalChart";
// import { MapView } from "../../components/MapView/MapView";
// import FileList from "../../components/FileList/FileList";
// import { 
//     ChartSection,
//     DashboardContainer,
//     DashboardGrid,
//     DashboardHeader,
//     ErrorMessage,
//     FileInfo,
//     LoadingMessage,
//     MapSection,
//     TableSection
// } from "./DashboardPage.styles";

// export default function DashboardPage() {
//     const navigate = useNavigate();
//     const { state, setPatientData, setUploadedFiles, setLoading, setError } = useApp();
//     const [refreshTrigger, setRefreshTrigger] = useState(false);
    
//     // 🔥 CONTROLE DE CARREGAMENTO - Evita requisições duplicadas
//     const hasLoaded = useRef(false);
//     const isFetching = useRef(false);

//     // Efeito para redirecionamento
//     useEffect(() => {
//         if (!state.isValidFile && state.uploadedFiles.length === 0) {
//             console.log("⚠️ Redirecionando para home - nenhum arquivo válido");
//             navigate("/");
//         }
//     }, [state.isValidFile, state.uploadedFiles.length, navigate]);

//     // Efeito PRINCIPAL para carregar dados - CONTROLADO
//     useEffect(() => {
//         const loadData = async () => {
//             // 🔥 BLOQUEIA REQUISIÇÕES DUPLICADAS
//             if (isFetching.current || !state.isValidFile) {
//                 console.log("⏸️ Carregamento ignorado - já em andamento ou não válido");
//                 return;
//             }

//             // 🔥 MARCAR COMO CARREGANDO
//             isFetching.current = true;
//             hasLoaded.current = true;
            
//             setLoading(true);
//             setError(null);

//             try {
//                 console.log("📊 Buscando dados da API...");

//                 // 1. Buscar todos os registros da API
//                 const response = await api.get("/patients/records");
//                 const allData: PatientRecord[] = response.data;

//                 console.log("✅ Dados recebidos:", allData.length, "registros");

//                 // 2. Extrair lista de arquivos únicos
//                 const uniqueFiles = [...new Set(allData.map(item => item.source_file))]
//                     .filter((file): file is string => file !== undefined && file !== null);
                
//                 setUploadedFiles(uniqueFiles);

//                 // 3. Filtrar dados pelo arquivo selecionado (se houver)
//                 let filteredData = allData;
//                 if (state.selectedFile) {
//                     filteredData = allData.filter(item => item.source_file === state.selectedFile);
//                     console.log("🔍 Filtrado por arquivo:", state.selectedFile, "-", filteredData.length, "registros");
//                 }

//                 setPatientData(filteredData);

//             } catch (error) {
//                 let msg = "Erro ao carregar os dados";
//                 if (axios.isAxiosError(error)) {
//                     console.error("AxiosError:", error.message);
//                     msg = `Erro de conexão: ${error.message}`;
//                 } else {
//                     console.error("Erro desconhecido:", error);
//                     msg = error instanceof Error ? error.message : msg;
//                 }
//                 setError(msg);
//             } finally {
//                 setLoading(false);
//                 // 🔥 LIBERAR PARA PRÓXIMA REQUISIÇÃO
//                 isFetching.current = false;
//                 console.log("🏁 Carregamento finalizado");
//             }
//         };

//         //SÓ CARREGA SE: é válido E não carregou ainda OU é um refresh manual
//         const shouldLoad = state.isValidFile && (!hasLoaded.current || refreshTrigger);
        
//         if (shouldLoad) {
//             console.log("🚀 Iniciando carregamento...");
//             loadData();
//         } else {
//             console.log("⏸️ Carregamento ignorado - condições não atendidas");
//         }
//     }, [
//         state.selectedFile, 
//         state.isValidFile, 
//         state.loading,
//         refreshTrigger,
//         setError,
//         setLoading, 
//         setPatientData, 
//         setUploadedFiles
//     ]);

//     // Função de refresh manual - CONTROLADA
//     const handleRefresh = () => {
//         console.log("🔄 SOLICITAÇÃO de atualização manual...");
        
//         // 🔥 RESETA O CONTROLE PARA PERMITIR NOVO CARREGAMENTO
//         hasLoaded.current = false;
//         setRefreshTrigger(prev => !prev);
//     };

//     // 🔥 DEBUG: Log para verificar estado atual
//     useEffect(() => {
//         console.log("📊 Estado atual do Dashboard:", {
//             isValidFile: state.isValidFile,
//             loading: state.loading,
//             patientDataLength: state.patientData.length,
//             selectedFile: state.selectedFile,
//             hasLoaded: hasLoaded.current,
//             isFetching: isFetching.current
//         });
//     }, [state.isValidFile, state.loading, state.patientData.length, state.selectedFile]);

//     return (
//         <DashboardContainer>
//             <DashboardHeader>
//                 <div>
//                     <h2>📊 Dashboard de Monitoramento</h2>
//                     {state.selectedFile ? (
//                         <FileInfo>
//                             Visualizando: <strong>{state.selectedFile}</strong>
//                             <button 
//                                 onClick={handleRefresh}
//                                 disabled={state.loading} // 🔥 DESABILITA DURANTE CARREGAMENTO
//                                 style={{
//                                     marginLeft: "1rem",
//                                     padding: "0.3rem 0.8rem",
//                                     background: state.loading ? "#ccc" : "#667eea",
//                                     color: "white",
//                                     border: "none",
//                                     borderRadius: "5px",
//                                     cursor: state.loading ? "not-allowed" : "pointer"
//                                 }}
//                             >
//                                 {state.loading ? "⏳..." : "🔄 Atualizar"}
//                             </button>
//                         </FileInfo>
//                     ) : (
//                         <FileInfo>
//                             Visualizando: <strong>Todos os arquivos</strong>
//                             <span style={{ marginLeft: "1rem", color: "#718096" }}>
//                                 ({state.patientData.length} registros)
//                             </span>
//                         </FileInfo>
//                     )}
//                 </div>
//                 <FileList onFileSelect={() => {}} />
//             </DashboardHeader>

//             {state.loading && <LoadingMessage>⏳ Carregando dados...</LoadingMessage>}
            
//             {state.error && (
//                 <ErrorMessage>
//                     ❌ {state.error}
//                     <br />
//                     <small>Verifique se o backend está rodando</small>
//                 </ErrorMessage>
//             )}

//             {/* RENDERIZAÇÃO CONDICIONAL CORRIGIDA */}
//             {!state.loading && !state.error && state.patientData.length > 0 && (
//                 <>
//                     <ChartSection>
//                         <VitalChart />
//                     </ChartSection>
                    
//                     <DashboardGrid>
//                         <TableSection>
//                             <PatientTable />
//                         </TableSection>
                        
//                         <MapSection>
//                             <MapView />
//                         </MapSection>
//                     </DashboardGrid>
//                 </>
//             )}

//             {/* Estado quando não há dados */}
//             {!state.loading && !state.error && state.patientData.length === 0 && (
//                 <div style={{ textAlign: "center", padding: "2rem" }}>
//                     <p>📝 Nenhum dado disponível para exibição</p>
//                     <button 
//                         onClick={handleRefresh}
//                         style={{
//                             marginTop: "1rem",
//                             padding: "0.5rem 1rem",
//                             background: "#667eea",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "5px",
//                             cursor: "pointer"
//                         }}
//                     >
//                         🔄 Tentar Novamente
//                     </button>
//                 </div>
//             )}

//             {/* 🔥 DEBUG INFO */}
//             <div style={{
//                 marginTop: "2rem",
//                 padding: "1rem",
//                 background: "#f7fafc",
//                 borderRadius: "8px",
//                 fontSize: "0.8rem",
//                 color: "#4a5568",
//                 border: "1px dashed #e2e8f0"
//             }}>
//                 <strong>🐛 Debug Info:</strong><br/>
//                 • isValidFile: {state.isValidFile ? "✅" : "❌"}<br/>
//                 • Loading: {state.loading ? "✅" : "❌"}<br/>
//                 • Patient Data: {state.patientData.length} registros<br/>
//                 • Selected File: {state.selectedFile || "Nenhum"}<br/>
//                 • Has Loaded: {hasLoaded.current ? "✅" : "❌"}<br/>
//                 • Is Fetching: {isFetching.current ? "✅" : "❌"}
//             </div>
//         </DashboardContainer>
//     );
// }
