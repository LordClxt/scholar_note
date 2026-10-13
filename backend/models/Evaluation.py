from sqlalchemy import Column, Integer, Float, String, ForeignKey
from datetime import datetime, timezone
from db.database import Base
from pydantic import BaseModel
from sqlalchemy.orm import relationship

class Evaluation(Base):
    __tablename__ = "evaluations"

    id = Column(Integer, primary_key=True, index=True)
    note = Column(Float)
    date = Column(String, default=datetime.now(timezone.utc))
    matricule = Column(String, ForeignKey('etudiants.matricule'))
    id_enseignant = Column(Integer, ForeignKey('enseignants.id'))
    id_module = Column(Integer, ForeignKey('modules.id'))
    id_periode = Column(Integer, ForeignKey('periodes.id'))
    type_evaluation = Column(String)
    
    enseignant = relationship('Enseignant', back_populates='evaluations')
    etudiant = relationship('Etudiant', back_populates='evaluations')
    module = relationship('Module', back_populates='evaluations')
    periode = relationship("Periode", back_populates="evaluations")
    

class EvaluationRequest(BaseModel):
    
    note: float
    date:str
    matricule:str
    id_enseignant:int
    id_module:int
    id_periode:int
    type_evaluation:str




