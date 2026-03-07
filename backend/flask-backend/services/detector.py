# from PIL import Image
# from services.gemini_client import MODEL

# def DETECT_ISSUE(image_path: str):
#     img = Image.open(image_path)
#     img = img.resize((512, 512))

#     prompt = """
# Identify the civic issue in the image.

# Return ONLY ONE WORD:
# GARBAGE
# POTHOLE
# WATER
# NO_ISSUE
# """

#     response = MODEL.generate_content(
#         [img, prompt],
        
#     )

#     label = response.text.strip().upper()

#     if label not in ["GARBAGE", "POTHOLE", "WATER"]:
#         label = "NO_ISSUE"

#     return {
#         "LABEL": label,
#         "CONFIDENCE": 1.0
#     }

import json
from PIL import Image
from services.gemini_client import MODEL


def DETECT_ISSUE(image_path: str):

    img = Image.open(image_path)
    img = img.convert("RGB")
    img = img.resize((768, 768))   # slightly larger

    prompt = """
You are an AI system that detects civic issues in images.

Possible labels:
- POTHOLE → hole or damage on road
- GARBAGE → trash or waste pile
- WATER → water leak or waterlogging
- NO_ISSUE → no visible civic issue

Return JSON only:

{
 "label": "POTHOLE | GARBAGE | WATER | NO_ISSUE",
 "confidence": 0.0 to 1.0
}
"""

    response = MODEL.generate_content([img, prompt])

    try:
        result = json.loads(response.text)

        label = result.get("label", "NO_ISSUE").upper()
        confidence = float(result.get("confidence", 0.5))

    except Exception:
        label = "NO_ISSUE"
        confidence = 0.5

    if label not in ["GARBAGE", "POTHOLE", "WATER"]:
        label = "NO_ISSUE"

    return {
        "LABEL": label,
        "CONFIDENCE": confidence
    }