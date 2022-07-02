import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../books/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetalComponent {
  book: Book;
  constructor(private router: Router) {
    this.book = router.getCurrentNavigation()?.extras.state as Book;
  }

  onCartClick() {
    let localStorageString = localStorage.getItem('carts');
    let carts;

    if (typeof localStorageString === 'string') {
      carts = JSON.parse(localStorageString);
    } else {
      carts = [];
    }
    let index ;
    let indexItemAdding = -1;
    if (carts.length !== 0) {
      index = carts.findIndex((item: any) => item._id === this.book._id);
      if (index === -1) {
        carts.push({
          _id: this.book._id,
          title: this.book.title,
          category: this.book.category,
          price: this.book.price,
          count: 1,
        })
        indexItemAdding = carts.length - 1;
      }else {
        carts[index].count += 1;
        indexItemAdding = index;
      }
    }else {
      carts.push({
        _id: this.book._id,
        title: this.book.title,
        category: this.book.category,
        price: this.book.price,
        count: 1,
      });
      indexItemAdding = 0;
    }
    console.log(carts[indexItemAdding].count);
    // Show Notification
    if (this.toast !== undefined) {
      this.toast.nativeElement.classList.add('show');
      this.toast.nativeElement.firstChild.firstChild.innerText = `Successful (Total: ${
        carts[indexItemAdding].count
      })`;
    }

    localStorage.setItem('carts', JSON.stringify(carts));
  }

  @ViewChild('toast') toast: ElementRef | undefined;

  ngAfterViewInit(): void {
    // outputs `I am span`
    console.log();
  }
}
