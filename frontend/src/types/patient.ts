export interface PatientRecord {
    timestamp: string;
    paciente_id: string;
    paciente_nome: string;
    paciente_cpf: string;
    hr: number;
    spo2: number;
    pressao_sys: number;
    pressao_dia: number;
    temp: number;
    ["res p_freq"]: number;
    status: string;
}
