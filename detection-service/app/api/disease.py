from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

from app.services.prediction_logic import predict

from app.models_db.analysis import Analysis

from app.core.database import SessionLocal

from app.core.security import get_current_user

router = APIRouter()


@router.post("/predict")
async def predict_disease(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user)
):

    print(f"📁 Fichier reçu : {file.filename}")

    # Vérification image
    if not file.content_type or not file.content_type.startswith("image/"):

        raise HTTPException(
            status_code=400,
            detail="Format non supporté"
        )

    # Lire image
    file_bytes = await file.read()

    # Prediction
    result = predict(file_bytes)

    # =====================
    # USER depuis JWT
    # =====================

    farmer_id = int(user["sub"])

    # =====================
    # DB
    # =====================

    db = SessionLocal()

    try:

        analysis = Analysis(

            farmer_id=farmer_id,

            image_name=file.filename,

            plant_name=result["plante"],

            disease_name=result["maladie"],

            status=result["statut"],

            confidence = float(result["confiance"].replace("%", "")) / 100,

            class_id=result["class_id"]
        )

        db.add(analysis)

        db.commit()

        db.refresh(analysis)

    finally:

        db.close()

    return {
        "message": "Analyse enregistrée",
        "analysis_id": analysis.id,
        "result": result
    }
@router.get("/analyses")
def get_analyses(user: dict = Depends(get_current_user)):
    db = SessionLocal()
    try:
        analyses = db.query(Analysis).filter(
            Analysis.farmer_id == int(user["sub"])  # ← int()
        ).order_by(Analysis.id.desc()).all()
        return analyses
    finally:
        db.close()

@router.get("/stats")
def get_stats(user: dict = Depends(get_current_user)):
    db = SessionLocal()
    try:
        total = db.query(Analysis).filter(
            Analysis.farmer_id == int(user["sub"])  # ← int()
        ).count()

        malades = db.query(Analysis).filter(
            Analysis.farmer_id == int(user["sub"]),  # ← int()
            Analysis.status == "Malade"
        ).count()

        sains = total - malades
        return {"total": total, "malades": malades, "sains": sains}
    finally:
        db.close()