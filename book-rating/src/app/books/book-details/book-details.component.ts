import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  isbn: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    from([1, 2, 3, 4, 5, 6])
      .subscribe(
        marble => console.log(marble),
        e => console.error(e),
        () => console.log('complete')
      );




    // this.isbn = this.route.snapshot.paramMap.get('isbn');

    this.route.paramMap
      .subscribe(params => this.isbn = params.get('isbn'));
  }

}
