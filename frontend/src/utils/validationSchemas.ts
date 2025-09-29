import * as yup from "yup";

export const csvFileSchema = yup.object().shape({
    name: yup.string().required("Nome do arquivo é obrigatório"),
    size: yup.number().max(5 * 1024 * 1024, "Arquivo muito grande (max 5MB)"),
    type: yup.string().matches(/text\/csv|application\/csv/, "Apenas arquivos CSV são permitidos"),
});

export const csvDataSchema = yup.array().of(
    yup.object().shape({
        timestamp: yup.string().required("Timestap é obrigatório"),
        paciente_id: yup.string().required("ID do paciente é obrigatório"),
        paciente_nome: yup.string().required("Nome do paciente é obrigatório"),
        paciente_cpf: yup.string().required("CPF do paciente é obrigatório"),
        hr: yup.number()
            .min(0, "Frequência cardíaca não pode ser negativa")
            .max(300, "Frequência cardíaca muito alta")
            .required("Frequência cardíaca é obrigatória"),
        spo2: yup.number()
            .min(0, "SpO2 não pode ser negativo")
            .max(100, "SpO2 não pode ser maior que 100%")
            .required("SpO2 é obrigatório"),
        pressao_sys: yup.number()
            .min(0, "Pressão sistólica não pode ser negativa")
            .max(300, "Pressão sistólica muito alta")
            .required("Pressão sistólica é obrigatória"),
        temp: yup.number()
            .min(30, "Temperatura muito baixa")
            .max(45, "Temperatura muito alta")
            .required("Temperatura é obrigatória"),
        resp_freq: yup.number()
            .min(0, "Frequência respiratória não pode ser negativa")
            .max(60, "Frequência respiratória muito alta")
            .required("Frequência respiratória é obrigatória"),
        status: yup.string()
            .oneOf(["NORMAL", "ALERTA"], "Status deve ser NORMAL ou ALERTA")
            .required("Status é obrigatório")
    })
);

export const mappedDataSchema = yup.array().of(
    yup.object().shape({
        timestamp: yup.string().required(),
        patient_id: yup.string().required(),
        patient_name: yup.string().required(),
        patient_cpf: yup.string().required(),
        heart_rate: yup.number().min(0).max(300).required(),
        spo2: yup.number().min(0).max(100).required(),
        bp_sys: yup.number().min(0).max(300).required(),
        bp_dia: yup.number().min(0).max(200).required(),
        temperature: yup.number().min(30).max(45).required(),
        resp_rate: yup.number().min(0).max(60).required(),
        status: yup.string().oneOf(['NORMAL', 'ALERTA']).required(),
        source_file: yup.string().optional(),
    })
    );