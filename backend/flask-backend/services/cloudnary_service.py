import cloudinary.uploader
from db.cloudinary import *

def upload_image(image_path, folder="sudharak/temp"):

    response = cloudinary.uploader.upload(
        image_path,
        folder=folder
    )

    return {
        "url": response["secure_url"],
        "public_id": response["public_id"]
    }