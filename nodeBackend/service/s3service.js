import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export const uploadFileToS3 = async (file) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    } catch (error) {
        console.error('Error uploading file to S3', error);
        throw new Error('Error uploading file to S3');
    }
};

export const deleteFileFromS3 = async (key) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        console.log('File deleted successfully:', key);
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw new Error('Error deleting file from S3');
    }
};
