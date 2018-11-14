import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: string[]; // Array<string>

  constructor() { }

  ngOnInit() {
    this.books = ['Angular 4', 'AngualarJS'];
  }

}
