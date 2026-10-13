from fastcrud import crud_router, FastCRUD # type: ignore
from dependencies.db import getDB
from models.Evaluation import Evaluation, EvaluationRequest

router = crud_router(
    session=getDB,
    model=Evaluation,
    create_schema=EvaluationRequest,
    update_schema=EvaluationRequest,
    path="/evaluations",
    tags=["Evaluation"]
)


