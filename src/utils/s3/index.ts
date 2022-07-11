import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { fluentProvide } from "inversify-binding-decorators";

@fluentProvide("S3Service").inSingletonScope().done()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string = "s3-assign";

  constructor() {
    AWS.config.update({
      accessKeyId: "<AccessKeyId>",
      secretAccessKey: "<SecretAccessKey>",
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
