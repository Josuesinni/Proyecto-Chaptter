from pydantic import BaseModel
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Date
#from sqlalchemy.orm import relationship
from database import Base
class Task(Base):
    __tablename__="Task"
    id=Column(Integer,primary_key=True,index=True)
    idUser=Column(Integer, ForeignKey("User.id"), nullable=False)
    fecha=Column(String,nullable=False,unique=True)
    actividad=Column(String,nullable=False)
    estatus=Column(Boolean,nullable=False,default=False)
    #userTask = relationship("User", back_populates="Task")
