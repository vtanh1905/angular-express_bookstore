import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { Request, RequestHandler } from "express";
import { BookService } from "../services";
import { inject, Container } from "inversify";
import { BookPagination, Pagination } from "../entity";
import { Book } from "../models";
import { RequestUser } from "../entity";

export function controllerBookFactory(container: Container) {
  @controller("/books")
  class BookController {
    constructor(@inject("BookService") private bookService: BookService) {}

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

    @httpPost("/", container.get<RequestHandler>("authenticateToken"))
    public async create(req: RequestUser): Promise<Book> {
      return this.bookService.addPost(req.body);
    }

    @httpPut("/", container.get<RequestHandler>("authenticateToken"))
    public async update(req: Request): Promise<Book> {
      return this.bookService.updatePost(req.body);
    }

    @httpDelete("/:id", container.get<RequestHandler>("authenticateToken"))
    public async delete(req: Request): Promise<any> {
      return this.bookService.deletePost(req.params.id);
    }
  }

  return BookController;
}
