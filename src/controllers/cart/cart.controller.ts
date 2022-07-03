import { controller, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { BookService } from "../../services";
import { inject } from "inversify";
import { ICartController } from "./interface/icart.controller";

@controller("/cart")
export class CartController implements ICartController {
  constructor(@inject("BookService") private bookService: BookService) {}
  
  @httpPost("/")
  public async cart(req: Request): Promise<any> {
    return this.bookService.updateManyQuality(req.body.data);
  }
}
