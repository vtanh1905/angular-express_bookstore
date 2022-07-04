import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { IHomeController } from "./interfaces/ihome.controller";
import { inject } from "inversify";
import { BookReponsitory } from "../repositories/book.reponsitory";


@controller("")
export class HomeController implements IHomeController {
  constructor(@inject("BookReponsitory") private bookReponsitory: BookReponsitory) {}

  @httpGet("/")
  public async get(req: Request, res: Response): Promise<number> {
    res.sendFile("./web/dist/index.html");
    return 1;
  }

  @httpGet("/test")
  public async test() : Promise<any>{
    return "Test";
  }

  @httpGet("/test-reponsitory")
  public async testReponsitory() : Promise<any>{
    return this.bookReponsitory.findAll();
  }
}
