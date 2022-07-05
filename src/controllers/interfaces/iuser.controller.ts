import { Request } from "express";

import { RequestUser } from "../../models";
import { User } from "../../repositories";

export interface IUserController {
  register(req: Request): Promise<User>;
  login(req: Request): Promise<string>;
  jwtToken(req: RequestUser): any;
}