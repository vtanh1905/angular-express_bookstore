import { Request } from "express";

import { BookPagination, RequestUser } from "../../models";
import { Book } from "../../repositories";


export interface IBookController {
  get(req: Request): Promise<BookPagination>;
  create(req: RequestUser): Promise<Book>;
  update(req: Request): Promise<Book>;
  delete(req: Request): Promise<any>;
}