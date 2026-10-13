from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db.database import Base

class Module(Base):
    __tablename__ = 'modules'
    id = Column(Integer, primary_key=True, index=True)
    libele = Column(String)
    credit = Column(Integer)
    volume_horaire = Column(Integer)
    id_ue = Column(Integer, ForeignKey('ue.id'))
    evaluations = relationship('Evaluation', back_populates='module')
    filiere_module = relationship('Filere_Module', back_populates='modules')
    
class ModuleRequest(BaseModel):
    libele:str
    volume_horaire: int
    id_ue: int
    credit:int
