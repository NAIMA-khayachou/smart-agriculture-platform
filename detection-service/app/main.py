
from fastapi import FastAPI , Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
from app.api.detection import router as detection_router
from app.models.disease import router as disease_router
from app.services import model_service
import traceback


app = FastAPI(
    title="Smart Agriculture API",
    description="API de détection de maladies des plantes",
    version="1.0.0"
)


# Inclure les routes
app.include_router(disease_router)

@app.on_event("startup")
async def startup_event():
    """Charger le modèle au démarrage"""
    model_path = Path("app/models/best_model_finetuned.pth")
    
    
    # Classes du dataset PlantDoc (28 classes)
    class_names = [
        "Apple Scab Leaf",
        "Apple leaf",
        "Apple rust leaf",
        "Bell_pepper leaf",
        "Bell_pepper leaf spot",
        "Blueberry leaf",
        "Cherry leaf",
        "Corn Gray leaf spot",
        "Corn leaf blight",
        "Corn rust leaf",
        "Peach leaf",
        "Potato leaf early blight",
        "Potato leaf late blight",
        "Raspberry leaf",
        "Soybean leaf",
        "Soybean leaf blight",
        "Squash Powdery mildew leaf",
        "Strawberry leaf",
        "Tomato Early blight leaf",
        "Tomato Septoria leaf spot",
        "Tomato leaf",
        "Tomato leaf bacterial spot",
        "Tomato leaf late blight",
        "Tomato leaf mosaic virus",
        "Tomato leaf yellow virus",
        "Tomato mold leaf",
        "Tomato two spotted spider mites leaf",
        "grape leaf"
    ]
    
    model_service.set_class_names(class_names)
    
    if model_path.exists():
        success = model_service.load_model(str(model_path), len(class_names))
        if success:
            print("✅ Modèle chargé avec succès")
        else:
            print("⚠️ Échec du chargement du modèle")
    else:
        print(f"⚠️ Modèle non trouvé: {model_path.absolute()}")
        print("📁 Fichiers disponibles:")
        models_dir = Path("models")
        if models_dir.exists():
            for f in models_dir.glob("*.pth"):
                print(f"  - {f.name}")

@app.get("/")
def read_root():
    return {
        "message": "Smart Agriculture API",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model_service.model is not None
    } 

@app.get("/classe")
def  get_classe_id(classe_id:int,classe_name):
    return  {"classe_id": classe_id,"classe_name": classe_name}

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

app.include_router(disease_router)


