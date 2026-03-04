from services.gemini_client import MODEL

def ENHANCE_TEXT(user_text: str, label: str):

    if not user_text or len(user_text.strip()) < 5:
        return {"ENHANCED_TEXT": user_text}

    prompt = f"""
Rewrite the following civic complaint professionally.

Task:
- Rewrite the given text into a professional, clear, and formal complaint
- Do NOT change the meaning
- Do NOT add new information
- Do NOT include severity words
- Keep it short and official
- Output only the rewritten text
- No punctuation at the end
- HUMANIC NATURE TO THE TEXT

Issue Type: {label}

Text:
{user_text}
"""

    response = MODEL.generate_content(prompt)
    enhanced = response.text.strip()

    return {
        "ENHANCED_TEXT": enhanced
    }

     