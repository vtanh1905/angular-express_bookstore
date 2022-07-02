import { controller, httpGet } from "inversify-express-utils";

import { ICategoryController } from "./interface/icategory.controller";


@controller("/category")
export class CategoryController implements ICategoryController {
  constructor() {}

  @httpGet("/")
  public async getAll(): Promise<string> {
    return "This is a category";
  }
}
