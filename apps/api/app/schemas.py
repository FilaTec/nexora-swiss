from pydantic import BaseModel, ConfigDict
class CVProfileCreate(BaseModel):
    cv_title:str="My CV"; template:str="classic"; first_name:str; last_name:str
    email:str=""; phone:str=""; city:str=""; address:str=""; linkedin:str=""
    profession:str=""; summary:str=""; experience:str=""; education:str=""
    skills:str=""; languages:str=""; certifications:str=""
class CVProfileOut(CVProfileCreate):
    model_config=ConfigDict(from_attributes=True)
    id:int
