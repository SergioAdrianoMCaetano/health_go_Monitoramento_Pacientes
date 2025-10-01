import { useRef, useState } from "react";
import { FormContainer, Button, HiddenInput, FileName } from "./UpLoadForm.styles";
import { FaUpload, FaFile } from "react-icons/fa";

interface UploadFormProps {
    onFileSelect: (file: File | null) => void;
    onUpload: () => void;
    disabled?: boolean;
}

export default function UploadForm({ onFileSelect, onUpload, disabled = false }: UploadFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        onFileSelect(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await fetch("http://localhost:8000/api/upload/csv", {
                method: "POST",
                body: formData,
            });
            
            alert("Upload realizado com sucesso!");
            onUpload();
        } catch (error) {
            console.error("❌ Erro no upload:", error);
            alert("Erro ao fazer upload. Tente novamente.");
        }
    };

    const handleChooseFile = () => {
        fileInputRef.current?.click();
    };

    return (
        <FormContainer>
            <Button 
                onClick={handleChooseFile}
                disabled={disabled}
                type="button"
            >
                <FaFile />
                {file ? "Alterar Arquivo" : "Escolher arquivo"}
            </Button>
            
            <HiddenInput
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={disabled}
            />
            
            <Button 
                onClick={handleUpload}
                disabled={!file || disabled}
                type="button"
            >
                <FaUpload />
                {disabled ? "Enviando..." : "Enviar CSV"}
            </Button>
            
            {file && <FileName>📄 {file.name}</FileName>}
        </FormContainer>
    );
}