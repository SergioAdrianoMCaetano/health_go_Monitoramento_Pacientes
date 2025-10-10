import { useMemo } from "react";
import Plot from "react-plotly.js";
import { useApp } from "../../hooks/useApp";
import { ChartContainer } from "./VitalChart.styles";

export function VitalChart() {
    const { state } = useApp();

    // Dados para o gráfico
    const chartData = useMemo(() => [{
        x: state.patientData.map(d => d.timestamp),
        y: state.patientData.map(d => d.heart_rate),
        type: "scatter" as const,
        mode: "lines+markers" as const,
        name: "Frequência Cardíaca",
        line: { color: "#2ecc71" },
        marker: { color: "#27ae60", size: 4 }
    }], [state.patientData]);

    // Layout do gráfico
    const layout = useMemo(() => ({
        title: {
            text: "Frequência Cardíaca ao Longo do Tempo",
            font: { family: "Roboto, sans-serif", size: 16, color: "#2d3748" }
        },
        xaxis: {
            title: {
                text: "Tempo",
                font: { family: "Roboto, sans-serif", size: 12, color: "#4a5568" }
            },
            gridcolor: '#f1f5f9',
            showgrid: true
        },
        yaxis: {
            title: {
                text: "Frequência Cardíaca (bpm)",
                font: { family: "Roboto, sans-serif", size: 12, color: "#4a5568" }
            },
            gridcolor: '#f1f5f9',
            showgrid: true
        },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#f8fafc',
        font: { family: "Roboto, sans-serif", color: "#4a5568" },
        margin: { t: 50, r: 50, b: 50, l: 50 },
        showlegend: true
    }), []);

    const config = {
        displayModeBar: true,
        displaylogo: false,
        responsive: true
    };

    return (
        <ChartContainer>
            <div style={{ 
                padding: "0.5rem 1rem", 
                backgroundColor: "#f0f9ff", 
                borderRadius: "6px",
                marginBottom: "1rem",
                border: "1px solid #bae6fd"
            }}>
                <strong>📊 Frequência Cardíaca - {state.patientData[0]?.patient_name || "Paciente"}</strong>
            </div>
            
            {state.patientData.length > 0 ? (
                <Plot 
                    data={chartData}
                    layout={layout}
                    config={config}
                    style={{ width: "100%", height: "400px" }}
                />
            ) : (
                <div style={{ 
                    textAlign: "center", 
                    padding: "2rem",
                    color: "#718096",
                    fontStyle: "italic"
                }}>
                    📊 Nenhum dado disponível para o gráfico
                </div>
            )}
        </ChartContainer>
    );
}




// import { useEffect, useState } from "react";
// import Plot from "react-plotly.js";
// import { ChartContainer } from "./VitalChart.styles";
// import { api } from "../../services/api";
// import PatientSelector from "../PatientSelector/PatientSelector";
// import type { PatientRecord } from "../../types/patient";

// interface VitalChartProps {
//     refresh: boolean;
// }

// export default function VitalChart({ refresh }: VitalChartProps) {
//     const [data, setData] = useState<PatientRecord[]>([]);
//     const [pacienteSelecionado, setPacienteSelecionado] = useState("");

//     useEffect(() => {
//         api
//         .get("/patients/records")
//         .then((res) => setData(res.data))
//         .catch((err) => console.error("Erro ao buscar dados:", err));
//     }, [refresh]);

//     const pacientes = [...new Set(data.map((d) => d.patient_name).filter(Boolean))];

//     const dadosFiltrados = pacienteSelecionado
//         ? data.filter((d) => d.patient_name === pacienteSelecionado)
//         : data;

//     const timestamps = dadosFiltrados.map((d) => d.timestamp);
//     const hr = dadosFiltrados.map((d) => d.heart_rate);

//     return (
//         <ChartContainer>
//         <PatientSelector
//             pacientes={pacientes}
//             selected={pacienteSelecionado}
//             onSelect={setPacienteSelecionado}
//         />

//         <Plot
//             data={[
//             {
//                 x: timestamps,
//                 y: hr,
//                 type: "scatter",
//                 mode: "lines+markers",
//                 name: "HR",
//                 line: { color: "green" },
//                 marker: { color: "green" },
//             },
//             ]}
//             layout={{
//             title: { text: "Frequência Cardíaca ao Longo do Tempo" },
//             }}
//             style={{ width: "100%" }}
//         />
//         </ChartContainer>
//     );
// }
