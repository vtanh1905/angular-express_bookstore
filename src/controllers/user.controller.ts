import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { Request } from "express";

import { UserService } from "../services/user.service";
import { User } from "../models";
import { RequestUser } from "../entity";
import { authenticateToken } from "../utils/jwt";

@controller("")
export class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

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
