import AWS from "aws-sdk";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const s3 = new AWS.S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  signatureVersion: "v4",
});

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const uploadToS3 = async (files) => {
  const promises = files.map(async (file) => {
    const fileName = generateFileName();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse.Key;
  });

  return Promise.all(promises);
};

const getImagesFromS3 = async (keys) => {
  try {
    if (!Array.isArray(keys)) {
      keys = [keys];
    }

    const images = [];

    for (const key of keys) {
      const params = {
        Bucket:  process.env.S3_BUCKET_NAME,
        Key: key,
      };

      const data = await s3.getObject(params).promise();
      images.push({
        key,
        data: data.Body,
      });
    }

    return images;
  } catch (error) {
    console.error('Error fetching images from S3: ', error);
    throw new Error('Error fetching images from S3.');
  }
};




export { uploadToS3,getImagesFromS3 };
