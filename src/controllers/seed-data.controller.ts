import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { SeedDataService } from "../utils";

@controller("/seed-data")
export class SeedDataController{
  constructor(
    @inject("SeedDataService") private seedDataService: SeedDataService
  ) {}

  @httpGet("")
  public async get(req: Request, res: Response): Promise<any> {
    return this.seedDataService.run();
  }
}
