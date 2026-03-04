import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY missing")

genai.configure(api_key=API_KEY)

MODEL = genai.GenerativeModel("gemini-3-flash-preview")
