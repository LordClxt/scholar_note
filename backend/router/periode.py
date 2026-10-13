from fastcrud import crud_router, FastCRUD # type: ignore
from dependencies.db import getDB
from models.Periode import Periode, PeriodeRequest

router = crud_router(
    session=getDB,
    model=Periode,
    create_schema=PeriodeRequest,
    update_schema=PeriodeRequest,
    path="/periodes",
    tags=["Periode"]
)

