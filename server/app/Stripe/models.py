from pydantic import BaseModel
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from database import Base
from sqlalchemy.orm import relationship

class SuscriptionUser(Base):
    __tablename__="SuscriptionUser"
    id=Column(Integer,primary_key=True,index=True)
    idUser=Column(String, ForeignKey("User.id"), nullable=False)
    userSuscription = relationship("User", back_populates="SuscriptionUser")


