import AWS from "aws-sdk";

export const uploadFile = async (file) => {
  // S3 Bucket Name
  const S3_BUCKET = `${import.meta.env.VITE_APP_AWS_BUCKET_NAME}`;
  // S3 Region
  const REGION = `${import.meta.env.VITE_APP_AWS_REGION}`;

  // S3 Credentials
  AWS.config.update({
    accessKeyId: `${import.meta.env.VITE_APP_AWS_ACCESSKEY_ID}`,
    secretAccessKey: `${import.meta.env.VITE_APP_AWS_SECRET_ACCESSKEY}`,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  // Files Parameters
  const params = {
    Bucket: S3_BUCKET,
    Key: `${file.name}${Date.now()}`,
    Body: file,
  };

  // Uploading file to S3
  console.log("Uploading File to S3");
  try {
    const data = await s3.upload(params).promise();
    console.log(data);
    return data.Location;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};
