from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.models.disease import router as disease_router
import traceback

app = FastAPI(title="Smart Agriculture API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Handler global pour voir les erreurs ──────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"❌ ERREUR : {exc}")
    print(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )

app.include_router(disease_router, prefix="/api/v1", tags=["Disease"])

@app.get("/")
def root():
    return {"message": "Smart Agriculture API is running"}