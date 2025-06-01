// src/utils/listFiles.js
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

const listFiles = async (bucketName, prefix = "") => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix, // For filtering e.g., "company@1/"
    });
    const response = await s3Client.send(command);
    return response.Contents || [];
  } catch (err) {
    console.error("S3 List Error:", err);
    return [];
  }
};

export default listFiles;
