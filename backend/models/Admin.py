from sqlalchemy import Column, Integer, String
from db.database import Base
from pydantic import BaseModel


class Admin(Base):

    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    sexe = Column(String)
    mot_de_passe = Column(String)
    email = Column(String, unique=True)

class AdminRequest(BaseModel):
    nom: str
    prenom: str
    adresse: str
    sexe:str
    email:str
    mot_de_passe:str
