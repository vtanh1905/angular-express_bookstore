import { Application } from "express";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("yamljs").load("./swagger.yaml");

export function applySwagger(app: Application) {
  app.use(
    "/api",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
}
