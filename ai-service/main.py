import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import recommendations, search

load_dotenv()

app = FastAPI(title="Book Management AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations.router, prefix="/ai", tags=["recommendations"])
app.include_router(search.router, prefix="/ai", tags=["search"])

@app.get("/health")
async def health():
    return {
        "success": True,
        "message": "AI service is running",
        "provider": os.getenv("LLM_PROVIDER", "ollama")
    }