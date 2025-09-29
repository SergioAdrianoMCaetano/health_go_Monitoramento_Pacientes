import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import engine
from app.db.base import Base
from app.models.patient_models import PatientRecord

# Criar todas as tabelas
Base.metadata.create_all(bind=engine)
print("✅ Banco de dados recriado com sucesso!")
print("✅ Tabela 'patient_records' criada com todas as colunas incluindo patient_cpf")