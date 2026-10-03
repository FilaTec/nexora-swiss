from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session
from .db import get_db
from .models import CVProfile
from .schemas import CVProfileCreate, CVProfileOut
router=APIRouter(prefix="/api/v1/career",tags=["career"])

@router.get("/cv",response_model=list[CVProfileOut])
def list_cvs(db:Session=Depends(get_db)):
    return list(db.scalars(select(CVProfile).order_by(CVProfile.updated_at.desc())))

@router.post("/cv",response_model=CVProfileOut)
def create_cv(payload:CVProfileCreate,db:Session=Depends(get_db)):
    item=CVProfile(**payload.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/cv/{profile_id}",response_model=CVProfileOut)
def get_cv(profile_id:int,db:Session=Depends(get_db)):
    item=db.get(CVProfile,profile_id)
    if not item: raise HTTPException(404,"CV not found")
    return item

@router.put("/cv/{profile_id}",response_model=CVProfileOut)
def update_cv(profile_id:int,payload:CVProfileCreate,db:Session=Depends(get_db)):
    item=db.get(CVProfile,profile_id)
    if not item: raise HTTPException(404,"CV not found")
    for key,value in payload.model_dump().items(): setattr(item,key,value)
    db.commit(); db.refresh(item); return item

@router.delete("/cv/{profile_id}",status_code=204)
def delete_cv(profile_id:int,db:Session=Depends(get_db)):
    item=db.get(CVProfile,profile_id)
    if not item: raise HTTPException(404,"CV not found")
    db.delete(item); db.commit(); return Response(status_code=204)
