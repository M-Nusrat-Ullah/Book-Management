from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm import generate
from services.books import get_all_books

router = APIRouter()

class SearchRequest(BaseModel):
    query: str

@router.post("/search")
async def natural_language_search(request: SearchRequest):
    try:
        books = await get_all_books()

        books_list = "\n".join([
            f"- ID:{b['_id']} | {b['title']} by {b['author']} | Genre: {b['genre']} | Year: {b['publishedYear']} | Rating: {b['rating']}"
            for b in books
        ])

        prompt = f"""You are a book search assistant.

Here are the books available:
{books_list}

User search query: "{request.query}"

Find the books that best match this query. Return ONLY a JSON array of matching book IDs, like:
["id1", "id2"]

If no books match, return an empty array: []
Return ONLY the JSON array, nothing else."""

        llm_response = await generate(prompt)

        import json
        import re
        match = re.search(r'\[.*?\]', llm_response, re.DOTALL)
        if match:
            ids = json.loads(match.group())
            matched_books = [b for b in books if b['_id'] in ids]
        else:
            matched_books = []

        return {"success": True, "query": request.query, "results": matched_books}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))