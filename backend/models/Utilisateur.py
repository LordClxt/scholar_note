from sqlalchemy import String, Column, Integer


# from db.database import Base


class Utilisateur():
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    sexe = Column(String)
    