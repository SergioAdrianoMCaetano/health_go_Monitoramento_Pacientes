from db.database import SessionLocal
from models.patient_models import PatientRecord
import pandas as pd

def save_to_database(df: pd.DataFrame) -> int:
    session = SessionLocal()
    count = 0
    for _, row in df.iterrows():
        record = PatientRecord(
            patient_id=row.get("patient_id"),
            timestamp=pd.to_datetime(row.get("timestamp")),
            heart_rate=row.get("heart_rate"),
            blood_pressure=row.get("blood_pressure"),
            status=row.get("status"),
            source_file=row.get("source_file"),
        )
        session.add(record)
        count += 1
    session.commit()
    session.close()
    print(f"Salvando {len(df)} registros no banco...")
    return count

def get_all_records():
    session = SessionLocal()
    records = session.query(PatientRecord).all()
    session.close()
    return [r.__dict__ for r in records]
