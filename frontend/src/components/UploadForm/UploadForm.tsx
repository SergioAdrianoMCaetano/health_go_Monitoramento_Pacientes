// src/components/UploadForm/UploadForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { useFileValidation } from "../../hooks/useFileValidation";
import { api } from "../../services/api";

export default function UploadForm() {
  const navigate = useNavigate();
  const { setValidFile, setUploadedFiles, setLoading } = useApp();
  const { validateFile, validationError, isValidating, clearError } = useFileValidation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      clearError();
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Por favor, selecione um arquivo CSV.");
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 Iniciando validação do arquivo...");
      const isValid = await validateFile(selectedFile);

      if (!isValid) {
        console.error("❌ Validação falhou");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("📤 Enviando arquivo para a API...");
      const response = await api.post("/upload/csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.data || !response.data.success) {
        throw new Error("Resposta inesperada da API");
      }

      console.log("✅ Upload concluído:", response.data);

      // Buscar lista atualizada de arquivos
      const filesResponse = await api.get("/upload/files");
      if (filesResponse.data?.files) {
        setUploadedFiles(filesResponse.data.files);
      }

      // Marcar como válido e redirecionar
      setValidFile(true);
      navigate("/dashboard");

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Erro durante o upload.";
      alert(errorMsg);
      console.error("❌ Erro no upload:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ marginTop: "2rem" }}>
      <input type="file" accept=".csv" onChange={handleFileSelect} disabled={isValidating} />
      <button type="submit" disabled={isValidating || !selectedFile} style={{ marginLeft: "1rem" }}>
        Enviar e Validar CSV
      </button>

      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        {validationError && <p style={{ color: "red" }}>❌ {validationError}</p>}
        {isValidating && <p>⏳ Validando arquivo...</p>}
        {selectedFile && !validationError && !isValidating && (
          <p style={{ color: "green" }}>✅ Arquivo pronto para envio: {selectedFile.name}</p>
        )}
      </div>
    </form>
  );
}
