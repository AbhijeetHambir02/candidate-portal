from pydantic import BaseModel, ConfigDict
from datetime import datetime


class Candidate(BaseModel):
    name: str
    mobile: str
    city: str
    position: str
    experience: float
    current_ctc: float
    expected_ctc: float
    skills : str
    status: str
    date: datetime

    model_config = ConfigDict(from_attributes=True)

class Interview(BaseModel):
    name: str
    mobile: str
    position: str
    city: str
    skills: str
    interviewer: str
    status: str
    remarks: str
    date: datetime

    model_config = ConfigDict(from_attributes=True)

class CandidateRead(Candidate):
    id: int
    name: str
    mobile: str
    city: str
    position: str
    experience: float
    current_ctc: float
    expected_ctc: float
    skills : str
    status: str
    date: datetime

    model_config = ConfigDict(from_attributes=True)

class InterviewRead(Interview):
    id: int
    name: str
    mobile: str
    position: str
    city: str
    skills: str
    interviewer: str
    status: str
    remarks: str
    date: datetime

    model_config = ConfigDict(from_attributes=True)


class CandidateUpdate(BaseModel):
    status: str

    model_config = ConfigDict(from_attributes=True)