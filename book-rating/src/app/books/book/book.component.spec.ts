import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  let rateUpWasCalled;
  const ratingMock = {
    rateUp: () => { rateUpWasCalled = true; },
    rateUpAllowed: () => { },
    rateDownAllowed: () => { }
  };

  beforeEach(async(() => {
    rateUpWasCalled = false;
    TestBed.configureTestingModule({
      declarations: [
        BookComponent
      ],
      providers: [{
        provide: BookRatingService,
        useValue: ratingMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = {
      isbn: '00',
      title: 'asdasd',
      description: 'adsasdad',
      rating: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward the rateUp call to the book rating service', () => {
    component.rateUp();
    expect(rateUpWasCalled).toBe(true);
  });
});
