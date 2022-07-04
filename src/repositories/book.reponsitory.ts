import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import { Model, Schema, InferSchemaType, Types } from "mongoose";
import { MongooseConnection } from "../utils/mongoose/mongooseConnection";

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

@fluentProvide("BookReponsitory").inSingletonScope().done()
export class BookReponsitory {
  private modelName: string = "books";
  private model: Model<Book>;

  constructor(
    @inject("MongooseConnection") private mongooseConnection: MongooseConnection
  ) {
    this.model = this.mongooseConnection.connection.model(
      this.modelName,
      schema
    );
  }

  public find(limit: number = 255, skip: number = 0): Promise<Book[]> {
    return this.model.find({}).limit(limit).skip(skip).exec();
  }

  public findOne(_id: any): Promise<Book | object> {
    return this.model.find({ _id }).exec();
  }

  public count(): Promise<number> {
    return this.model.count().exec();
  }

  public create(book: Book): Promise<any> {
    return this.model.create({_id : new Types.ObjectId(undefined), ...book})
  }

  public deleteOne(_id: string): Promise<any> {
    return this.model.deleteOne({ _id }).exec();
  }

  public updateOne(book: Book): Promise<any> {
    return this.model.updateOne({ _id: book._id }, book).exec();
  }
}
