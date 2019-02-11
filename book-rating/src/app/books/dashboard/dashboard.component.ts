import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { AuthService } from '../shared/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = []; // Array<string>

  constructor(private service: BookStoreService,
    public o: OAuthService) {

  }

  login() {
    this.o.initImplicitFlow();
  }

  logout() {
    this.o.logOut();
  }

  get isLoggedIn() {
    return this.o.hasValidAccessToken();
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(books => this.books = books);
  }

  updateAndSort(book: Book) {
    this.books = this.books
      .map(b => b.isbn === book.isbn ? book : b)
      .sort((a, b) => b.rating - a.rating);

  }

  addBook(book: Book) {
    this.books = [...this.books, book];
  }
}
