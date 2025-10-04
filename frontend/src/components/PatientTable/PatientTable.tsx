import { useState, useEffect } from "react";
// import { useApp } from "../../hooks/useApp";
import { api } from "../../services/api";
import { Table, Row } from "./PatientTable.style";
import type { PatientRecord } from "../../types/patient";
import PatientSelector from "../PatientSelector/PatientSelector";

interface PatientTableProps {
    refresh: boolean;
}

export default function PatientTable({ refresh }: PatientTableProps) {
    const [data, setData] = useState<PatientRecord[]>([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get("/patients/records");
            console.log("📊 Dados recebidos da API:", response.data);
            setData(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
            setError(errorMessage);
            console.error("❌ Erro ao buscar dados:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [refresh]);

    // Extrair lista de pacientes únicos
    const pacientes = [
        ...new Set(
        data
            .map((d) => d.patient_name)
            .filter(Boolean)
            .filter((name): name is string => name !== undefined && name !== null)
        ),
    ];

    // Filtrar dados baseado no paciente selecionado
    const dadosFiltrados = pacienteSelecionado
        ? data.filter((d) => d.patient_name === pacienteSelecionado)
        : data;

    // Ordenar por timestamp (mais recente primeiro)
    const dadosOrdenados = [...dadosFiltrados].sort((a, b) => {
        if (!a.timestamp || !b.timestamp) return 0;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    console.log("👥 Pacientes disponíveis:", pacientes);
    console.log("📋 Dados filtrados/ordenados:", dadosOrdenados.length);

    return (
        <>
        <PatientSelector
            pacientes={pacientes}
            selected={pacienteSelecionado}
            onSelect={setPacienteSelecionado}
        />

        {loading && <p>⏳ Carregando dados...</p>}

        {error && (
            <p style={{ color: "red" }}>
            ❌ Erro ao carregar dados: {error}
            </p>
        )}

        {!loading && !error && (
            <Table>
            <thead>
                <tr>
                <th>Paciente</th>
                <th>HR (bpm)</th>
                <th>SpO₂ (%)</th>
                <th>Status</th>
                <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {dadosOrdenados.length > 0 ? (
                dadosOrdenados.map((item, index) => (
                    <Row
                    key={`${item.patient_id}-${index}`}
                    alert={item.status === "ALERTA"}
                    >
                    <td>{item.patient_name || "N/A"}</td>
                    <td>{item.heart_rate?.toFixed(1) || "N/A"}</td>
                    <td>{item.spo2?.toFixed(1) || "N/A"}</td>
                    <td>
                        <span
                        style={{
                            color: item.status === "ALERTA" ? "#d32f2f" : "#2e7d32",
                            fontWeight: "bold",
                        }}
                        >
                        {item.status || "N/A"}
                        </span>
                    </td>
                    <td>
                        {item.timestamp
                        ? new Date(item.timestamp).toLocaleTimeString()
                        : "N/A"}
                    </td>
                    </Row>
                ))
                ) : (
                <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                    {data.length === 0
                        ? "📝 Nenhum dado disponível. Faça upload de um arquivo CSV."
                        : "🔍 Nenhum dado encontrado para o filtro aplicado."}
                    </td>
                </tr>
                )}
            </tbody>
            </Table>
        )}

        {/* Informações de debug */}
        <div
            style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#666",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            }}
        >
            <strong>ℹ️ Informações:</strong>
            <br />• Total de registros: {data.length}
            <br />• Pacientes únicos: {pacientes.length}
            <br />• Exibindo: {dadosOrdenados.length} registros
            <br />• Paciente selecionado: {pacienteSelecionado || "Todos"}
        </div>
        </>
    );
}
