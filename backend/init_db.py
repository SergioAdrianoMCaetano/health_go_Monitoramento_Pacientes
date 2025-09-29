# backend/init_db.py
from app.db.database import Base, engine
from app.models.patient_models import PatientRecord

Base.metadata.create_all(bind=engine)
print("Banco de dados inicializado com sucesso.")
