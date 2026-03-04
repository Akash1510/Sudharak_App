from PIL import Image
from services.gemini_client import MODEL

def DETECT_ISSUE(image_path: str):
    img = Image.open(image_path)
    img = img.resize((512, 512))

    prompt = """
Identify the civic issue in the image.

Return ONLY ONE WORD:
GARBAGE
POTHOLE
WATER
NO_ISSUE
"""

    response = MODEL.generate_content(
        [img, prompt],
        generation_config={
            "temperature": 0,
            "max_output_tokens": 5
        }
    )

    label = response.text.strip().upper()

    if label not in ["GARBAGE", "POTHOLE", "WATER"]:
        label = "NO_ISSUE"

    return {
        "LABEL": label,
        "CONFIDENCE": 1.0
    }