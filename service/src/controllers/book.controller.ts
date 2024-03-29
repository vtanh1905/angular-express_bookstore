import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { Request } from "express";

import { IBookService } from "../services";
import { inject } from "inversify";
import { Pagination, RequestUser } from "../models";
import { authenticateToken } from "../utils/jwt";
import { TYPES } from "../constants";

@controller("/books")
export class BookController {
  constructor(@inject(TYPES.BookService) private bookService: IBookService) {}

  @httpGet("/")
  public async get(req: Request): Promise<any> {
    const { limit, page } = req.query as unknown as Pagination;
    return {
      data: await this.bookService.getAll({ limit, page }),
      limit,
      page,
      length: await this.bookService.getLength(),
    };
  }

  @httpPost("/", authenticateToken)
  public async create(req: RequestUser): Promise<any> {
    return this.bookService.addPost(req.body);
  }

  @httpPut("/", authenticateToken)
  public async update(req: Request): Promise<any> {
    return this.bookService.updatePost(req.body);
  }

  @httpDelete("/:id", authenticateToken)
  public async delete(req: Request): Promise<any> {
    return this.bookService.deletePost(req.params.id);
  }
}
