from fastcrud import crud_router, FastCRUD # type: ignore
from dependencies.db import getDB
from models.Etudiant import Etudiant, EtudiantRequest

router = crud_router(
    session=getDB,
    model=Etudiant,
    create_schema=EtudiantRequest,
    update_schema=EtudiantRequest,
    path="/etudiants",
    tags=["Etudiant"]
)

