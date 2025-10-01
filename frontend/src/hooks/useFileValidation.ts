import { useState } from "react";
import { csvDataSchema, csvFileSchema } from "../utils/validationSchemas";

export function useFileValidation() {
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const validateFile = async (file: File): Promise<boolean> => {
        setIsValidating(true);
        setValidationError(null);

        try {
            console.log("🔍 Validando arquivo:", file.name);

            // 1. Validação do arquivo
            await csvFileSchema.validate({
                name: file.name,
                size: file.size,
                type: file.type,
            });

            // 2. Validação do conteúdo CSV
            const text = await file.text();
            const lines = text.split("\n").filter((line: string) => line.trim());

            if (lines.length < 2) {
                throw new Error("Arquivo CSV vazio ou incompleto");
            }

            // 3. Verificação cabeçalhos ORIGINAIS do CSV
            const headers = lines[0].split(",").map((h: string) => h.trim());
            
            const requiredHeaders = [
                "timestamp", "paciente_id", "paciente_nome", "paciente_cpf", 
                "hr", "spo2", "pressao_sys", "pressao_dia", 
                "temp", "resp_freq", "status"
            ];

            const missingHeaders = requiredHeaders.filter((h: string) => !headers.includes(h));

            if (missingHeaders.length > 0) {
                throw new Error(`Cabeçalhos faltantes: ${missingHeaders.join(", ")}`);
            }

            // 4. Validação básica da primeira linha de dados
            if (lines.length > 1) {
                const firstDataLine = lines[1].split(",").map((field: string) => field.trim());
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const firstRow: any = {};
                
                headers.forEach((header: string, index: number) => {
                    firstRow[header] = firstDataLine[index] || "";
                });

                // Validar primeira linha com schema dos nomes originais
                await csvDataSchema.validate([firstRow]);
            }
            
            console.log("✅ Arquivo validado com sucesso");
            return true;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro de validação desconhecido";
            setValidationError(errorMessage);
            console.error("❌ Erro na validação:", error);
            return false;
        } finally {
            setIsValidating(false);
        }
    };

    return {
        validateFile,
        validationError,
        isValidating,
        clearError: () => setValidationError(null)
    };
}