from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app import schemas, models
from app.utils import serialize_candidate_obj, serialize_interview_obj

candidate_router = APIRouter(prefix="/candidate-portal", tags=["Candidate & Interview"])


@candidate_router.post("/add/candidate")
async def add_candidate(candidate: schemas.Candidate, db : Session = Depends(get_db)):
    try:
        exist = db.query(models.Candidate).filter(models.Candidate.name == candidate.name).first()
        if exist:
            return JSONResponse(status_code=status.HTTP_409_CONFLICT, content="Candidate already exists")
        
        new_candidate = models.Candidate(**candidate.model_dump())
        db.add(new_candidate)
        db.commit()
        db.refresh(new_candidate)
        payload = schemas.CandidateRead.model_validate(new_candidate).model_dump(mode='json')
        
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=payload)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"error": str(e)})


@candidate_router.post("/add/interview")
async def add_interview(interview_details: schemas.Interview, db : Session = Depends(get_db)):
    try:
        new_interview = models.Interview(**interview_details.model_dump())
        db.add(new_interview)
        db.commit()
        db.refresh(new_interview)
        payload = schemas.InterviewRead.model_validate(new_interview).model_dump(mode='json')
        
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=payload)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"error": str(e)})


@candidate_router.get("/get/candidates")
async def get_candidates(db: Session = Depends(get_db)):
    try:
        payload = db.query(models.Candidate).all()
        if not payload:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="No records found")
        payload = serialize_candidate_obj(payload)
        return JSONResponse(status_code=status.HTTP_200_OK, content=payload)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))

@candidate_router.get("/get/candidate/{id}")
async def get_candidate(id: int, db: Session = Depends(get_db)):
    try:
        payload =  db.query(models.Candidate).filter(models.Candidate.id == id).first()
        if not payload:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="No records found")
        payload = schemas.CandidateRead.model_validate(payload).model_dump(mode="json")
        return JSONResponse(status_code=status.HTTP_200_OK, content=payload)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))


@candidate_router.get("/get/interviews")
async def get_interviews(db: Session = Depends(get_db)):
    try:
        payload = db.query(models.Interview).all()
        if not payload:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="No records found")
        payload = serialize_interview_obj(payload)
        return JSONResponse(status_code=status.HTTP_200_OK, content=payload)
    except Exception as e:
        print(e)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))
    
@candidate_router.get("/get/interview/{name}")
async def get_interview(name: str, db: Session = Depends(get_db)):
    try:
        payload =  db.query(models.Interview).filter(models.Interview.name == name).all()
        if not payload:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="No records found")
        payload = serialize_interview_obj(payload)
        return JSONResponse(status_code=status.HTTP_200_OK, content=payload)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))

@candidate_router.patch("/update/candidate/{id}")
async def update_candidate(id: int, candidate: schemas.CandidateUpdate, db: Session = Depends(get_db)):
    try:
        payload = db.query(models.Candidate).filter(models.Candidate.id == id).first()
        if not payload:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="No candidate")
        
        payload.status = candidate.status
        db.commit()
        db.refresh(payload)
        payload = schemas.CandidateRead.model_validate(payload).model_dump(mode="json")
        
        return JSONResponse(status_code=status.HTTP_200_OK, content=payload)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))