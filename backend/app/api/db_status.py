from fastapi import APIRouter
from sqlalchemy import inspect
from app.db.database import engine

router = APIRouter()

@router.get("/status")
def check_database_status():
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    if "patient_records" in tables:
        return {"status": "ok", "message": "Banco de dados está pronto"}
    else:
        return {"status": "message", "message": "Tabela 'patient_records' não encontrada"} 