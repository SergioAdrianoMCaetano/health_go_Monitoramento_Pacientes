import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { useFileValidation } from "../../hooks/useFileValidation";
import UploadForm from "../../components/UploadForm/UploadForm";
import { HomeContainer, UploadSection, ValidationMessage, WelcomeSection } from "./HomePage.styles";

export default function HomePage() {
    const navigate = useNavigate();
    const { setValidFile, setLoading, setUploadedFiles } = useApp();
    const { validateFile, validationError, isValidating, clearError } = useFileValidation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
        clearError();
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Por favor, selecione um arquivo primeiro")
            return ;
        }

        setLoading(true);

        try {
            console.log("🚀 Iniciando upload e validação...");

            //1.Validar arquivo
            const isValid = await validateFile(selectedFile);

            if (!isValid) {
                console.error("❌ Validação falhou");
                return;
            }

            //2.Fazer upload real para a API
            const formData = new FormData();
            formData.append("file", selectedFile);

            console.log("📤 Fazendo upload para a API...");
            const response = await fetch("http://localhost:8000/api/upload/csv", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Erro no upload: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("✅ Upload realizado com sucesso:", result);

            //3.Buscar lista atualizada de arquivos
            const filesResponse = await fetch ("http://localhost:8000/api/upload/files");

            if (filesResponse.ok) {
                const filesData = await filesResponse.json();
                setUploadedFiles(filesData.files || []);
            }

            //4.Marcar como válido
            setValidFile(true);
            navigate("/dashboard");

        } catch (error) {
            console.error("❌ Erro no processo de upload:", error);
            const errorMessage = error instanceof Error ? error.message : "Erro durante o upload. Tente novamente.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <HomeContainer>
            <WelcomeSection>
                <h2>Bem-vindo ao HealthGo Monitor</h2>
                <p>Faça upload de arquivos CSV com dados de pacientes para iniciar a análise</p>
            </WelcomeSection>

            <UploadSection>
                <UploadForm 
                    onFileSelect={handleFileSelect}
                    onUpload={handleUpload}
                    disabled={isValidating}
                />

                {validationError && (
                    <ValidationMessage error>
                        ❌ {validationError}
                    </ValidationMessage>
                )}

                {isValidating && (
                    <ValidationMessage>
                        ⏳ Validando arquivo...
                    </ValidationMessage>
                )}

                {selectedFile && !validationError && !isValidating && (
                    <ValidationMessage success>
                        ✅ Arquivo pronto para envio: {selectedFile.name}
                    </ValidationMessage>
                )}
            </UploadSection>

            {/*Seção de instruções*/}
            <div style={{
                marginTop: "3rem",
                padding: "2rem",
                background: "#f7fafc",
                borderRadius: "10px",
                border: "2px solid #e2e8f0"
            }}>

                <h3 style={{ color: "#2d3748", marginBottom: "1rem" }}>📋 Como usar:</h3>

                <ol style={{ color: "#4a5568", lineHeight: "1.8", paddingLeft: "1.5rem" }}>
                    <li>Clique em <strong>"Escolher arquivo CSV"</strong> para selecionar um arquivo</li>
                    <li>O sistema validará automaticamente o formato do arquivo</li>
                    <li>Clique em <strong>"Enviar e Validar CSV"</strong> para processar</li>
                    <li>Após validação, você será redirecionado para o dashboard</li>
                </ol>

                <div style={{ 
                    marginTop: "1.5rem", 
                    padding: "1rem", 
                    background: "#edf2f7", 
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                }}>
                    <strong>📝 Formato esperado do CSV:</strong>
                    <br />• Colunas: timestamp, paciente_id, paciente_nome, paciente_cpf, hr, spo2, pressao_sys, pressao_dia, temp, resp_freq, status
                    <br />• Status: <code>NORMAL</code> ou <code>ALERTA</code>
                    <br />• Exemplo: <code>20:31:32.81,PAC001,João Silva,123.456.789-09,79.0,95.8,150.0,96.0,36.7,15.53,NORMAL</code>
                </div>   
            </div>
        </HomeContainer>
    );
};