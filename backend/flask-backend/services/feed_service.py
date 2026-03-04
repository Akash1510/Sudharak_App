from db.db import mongo
from flask import g
import requests
import os

REPORT_IN_BASE_URL="http://localhost:7000"

def get_feed_for_user():
    location = g.user.get("location")

    user_id = g.user.get("id")

    if not location:
        raise Exception("User location Missing")
    
    # Fetch reports by location

    reports_cursor=mongo.db["reports"].find({
        "location":location,
    
        })

    reports = []
    for report in reports_cursor:
        report_id=str(report["_id"])

        reports.append({
            "report_id":report_id,
            "issue":report.get("issue"),
            "enhanced_description":report.get("enhanced_description"),
            "image_url":report.get("image_url"),
            "status":report.get("status","Pending"),
            "location":report.get("location")
            
        })

    if not reports:
        return []
    
    report_ids = [r["report_id"] for r in reports]

    # fetch ineractions Data from mongo3

    try:
        response = requests.post(
            f"{REPORT_IN_BASE_URL}/reports/interactions/bulk",
            json={"report_ids":report_ids},
            timeout=5
        )
        
        interaction_data = response.json().get("data",[])
    
    except Exception:
        interaction_data=[]

    # convert Interaction List to MAP

    interaction_map={
        item["report_id"]: item for item in interaction_data
    }

    # merge data

    final_feed=[]
    ACTIVE_STATUS=["Pending","In_Progress"]
    for report in reports:
        rid = report["report_id"]

        interaction = interaction_map.get(rid,{})

        if not interaction:
            continue

        if interaction.get("status") not in ACTIVE_STATUS:
            continue

        

        report["interaction"] = {
            "status":interaction.get("status"),
            "upote_count":interaction.get("upvote_count",0),
            "comment_count":len(interaction.get("comments",[])),
            "recent_comments": interaction.get("comments", []),
            "user_has_upvoted": user_id in interaction.get("upvoted_by",[])
        }

        final_feed.append(report)
    
    return final_feed




def get_user_reports():

    user_id = g.user.get("id")

    reports_user = mongo.db.reports.find({
        "created_by":user_id
    })
    reports =[]

    for report in reports_user:
        reports.append({
            "report_id":str(report["_id"]),
            "issue":report.get("issue"),
            "location":report.get("location")
        })

    return reports