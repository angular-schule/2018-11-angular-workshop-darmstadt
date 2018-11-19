import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { map, filter, mergeMap, retry, share, concatMap, switchMap, tap, catchError } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book>;
  constructor(private route: ActivatedRoute, private service: BookStoreService) { }

  ngOnInit() {

    //#region
    // Observer!
    const observer = {
      next: marble => console.log('SUCCESS: ', marble),
      error: e => console.error('ERROR: ', e),
      complete: () => console.log('complete')
    };

    // Observable
    const myObservable$ = new Observable<number>(myObserver1 => {

      myObserver1.next(1);
      myObserver1.next(2);
      myObserver1.next(3);
      myObserver1.next(4);

      setTimeout(() => myObserver1.next(5), 1000);

      // setTimeout(() => myObserver1.error(6), 2000);
      setTimeout(() => myObserver1.complete(), 2000);
    });

    // Subscription!
    const subscription = myObservable$
      .pipe(
        map((marble) => marble * 10),
        filter(m => m < 40)
      )
      .subscribe(observer);

    setTimeout(() => subscription.unsubscribe(), 3000);
    //#endregion

    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      switchMap(isbn => this.service.getSingle(isbn)
        .pipe(
          catchError(e => of({
            title: 'sorry',
            description: 'kein buch da',
            isbn: '000',
            rating: 5
          }))
        )
      )
    );
  }
}
