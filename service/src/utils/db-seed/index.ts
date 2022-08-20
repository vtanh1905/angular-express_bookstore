import { inject } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import faker from 'faker';
faker.locale = "vi"

import { TYPES } from "../../constants";
import { Book, BookReponsitory, UserReponsitory } from "../../repositories";

@fluentProvide("SeedDataService").inSingletonScope().done()
export class SeedDataService {
  constructor(
    @inject(TYPES.BookReponsitory) private bookReponsitory: BookReponsitory,
    @inject(TYPES.UserReponsitory) private userReponsitory: UserReponsitory
  ) {}

  private seedUsers(): Promise<any> {
    return this.userReponsitory.create({
      email: "admin",
      password: "123123",
    });
  }

  private seedBooks(): Promise<any> {
    const dataBook : Book[] = [];
    const categories : string[] = ["630067689ce97c5fcb8fc932", "630067719ce97c5fcb8fc934", "630067939ce97c5fcb8fc936"];
    for(let i = 0; i <= 20; ++i){
      dataBook.push({
        title: faker.name.title(),
        image:  faker.image.imageUrl(),
        category: categories[faker.datatype.number({min: 0, max: 2})] as any,
        quantity: faker.datatype.number(100),
        price: faker.datatype.number({min: 100000, max: 10000000}).toString(),
        description: faker.lorem.paragraph()
      })
    }
    return this.bookReponsitory.insertMany(dataBook);
  }

  run(): Promise<any> {
    return Promise.all([this.seedBooks()]);
  }
}
