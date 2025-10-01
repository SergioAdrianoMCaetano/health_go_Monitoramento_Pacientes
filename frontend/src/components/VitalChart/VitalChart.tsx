// src/components/VitalChart/VitalChart.tsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { ChartContainer } from "./VitalChart.styles";
import { api } from "../../services/api";
import PatientSelector from "../PatientSelector/PatientSelector";
import type { PatientRecord } from "../../types/patient";

interface VitalChartProps {
    refresh: boolean;
}

export default function VitalChart({ refresh }: VitalChartProps) {
    const [data, setData] = useState<PatientRecord[]>([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState("");

    useEffect(() => {
        api
        .get("/patients/records")
        .then((res) => setData(res.data))
        .catch((err) => console.error("Erro ao buscar dados:", err));
    }, [refresh]);

    const pacientes = [...new Set(data.map((d) => d.patient_name).filter(Boolean))];

    const dadosFiltrados = pacienteSelecionado
        ? data.filter((d) => d.patient_name === pacienteSelecionado)
        : data;

    const timestamps = dadosFiltrados.map((d) => d.timestamp);
    const hr = dadosFiltrados.map((d) => d.heart_rate);

    return (
        <ChartContainer>
        <PatientSelector
            pacientes={pacientes}
            selected={pacienteSelecionado}
            onSelect={setPacienteSelecionado}
        />

        <Plot
            data={[
            {
                x: timestamps,
                y: hr,
                type: "scatter",
                mode: "lines+markers",
                name: "HR",
                line: { color: "green" },
                marker: { color: "green" },
            },
            ]}
            layout={{
            title: { text: "Frequência Cardíaca ao Longo do Tempo" },
            }}
            style={{ width: "100%" }}
        />
        </ChartContainer>
    );
}
