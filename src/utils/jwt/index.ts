import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { RequestUser } from "../../entity";

export function generateAccessToken(json: Object) {
  return jwt.sign(json, "TOKEN_SECRET", { expiresIn: "180000s" });
}

export function authenticateToken(
  req: RequestUser,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  const arrParamsHeader = authHeader && authHeader.split(" ");

  let token = "";
  if (arrParamsHeader && arrParamsHeader.length === 1) {
    token = arrParamsHeader[0];
  }

  if (arrParamsHeader && arrParamsHeader.length === 2) {
    token = arrParamsHeader[1];
  }

  jwt.verify(token, "TOKEN_SECRET", (err: any, user: any) => {
    // console.log(err)

    if (err) return res.sendStatus(403);
    req.user = user;

    next();
  });
}
