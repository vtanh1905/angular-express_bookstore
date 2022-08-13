import "reflect-metadata";
import { Application } from "express";

import server from "./server";
import { env } from "./constants";

let app: Application = server.build();
app.listen(env.PORT, () => {
  console.log(`=====================================`);
  console.log(`Server started on port ${env.PORT} :)`);
  console.log(`=====================================`);
});
