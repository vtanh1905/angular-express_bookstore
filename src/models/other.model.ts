import { Request } from "express";

export type Pagination = {
  limit : number;
  page: number;
}


export interface RequestUser extends Request {
  user?: any,
}