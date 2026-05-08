from pydantic import BaseModel

class TaskSchema(BaseModel):
    id: int
    idUser: int
    fecha:str
    actividad: str
    estatus: bool

    class Config:
        from_attributes = True