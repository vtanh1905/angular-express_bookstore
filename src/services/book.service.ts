import { provide } from "inversify-binding-decorators";

import { Book, BookModel, Pagination, CartItem } from "../models";
import { IBookService } from "./interfaces/ibook.service";
import { TYPES } from "../constants";

@provide(TYPES.BookService)
export class BookService implements IBookService {
  constructor() {}

  public getAll(pagination: Pagination): Promise<Book[]> {
    return new Promise<Book[]>(async (resolve, reject) => {
      resolve(
        await BookModel.find({})
          .limit(pagination.limit)
          .skip(pagination.page * pagination.limit)
          .exec()
      );
    });
  }

  public getLength(): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      resolve(await BookModel.count().exec());
    });
  }

  public addPost(book: Book): Promise<Book> {
    return new Promise<Book>(async (resolve, reject) => {
      const newBook = new BookModel(book);
      resolve(newBook.save());
    });
  }

  public updatePost(book: Book): Promise<Book> {
    return new Promise<Book>(async (resolve, reject) => {
      try {
        const bookWillUpdate = await BookModel.findOne({ _id: book._id });

        if (bookWillUpdate === null) {
          reject(Error("The book is not exits"));
          return;
        }
        if (book !== null) {
          bookWillUpdate.overwrite({
            ...bookWillUpdate,
            ...book,
          });
        }
        resolve(await bookWillUpdate.save());
      } catch (error) {
        reject(error);
      }
    });
  }

  public deletePost(id: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const book = await BookModel.findById(id);
      if (book === null) {
        reject(Error("The book is not exits"));
      }

      resolve(await BookModel.deleteOne({ _id: id }));
    });
  }

  public updateManyQuality(arr: CartItem[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        console.log(arr);
        for (let i = 0; i < arr.length; ++i) {
          const bookWillUpdate = await BookModel.findOne({ _id: arr[i]._id });
          if (bookWillUpdate === null) {
            continue;
          }
          bookWillUpdate.overwrite({
            title: bookWillUpdate.title,
            category: bookWillUpdate.category,
            image: bookWillUpdate.image,
            price: bookWillUpdate.price,
            description: bookWillUpdate.description,
            quantity: bookWillUpdate.quantity - arr[i].count,
          });
          await bookWillUpdate.save();
        }
        resolve("Done");
      } catch (error) {
        reject(error);
      }
    });
  }
}
