import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { IHomeController } from "./interface/ihome.controller";

@controller("")
export class HomeController implements IHomeController {
  @httpGet("/")
  public async get(req: Request, res: Response): Promise<number> {
    res.sendFile("./web/dist/index.html");
    return 1;
  }
}
