from sqlalchemy import Column, Integer, String

from db.database import Base
from pydantic import BaseModel

class UE(Base):
    __tablename__ = "ue"

    id = Column(Integer, primary_key=True, index=True)
    intitule = Column(String)

class UeRequest(BaseModel):
    intitule: str