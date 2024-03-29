import { User } from "../../repositories";

export interface IUserService {
  newUser(user: User): Promise<User>;
  getJwtToken(user: User): Promise<string>;
  login(user: User): Promise<any>;
}
