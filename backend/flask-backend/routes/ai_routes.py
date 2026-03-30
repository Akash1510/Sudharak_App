# from flask import Blueprint,request,jsonify
# import os,uuid

# from services.detector import DETECT_ISSUE
# from services.enhacer import ENHANCE_TEXT
# from db.cache import set_temp_report


# AI_BP = Blueprint("AI_BP", __name__)

# UPLOAD_DIR = "static/uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# @AI_BP.route("/analyze", methods=["POST"])


# def ANALYZE():

#     if "IMAGE" not in request.files:
#         return jsonify({"STATUS": "FAILED", "MESSAGE": "No image provided"}), 400

#     image = request.files["IMAGE"]
#     text = request.form.get("DESCRIPTION", "")

#     if image.filename == "":
#         return jsonify({"STATUS": "FAILED", "MESSAGE": "Empty image"}), 400

#         # Generate Temp Report Token and store in Redis
#     token = str(uuid.uuid4());

#     try:
#         # Step 1: temporarily save image
#         image_filename = f"{token}.jpg"
#         image_path = os.path.join(UPLOAD_DIR, image_filename)
#         image.save(image_path)

#         # Step 2: AI detection
#         issue = DETECT_ISSUE(image_path)

#         if issue["LABEL"] == "NO_ISSUE":
#             os.remove(image_path)
#             return jsonify({
#                 "STATUS": "FAILED",
#                 "MESSAGE": "NO CIVIC ISSUE FOUND"
#             }), 422
        

#         enhanced = ENHANCE_TEXT(text, issue["LABEL"])



#         temp_data = {
#             "issue": issue,
#             "enhanced_description": enhanced["ENHANCED_TEXT"],
#             "image_path": image_path,
#             "issue_label": issue["LABEL"]
#         }
#         set_temp_report(token, temp_data)

#         # Step 4: API Response with Token
#         return jsonify({
#             "STATUS": "SUCCESS",
#             "TOKEN": token,
#             "PREVIEW":{
#                 "ISSUE": issue,
#                 "ENHANCED_DESCRIPTION": enhanced["ENHANCED_TEXT"],
#                 "IMAGE_URL": f"/static/uploads/{image_filename}"
#             },
#         }), 201

#     except Exception as e:
#         if image_filename and os.path.exists(os.path.join(UPLOAD_DIR, image_filename)):
#             os.remove(os.path.join(UPLOAD_DIR, image_filename))

#         return jsonify({
#             "STATUS": "FAILED",
#             "ERROR": str(e)
#         }), 500
    


from flask import Blueprint, request, jsonify
import os, uuid
from services.detector import DETECT_ISSUE
from services.enhacer import ENHANCE_TEXT
from db.cache import set_temp_report

AI_BP = Blueprint("AI_BP", __name__)

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5MB

@AI_BP.route("/analyze", methods=["POST"])
def ANALYZE():

    image = request.files.get("IMAGE")
    text = request.form.get("DESCRIPTION", "")

    # 🔥 VALIDATIONS
    if not image:
        return jsonify({"STATUS": "FAILED", "MESSAGE": "Image required"}), 400

    if image.filename == "":
        return jsonify({"STATUS": "FAILED", "MESSAGE": "Empty image"}), 400

    if request.content_length and request.content_length > MAX_IMAGE_SIZE:
        return jsonify({"STATUS": "FAILED", "MESSAGE": "Image too large"}), 413

    token = str(uuid.uuid4())
    image_filename = f"{token}.jpg"
    image_path = os.path.join(UPLOAD_DIR, image_filename)

    try:
        # ✅ SAVE IMAGE (FAST)
        image.save(image_path)

        # 🔥 AI DETECTION (TRY BLOCK SAFE)
        issue = DETECT_ISSUE(image_path)

        if issue.get("LABEL") == "NO_ISSUE":
            os.remove(image_path)
            return jsonify({
                "STATUS": "FAILED",
                "MESSAGE": "NO CIVIC ISSUE FOUND"
            }), 422

        # 🔥 TEXT ENHANCEMENT
        enhanced = ENHANCE_TEXT(text, issue["LABEL"])

        # 🔥 STORE IN CACHE
        temp_data = {
            "issue": issue,
            "enhanced_description": enhanced["ENHANCED_TEXT"],
            "image_path": image_path,
        }

        set_temp_report(token, temp_data)

        return jsonify({
            "STATUS": "SUCCESS",
            "TOKEN": token,
            "PREVIEW": {
                "ISSUE": issue,
                "ENHANCED_DESCRIPTION": enhanced["ENHANCED_TEXT"],
                "IMAGE_URL": f"/static/uploads/{image_filename}"
            }
        }), 200

    except Exception as e:
        # 🔥 CLEANUP SAFETY
        if os.path.exists(image_path):
            os.remove(image_path)

        return jsonify({
            "STATUS": "FAILED",
            "ERROR": str(e)
        }), 500
    
    