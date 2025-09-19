import { useEffect, useState } from "react";
import { Table, Row } from "./PatientTable.style";
import { api } from "../../services/api";
import type { PatientRecord } from "../../types/patient";

interface PatientTableProps {
    refresh: boolean;
}

    export default function PatientTable({ refresh }: PatientTableProps) {
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

    return (
        <>
        <label>Selecionar paciente:</label>
        <select onChange={(e) => setPacienteSelecionado(e.target.value)} value={pacienteSelecionado}>
            <option value="">Todos</option>
            {pacientes.map((nome) => (
            <option key={nome} value={nome}>{nome}</option>
            ))}
        </select>

        <Table>
            <thead>
            <tr>
                <th>Paciente</th>
                <th>HR</th>
                <th>SPO2</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {dadosFiltrados.map((item, index) => (
                <Row key={index} alert={item.status !== "NORMAL"}>
                <td>{item.paciente_nome}</td>
                <td>{item.hr}</td>
                <td>{item.spo2}</td>
                <td>{item.status}</td>
                </Row>
            ))}
            </tbody>
        </Table>
        </>
    );
}
