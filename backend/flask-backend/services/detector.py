import json
from PIL import Image
from services.gemini_client import MODEL


def DETECT_ISSUE(image_path: str):
    """
    Detect civic issues in an image using Gemini model.
    Returns a dictionary with LABEL and CONFIDENCE.
    """

    # Load and preprocess image
    img = Image.open(image_path).convert("RGB")
    img = img.resize((512, 512))

    # Clear, strict prompt
    prompt = """
You are an AI system that detects civic issues in images.

Return ONLY a valid JSON object with two keys:
{
  "label": "GARBAGE | POTHOLE | WATER | NO_ISSUE",
  "confidence": 0.0-1.0
}
"""

    # Call Gemini model
    response = MODEL.generate_content([img, prompt])

    # Default values
    label = "NO_ISSUE"
    confidence = 0.5

    try:
        # Try parsing JSON
        result = json.loads(response.text)

        label = str(result.get("label", "NO_ISSUE")).upper()
        confidence = float(result.get("confidence", 0.5))

    except Exception:
        # Fallback if parsing fails
        label = response.text.strip().upper()
        if label not in ["GARBAGE", "POTHOLE", "WATER"]:
            label = "NO_ISSUE"
        confidence = 0.5

    # Final validation
    if label not in ["GARBAGE", "POTHOLE", "WATER", "NO_ISSUE"]:
        label = "NO_ISSUE"

    return {
        "LABEL": label,
        "CONFIDENCE": confidence
    }
