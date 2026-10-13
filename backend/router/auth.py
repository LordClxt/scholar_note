from fastapi import APIRouter, Depends, Body
from dependencies.db import db_dependency, getDB
from sqlalchemy import select, update
from models.Enseignant import Enseignant, EnseignantRequest
from models.Admin import Admin, AdminRequest
from models.Etudiant import Etudiant, EtudiantRequest
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from dependencies.auth import bcrypt, authenticate, create_token
from typing import Annotated
from datetime import timedelta
from schema.AuthSchema import AuthRequest


router = APIRouter(
    prefix="/auth",
    tags=["Authentification"]
)


@router.get('/')
async def getAllEnseignant(db=Depends(getDB)):
    result =  await db.execute(select(Enseignant))
    enseignants = result.scalars().all()
    return enseignants


@router.post('/etudiant/inscription')
async def inscription(request_data:EtudiantRequest, db:AsyncSession=Depends(getDB)):
    etudiant_model = Etudiant(
        matricule=request_data.matricule,
        nom=request_data.nom,
        prenom=request_data.prenom,
        sexe=request_data.sexe,
        adresse=request_data.adresse,
        id_filiere=request_data.id_filiere,
        email=request_data.email,
        mot_de_passe=bcrypt.hash(request_data.mot_de_passe)
    )

    db.add(etudiant_model)
    await db.commit()
    etudiant = await db.refresh(etudiant_model)
    return etudiant

# Connexion etudiant

@router.post('/Token')
async def getAccessToken(request_data: AuthRequest, db = Depends(getDB)):
    user = await authenticate(request_data.login, request_data.mot_de_passe, request_data.type_user, db)
    token = create_token(request_data.login, user.id, request_data.type_user, timedelta(hours=1))
    return {
        'access_token':token,
        'type':'bearer',
        'user':user
    }

@router.post('/enseignant/inscription')
async def inscription(request_data:EnseignantRequest, db:AsyncSession=Depends(getDB)):
    enseignant_model = Enseignant(
        nom=request_data.nom,
        prenom=request_data.prenom,
        sexe=request_data.sexe,
        adresse=request_data.adresse,
        email=request_data.email,
        mot_de_passe=bcrypt.hash(request_data.mot_de_passe),
        specialite=request_data.specialite
    )
    db.add(enseignant_model)
    await db.commit()
    enseignant = await db.refresh(enseignant_model)
    return enseignant

# Inscription administrateur
@router.post('/admin/inscription')
async def inscription(request_data:AdminRequest, db:AsyncSession=Depends(getDB)):
    enseignant_model = Admin(
        nom=request_data.nom,
        prenom=request_data.prenom,
        sexe=request_data.sexe,
        adresse=request_data.adresse,
        email=request_data.email,
        mot_de_passe=bcrypt.hash(request_data.mot_de_passe),
    )
    db.add(enseignant_model)
    await db.commit()
    enseignant = await db.refresh(enseignant_model)
    return enseignant