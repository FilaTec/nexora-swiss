from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .db import get_db
from .models import CVProfile
from .schemas import CVProfileCreate, CVProfileOut

router=APIRouter(prefix="/api/v1/career",tags=["career"])

@router.post("/cv",response_model=CVProfileOut)
def create_cv(payload:CVProfileCreate,db:Session=Depends(get_db)):
    item=CVProfile(**payload.model_dump())
    db.add(item); db.commit(); db.refresh(item)
    return item

@router.get("/cv/{profile_id}",response_model=CVProfileOut)
def get_cv(profile_id:int,db:Session=Depends(get_db)):
    return db.get(CVProfile,profile_id)
