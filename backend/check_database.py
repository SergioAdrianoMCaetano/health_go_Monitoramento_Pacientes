import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import engine
from sqlalchemy import inspect

def check_database():
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print("📊 Tabelas no banco:", tables)
    
    if 'patient_records' in tables:
        columns = inspector.get_columns('patient_records')
        print("🔍 Colunas em patient_records:")
        for col in columns:
            print(f"  ✅ {col['name']} ({col['type']})")
    else:
        print("❌ Tabela patient_records não encontrada")

if __name__ == "__main__":
    check_database()