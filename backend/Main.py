from fastapi import FastAPI
from db.database import engine, Base
from models import Admin, Etudiant, Filiere, Enseignant, Evaluation, filiere_module, Module, Niveau, Periode, UE, Utilisateur
from router import matiere, admin, enseignant, etudiant, evaluation, filiere, niveau, periode, ue, auth, router_personnaliser, filiere_module
from fastapi.middleware.cors import CORSMiddleware


async def lifespan(app:FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"]

)

routes = [matiere, admin, enseignant, etudiant, evaluation, filiere, filiere_module, niveau, periode, ue, auth, router_personnaliser]
for route in routes:
    app.include_router(route.router)

# app.include_router(matiere.router)
# app.include_router()
