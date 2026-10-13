from fastcrud import crud_router, FastCRUD # type: ignore
from dependencies.db import getDB
from models.Niveau import Niveau, NiveauRequest

router = crud_router(
    session=getDB,
    model=Niveau,
    create_schema=NiveauRequest,
    update_schema=NiveauRequest,
    path="/niveau",
    tags=["Niveau"]
)
