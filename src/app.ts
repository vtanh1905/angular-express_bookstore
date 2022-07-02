import "reflect-metadata";
import { Application } from "express";

import server from "./server";

let app: Application = server.build();
app.listen(3000, () => {
  console.log("Server started on port 3000 :)");
});
