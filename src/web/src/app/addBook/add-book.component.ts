import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputBook } from '../books/book.model';
import { BooksService } from '../books/books.service';
import { UserService } from '../shared/user/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
})
export class AddBookComponent {
  constructor(
    private bookService: BooksService,
    private userService: UserService,
    private router: Router
  ) {}
  // book: InputBook = {
  //   title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
  //   image:
  //     'https://salt.tikicdn.com/cache/400x400/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu-u547-d20161012-t113832-888179.u3059.d20170616.t095744.390222.jpg.webp',
  //   category: 'drama',
  //   quantity: 22,
  //   price: '70400',
  //   description: `Bạn hối tiếc vì không nắm bắt lấy một cơ hội nào đó, chẳng có ai phải mất ngủ.
  //   Bạn trải qua những ngày tháng nhạt nhẽo với công việc bạn căm ghét, người ta chẳng hề bận lòng.
  //   Bạn có chết mòn nơi xó tường với những ước mơ dang dở, đó không phải là việc của họ.
  //   Suy cho cùng, quyết định là ở bạn. Muốn có điều gì hay không là tùy bạn.
  //   Nên hãy làm những điều bạn thích. Hãy đi theo tiếng nói trái tim. Hãy sống theo cách bạn cho là mình nên sống.
  //   Vì sau tất cả, chẳng ai quan tâm."`,
  // };
  book : InputBook = {
    title: '',
    image: '',
    category: 'drama',
    quantity: 0,
    price: '0',
    description: ''
  };

  ngOnInit() {
    if (this.userService.user._id === '') {
      this.router.navigate(['/']);
    }
  }

  onButtonCreate() {
    // Check empty
    if (
      this.book.title === '' ||
      this.book.image === '' ||
      this.book.category === '' ||
      this.book.quantity === null ||
      this.book.price === null ||
      this.book.description === ''
    ) {
      alert('Please enter full infomation!');
      return;
    }
    this.bookService
      .add(this.book)
      .pipe(
        tap({
          error: () => alert('Username or Password is not correct'),
        })
      )
      .subscribe((res) => {
        alert("Add Book Successfully!"),
        this.router.navigate(['/']);
      });
  }
}

//localStorage.getItem('token')
