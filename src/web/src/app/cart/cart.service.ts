import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from './cart.model';

@Injectable()
export class CartService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:3000/cart';

  cart(carts: Cart[]) {
    return this.http.post(this.URL, { data: carts });
  }
}
