from sqlalchemy import Column, Integer, String, Float, DateTime
from app.db.database import Base

class PatientRecord(Base):
    __tablename__ = "patient_records"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String)
    timestamp = Column(DateTime)
    heart_rate = Column(Float)
    blood_pressure = Column(String)
    status = Column(String)
    source_file = Column(String)
