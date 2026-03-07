from flask import Flask , jsonify
from flask_cors import CORS
from routes.ai_routes import AI_BP
from routes.confirm import CI_BP
from routes.feed_route import FEED_BP
from dotenv import load_dotenv
import os
from werkzeug.exceptions import RequestEntityTooLarge
from db.db import mongo
# load the env

load_dotenv()

APP = Flask(__name__)


CORS(APP,origins="*")




# app configuration
APP.config['MAX_CONTENT_LENGTH'] =  50 * 1024 * 1024 # 50 MB limit
APP.config['UPLOAD_EXTENSIONS'] = ['.jpg','.jpeg','.png']
APP.config['JSON_SORT_KEYS'] = False
APP.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
# Mongo Configuaration
APP.config["MONGO_URI"] = os.getenv("MONGO_URI","mongodb+srv://jadhav_db_user:Lh5GeGTA0uBtPIx4@cluster0.gwnwdgk.mongodb.net/civic_issues_db?appName=Cluster0")

mongo.init_app(APP)
# register AI routes

APP.register_blueprint(AI_BP,url_prefix="/ai")
APP.register_blueprint(CI_BP,url_prefix="/ai")
APP.register_blueprint(FEED_BP,url_prefix="/ai")


@APP.route("/")
def HOME():
    return {"message": "Welcome to the AI Service API" }


@APP.errorhandler(RequestEntityTooLarge)
def HANDLE_FILE_SIZE_ERROR(e):
    return jsonify ({
        "STATUS": "FAILED",
        "ERROR": "Uploaded file is too large",
        "MAX_SIZE_MB": 50

    }) , 413

if __name__ == '__main__':
    APP.run(
        host='0.0.0.0',
        port=int(os.getenv("PORT",5000)),
        debug=True
        )