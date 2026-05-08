from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import Request, APIRouter, Response, Cookie

from database import SessionLocal
from app.Functions.secure_passwords import hash_password,verify_password
from app.middleware.auth import get_current_user
from .models import User
from sqlalchemy import select

routerUser = APIRouter()

@routerUser.post("/user", status_code=201)
async def crearUsuario(request: Request):
    payload = await request.json()
    password=payload["password"]
    username=payload["user"]
    email=payload["email"]
    hashed_password = hash_password(password)
    db= SessionLocal()
    try:
        db.begin()
        nuevoUsuario=User(username=username,password=hashed_password,email=email)
        db.add(nuevoUsuario)
        db.commit()
        db.close()
        return {"success": True}
    except:
        db.rollback()
        return {"success": False}

from jose import jwt, JWTError
from dotenv import load_dotenv
import os

load_dotenv()

@routerUser.post("/user/login", status_code=200)
async def login(request:Request,response: Response):
    payload = await request.json()
    email=payload["email"]
    password=payload["password"]
    session= SessionLocal()
    user=session.query(User).filter(User.email == email).first()
    if not user:
        return {"error": "Usuario no encontrado"}
    verificacion = verify_password(password, user.password) # type: ignore
    if(verificacion):
        data={
            "usuario":user.username,
            "email":email,
            "is_premium":user.is_premium
        }
        print(data)
        accessToken=crearTokenJWT(data)
        if(accessToken==False):return
        print(accessToken)
        response.set_cookie( 
            key="access_token",
            value=accessToken,
            max_age=3600,
            httponly=True,
            secure=False,
            samesite="lax"
        )
        return {"success": True, "user":data}
    else:
        return {"success": False}

@routerUser.post("/user/logout", status_code=200)
async def logout(request:Request,response:Response):
    response.delete_cookie(key="access_token")
    return {"success": True}

@routerUser.get("/user/me", status_code=200)
async def isLogged(request:Request, response:Response):
    data_decoded=get_current_user(request=request)
    db= SessionLocal()
    db.begin()
    if(isinstance(data_decoded,dict)):
        db_user = db.query(User).filter(User.email == data_decoded["email"]).first()
        if db_user:
            data = {"usuario":data_decoded["usuario"],"email":data_decoded["email"],"is_premium":db_user.is_premium}
            accessToken=crearTokenJWT(data)
            print(accessToken)
            if(accessToken==False):return
            response.set_cookie(
                key="access_token",
                value=accessToken,
                max_age=3600,
                httponly=True,
                secure=False,
                samesite="lax"
            )
            print(data)
            return {"success": True, "user":data}
    else:
        return {"success": True, "user":data_decoded}


def crearTokenJWT(data:dict):
    SECRET_KEY=os.getenv("JWT_SECRET_KEY")
    ALGORITHM=os.getenv("JWT_ALGORITHM")
    if(SECRET_KEY is None or ALGORITHM is None): return False
    to_encode = data
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)