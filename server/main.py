from fastapi.security import OAuth2PasswordBearer
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from database import Base, engine

load_dotenv()


app = FastAPI()

# cors = {
#     "origin": os.getenv("CORS_ORIGIN", "http://localhost:5173"),
#     "methods": os.getenv("CORS_METHODS", "GET,POST,PATCH,PUT,DELETE").split(","),
#     "headers": os.getenv("CORS_HEADERS", "*").split(","),
# }


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # permite todos los métodos
    allow_headers=["*"],  # permite todos los headers
)

Base.metadata.create_all(bind=engine)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

from app.Users.routes import routerUser
from app.Stripe.routes import routerStripe
from app.Tasks.routes import routerTask


app.include_router(routerUser)
app.include_router(routerStripe)
app.include_router(routerTask)
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)
