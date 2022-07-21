import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";

@controller("/seed-data")
export class SeedDataController{
  constructor() {}

  @httpGet("")
  public async get(req: Request, res: Response): Promise<number> {
    res.send("Hello")
    return 1;
  }
}
