import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";

@controller("")
export class HomeController {
  constructor() {}

  @httpGet("/")
  public async get(req: Request, res: Response): Promise<number> {
    res.sendFile("./web/dist/index.html");
    return 1;
  }
}
