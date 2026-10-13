from pydantic import BaseModel


class AuthRequest(BaseModel):
    login:str
    mot_de_passe:str
    type_user:str   
    
