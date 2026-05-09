import os
import httpx
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:5000")


async def get_all_books() -> list:
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(f"{BACKEND_URL}/api/books")
        response.raise_for_status()
        return response.json()["data"]