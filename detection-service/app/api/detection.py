from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services import model_service, image_processor

router = APIRouter(prefix="/api/v1", tags=["detection"])

@router.post("/detect")
async def detect_disease(file: UploadFile = File(...)):
    """Détecte la maladie d'une plante à partir d'une image"""
    try:
        # Vérifier le type de fichier
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Le fichier doit être une image")
        
        # Lire l'image
        image_bytes = await file.read()
        
        # Traiter l'image
        image_tensor = image_processor.process_image(image_bytes)
        
        # Faire la prédiction
        prediction = model_service.predict(image_tensor)
        
        return {
            "success": True,
            "prediction": prediction,
            "filename": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la détection: {str(e)}")

@router.get("/classes")
async def get_classes():
    """Retourne la liste des classes de maladies"""
    return {
        "classes": model_service.class_names,
        "total": len(model_service.class_names)
    }
