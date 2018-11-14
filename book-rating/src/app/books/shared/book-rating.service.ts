import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  private minRating = 1;
  private maxRating = 5;

  rateDown(book: Book) {
    // VORSICHT: shallow copy!
    return {
      ...book,
      rating: Math.max(book.rating - 1, this.minRating)
    };
  }

  rateUp(book: Book) {
    return {
      ...book,
      rating: Math.min(book.rating + 1, this.maxRating)
    };
  }
}
