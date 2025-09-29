from sqlalchemy import Column, Integer, String, Float, DateTime
from app.db.base import Base


class PatientRecord(Base):
    __tablename__ = "patient_records"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String)
    patient_name = Column(String)
    patient_cpf = Column(String)
    timestamp = Column(DateTime)
    heart_rate = Column(Float)
    spo2 = Column(Float)
    bp_sys = Column(Float)
    bp_dia = Column(Float)
    temperature = Column(Float)
    resp_rate = Column(Float)
    status = Column(String)
    source_file = Column(String)
