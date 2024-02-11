import { S3Client } from '@aws-sdk/client-s3'


export const s3 = new S3Client({
    region: process.env.AMAZON_AWS_REGION_NAME,
    credentials: {
        accessKeyId: process.env.AMAZON_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AMAZON_AWS_SECRET_KEY as string
    }
});