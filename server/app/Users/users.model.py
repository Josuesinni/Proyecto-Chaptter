from pydantic import BaseModel

#BaseModel ayuda a validar los datos entrantes y los formatea automaticamente a los tipos declarados
class UserModel(BaseModel):
    id:int
    username:str
    password:str
    email:str
    is_premium:bool
