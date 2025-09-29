# backend/recreate_database.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, Base
from app.models.patient_models import PatientRecord

def recreate_database():
    # 1. Deletar tabelas existentes
    Base.metadata.drop_all(bind=engine)
    print("✅ Tabelas antigas removidas")
    
    # 2. Criar novas tabelas com a estrutura atual
    Base.metadata.create_all(bind=engine)
    print("✅ Novas tabelas criadas com a estrutura atual")
    
    # 3. Verificar a estrutura criada
    from sqlalchemy import inspect
    inspector = inspect(engine)
    columns = inspector.get_columns('patient_records')
    
    print("📋 Colunas na tabela patient_records:")
    for column in columns:
        print(f"  - {column['name']} ({column['type']})")
    
    print("🎉 Banco recriado com sucesso!")

if __name__ == "__main__":
    recreate_database()