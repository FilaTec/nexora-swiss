from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .career import router as career_router
from .db import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nexora Swiss API",version="0.2.0",description="Backend API for Nexora Swiss.")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:3000"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(career_router)

@app.get("/health")
def health() -> dict[str,str]:
    return {"status":"ok","service":"nexora-api","version":"0.2.0"}
