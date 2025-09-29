// import { useEffect, useState } from "react";
// import { FileListContainer, FileItem } from "./FileList.style";
// import axios from "axios";

// export default function FileList() {
//     const [files, setFiles] = useState<string[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios
//         .get("http://localhost:8000/api/upload/files")
//         .then((res) => setFiles(res.data.files))
//         .catch((err) => console.error("Erro ao buscar arquivos:", err))
//         .finally(() => setLoading(false));
//     }, []);

//     return (
//         <FileListContainer>
//             <h2>Arquivos disponíveis</h2>
//             {loading && <p>Carregando...</p>}

//             {!loading && files.length > 0 && (
//             <ul>
//                 {files.map((file) => (
//                 <FileItem key={file}>{file}</FileItem>
//                 ))}
//             </ul>
//             )}

//             {!loading && files.length === 0 && (
//             <p>Nenhum arquivo encontrado.</p>
//             )}
//         </FileListContainer>
//     );
// }


import { useEffect, useState } from "react";
import { useApp } from "../../hooks/useApp";
import { api } from "../../services/api";
import { 
    EmptyMessage, 
    FileButton, 
    FileItem, 
    FileListContainer, 
    FileListHeader, 
    LoadingMessage
} from "./FileList.style";

interface FileListProps {
    onFileSelect: (filename: string) => void;
}

export default function FileList({ onFileSelect }: FileListProps) {
    const { state, setSelectedFile, setUploadedFiles } = useApp();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //Carregar lista de arquivos da API
    useEffect(() => {
        const loadFiles = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("📁 Buscando lista de arquivos...");
                const response = await api.get("/upload/files");
                const files = response.data.files || [];

                console.log("✅ Arquivos encontrados:", files);
                setUploadedFiles(files);
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : "Erro ao carregar os arquivos";
                
                setError(errorMsg);
                console.error("❌ Erro ao buscar arquivos:", err);
            } finally {
                setLoading(false);
            }
        };

        loadFiles();
    }, [setUploadedFiles]);


    const handleFileClick = (filename: string) => {
        console.log("📄 Arquivo selecionado:", filename);
        setSelectedFile(filename);
        onFileSelect(filename);
    };

    const handleShowAll = () => {
        console.log("📁 Mostrando todos os arquivos");
        setSelectedFile(null);
        onFileSelect("");
    };

    if (loading) {
        return (
            <FileListContainer>
                <FileListHeader>Arquivos CSV</FileListHeader>
                <LoadingMessage>⏳ Carregando arquivos...</LoadingMessage>
            </FileListContainer>
        );
    }

    if (error) {
        return (
            <FileListContainer>
                <FileListHeader>Arquivos CSV</FileListHeader>
                <EmptyMessage error>
                    ❌ Erro: {error}
                    <br />
                    <small>Verifique se o backend está rodando na porta 8000</small>
                </EmptyMessage>
            </FileListContainer>
        );
    }

    return (
        <FileListContainer>
            <FileListHeader>
                📂 Arquivos ({state.uploadedFiles.length})
            </FileListHeader>

            {/*Botão Todos os Arquivos*/}
            <FileItem>
                <FileButton
                    onClick={handleShowAll}
                    active={!state.selectedFile}
                    title="Mostrar todos os arquivos"
                >
                    📊 Todos os Arquivos
                </FileButton>
            </FileItem>

            {/*Lista de arquivos*/}
            {state.uploadedFiles.length > 0 ? (
                state.uploadedFiles.map((filename, index) => (
                    <FileItem key={`${filename}-${index}`}>
                        <FileButton 
                            onClick={() => handleFileClick(filename)}
                            active={state.selectedFile === filename}
                            title={`Visualizar dados de ${filename}`}
                        >
                            📄 {filename}
                        </FileButton>
                    </FileItem>
                ))
            ) : (
                <EmptyMessage>
                    📝 Nenhum arquivo CSV encontrado
                    <br />
                    <small>Faça upload de um arquivo na página inicial</small>
                </EmptyMessage>
            )}
        </FileListContainer>
    );
};