// src/utils/s3Client.js
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client } from "@aws-sdk/client-s3";

const REGION = "us-east-1";

const s3Client = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: "us-east-1:9596cff9-52e7-4ba9-883c-2f7e40df5ae0", // ✅ Use your Identity Pool ID
  }),
});

export default s3Client;
