from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.patients import router as patients_router
from app.api.upload import router as upload_router

app = FastAPI(title="HealthGo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients_router, prefix="/api/patients", tags=["Patients"])
app.include_router(upload_router, prefix="/api/upload", tags=["Upload"])
