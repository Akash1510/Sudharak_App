import boto3
import os


AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_REGION = os.getenv("AWS_REGION")

Unresolved_Bucket = os.getenv("Unresolved_Bucket")


s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)

def upload_unresolved_image(localpath,report_id):

    # Detect Extention automatically
    extension = os.path.splitext(localpath)[1]

    file_name = f"{report_id}{extension}"

    s3.upload_file(
        localpath,
        Unresolved_Bucket,
        file_name,
        ExtraArgs={
            "ContentType":"image/jpeg"
        }
    )

    image_url = f"https://{Unresolved_Bucket}.s3.{AWS_REGION}.amazonaws.com/{file_name}"

    return image_url
