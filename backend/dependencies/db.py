from typing import Annotated

from fastapi import Depends

from db.database import Session

async def getDB():
    async with Session() as session:
        yield session

db_dependency = Annotated[Session, Depends(getDB)]