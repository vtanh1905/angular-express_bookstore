import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import { Model, Schema } from "mongoose";
import { MongooseConnection } from "../utils/mongoose/mongooseConnection";

@fluentProvide("BookReponsitory").inSingletonScope().done()
export class BookReponsitory {
  private schema: Schema = new Schema(
    {
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
  private modelName: string = "books";
  private model: Model<any>;

  constructor(
    @inject("MongooseConnection") private mongooseConnection: MongooseConnection
  ) {
    this.model = this.mongooseConnection.connection.model(
      this.modelName,
      this.schema
    );
  }

  public findAll(): Promise<any> {
    return this.model.find({}).exec();
  }
}
