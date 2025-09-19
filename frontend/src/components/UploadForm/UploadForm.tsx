import { useState } from "react";
import { FormContainer, Button } from "./UpLoadForm.styles";
import axios from "axios";

export default function UploadForm({ onUpload }: { onUpload: () => void }) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:8000/api/upload/csv", formData);
    alert("Upload realizado com sucesso!");
    onUpload(); // dispara atualização global
  };

  return (
    <FormContainer>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload}>Enviar CSV</Button>
    </FormContainer>
  );
}
