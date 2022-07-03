import { Request } from "express";

import { RequestUser } from "../../../entity";
import { User } from "../../../models";

export interface IUserController {
  register(req: Request): Promise<User>;
  login(req: Request): Promise<string>;
  jwtToken(req: RequestUser): any;
}