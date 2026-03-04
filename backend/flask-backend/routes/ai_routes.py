from flask import Blueprint,request,jsonify
import os,uuid

from services.detector import DETECT_ISSUE
from services.enhacer import ENHANCE_TEXT
from db.cache import set_temp_report


AI_BP = Blueprint("AI_BP", __name__)

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@AI_BP.route("/analyze", methods=["POST"])


def ANALYZE():

    if "IMAGE" not in request.files:
        return jsonify({"STATUS": "FAILED", "MESSAGE": "No image provided"}), 400

    image = request.files["IMAGE"]
    text = request.form.get("DESCRIPTION", "")

    if image.filename == "":
        return jsonify({"STATUS": "FAILED", "MESSAGE": "Empty image"}), 400

        # Generate Temp Report Token and store in Redis
    token = str(uuid.uuid4());

    try:
        # Step 1: temporarily save image
        image_filename = f"{token}.jpg"
        image_path = os.path.join(UPLOAD_DIR, image_filename)
        image.save(image_path)

        # Step 2: AI detection
        issue = DETECT_ISSUE(image_path)

        if issue["LABEL"] == "NO_ISSUE":
            os.remove(image_path)
            return jsonify({
                "STATUS": "FAILED",
                "MESSAGE": "NO CIVIC ISSUE FOUND"
            }), 422
        

        enhanced = ENHANCE_TEXT(text, issue["LABEL"])



        temp_data = {
            "issue": issue,
            "enhanced_description": enhanced["ENHANCED_TEXT"],
            "image_path": image_path,
            "issue_label": issue["LABEL"]
        }
        set_temp_report(token, temp_data)

        # Step 4: API Response with Token
        return jsonify({
            "STATUS": "SUCCESS",
            "TOKEN": token,
            "PREVIEW":{
                "ISSUE": issue,
                "ENHANCED_DESCRIPTION": enhanced["ENHANCED_TEXT"],
                "IMAGE_URL": f"/static/uploads/{image_filename}"
            },
        }), 201

    except Exception as e:
        if image_filename and os.path.exists(os.path.join(UPLOAD_DIR, image_filename)):
            os.remove(os.path.join(UPLOAD_DIR, image_filename))

        return jsonify({
            "STATUS": "FAILED",
            "ERROR": str(e)
        }), 500
    
