from pydantic import BaseModel
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, TIMESTAMP, func
from database import Base
from sqlalchemy.orm import relationship

class UserLogs(Base):
    __tablename__="UserLogs"
    id=Column(Integer,primary_key=True,index=True)
    idUser=Column(String, ForeignKey("User.id"), nullable=False)
    action=Column(Integer,nullable=False)
    createdIn=Column(TIMESTAMP,nullable=False,server_default=func.now())
    user = relationship("User", back_populates="UserLogs")