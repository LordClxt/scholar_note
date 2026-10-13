from passlib.context import CryptContext
from models.Enseignant import Enseignant
from models.Admin import Admin
from models.Etudiant import Etudiant
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime, timezone
from jose import jwt, JWTError
from typing import Annotated


bcrypt = CryptContext(schemes=['bcrypt'], deprecated='auto')
SECRET_KEY = "8ee72bfcdeeeb74d6ed60793540246ac7aaa993769b387e2cab16ee652a81eec"
ALGO = "HS256"
oauth_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')

def get_current_user(token: Annotated[str, Depends(oauth_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGO)
        login = payload.get('login')
        id = payload.get('id')
        role = payload.get('role')
        
        if login is None:
            raise HTTPException(status_code=401, detail="Vous n'etes pas autoriser a acceder a cette route")

        return {'login':login, "id":id, "role":role}
    except JWTError:
        raise HTTPException(status_code=401, detail="Erreur jwt")
        


def create_token(login, id, role, expire: timedelta):
    encode = {
        'login':login,
        'id':id,
        'role':role
    }
    
    expires = datetime.now(timezone.utc) + expire
    encode.update({'exp':expires})
    
    return jwt.encode(encode, SECRET_KEY, ALGO)


async def authenticate(login, password,type, db):
    user = None
    if type == 'etudiant':
        resultat = await db.execute(select(Etudiant)
                            .where(or_(Etudiant.email == login, Etudiant.matricule == login))
                                        )
    if type ==  "enseignant":
        resultat = await db.execute(select(Enseignant)
                            .where(Enseignant.email == login)
                                        )
    if type == "admin":
        resultat = await db.execute(select(Admin)
                            .where(Admin.email == login)
                                        )
        
    user = resultat.scalars().first()
    if user is None:
        raise HTTPException(
                            status_code=404, 
                            detail="Matricule ou Email incorrecte" if type == "etudiant" else "Email incorrecte"
                            )
    if not bcrypt.verify(password, user.mot_de_passe):
        raise HTTPException(status_code=404, detail="Mot de passe incorrecte")
    
    return user

user_dependency = Annotated[dict, Depends(get_current_user)]