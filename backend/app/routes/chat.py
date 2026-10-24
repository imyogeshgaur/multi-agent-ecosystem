from fastapi import APIRouter
from pydantic import BaseModel
import httpx
from ..personas import get_system_prompt

router = APIRouter()

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "gemma4:12b-mlx"  # change if needed

class ChatRequest(BaseModel):
    persona: str
    language: str = "hinglish"
    history: list = []
    message: str

def clean_reply(text: str) -> str:
    if not text:
        return ""
    text = text.replace("**", "").replace("*", "")
    if text.lower().startswith("response"):
        text = text.split(":", 1)[-1].strip()
    return text.strip()

@router.post("/chat")
async def chat(req: ChatRequest):
    system = get_system_prompt(req.persona, req.language)

    messages = [{"role": "system", "content": system}]
    for m in req.history[-12:]:
        messages.append({"role": m.get("role"), "content": m.get("content")})
    messages.append({"role": "user", "content": req.message})

    async with httpx.AsyncClient(timeout=120.0) as client:
        try:
            resp = await client.post(OLLAMA_URL, json={
                "model": MODEL,
                "messages": messages,
                "stream": False
            })
            resp.raise_for_status()
        except Exception as e:
            return {"reply": f"Error connecting to Ollama: {str(e)}"}

    data = resp.json()
    reply = data.get("message", {}).get("content", "...")
    return {"reply": clean_reply(reply)}