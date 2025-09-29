from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
from app.services.csv_service import process_csv_file
from app.services.patient_service import save_to_database

router = APIRouter()

@router.get("/files")
def list_uploaded_files():
    try:
        folder = "data"
        os.makedirs(folder, exist_ok=True)
        files = [f for f in os.listdir(folder) if f.endswith(".csv")]
        return {"files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/csv")
async def upload_csv(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith(".csv"):
            raise HTTPException(status_code=400, detail="Apenas arquivos CSV são permitidos")

        os.makedirs("data", exist_ok=True)
        file_path = f"data/{file.filename}"

        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        df = process_csv_file(file_path)
        records_saved = save_to_database(df)

        return JSONResponse({
            "message": "Arquivo processado com sucesso",
            "filename": file.filename,
            "records_processed": len(df),
            "records_saved": records_saved,
            "saved_path": file_path,
            "data": df.to_dict(orient="records")  # Retorna os dados para visualização imediata
        })

    except Exception as e:
        if "file_path" in locals() and os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=400, detail=str(e))
