from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Boolean
from database import Base
#BaseModel ayuda a validar los datos entrantes y los formatea automaticamente a los tipos declarados
class User(Base):
    __tablename__="User"
    id=Column(Integer,primary_key=True,index=True)
    username=Column(String,nullable=False,unique=True)
    password=Column(String,nullable=False)
    email=Column(String,nullable=False)
    is_premium=Column(Boolean,nullable=False,default=False)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"