import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import { Schema, InferSchemaType, Types } from "mongoose";
import { MongooseConnection } from "../utils/mongoose";
import { BaseReponsitory } from "./base.reponsitory";
import { TYPES } from "../constants";

const schema = new Schema(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

export type Category = InferSchemaType<typeof schema>;

@fluentProvide("CategoryReponsitory").inSingletonScope().done()
export class CategoryReponsitory extends BaseReponsitory<Category> {
  constructor(
    @inject(TYPES.MongooseConnection) private mongooseConnection: MongooseConnection
  ) {
    super();
    this.modelName = "category";
    this.model = this.mongooseConnection.connection.model(
      this.modelName,
      schema, 
      this.modelName
    );
  }
}