import { Request } from "express";

import { BookPagination, RequestUser  } from "../../../entity";
import { Book } from "../../../models";


export interface IBookController {
  get(req: Request): Promise<BookPagination>;
  create(req: RequestUser): Promise<Book>;
  update(req: Request): Promise<Book>;
  delete(req: Request): Promise<any>;
}