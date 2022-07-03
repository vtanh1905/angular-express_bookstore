import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import * as express from "express";

import container from "./ioc";

// Connect Database
import "./utils/mongoose";

// ================== create server =========================
let server = new InversifyExpressServer(container);
server.setConfig((app: express.Application): void => {
  // add body parser
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());
  require("./utils/swagger")(app); // Config Swagger

  //Static Web Application HTML
  app.use(express.static("./src/web/dist"));
});
// ================== create server =========================

export default server;
