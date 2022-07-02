import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent {
  books: Book[] = [];
  length: number = 0;
  limit: number = 5;
  page: string = '0';

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.page = this.route.snapshot.queryParamMap.get('page') || '0';
    this.booksService.getAll(this.limit, +this.page).subscribe((res: any) => {
      this.books = res.data;
      this.length = res.length;
    });
  }

  getArrayPagination() {
    const result = [];
    for (let i = 0; i < this.length / this.limit; ++i) {
      result.push(i);
    }
    return result;
  }

  onPaginationPageClick(page: number) {
    this.router.navigate(['/'], { queryParams: { page } });
    this.booksService.getAll(this.limit, page).subscribe((res: any) => {
      this.books = res.data;
      this.length = res.length;
    });
  }

  onPaginationLeftClick() {
    this.page = this.route.snapshot.queryParamMap.get('page') || '0';
    if (+this.page !== 0) {
      this.router.navigate(['/'], { queryParams: { page: +this.page - 1 } });
      this.booksService
        .getAll(this.limit, +this.page - 1)
        .subscribe((res: any) => {
          this.books = res.data;
          this.length = res.length;
        });
    }
  }

  onPaginationRightClick() {
    this.page = this.route.snapshot.queryParamMap.get('page') || '0';
    if (+this.page !== Math.floor(this.length / this.limit)) {
      this.router.navigate(['/'], { queryParams: { page: +this.page + 1 } });
      this.booksService
        .getAll(this.limit, +this.page + 1)
        .subscribe((res: any) => {
          this.books = res.data;
          this.length = res.length;
        });
    }
  }

  onBookItemClick(book : Book) {
    this.router.navigate([`/book`], {
      queryParams: { id : book._id},
      state: book,
    });
  }
}
