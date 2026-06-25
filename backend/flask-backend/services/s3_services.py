import boto3
import os
import requests
import tempfile

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_REGION = os.getenv("AWS_REGION")

UNRESOLVED_BUCKET = os.getenv("UNRESOLVED_BUCKET")

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)


def upload_unresolved_image(cloudinary_url, report_id):
    response = requests.get(cloudinary_url)
    response.raise_for_status()

    extension = os.path.splitext(cloudinary_url.split("?")[0])[1]

    if extension == "":
        extension = ".jpg"

    with tempfile.NamedTemporaryFile(delete=False, suffix=extension) as temp_file:
        temp_file.write(response.content)
        temp_path = temp_file.name

    file_name = f"{report_id}{extension}"

    s3.upload_file(
        temp_path,
        UNRESOLVED_BUCKET,
        file_name,
        ExtraArgs={
            "ContentType": response.headers.get("Content-Type", "image/jpeg")
        }
    )

    os.remove(temp_path)

    return f"https://{UNRESOLVED_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{file_name}"