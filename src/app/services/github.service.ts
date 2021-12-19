import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { GitHubResponse } from '../entities/GitHubResponse';
import { Item } from '../entities/Item';
import { GitHubUser } from '../entities/GitHubUser';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private apiSearchUrl = '/search/users';
  private apiUserUrl = '/users';

  constructor(private http: HttpClient) { }

  getUsers(filter: string, page: number = 1 ): Observable<GitHubResponse> {
    const url = `${this.apiUrl}${this.apiSearchUrl}?q=${filter} in:name type:user&per_page=4&page=${page}`;
    return this.http.get<any>(url)
      .pipe(
        map((response: any) => {
          let items: any[] = response.items;

          let parsedItems = items.map(item => new Item(item.id, item.login));
          response.items = parsedItems;

          return response;
        }),
        catchError(this.handleError)
      );
  }

  getCompanies(filter: string, page: number = 1 ): Observable<GitHubResponse> {
    const url = `${this.apiUrl}${this.apiSearchUrl}?q=${filter} in:name type:org&per_page=4&page=${page}`;
    return this.http.get<any>(url)
      .pipe(
        map((response: any) => {
          let items: any[] = response.items;

          let parsedItems = items.map(item => new Item(item.id, item.login));
          response.items = parsedItems;

          return response;
        }),
        catchError(this.handleError)
      );
  }

  getUser(user: GitHubUser): Observable<GitHubUser> {
    const url = `${this.apiUrl}${this.apiUserUrl}/${user.login}`;
    return this.http.get<GitHubUser>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
