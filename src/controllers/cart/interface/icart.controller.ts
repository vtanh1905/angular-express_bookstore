import { Request } from "express";

export interface ICartController {
  cart(req: Request) : Promise<any>;
}