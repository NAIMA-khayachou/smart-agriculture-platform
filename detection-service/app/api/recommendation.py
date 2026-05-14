from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os, httpx
from app.recommendation_map import PROMPT_TEMPLATES, DEFAULT_PROMPT
from dotenv import load_dotenv
load_dotenv()


router = APIRouter()

class RecommendRequest(BaseModel):
    class_id: int
    class_name: str
    confidence: float
    infection_percentage: float | None = None

class RecommendResponse(BaseModel):
    recommendation: str

OPENAI_KEY = os.getenv("OPENAI_API_KEY")


def build_prompt(req: RecommendRequest) -> str:
    base = PROMPT_TEMPLATES.get(req.class_name, DEFAULT_PROMPT.format(class_name=req.class_name))
    extra = f" Confiance: {req.confidence:.2f}. Surface infectée: {req.infection_percentage if req.infection_percentage is not None else 'N/A'}%."
    return base + extra

@router.post("/api/v1/recommend", response_model=RecommendResponse)
async def recommend(req: RecommendRequest):
    print("OPENAI_KEY =", OPENAI_KEY)
    if not OPENAI_KEY:
        raise HTTPException(status_code=500, detail="IA key not configured")
    prompt = build_prompt(req)
    print("🔥 PROMPT =", prompt)
    print("🔥 OPENAI KEY =", OPENAI_KEY[:10])
    print("🔥 RECOMMEND CALL:", req.class_name)
    headers = {"Authorization": f"Bearer {OPENAI_KEY}", "Content-Type": "application/json"}
    payload = {
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": prompt}],
    "max_tokens": 400
}
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            r = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            r.raise_for_status()
            text = r.json()["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print("❌ ERREUR OPENAI:", e)
        raise HTTPException(status_code=502, detail=str(e))
    return {"recommendation": text}
