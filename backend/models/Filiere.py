from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import relationship
from db.database import Base
from pydantic import BaseModel

class Filere(Base):
    __tablename__ = "filieres"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    id_niveau = Column(Integer, ForeignKey('niveau.id'))
    

class FiliereRequest(BaseModel):
    nom:str
    id_niveau:int