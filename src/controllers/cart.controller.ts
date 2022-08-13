import { controller, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { BookService } from "../services";
import { inject } from "inversify";

@controller("/cart")
export class CartController {
  constructor(@inject("BookService") private bookService: BookService) {}
  
  @httpPost("/")
  public async cart(req: Request): Promise<any> {
    return this.bookService.updateManyQuality(req.body.data);
  }
}
