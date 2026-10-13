from sqlalchemy import Column, String, Integer, ForeignKey
from pydantic import BaseModel
from db.database import Base
from sqlalchemy.orm import relationship
class Filere_Module(Base):
    __tablename__ = "filiere_module"
    
    id = Column(Integer, primary_key=True, index=True)
    id_module = Column(Integer, ForeignKey('modules.id'))
    id_filiere = Column(Integer, ForeignKey('filieres.id'))

    modules = relationship('Module', back_populates='filiere_module')
    
class FiliereModuleRequest(BaseModel):
    id_module:int
    id_filiere:int