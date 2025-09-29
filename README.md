# React + TypeScript + Vite



# 🩺 HealthGo — Monitoramento de Pacientes em Tempo Real

Este projeto é uma aplicação fullstack desenvolvida com **FastAPI** no backend e **React + TypeScript** no frontend, voltada para o monitoramento de sinais vitais de pacientes. Os dados são enviados via arquivos CSV e visualizados em tempo real por meio de tabelas, gráficos e mapas interativos.

---

## 🚀 Tecnologias Utilizadas

### Backend
- FastAPI
- SQLAlchemy + SQLite
- Pandas
- Uvicorn

### Frontend
- React
- TypeScript
- Styled Components
- Axios
- Plotly.js
- React Leaflet

---

## 📦 Estrutura do Projeto

```plaintext
backend/
├── app/
│   ├── routers/
│   ├── services/
│   ├── models/
│   ├── db/
│   └── main.py

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx

```

```js

```

## 🛠️ Como Rodar o Projeto Localmente

### 🔹 Pré-requisitos

- Python 3.10+
- Node.js  18+
- Git
- Navegador moderno (Chrome, Edge, Firefox)

### 🔹 1. Clonar o repositório

bash

```
git clone https://github.com/seu-usuario/healthgo.git
cd healthgo

```

### 🔹 2. Rodar o Backend (FastAPI)

bash

```
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

```

📍 Acesse a documentação da API:`http://localhost:8000/docs`

### 🔹 3. Rodar o Frontend (React + Vite)

bash

```
cd frontend
npm install
npm run dev

```

📍 Acesse o dashboard:`http://localhost:5173`

### 🔹 4. Testar o Upload de Arquivos CSV

1. No dashboard, clique em **"Escolher arquivo"**
2. Selecione um arquivo `.csv` com dados de paciente
3. Clique em **"Enviar CSV"**
4. O sistema processa e salva os dados no banco
5. A tabela, gráfico e mapa são atualizados automaticamente

### 🔹 5. Estrutura Esperada dos Arquivos CSV

Os arquivos devem conter as seguintes colunas:

- `timestamp`
- `paciente_id`
- `paciente_nome`
- `paciente_cpf`
- `hr`
- `spo2`
- `pressao_sys`
- `pressao_dia`
- `temp`
- `res p_freq`
- `status`

> Exemplo de paciente: João Silva, PAC001

### 🔹 6. Banco de Dados

- O banco é SQLite e será criado automaticamente na pasta `backend/app/db/`
- Os dados são persistidos entre uploads
- Você pode visualizar os dados via API em `GET /api/patients`