
const AWS = require("aws-sdk")
const fs = require("fs")
const path = require("path")

const s3 = new AWS.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY,
  secretAccessKey:process.env.AWS_SECRET_KEY,
  region:process.env.AWS_REGION
});

const Resolved_Bucket = process.env.Resolved_Bucket;

async function uploadResolvedImage(localpath,reportId,mimetype){
  const extention = path.extname(localpath);
  const fileName = `${reportId}_resolved${extention}`;

  const fileContent = fs.readFileSync(localpath);

  await s3.upload({
    Bucket:Resolved_Bucket,
    Key:fileName,
    Body:fileContent,
    ContentType:mimetype
  }).promise();

  // delete the local files 
  fs.unlinkSync(localpath);

    return `https://${Resolved_Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

}

module.exports = {
  uploadResolvedImage
}