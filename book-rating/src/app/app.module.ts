import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksModule } from './books/books.module';
import { AuthService } from './books/shared/auth.service';
import { TokenInterceptor } from './books/shared/token-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BooksModule,
    HttpClientModule // ACHTUNG: Ausnahme, HTTP wird ganz oben importiert
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptor,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule {

  // constructor(public auth: AuthService) {
  //   this.auth.handleAuthentication();
  // }
}
