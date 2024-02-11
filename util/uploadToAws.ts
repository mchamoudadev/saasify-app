import { v4 as uuidv4 } from 'uuid';

import sharp from 'sharp'
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from './s3';

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





    } catch (error) {

    }




}

async function convertSvgToPng(svgString: string): Promise<{ pngBuffer: Buffer }> {

    const image = sharp(Buffer.from(svgString))
        .png()
        .trim({ threshold: 10 });

    const pngBuffer = await image.toBuffer();

    return { pngBuffer }

}