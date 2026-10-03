from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from .career import router as career_router
from .db import Base, engine
from . import models

Base.metadata.create_all(bind=engine)
required_columns={"cv_title":"VARCHAR(160) DEFAULT 'My CV'","template":"VARCHAR(40) DEFAULT 'classic'","address":"VARCHAR(255) DEFAULT ''","linkedin":"VARCHAR(255) DEFAULT ''","certifications":"TEXT DEFAULT ''","updated_at":"TIMESTAMP DEFAULT CURRENT_TIMESTAMP"}
existing={c["name"] for c in inspect(engine).get_columns("cv_profiles")}
with engine.begin() as conn:
    for name,definition in required_columns.items():
        if name not in existing: conn.execute(text(f"ALTER TABLE cv_profiles ADD COLUMN {name} {definition}"))

app=FastAPI(title="Nexora Swiss API",version="0.3.0",description="Backend API for Nexora Swiss.")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:3000"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(career_router)
@app.get("/health")
def health()->dict[str,str]: return {"status":"ok","service":"nexora-api","version":"0.3.0"}
