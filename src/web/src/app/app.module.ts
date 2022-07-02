import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksService } from './books/books.service';
import { BooksComponent } from './books/books.component';
import { FormsModule } from '@angular/forms';

// To Set VND Behind Value
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PaginationActiveDirective } from './shared//pagination/pagination-active.directive';
import { PaginationDirective } from './shared/pagination/pagination.directive';
import { PaginationDisableDirective } from './shared/pagination/pagination-disable.directive';
import { BookDetalComponent } from './bookDetail/book-detail.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './shared/user/user.service';
import { RegisterComponent } from './register/register.component';
import { AddBookComponent } from './addBook/add-book.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    // Components
    BooksComponent,
    BookDetalComponent,
    LoginComponent,
    RegisterComponent,
    AddBookComponent,
    CartComponent,
    // Directive
    PaginationDirective,
    PaginationDisableDirective,
    PaginationActiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BooksService, UserService, CartService,{ provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
