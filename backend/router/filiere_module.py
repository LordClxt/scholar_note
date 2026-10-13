from fastcrud import crud_router, FastCRUD 
from dependencies.db import getDB
from models.filiere_module import Filere_Module, FiliereModuleRequest

router = crud_router(
    session=getDB,
    model=Filere_Module,
    create_schema=FiliereModuleRequest,
    update_schema=FiliereModuleRequest,
    path="/filiere_module",
    tags=["Filiere Module"]
)       




