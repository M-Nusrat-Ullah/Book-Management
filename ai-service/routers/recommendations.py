from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm import generate
from services.books import get_all_books

router = APIRouter()

class RecommendationRequest(BaseModel):
    liked_genres: list[str]
    liked_authors: list[str] = []
    message: str = ""

@router.post("/recommendations")
async def get_recommendations(request: RecommendationRequest):
    try:
        books = await get_all_books()

        books_list = "\n".join([
            f"- {b['title']} by {b['author']} | Genre: {b['genre']} | Rating: {b['rating']}"
            for b in books
        ])

        prompt = f"""You are a helpful book recommendation assistant.

Here are the books available in our library:
{books_list}

The user likes these genres: {', '.join(request.liked_genres)}
The user likes these authors: {', '.join(request.liked_authors) if request.liked_authors else 'not specified'}
User message: {request.message if request.message else 'Please recommend some books'}

Based on the available books, recommend the most suitable ones and explain why briefly.
Keep your response concise and friendly."""

        response = await generate(prompt)
        return {"success": True, "recommendations": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))