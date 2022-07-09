import AWS, { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";
import { fluentProvide } from "inversify-binding-decorators";

@fluentProvide("S3Service").inSingletonScope().done()
export class S3Service {
  private s3: S3 = new S3();
  private bucketName: string = "s3-assign";

  constructor() {
    AWS.config.update({
      accessKeyId: "AKIARYLVH527UFJLUQEE",
      secretAccessKey: "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",
    });
  }

  upload(filePathLocation: string): Promise<any> {
    return new Promise<string>((resolve: any, reject: any) => {
      this.s3.upload(
        {
          Bucket: this.bucketName,
          Body: fs.createReadStream(filePathLocation),
          Key: "folder/" + Date.now() + "_" + path.basename(filePathLocation),
        },
        (err: Error, data: S3.ManagedUpload.SendData) => {
          if (err) {
            reject(err);
          }

          if (data) {
            resolve("Uploaded in:", data.Location);
          }
        }
      );
    });
  }
}
