from fastapi import FastAPI

app = FastAPI(
    title="Nexora Swiss API",
    version="0.1.0",
    description="Backend API for the Nexora Swiss multilingual life and career assistant.",
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "nexora-api", "version": "0.1.0"}
