from sqlalchemy import Column, ForeignKey, Integer, TIMESTAMP, func
from database import Base
from sqlalchemy.orm import relationship

class UserLogs(Base):
    __tablename__="UserLogs"
    id=Column(Integer,primary_key=True,index=True)
    idUser=Column(Integer, ForeignKey("User.id"), nullable=False)
    accion=Column(Integer,nullable=False)
    createdIn=Column(TIMESTAMP,nullable=False,server_default=func.now())
    #userLog = relationship("User", back_populates="UserLogs")