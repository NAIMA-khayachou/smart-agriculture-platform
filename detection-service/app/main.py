from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from app.api.detection import router as detection_router
from app.services import model_service

app = FastAPI(
    title="Smart Agriculture API",
    description="API de détection de maladies des plantes",
    version="1.0.0"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En production, spécifier les domaines autorisés
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure les routes
app.include_router(detection_router)

@app.on_event("startup")
async def startup_event():
    """Charger le modèle au démarrage"""
    model_path = Path("models/resnet50_plantdoc_final.pth")
    
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
        "grape leaf"  # 28ème classe
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