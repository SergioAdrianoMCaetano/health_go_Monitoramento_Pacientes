import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from app.models.patient_models import PatientRecord
    print("✅ Modelo carregado com sucesso!")
    print("📋 Colunas do modelo PatientRecord:")
    
    # Verificar atributos da classe
    import inspect
    columns = [attr for attr in dir(PatientRecord) if not attr.startswith('_')]
    for column in columns:
        print(f"  - {column}")
        
except ImportError as e:
    print(f"❌ Erro ao importar modelo: {e}")