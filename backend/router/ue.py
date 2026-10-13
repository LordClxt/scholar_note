from fastcrud import crud_router, FastCRUD # type: ignore
from dependencies.db import getDB
from models.UE import UE, UeRequest

router = crud_router(
    session=getDB,
    model=UE,
    create_schema=UeRequest,
    update_schema=UeRequest,
    path="/ue",
    tags=["UE"]
)
