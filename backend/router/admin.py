from fastcrud import crud_router, FastCRUD # type: ignore
from dependencies.db import getDB
from models.Admin import Admin, AdminRequest

router = crud_router(
    session=getDB,
    model=Admin,
    create_schema=AdminRequest,
    update_schema=AdminRequest,
    path="/admins",
    tags=["Admin"]
)

