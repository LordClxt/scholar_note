from fastcrud import crud_router, FastCRUD # type: ignore
from dependencies.db import getDB
from models.Enseignant import Enseignant, EnseignantRequest

router = crud_router(
    session=getDB,
    model=Enseignant,
    create_schema=EnseignantRequest,
    update_schema=EnseignantRequest,
    path="/enseignants",
    tags=["Enseignant"]
)


