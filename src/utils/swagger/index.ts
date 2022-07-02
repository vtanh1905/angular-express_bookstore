import { Express } from "express";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('../../../swagger.json');

module.exports = (app: Express) => {
  app.use(
    "/api",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
};