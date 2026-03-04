from db.db import mongo
import os
from db.cache import get_temp_report, delete_temp_report
from flask import Blueprint, request, jsonify,g
from middlewares.auth_middleware import verify_token

from kafka_events.producer import publish_event
from services.s3_services import upload_unresolved_image
CI_BP = Blueprint("CI_BP", __name__)

# Make the Auto Routing Of Reports for the specific Issue problems


@CI_BP.route("/confirm", methods=["POST"])
@verify_token(required_role="CITIZEN")

def CONFIRM_REPORT():

    data = request.get_json(silent=True) or {}
    token = data.get("TOKEN")

    if not token:
        return jsonify({
            "STATUS": "FAILED",
            "MESSAGE": "Token Is Required"
        }), 400

    cached = get_temp_report(token)

    user_id = g.user.get("id")
    location = g.user.get("location")

    if not cached:
        return jsonify({
            "STATUS": "FAILED",
            "MESSAGE": "Invalid Or Expired Token"
        }), 404



    report_doc = {
        "issue": cached["issue"],
        "enhanced_description": cached["enhanced_description"],
        "image_url": None,
        "location":location,
        "created_by":user_id,
    }

    result = mongo.db["reports"].insert_one(report_doc)

    report_id = str(result.inserted_id)

    # Image Naming and Storing Unsolved Imageas by Reportid names

#    upload to s3 storage
    image_url = upload_unresolved_image(
        cached["image_path"],
        report_id

    )

    # upload DB with s3 url

    mongo.db["reports"].update_one(
        {"_id": result.inserted_id},
        {"$set": {"image_url": image_url}}
    )

    delete_temp_report(token)

    # Send Event to kafka
    kafka_payload ={
        "event":"Report_Created",
        "report_id":report_id,
        "department":cached["issue"]["LABEL"],
        "status":"Pending",
        "location":location
    }

    publish_event(kafka_payload)

    return jsonify({
        "STATUS": "SUCCESS",
        "MESSAGE": "Report Confirmed",
        "REPORT_ID": report_id,
        "IMAGE_URL": image_url
    }), 201
