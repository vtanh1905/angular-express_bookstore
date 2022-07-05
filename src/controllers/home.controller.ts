import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { IHomeController } from "./interfaces/ihome.controller";
import { inject } from "inversify";
import { Book, BookReponsitory } from "../repositories/book.reponsitory";
import { UserReponsitory } from "../repositories";
import { User } from "../models";

@controller("")
export class HomeController implements IHomeController {
  constructor(
    @inject("BookReponsitory") private bookReponsitory: BookReponsitory,
    @inject("UserReponsitory") private userReponsitory: UserReponsitory
  ) {}

  @httpGet("/")
  public async get(req: Request, res: Response): Promise<number> {
    res.sendFile("./web/dist/index.html");
    return 1;
  }

  @httpGet("/test")
  public async test(): Promise<any> {
    return "Test";
  }

  @httpGet("/find")
  public async testFind(): Promise<User[]> {
    return this.userReponsitory.find();
  }

  @httpGet("/create")
  public async testCreate(): Promise<any> {
    let book: Book = {
      title: "Mama boy",
      image:
        "https://salt.tikicdn.com/cache/400x400/ts/product/49/18/9f/89c33fa7cd5cad9ee596cddeb812700d.jpg.webp",
      category: "comedy",
      quantity: 33,
      price: "145000",
      description:
        "Con người là một sinh vật xã hội, điều đó có nghĩa là chúng ta không thể sống và làm việc một mình. Ngay từ khi sinh ra, chúng ta đã gắn mình với một nhóm cơ bản nhất : Gia đình. Sau đó khi lớn hơn, bước vào nhà trường chúng ta sẽ có những người bạn và nếu phù hợp sẽ tạo thành các nhóm bạn.Bản thân chúng ta với năng lực và tính cách sẽ có những ảnh hưởng lên nhóm, đồng thời cũng chịu những tác động của bạn bè cả về điều tốt lẫn xấu: Gần mực thì đen, gần đèn thì sáng. Nhờ các hoạt động trong nhóm, chúng ta vừa phát triển những kỹ năng cá nhân, thu nạp những kiến thức, kinh nghiệm cho bản thân, đồng thời góp phần vào các hoạt động đem lại những giá trị về vật chất và tinh thần cho tập thể, cộng đồng. Ngay từ xưa, ông bà ta cũng có câu : Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.",
    };
    return this.bookReponsitory.create(book);
  }

  @httpGet("/update")
  public async testUpdate(): Promise<any> {
    let book: Book = {
      _id: "62c23e928b0b668a31755b4c",
      title: "Con Kem Qua Map 123",
      image:
        "https://salt.tikicdn.com/cache/400x400/ts/product/49/18/9f/89c33fa7cd5cad9ee596cddeb812700d.jpg.webp",
      category: "comedy",
      quantity: 33,
      price: "145000",
      description:
        "Con người là một sinh vật xã hội, điều đó có nghĩa là chúng ta không thể sống và làm việc một mình. Ngay từ khi sinh ra, chúng ta đã gắn mình với một nhóm cơ bản nhất : Gia đình. Sau đó khi lớn hơn, bước vào nhà trường chúng ta sẽ có những người bạn và nếu phù hợp sẽ tạo thành các nhóm bạn.Bản thân chúng ta với năng lực và tính cách sẽ có những ảnh hưởng lên nhóm, đồng thời cũng chịu những tác động của bạn bè cả về điều tốt lẫn xấu: Gần mực thì đen, gần đèn thì sáng. Nhờ các hoạt động trong nhóm, chúng ta vừa phát triển những kỹ năng cá nhân, thu nạp những kiến thức, kinh nghiệm cho bản thân, đồng thời góp phần vào các hoạt động đem lại những giá trị về vật chất và tinh thần cho tập thể, cộng đồng. Ngay từ xưa, ông bà ta cũng có câu : Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.",
    };
    return this.bookReponsitory.updateOne(book._id, book);
  }
}
