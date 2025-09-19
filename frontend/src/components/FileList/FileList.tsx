import { useEffect, useState } from "react";
import { FileListContainer, FileItem } from "./FileList.style";
import axios from "axios";

export default function FileList() {
    const [files, setFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/upload/files")
        .then((res) => setFiles(res.data.files))
        .catch((err) => console.error("Erro ao buscar arquivos:", err))
        .finally(() => setLoading(false));
    }, []);

    return (
        <FileListContainer>
        <h2>Arquivos disponíveis</h2>
        {loading ? (
            <p>Carregando...</p>
        ) : files.length === 0 ? (
            <p>Nenhum arquivo encontrado.</p>
        ) : (
            <ul>
            {files.map((file) => (
                <FileItem key={file}>{file}</FileItem>
            ))}
            </ul>
        )}
        </FileListContainer>
    );
}
