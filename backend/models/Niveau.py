from sqlalchemy import Column, String, Integer
from pydantic import BaseModel


from db.database import Base

class Niveau(Base):
    __tablename__ = "niveau"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)

class NiveauRequest(BaseModel):
    nom:str