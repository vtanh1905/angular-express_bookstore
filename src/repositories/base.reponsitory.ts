import { injectable } from "inversify";
import { Model, Types, Schema, createConnection } from "mongoose";

@injectable()
export abstract class BaseReponsitory<EntityType> {
  protected modelName: string = "base";
  protected model: Model<EntityType> = createConnection().model(
    this.modelName,
    new Schema({ name: String })
  );

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
}
