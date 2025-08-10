from sqlalchemy import Column, Integer, String, DateTime, Float
from app.database import Base


class Candidate(Base):
    __tablename__ = 'candidates'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    mobile = Column(String(50), nullable=False)
    city = Column(String(100))
    position = Column(String(100), nullable=False)
    experience = Column(Float)
    current_ctc = Column(Float)
    expected_ctc = Column(Float)
    skills = Column(String(100))
    status = Column(String(100))
    date = Column(DateTime, nullable=False)


class Interview(Base):
    __tablename__ = 'interview'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    mobile = Column(String(50), nullable=False)
    position = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    skills = Column(String(100), nullable=False)
    interviewer = Column(String(100), nullable=False)
    status = Column(String(100), nullable=False)
    remarks = Column(String(100), nullable=False)
    date = Column(DateTime, nullable=False)
