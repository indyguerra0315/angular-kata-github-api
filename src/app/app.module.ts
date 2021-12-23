import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './interceptor/httpErrorInterceptor';
import { SortDirective } from './directive/sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    SearchInputComponent,
    ListItemComponent,
    ListComponent,
    UsersListComponent,
    CompaniesListComponent,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
