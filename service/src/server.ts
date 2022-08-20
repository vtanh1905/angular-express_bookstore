import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import * as express from "express";
import cors from 'cors';


import container from "./ioc";
import { applySwagger } from "./utils/swagger";
import { env } from "./constants";

let server = new InversifyExpressServer(container);
server.setConfig((app: express.Application): void => {
  // Config Body Parser
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  
  // Config Swagger
  applySwagger(app); 

  // Config Cors
  app.use(cors({
    origin: env.URL_SITE
  }))
});

export default server;
