# backend/fix_database.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def fix_database():
    print("🔧 Corrigindo estrutura do banco de dados...")
    
    # Importar DEPOIS de adicionar ao path
    from app.db.database import engine
    from app.db.base import Base
    from app.models.patient_models import PatientRecord
    
    # 1. Deletar tabela existente
    try:
        Base.metadata.drop_all(bind=engine)
        print("✅ Tabela antiga removida")
    except Exception as e:
        print("ℹ️  Nenhuma tabela para remover")
    
    # 2. Criar nova tabela com estrutura correta
    Base.metadata.create_all(bind=engine)
    print("✅ Nova tabela criada com estrutura atual")
    
    # 3. Verificar a estrutura criada
    from sqlalchemy import inspect
    inspector = inspect(engine)
    columns = inspector.get_columns('patient_records')
    
    print("📋 ESTRUTURA FINAL da tabela patient_records:")
    expected_columns = [
        'id', 'patient_id', 'patient_name', 'patient_cpf', 'timestamp',
        'heart_rate', 'spo2', 'bp_sys', 'bp_dia', 'temperature', 
        'resp_rate', 'status', 'source_file'
    ]
    
    for column in columns:
        status = "✅" if column['name'] in expected_columns else "❌"
        print(f"  {status} {column['name']} ({column['type']})")
    
    # Verificar colunas faltantes
    created_columns = [col['name'] for col in columns]
    missing_columns = [col for col in expected_columns if col not in created_columns]
    
    if missing_columns:
        print("❌ COLUNAS FALTANTES:")
        for col in missing_columns:
            print(f"  - {col}")
    else:
        print("🎉 TODAS as colunas foram criadas corretamente!")

if __name__ == "__main__":
    fix_database()