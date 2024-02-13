import { v4 as uuidv4 } from 'uuid';

import sharp from 'sharp'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from './s3';

import axios from 'axios'

import { getSignedUrl } from '@aws-sdk/s3-request-presigner'


async function downloadImage(url: string): Promise<Buffer> {

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        throw error;
    }
}


export const uploadToAws = async (image: string, userId: string) => {

    const key = `frames/${userId}/${uuidv4()}.png`;

    const pngImage = await convertSvgToPng(image);

    const putCommand = new PutObjectCommand({
        Bucket: process.env.AMAZON_AWS_BUCKET_NAME,
        Key: key,
        Body: pngImage.pngBuffer,
        ContentType: "image/png",
    });

    try {

        await s3.send(putCommand);

        const getObjectParams = {
            Bucket: process.env.AMAZON_AWS_BUCKET_NAME,
            Key: key,
        }

        const command = new GetObjectCommand(getObjectParams);

        const presignedUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600
        });


        const uploadedImageBuffer = await downloadImage(presignedUrl)

        const metaData = await sharp(uploadedImageBuffer).metadata();

        const totalTokens = await calculateHighDetailImage(metaData.width || 0, metaData.height || 0)

        return { presignedUrl, totalTokens, key }

    } catch (error) {
        console.log("error at upload to aws", error);
        throw error
    }

}

async function calculateHighDetailImage(width: number, height: number) {

    let scalingFactor = Math.min(2048 / width, 2048 / height);

    let scaledWidth = scalingFactor * width;
    let scaledHeight = scalingFactor * height;

    scalingFactor = 768 / Math.min(scaledWidth, scaledHeight);
    scaledWidth = scalingFactor * scaledWidth;
    scaledHeight = scalingFactor * scaledHeight;

    const tileWide = Math.ceil(scaledWidth / 512);
    const tileHigh = Math.ceil(scaledHeight / 512);

    const totalTiles = tileWide * tileHigh;

    return 85 + (170 * totalTiles);

}

async function convertSvgToPng(svgString: string): Promise<{ pngBuffer: Buffer }> {

    const image = sharp(Buffer.from(svgString))
        .png()
        .trim({ threshold: 10 });

    const pngBuffer = await image.toBuffer();

    return { pngBuffer }

}