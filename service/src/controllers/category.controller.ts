import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { Request } from "express";

import { CategoryService } from "../services";
import { inject } from "inversify";
import { TYPES } from "../constants";
import { Category } from "../repositories";

@controller("/category")
export class CategoryController {
  constructor(@inject("CategoryService") private categoryService: CategoryService) {}

  @httpGet("/")
  public async get(req: Request): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @httpPost("/")
  public async post(req: Request): Promise<Category> {
    return this.categoryService.addCategory(req.body);
  }
}
