from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.patients import router as patients_router
from app.api.upload import router as upload_router
from app.api.db_status import router as db_status_router
from app.db.database import Base, engine
from app.models.patient_models import PatientRecord

app = FastAPI(title="HealthGo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <html>
        <head>
            <title>HealthGo API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    text-align: center;
                    padding: 50px;
                }
                h1 {
                    color: #007bff;
                }
                a {
                    text-decoration: none;
                    color: #333;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <h1>👋 Bem-vindo à API HealthGo</h1>
            <p>Esta é a API para monitoramento de pacientes em tempo real.</p>
            <p>Acesse a <a href="/docs">documentação Swagger</a> para testar os endpoints.</p>
        </body>
    </html>
    """

app.include_router(patients_router, prefix="/api/patients", tags=["Patients"])
app.include_router(upload_router, prefix="/api/upload", tags=["Upload"])
app.include_router(db_status_router, prefix="/api/db", tags=["Database"])

# ✅ Adicionar para execução direta
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)