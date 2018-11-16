import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';
import { retry, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('https://api.angular.schule/books')
      .pipe(
        retry(3),
        map(books => books.filter(b => b.title !== 'jQuery'))
      );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>('https://api.angular.schule/book/' + isbn);
  }
}
