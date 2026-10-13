from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from dependencies.db import getDB
from fastapi import APIRouter, Depends, Body
from sqlalchemy import select, update
from models.Evaluation import Evaluation
from models.Enseignant import Enseignant
from models.Periode import Periode
from models.Module import Module
from models.Etudiant import Etudiant
from models.filiere_module import Filere_Module
from models.Module import Module
from models.Admin import Admin
from sqlalchemy.orm import selectinload
from schema.ProfileRequest import ProfilRequest
from dependencies.auth import user_dependency

router = APIRouter(
    tags=['Route personnaliser']
)


@router.get('/etudiants/note/{matricule}')
async def getEtudiantNote(matricule:str, db:AsyncSession = Depends(getDB)):
    result1 = await db.execute(select(Evaluation)
                               .join(Enseignant)
                               .join(Module)
                               .join(Periode)
                               .options(
                                   selectinload(Evaluation.enseignant),
                                   selectinload(Evaluation.module),
                                   selectinload(Evaluation.periode)
                                )
                               .where(Evaluation.matricule == matricule))
    
    notes = result1.scalars().all()
    
    return notes


# Modifier le profile
@router.put('/edit-profile/{id}')
async def updateProfile(id:int,update_user:ProfilRequest, db:AsyncSession = Depends(getDB)):
    match update_user.type_user:
        case 'etudiant':
            await db.execute(update(Etudiant).
                                  where(Etudiant.id == id)
                                  .values(nom=update_user.nom, prenom=update_user.prenom,
                                          sexe=update_user.sexe, email=update_user.email))
        case 'enseignant':
            await db.execute(update(Enseignant).
                                  where(Enseignant.id == id)
                                  .values(nom=update_user.nom, prenom=update_user.prenom,
                                          sexe=update_user.sexe, email=update_user.email))
        case 'admin':
            await db.execute(update(Admin).
                                  where(Admin.id == id)
                                  .values(nom=update_user.nom, prenom=update_user.prenom,
                                          sexe=update_user.sexe, email=update_user.email))
    await db.commit()
    return update_user


# Recuperer les modules associer a une filière
@router.get('/filiere_module/module/{filiere_id}')
async def getAllModuleFiliere(filiere_id:int, db:AsyncSession = Depends(getDB)):
    response = await db.execute(select(Module)
                                .join(Filere_Module)
                                .options(
                                    selectinload(Module.filiere_module)
                                )
                                .where(Filere_Module.id_filiere == filiere_id)
                                )
    result = response.scalars().all()
    return result
    
    
# Evaluation route personnaliser
@router.get('/evaluations_perso')
async def getAllEvaluation(db:AsyncSession = Depends(getDB)):
    response = await db.execute(select(Evaluation)
                                   .join(Etudiant)
                                   .options(
                                       selectinload(Evaluation.etudiant)
                                   ))
    evaluations = response.scalars().all()
    return {
        "data":evaluations
    }
    
    
# Recuperer evaluation d'un etudiant
@router.get('/evaluations/moyenne/{matricule}')
async def getStudentEvaluation(matricule:str, db: AsyncSession = Depends(getDB)):
    
    response = await db.execute(select(Etudiant).where(Etudiant.matricule == matricule))
    select_user = response.scalars().first()
    
    response1 =await db.execute(select(Evaluation).where(Evaluation.matricule == matricule))
    evaluations = response1.scalars().all()
    
    #
    response2 =await db.execute(select(Periode))
    periodes = response2.scalars().all()
    
    response3 = await db.execute(select(Module)
                                .join(Filere_Module)
                                .options(
                                    selectinload(Module.filiere_module)
                                )
                                .where(Filere_Module.id_filiere == select_user.id_filiere)
                                )
    filiere_module = response3.scalars().all()
    
    information_generale = []
    
    for module in filiere_module:
        info_mat = {"matiere":module.libele, "credit":module.credit, "moyenne":0, "periode":""}
        # Parcourons les periodes
        for periode in periodes:
            note_mat = 0
            #Parcourons les evaluations
            nb_note = 0
            for evaluation in evaluations:
                info_mat['periode'] = f"{periode.date_debut}-{periode.date_fin}"
                if evaluation.id_periode == periode.id and evaluation.id_module == module.id:
                    note_mat += evaluation.note 
                    nb_note += 1
            if nb_note > 0:
                info_mat['moyenne'] = note_mat / nb_note
            information_generale.append(info_mat.copy())
    
    return information_generale



@router.get('/etudiants/module/{nom_module}')
async def getStudentModule(nom_module:str, db:AsyncSession = Depends(getDB)):
    
    responseModule = await db.execute(select(Module).where(Module.libele == nom_module))
    module = responseModule.scalars().first()
    
    response = await db.execute(select(Module)
                                .join(Filere_Module)
                                .options(
                                    selectinload(Module.filiere_module)
                                )
                                .where(Filere_Module.id_module == module.id)
                                )
    filiere_module = response.scalars().first()
    response2 = await db.execute(select(Etudiant))
    etudiants = response2.scalars().all()
    liste_etudiant_module = []
    for etudiant in etudiants:
        if etudiant.id_filiere == filiere_module.filiere_module[0].id_filiere:
            liste_etudiant_module.append({
                'etudiant':etudiant,
                'module':filiere_module
            })
    return liste_etudiant_module


#Recuperer un module en fonction su nom de la filiere
@router.get('/module/{nom_module}')
async def getModule(nom_module:str, db:AsyncSession = Depends(getDB)):
    response = await db.execute(select(Module).where(Module.libele == nom_module))
    return response.scalars().first()
    


#Ajouter plusieurs evaluations dans une table
@router.post('/ajouter/notes')
async def addNotes(data = Body(...), db:AsyncSession = Depends(getDB)):
    print(data)
    dt = datetime.now()
    for etudiant in data["etudiants"]:  
        if data['isCC']:
            etudiant_id = etudiant.get('id')
            note_libele = f"notecc_{etudiant_id}"
            evaluation1 = Evaluation(
                date=str(dt.date()),
                matricule=etudiant['matricule'],
                id_enseignant=int(data['id_enseignant']),
                id_module=int(data["id_module"]),
                id_periode=int(data["id_periode"]),
                type_evaluation='controle continue',
                note=int(etudiant[note_libele])
            )
            db.add(evaluation1)
        if data['isExam']:
            note_libele = f"noteex_{etudiant_id}"
            evaluation2 = Evaluation(
                date=str(dt.date()),
                matricule=etudiant['matricule'],
                id_enseignant=int(data['id_enseignant']),
                id_module=int(data["id_module"]),
                id_periode=int(data["id_periode"]),
                type_evaluation='examen',
                note=int(etudiant[note_libele])
            )
            db.add(evaluation2)
        
    await db.commit()
