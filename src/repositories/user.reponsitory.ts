import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import { Schema, InferSchemaType, Types } from "mongoose";

import { MongooseConnection } from "../utils/mongoose/mongooseConnection";
import { BaseReponsitory } from "./base.reponsitory";
import { TYPES } from "../constants";

const schema = new Schema(
  {
    _id: Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export type User = InferSchemaType<typeof schema>;

@fluentProvide(TYPES.UserReponsitory).inSingletonScope().done()
export class UserReponsitory extends BaseReponsitory<User> {
  constructor(
    @inject(TYPES.MongooseConnection)
    private mongooseConnection: MongooseConnection
  ) {
    super();
    this.model = this.mongooseConnection.connection.model(
      (this.modelName = "users"),
      schema
    );
  }

  public findByEmail(email: string): Promise<User | object> {
    return this.model.find({ email }).exec();
  }
}
