import { controller, httpGet } from "inversify-express-utils";
import { Request,Response } from "express";

@controller("")
export class HomeController {
  @httpGet("/")
  public async get(req: Request, res: Response): Promise<any> {
    res.sendFile('../web-application/index.html');
    // return "Home";
  }
}
