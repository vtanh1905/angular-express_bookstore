import { fluentProvide } from "inversify-binding-decorators";
import { Connection, createConnection, ConnectOptions } from "mongoose";

import { env } from "../../constants";

@fluentProvide("MongooseConnection").inSingletonScope().done()
export class MongooseConnection {
  public connection: Connection;
  private readonly connectString: string = `mongodb://${env.MONGO_INITDB_ROOT_USERNAME}:${env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/${env.MONGO_INITDB_DATABASE}`;
  private readonly connectOption: ConnectOptions = {
    authSource: "admin",
  };
  constructor() {
    this.connection = createConnection(this.connectString, this.connectOption);
  }
}
