from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.database import Base

class Periode(Base):
    __tablename__ = "periodes"

    id = Column(Integer, primary_key=True, index=True)
    date_debut = Column(String)
    date_fin = Column(String)
    evaluations = relationship("Evaluation", back_populates="periode")

class PeriodeRequest(BaseModel):
    date_debut:str
    date_fin:str