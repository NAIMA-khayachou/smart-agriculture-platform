from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.prediction_logic import predict

router = APIRouter()

@router.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    
    print(f"📁 Fichier reçu : {file.filename}")
    print(f"📋 Content-Type : {file.content_type}")
    
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail=f"Format non supporté : {file.content_type}"
        )

    file_bytes = await file.read()
    result     = predict(file_bytes)
    return result