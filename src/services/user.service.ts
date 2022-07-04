import { provide } from "inversify-binding-decorators";
import bcrypt from "bcryptjs";

import { User, UserModel } from "../models";
import { generateAccessToken } from "../utils/jwt";
import { IUserService } from "./interfaces/iuser.service";
import { TYPES } from "../constants";

@provide(TYPES.UserService)
export class UserService implements IUserService {
  constructor() {}

  public newUser(user: User): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const newUser = new UserModel(user);

      // Email Validator
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/g.test(user.email)) {
        reject("Email is invaild");
      }

      // Password Validator
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+=-])[A-Za-z\d@`~!@#$%^&*()_+=-]{8,}$/g.test(
          user.password
        )
      ) {
        reject("Password is invaild");
      }

      // Check User Exist
      const checkUserExits: any = await UserModel.findOne({
        email: user.email,
      }).exec();
      if (checkUserExits !== null) {
        reject("Username is exits");
      }

      // Hash password
      newUser.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

      resolve(newUser.save());
    });
  }

  public getJwtToken(user: User): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const checkUserExits: any = await UserModel.findOne({
        email: user.email,
      }).exec();

      if (checkUserExits === null) {
        reject("Username or Password is not correct");
      }

      if (
        bcrypt.compareSync(user.password, checkUserExits.password) === false
      ) {
        reject("Username or Password is not correct");
      }

      resolve(
        generateAccessToken({
          _id: checkUserExits._id,
          email: checkUserExits.email,
        })
      );
    });
  }

  public login(user: User): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const checkUserExits: any = await UserModel.findOne({
        email: user.email,
      }).exec();

      if (checkUserExits === null) {
        reject("Username or Password is not correct");
      }

      if (
        bcrypt.compareSync(user.password, checkUserExits.password) === false
      ) {
        reject("Username or Password is not correct");
      }

      resolve({
        user: {
          _id: checkUserExits._id,
          email: checkUserExits.email,
        },
        token: generateAccessToken({
          _id: checkUserExits._id,
          email: checkUserExits.email,
        }),
      });
    });
  }
}
