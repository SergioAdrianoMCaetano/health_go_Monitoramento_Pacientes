export interface PatientRecord {
    timestamp: string;
    patient_id: string;
    patient_name: string;
    patient_cpf: string;
    heart_rate: number;
    spo2: number;
    bp_sys: number;
    bp_dia: number;
    temperature: number;
    resp_rate: number;
    status: "NORMAL" | "ALERTA";
    source_file?: string; 
}
