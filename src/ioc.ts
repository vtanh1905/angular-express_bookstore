import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { RequestHandler } from "express";

import "./controllers";
import "./services";

import { controllerBookFactory, controllerUserFactory } from "./controllers";
import { authenticateToken } from "./utils/jwt";

// set up container
let container = new Container();

// when a module is loaded @provide() will automatically register(or binding) it and use buildProviderModule to active this feature 
container.load(buildProviderModule());


// defined middleware
container
  .bind<RequestHandler>("authenticateToken")
  .toConstantValue(authenticateToken);
// controllers have Middleware
controllerBookFactory(container);
controllerUserFactory(container);

export default container;
