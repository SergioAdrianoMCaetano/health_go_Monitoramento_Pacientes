from fastapi import APIRouter, HTTPException
from services.csv_service import combine_all_csvs
from services.patient_service import save_to_database, get_all_records

router = APIRouter()

@router.post("/save-all")
def save_all_csvs():
    try:
        df = combine_all_csvs()
        saved = save_to_database(df)
        return {
            "message": "Dados combinados e salvos com sucesso",
            "records_saved": saved
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/records")
def list_all_records():
    try:
        records = get_all_records()
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

