from sqlalchemy import create_engine, false
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
DB_URL = "postgresql+asyncpg://scholar_note_db_user:ZT88IzxOAzcBQZFkn5eeddj6Gby8euw3@dpg-cv03aq2j1k6c738c4ta0-a.oregon-postgres.render.com/scholar_note_db"

engine = create_async_engine(DB_URL, echo=False)
Session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass