from fastapi import Depends, Request, HTTPException
from jose import jwt, JWTError
from dotenv import load_dotenv
import os

def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    SECRET_KEY=os.getenv("JWT_SECRET_KEY")
    ALGORITHM=os.getenv("JWT_ALGORITHM")
    if(SECRET_KEY is None or ALGORITHM is None): return HTTPException(status_code=401, detail="Token expirado")
    
    if not token:
        raise HTTPException(status_code=401, detail="No autenticado")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except:
        raise HTTPException(status_code=401, detail="Token expirado")