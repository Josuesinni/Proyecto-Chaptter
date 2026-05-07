import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

env=load_dotenv()
app = FastAPI()

# Configuración CORS para permitir peticiones desde React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL del frontend
    allow_credentials=True,
    allow_methods=["GET,POST,PATCH,PUT,DELETE"],
    allow_headers=["*"],
)

# Ruta de ejemplo
@app.get("/api/hello")
def read_root():
    BASE_URL=os.getenv("BASE_URL")
    return {"message": "Hola desde FastAPI 🚀","otro":BASE_URL}

if __name__ == "__main__":
    
    uvicorn.run(app,host="localhost",port=8000)