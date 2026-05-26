from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.disease import router as disease_router
import traceback

# ✅ AJOUT DB
from app.core.database import Base, engine
from app.models_db.analysis import Analysis

app = FastAPI(title="Smart Agriculture API")

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# CREATE TABLES
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# ROUTES
# =========================
app.include_router(disease_router, prefix="/api/v1", tags=["Disease"])

# =========================
# ERROR HANDLER
# =========================
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"❌ ERREUR : {exc}")
    print(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )

@app.get("/")
def root():
    return {"message": "Smart Agriculture API is running"}