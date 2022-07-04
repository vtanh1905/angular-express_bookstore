import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";

import { Pagination, CartItem } from "../models";
import { IBookService } from "./interfaces/ibook.service";
import { TYPES } from "../constants";
import { Book, BookReponsitory } from "../repositories";

@provide(TYPES.BookService)
export class BookService implements IBookService {
  constructor(
    @inject("BookReponsitory") private bookReponsitory: BookReponsitory
  ) {}

  public getAll(pagination: Pagination): Promise<Book[]> {
    return this.bookReponsitory.find(
      pagination.limit,
      pagination.page * pagination.limit
    );
  }

  public getLength(): Promise<number> {
    return this.bookReponsitory.count();
  }

  public addPost(book: Book): Promise<Book> {
    return this.bookReponsitory.create(book);
  }

  public updatePost(book: Book): Promise<Book> {
    return new Promise<Book>(async (resolve, reject) => {
      try {
        const bookWillUpdate = await this.bookReponsitory.findOne(book._id);

        if (bookWillUpdate === null) {
          reject(Error("The book is not exits"));
          return;
        }
        resolve(await this.bookReponsitory.updateOne(book));
      } catch (error) {
        reject(error);
      }
    });
  }

  public deletePost(id: any): Promise<any> {
    return this.bookReponsitory.deleteOne(id);
  }

  public updateManyQuality(arr: CartItem[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        for (let i = 0; i < arr.length; ++i) {
          const bookWillUpdate = await this.bookReponsitory.findOne(arr[i]._id);
          if (bookWillUpdate === null) {
            continue;
          }
          await this.bookReponsitory.updateOne(bookWillUpdate as Book);
        }
        resolve("Done");
      } catch (error) {
        reject(error);
      }
    });
  }
}
