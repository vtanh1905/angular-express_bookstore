import { Request } from "express";

import { User, RequestUser } from "../../models";

export interface IUserController {
  register(req: Request): Promise<User>;
  login(req: Request): Promise<string>;
  jwtToken(req: RequestUser): any;
}