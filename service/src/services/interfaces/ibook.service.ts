import { Pagination, CartItem } from "../../models";
import { Book, } from "../../repositories";

export interface IBookService {
  getAll(pagination: Pagination): Promise<Book[]>;
  getLength(): Promise<number>;
  addPost(book: Book): Promise<Book>;
  updatePost(book: Book): Promise<Book>;
  addPost(book: Book): Promise<Book>;
  deletePost(id: string): Promise<any>;
  updateManyQuality(arr: CartItem[]): Promise<any>;
}
