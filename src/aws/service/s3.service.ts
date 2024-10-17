
import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MimeType } from 'aws-sdk/clients/kendra';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;

@Injectable()
export class S3Service{
    private s3: AWS.S3;
    private bucketName: string;
  
  
    constructor() {
      this.s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.PASSWORD,  
        region: 'eu-north-1',
        signatureVersion: 'v4',
      });
  
      this.bucketName = process.env.S3_BUCKET_NAME;
    }
  
    async getPresignedUrl(key: string): Promise<string> {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        Expires: 3600, // რამდენი ხანი იმუშაოს ლინკმა
      };
  
      try {
        const url = await this.s3.getSignedUrlPromise('getObject', params);
        return url;
      } catch (error) {
        console.log(
          `Failed to get presigned URL for key ${key}`,
          error.stack,
        );
      }
    }
  
    async upload({
      file,
      bucket,
      name,
      mimetype,
    }: {
      file: Buffer;
      name: string;
      mimetype: MimeType;
      bucket?: string;
    }): Promise<SendData> {
      const params = {
        Bucket:process.env.BUCKET_NAME,
        Key: String(name),
        Body: file,
        ContentType: mimetype,
        ContentDisposition: 'inline',
        CreateBucketConfiguration: {
          LocationConstraint: 'eu-north-1',
        },
      };
  
      try {
        return await this.s3.upload(params).promise();
      } catch (e) {
        console.log('Could not upload file to s3', { e, name, mimetype });
        throw e;
      }
    }
}