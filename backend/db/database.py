import os

from dotenv import load_dotenv

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase

load_dotenv()

DB_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./scholar_note.db")

engine = create_async_engine(DB_URL, echo=False)
Session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass
