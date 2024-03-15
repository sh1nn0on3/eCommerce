"use strict";

const { S3Client, PutObjectAclCommand } = require("@aws-sdk/client-s3");

const config = {
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
  },
};

const s3 = new S3Client(config);

module.exports = { s3, PutObjectAclCommand };
