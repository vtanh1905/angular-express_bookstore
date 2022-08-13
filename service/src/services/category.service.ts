import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";

import { TYPES } from "../constants";
import { Category, CategoryReponsitory } from "../repositories";

@provide("CategoryService")
export class CategoryService{
  constructor(
    @inject("CategoryReponsitory") private categoryReponsitory: CategoryReponsitory
  ) {}

  public getAll() : Promise<Category[]> {
    return this.categoryReponsitory.find();
  }

  public addCategory(category: Category): Promise<Category> {
    return this.categoryReponsitory.create(category);
  }
}
