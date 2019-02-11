import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = []; // Array<string>

  constructor(private service: BookStoreService, private auth: AuthService) { }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
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
