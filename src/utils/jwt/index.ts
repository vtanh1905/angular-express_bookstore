import * as jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

import { RequestUser } from "../../models";
import { env } from '../../constants';

export function generateAccessToken(json: Object) {
  return jwt.sign(json, env.JWT_TOKEN_SECRET, { expiresIn: "180000s" });
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

  jwt.verify(token, env.JWT_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
