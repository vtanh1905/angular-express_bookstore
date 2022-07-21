import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";

import { IHomeController } from "./interfaces/ihome.controller";
import { inject } from "inversify";

import { S3Service } from "../utils";

import { env } from "../constants";

@controller("")
export class HomeController implements IHomeController {
  constructor(@inject("S3Service") private s3Service: S3Service) {}

  @httpGet("/")
  public async get(req: Request, res: Response): Promise<number> {
    res.sendFile("./web/dist/index.html");
    return 1;
  }

  @httpGet("/test")
  public async upload(req: Request, res: Response): Promise<number> {
    res.send(env);
    return 1;
  }
}
