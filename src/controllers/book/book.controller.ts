import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { Request } from "express";
import { BookService, IBookService } from "../../services";
import { inject } from "inversify";
import { BookPagination, Pagination } from "../../entity";
import { Book } from "../../models";
import { RequestUser } from "../../entity";
import { authenticateToken } from "../../utils/jwt";
import { IBookController } from "./interface/ibook.controller";

@controller("/books")
export class BookController implements IBookController {
  constructor(@inject("BookService") private bookService: IBookService) {}

  @httpGet("/")
  public async get(req: Request): Promise<BookPagination> {
    const { limit, page } = req.query as unknown as Pagination;
    return {
      data: await this.bookService.getAll({ limit, page }),
      limit,
      page,
      length: await this.bookService.getLength(),
    };
  }

  @httpPost("/", authenticateToken)
  public async create(req: RequestUser): Promise<Book> {
    return this.bookService.addPost(req.body);
  }

  @httpPut("/", authenticateToken)
  public async update(req: Request): Promise<Book> {
    return this.bookService.updatePost(req.body);
  }

  @httpDelete("/:id", authenticateToken)
  public async delete(req: Request): Promise<any> {
    return this.bookService.deletePost(req.params.id);
  }
}
