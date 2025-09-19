import Plot from "react-plotly.js";
import { ChartContainer } from "./VitalChart.styles";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { PatientRecord } from "../../types/patient";

interface VitalChartProps {
    refresh: boolean;
}

export default function VitalChart({ refresh }: VitalChartProps) {
    const [data, setData] = useState<PatientRecord[]>([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState("");

    useEffect(() => {
        api.get("/patients")
        .then((res) => setData(res.data))
        .catch((err) => console.error("Erro ao buscar dados:", err));
    }, [refresh]);

    const pacientes = [...new Set(data.map((d) => d.paciente_nome))];
    const dadosFiltrados = pacienteSelecionado
        ? data.filter((d) => d.paciente_nome === pacienteSelecionado)
        : data;

    const timestamps = dadosFiltrados.map((d) => d.timestamp);
    const hr = dadosFiltrados.map((d) => d.hr);

    return (
        <ChartContainer>
        <label>Selecionar paciente:</label>
        <select onChange={(e) => setPacienteSelecionado(e.target.value)} value={pacienteSelecionado}>
            <option value="">Todos</option>
            {pacientes.map((nome) => (
            <option key={nome} value={nome}>{nome}</option>
            ))}
        </select>

        <Plot
            data={[{ x: timestamps, y: hr, type: "scatter", mode: "lines+markers", name: "HR" }]}
            layout={{ title: { text: "Frequência Cardíaca ao Longo do Tempo" } }}
            style={{ width: "100%" }}
        />
        </ChartContainer>
    );
}
