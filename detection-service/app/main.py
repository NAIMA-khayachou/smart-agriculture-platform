from fastapi import FastAPI

app = FastAPI(title="Smart Agriculture API")

@app.get("/")
def read_root():
    return {"message": "Le service de détection est en ligne !"}

@app.get("/status")
def get_status():
    return {"status": "ready", "model": "EfficientNetB0"} 