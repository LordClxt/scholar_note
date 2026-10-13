from fastcrud import crud_router, FastCRUD 
from dependencies.db import getDB
from models.Filiere import Filere, FiliereRequest

router = crud_router(
    session=getDB,
    model=Filere,
    create_schema=FiliereRequest,
    update_schema=FiliereRequest,
    path="/filieres",
    tags=["Filieres"]
)       




