import { Request,Response } from "express";

export interface IHomeController {
  get(req: Request, res: Response): Promise<number>;
}
