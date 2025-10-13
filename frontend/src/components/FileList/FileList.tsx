// src/components/FileList/FileList.tsx
import { useApp } from "../../hooks/useApp";
import { 
    EmptyMessage, 
    FileButton, 
    FileItem, 
    FileListContainer, 
    FileListHeader
} from "./FileList.style";

// 🔥 REMOVIDA a interface - não precisa mais de onFileSelect
export default function FileList() {
    const { state, setSelectedFile } = useApp();

    const handleFileClick = (filename: string) => {
        console.log("📄 Arquivo selecionado:", filename);
        setSelectedFile(filename);
    };

    const handleShowAll = () => {
        console.log("📁 Mostrando todos os arquivos");
        setSelectedFile(null);
    };

    return (
        <FileListContainer>
            <FileListHeader>
                📂 Arquivos ({state.uploadedFiles.length})
            </FileListHeader>

            {/* Botão Todos os Arquivos */}
            <FileItem>
                <FileButton
                    onClick={handleShowAll}
                    $active={!state.selectedFile}
                    title="Mostrar todos os arquivos"
                >
                    📊 Todos os Arquivos
                </FileButton>
            </FileItem>

            {/* Lista de arquivos - APENAS UI */}
            {state.uploadedFiles.length > 0 ? (
                state.uploadedFiles.map((filename, index) => (
                    <FileItem key={`${filename}-${index}`}>
                        <FileButton 
                            onClick={() => handleFileClick(filename)}
                            $active={state.selectedFile === filename}
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
}


