from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db.database import Base

class Etudiant(Base):

    __tablename__ = "etudiants"
    id = Column(Integer, primary_key=True, index=True)
    matricule = Column(String, unique=True)
    id_filiere = Column(Integer, ForeignKey('filieres.id'))
    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    sexe = Column(String)
    mot_de_passe = Column(String)
    email = Column(String, unique=True)

    evaluations = relationship('Evaluation', back_populates='etudiant')

    # filiere = relationship('Filere', back_populates='etudiants')


class EtudiantRequest(BaseModel):
    nom:str
    prenom:str
    matricule:str
    sexe:str
    adresse:str
    id_filiere:int
    email:str
    mot_de_passe:str