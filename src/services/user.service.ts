import { provide } from "inversify-binding-decorators";
import bcrypt from "bcryptjs";
import { inject } from "inversify";

import { generateAccessToken } from "../utils/jwt";
import { IUserService } from "./interfaces/iuser.service";
import { TYPES } from "../constants";
import { User, UserReponsitory } from "../repositories";

@provide(TYPES.UserService)
export class UserService implements IUserService {
  constructor(
    @inject("UserReponsitory") private userReponsitory: UserReponsitory
  ) {}

  public newUser(user: User): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      // Email Validator
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/g.test(user.email)) {
        reject("Email is invaild");
        return;
      }

      // Password Validator
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+=-])[A-Za-z\d@`~!@#$%^&*()_+=-]{8,}$/g.test(
          user.password
        )
      ) {
        reject("Password is invaild");
        return;
      }

      // Check User Exist
      const checkUserExits: User[] = (await this.userReponsitory.findByEmail(
        user.email
      )) as User[];
      if (checkUserExits.length > 0) {
        reject("The account is exist");
        return;
      }

      // Hash password
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

      resolve(await this.userReponsitory.create(user));
    });
  }

  public getJwtToken(user: User): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const checkUserExits: User[] = (await this.userReponsitory.findByEmail(
        user.email
      )) as User[];

      if (checkUserExits.length > 0) {
        reject("Username or Password is not correct");
        return;
      }

      if (
        bcrypt.compareSync(user.password, checkUserExits[0].password) === false
      ) {
        reject("Username or Password is not correct");
        return;
      }

      resolve(
        generateAccessToken({
          _id: checkUserExits[0]._id,
          email: checkUserExits[0].email,
        })
      );
    });
  }

  public login(user: User): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const checkUserExits: User[] = (await this.userReponsitory.findByEmail(
        user.email
      )) as User[];

      if (checkUserExits.length === 0) {
        reject("Username or Password is not correct");
        return;
      }

      if (
        bcrypt.compareSync(user.password, checkUserExits[0].password) === false
      ) {
        reject("Username or Password is not correct");
        return;
      }

      resolve({
        user: {
          _id: checkUserExits[0]._id,
          email: checkUserExits[0].email,
        },
        token: generateAccessToken({
          _id: checkUserExits[0]._id,
          email: checkUserExits[0].email,
        }),
      });
    });
  }
}
