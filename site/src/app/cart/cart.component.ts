import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Cart } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  constructor(private cartService: CartService, private router: Router) {}
  carts: Cart[] = [];
  totalPrice: string = '0';

  ngOnInit() {
    let cartsString = localStorage.getItem('carts');
    if (cartsString !== null) {
      this.carts = JSON.parse(cartsString) as Cart[];

      //Total Price
      this.totalPrice =
        '' +
        this.carts.reduce((pre, cur) => {
          return pre + cur.count * +cur.price;
        }, 0);
    }
  }

  onAcceptButtonClick() {
    this.cartService
      .cart(this.carts)
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => {
            if(err.status === 200){
              localStorage.removeItem('carts');
              alert("Successfully");
              this.router.navigate(['/']);
            }
          },
        })
      )
      .subscribe();
  }
}
