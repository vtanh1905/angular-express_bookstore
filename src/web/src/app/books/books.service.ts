import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, InputBook } from './book.model';

@Injectable()
export class BooksService  {
  constructor(private http: HttpClient) { }

  private URL : string = 'http://localhost:3000/books';

  getAll(limit : number, page: number){
    return this.http.get(`${this.URL}?limit=${limit}&page=${page}`)   
  }

  add(book: InputBook){
    return this.http.post(`${this.URL}`, book, {
      headers: {
        Authorization: "" + localStorage.getItem('token'),
      },
    });
  }
}