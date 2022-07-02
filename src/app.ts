import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as express from "express";
import { Container } from "inversify";
import { controller, InversifyExpressServer } from "inversify-express-utils";

// Connect Database
import "./utils/mongoose";

// declare metadata by @controller annotation
import "./controllers";
import { controllerBookFactory, controllerUserFactory } from "./controllers";
import { BookService, UserService } from "./services";

import { authenticateToken } from "./utils/jwt";

// set up container
let container = new Container();

// set up bindings
container.bind<UserService>("UserService").to(UserService);
container.bind<BookService>("BookService").to(BookService);

// set up middleware
container
  .bind<express.RequestHandler>("authenticateToken")
  .toConstantValue(authenticateToken);

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  require("./utils/swagger")(app); // Config Swagger

  //Static Web Application HTML
  app.use(express.static('./web-application'))
});


controllerBookFactory(container);
controllerUserFactory(container);

let app = server.build();
app.listen(3000);
console.log("Server started on port 3000 :)");
