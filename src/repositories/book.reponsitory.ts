import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import { Schema, InferSchemaType, Types } from "mongoose";
import { MongooseConnection } from "../utils/mongoose";
import { BaseReponsitory } from "./base.reponsitory";
import { TYPES } from "../constants";

const schema = new Schema(
  {
    _id: Types.ObjectId,
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["drama", "comedy", "sport"],
    },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

export type Book = InferSchemaType<typeof schema>;

@fluentProvide(TYPES.BookReponsitory).inSingletonScope().done()
export class BookReponsitory extends BaseReponsitory<Book> {
  constructor(
    @inject(TYPES.MongooseConnection) private mongooseConnection: MongooseConnection
  ) {
    super();
    this.model = this.mongooseConnection.connection.model(
      this.modelName,
      schema
    );
  }
}
