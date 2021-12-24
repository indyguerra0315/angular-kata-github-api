import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchInputComponent } from './shared/components/search-input/search-input.component';
import { ListItemComponent } from './shared/components/list-item/list-item.component';
import { ListComponent } from './shared/components/list/list.component';
import { UsersListComponent } from './get-github-users/components/users-list/users-list.component';
import { CompaniesListComponent } from './get-github-org/components/companies-list/companies-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './shared/interceptor/httpErrorInterceptor';
import { SortDirective } from './shared/directive/sort.directive';

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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
