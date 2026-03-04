from flask import Blueprint , jsonify
from middlewares.auth_middleware import verify_token
from services.feed_service import get_feed_for_user,get_user_reports

FEED_BP=Blueprint("FEED_BP",__name__)

@FEED_BP.route("/feed",methods=["GET"])
@verify_token(required_role="CITIZEN")

def GET_FEED():

    try:
        feed = get_feed_for_user()

        return jsonify({
            "success":True,
            "count":len(feed),
            "data":feed
        }),200
    
    except Exception as e:
        return jsonify({
            "success":False,
            "message":str(e)
        }),500
    
    


@FEED_BP.route("/reports",methods=["GET"])
@verify_token(required_role="CITIZEN") 

def GET_PROFILE_REPORTS():
    try:
        report = get_user_reports()

        return jsonify({
           "success":True,
           "count":len(report),
           "data":report 
        }),200
    
    except Exception as e:
        return jsonify({
            "success":False,
            "message":str(e)
        }),500