import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { Request } from "express";

import { RequestUser } from "../models";
import { authenticateToken } from "../utils/jwt";
import { IUserService } from "../services";
import { TYPES } from "../constants";
import { User } from "../repositories";

@controller("")
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: IUserService) {}

  @httpPost("/register")
  public register(req: Request): Promise<User> {
    return this.userService.newUser(req.body);
  }

  @httpPost("/login")
  public login(req: Request): Promise<string> {
    return this.userService.login(req.body);
  }

  @httpPost("/re-login", authenticateToken)
  public jwtToken(req: RequestUser): any {
    return req.user;
  }
}
