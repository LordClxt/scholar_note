from pydantic import BaseModel


class ProfilRequest(BaseModel):
    nom:str
    prenom:str
    email:str
    sexe:str
    type_user:str