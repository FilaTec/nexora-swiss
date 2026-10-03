from pydantic import BaseModel, ConfigDict

class CVProfileCreate(BaseModel):
    first_name:str
    last_name:str
    email:str=""
    phone:str=""
    city:str=""
    profession:str=""
    summary:str=""
    experience:str=""
    education:str=""
    skills:str=""
    languages:str=""

class CVProfileOut(CVProfileCreate):
    model_config=ConfigDict(from_attributes=True)
    id:int
