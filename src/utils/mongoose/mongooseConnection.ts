import { fluentProvide } from "inversify-binding-decorators";
import { Connection, createConnection, ConnectOptions } from "mongoose";

@fluentProvide("MongooseConnection").inSingletonScope().done()
export class MongooseConnection {
  public connection: Connection;
  private readonly connectString: string = `mongodb://root:123456@mongodb:27017/expressjs-inversity-practise`;
  private readonly connectOption: ConnectOptions = {
    authSource: "admin",
  };
  constructor() {
    this.connection = createConnection(this.connectString, this.connectOption);
    console.log("Connect Database Successfully");
  }
}
