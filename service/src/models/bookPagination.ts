import { Book } from "../repositories";

export type Pagination = {
  limit : number;
  page: number;
}

export type BookPagination = {
  data: Book[];
  limit: number;
  page: number;
  length: number;
};
