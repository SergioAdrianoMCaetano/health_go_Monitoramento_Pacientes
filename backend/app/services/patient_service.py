from app.db.database import SessionLocal
from app.models.patient_models import PatientRecord
import pandas as pd

def save_to_database(df: pd.DataFrame) -> int:
    session = SessionLocal()
    count = 0
    try:
        for _, row in df.iterrows():
            record = PatientRecord(
                patient_id=row.get("patient_id", "N/A"),
                patient_name=row.get("patient_name", "N/A"),
                patient_cpf=row.get("patient_cpf", "N/A"),
                timestamp=pd.to_datetime(row.get("timestamp")),
                heart_rate=row.get("heart_rate", 0.0),
                spo2=row.get("spo2", 0.0),
                bp_sys=row.get("bp_sys", 0.0),
                bp_dia=row.get("bp_dia", 0.0),
                temperature=row.get("temperature", 0.0),
                resp_rate=row.get("resp_rate", 0.0),
                status=row.get("status", "N/A"),
                source_file=row.get("source_file", "N/A"),
            )
            session.add(record)
            count += 1
        session.commit()
        print(f"Salvos {count} registros no banco")
        return count
    except Exception as e:
        session.rollback()
        print(f"Erro ao salvar no banco: {e}")
        raise e
    finally:
        session.close()

def get_all_records():
    session = SessionLocal()
    try:
        records = session.query(PatientRecord).all()
        return [
            {
                "id": r.id,
                "patient_id": r.patient_id,
                "patient_name": r.patient_name,
                "patient_cpf": r.patient_cpf,
                "timestamp": r.timestamp.isoformat() if r.timestamp else None,
                "heart_rate": r.heart_rate,
                "spo2": r.spo2,
                "bp_sys": r.bp_sys,
                "bp_dia": r.bp_dia,
                "temperature": r.temperature,
                "resp_rate": r.resp_rate,
                "status": r.status,
                "source_file": r.source_file
            }
            for r in records
        ]
    except Exception as e:
        print(f"Erro ao buscar registros: {e}")
        return []
    finally:
        session.close()