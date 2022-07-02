import { Book } from "../models";
import { Request } from "express";
export type BookPagination = {
  data: Book[];
  limit: number;
  page: number;
  length: number;
};

export type Pagination = {
  limit : number;
  page: number;
}

export type CartItem = {
  _id: string;
  count: number;
}

export interface RequestUser extends Request {
  user?: any,
}