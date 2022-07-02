import { Express } from "express";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('yamljs').load('./swagger.yaml');;

module.exports = (app: Express) => {
  app.use(
    "/api",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
};