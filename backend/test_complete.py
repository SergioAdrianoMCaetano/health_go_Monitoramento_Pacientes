# backend/test_complete.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import SessionLocal
from app.models.patient_models import PatientRecord

def test_database():
    session = SessionLocal()
    try:
        # Tentar inserir um registro de teste
        test_record = PatientRecord(
            patient_id="TEST001",
            patient_name="Paciente Teste",
            patient_cpf="111.222.333-44",
            heart_rate=80.0,
            spo2=98.0,
            bp_sys=120.0,
            bp_dia=80.0,
            temperature=36.5,
            resp_rate=16.0,
            status="NORMAL",
            source_file="test.csv"
        )
        
        session.add(test_record)
        session.commit()
        print("✅ Registro de teste inserido com sucesso!")
        
        # Verificar se consegue buscar
        records = session.query(PatientRecord).all()
        print(f"✅ Total de registros: {len(records)}")
        
        if records:
            last_record = records[-1]
            print("📊 Último registro:")
            print(f"  Nome: {last_record.patient_name}")
            print(f"  HR: {last_record.heart_rate}")
            print(f"  SpO2: {last_record.spo2}")
            print(f"  Status: {last_record.status}")
            
    except Exception as e:
        print(f"❌ Erro no teste: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    test_database()