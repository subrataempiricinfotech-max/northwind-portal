import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(name + " is required");
  }
  return value;
}

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: requireEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY")
  }
});

export async function uploadProductImageManifest(orderId: string, body: string) {
  const bucket = requireEnv("S3_BUCKET");
  return s3Client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: "orders/" + orderId + "/product-image-manifest.json",
    Body: body,
    ContentType: "application/json"
  }));
}
