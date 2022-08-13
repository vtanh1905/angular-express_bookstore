import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { fluentProvide } from "inversify-binding-decorators";

import { env } from '../../constants';

@fluentProvide("S3Service").inSingletonScope().done()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string = env.BUCKET_NAME;

  constructor() {
    AWS.config.update({
      accessKeyId: env.ACCESS_KEY_ID,
      secretAccessKey: env.SECRET_ACCESS_KEY,
    });
    this.s3 = new AWS.S3();
  }

  upload(filePathLocation: string): Promise<any> {
    return new Promise<string>((resolve: any, reject: any) => {
      this.s3.upload(
        {
          Bucket: this.bucketName,
          Body: fs.createReadStream(filePathLocation),
          Key: "folder/" + Date.now() + "_" + path.basename(filePathLocation),
        },
        (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
          if (err) {
            reject(err);
          }

          if (data) {
            resolve("Uploaded in: " + data.Location);
          }
        }
      );
    });
  }
}
