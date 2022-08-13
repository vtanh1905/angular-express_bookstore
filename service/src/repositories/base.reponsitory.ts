import { injectable } from "inversify";
import { Model, Types, Schema, createConnection } from "mongoose";
import { IBaseReponsitory } from "./interfaces/ibase.reponsitory";

@injectable()
export abstract class BaseReponsitory<EntityType> implements IBaseReponsitory<EntityType> {
  protected modelName: string = "base";
  protected model: Model<EntityType> = {} as Model<EntityType>;

  constructor() {}

  public find(limit: number = 255, skip: number = 0): Promise<EntityType[]> {
    return this.model.find({}).limit(limit).skip(skip).exec();
  }

  public findOne(_id: any): Promise<EntityType | object> {
    return this.model.find({ _id }).exec();
  }

  public count(): Promise<number> {
    return this.model.count().exec();
  }

  public create(entity: EntityType): Promise<any> {
    return this.model.create({ _id: new Types.ObjectId(undefined), ...entity });
  }

  public deleteOne(_id: string): Promise<any> {
    return this.model.deleteOne({ _id }).exec();
  }

  public updateOne(_id: any, entity: EntityType): Promise<any> {
    return this.model.updateOne({ _id }, entity).exec();
  }

  public insertMany(entities: EntityType[]): Promise<any> {
    return this.model.insertMany(entities);
  }
}
