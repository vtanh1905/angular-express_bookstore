import { Book } from "../repositories";


export type BookPagination = {
  data: Book[];
  limit: number;
  page: number;
  length: number;
};

