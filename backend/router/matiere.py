from fastcrud import crud_router, FastCRUD 
from dependencies.db import getDB
from models.Module import Module, ModuleRequest

router = crud_router(
    session=getDB,
    model=Module,
    create_schema=ModuleRequest,
    update_schema=ModuleRequest,
    path="/modules",
    tags=["Modules"]
)


