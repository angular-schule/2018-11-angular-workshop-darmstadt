import { BookRatingService } from './book-rating.service';
import { Book } from './book';

fdescribe('BookRatingService', () => {

  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    service = new BookRatingService();
    book = {
      isbn: '000',
      title: 'Testbuch',
      description: 'Test',
      rating: 3
    };
  });

  // BR-122 - rating of books
  it('shall rate up a book by one', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(4);
  });

  it('shall not be allowed to have a rating greater than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('shall rate down a book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  // BR-122 - rating of books (JH)
  // BR-8678 - blubb (JH)
  it('BR-122: shall not be allowed to have a rating smaller than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  it('should always return a new book instance', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook).not.toBe(book);
  });
});
