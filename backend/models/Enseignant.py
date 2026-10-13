from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from db.database import Base
from sqlalchemy.orm import relationship


class Enseignant(Base):
    __tablename__ = "enseignants"
    specialite = Column(String)
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    sexe = Column(String)
    mot_de_passe = Column(String)
    email = Column(String, unique=True)
    evaluations = relationship('Evaluation', back_populates='enseignant')

class EnseignantRequest(BaseModel):

    nom: str
    prenom: str
    specialite: str
    sexe: str
    adresse: str
    email:str
    mot_de_passe:str
