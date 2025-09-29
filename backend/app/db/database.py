from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.models import patient_models
from app.db.base import Base



DATABASE_URL = "sqlite:///./healthgo.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()
Base.metadata.create_all(bind=engine)