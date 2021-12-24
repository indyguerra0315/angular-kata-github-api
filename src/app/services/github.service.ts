import { Injectable } from '@angular/core';
import { Observable, switchMap, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GitHubResponse } from '../entities/GitHubResponse';
import { Item } from '../contracts/Item';
import { GitHubUser } from '../contracts/GitHubUser';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private apiSearchUrl = '/search/users';
  private apiUserUrl = '/users';

  constructor(private http: HttpClient) { }

  getUsers(filter: string, page: number = 1): Observable<GitHubResponse> {

    const url = `${this.apiUrl}${this.apiSearchUrl}?q=${filter} in:name type:user&per_page=4&page=${page}`;

    return this.http.get<any>(url)
      .pipe(
        switchMap((response: any) => {
          // debugger;

          let getUsersData = response.items.map((user: any) => this.getUser(user));

          return forkJoin(getUsersData)
            .pipe(
              map((itemsMerged: any) => {

                let parsedItems = itemsMerged.map(
                  (item: any) => {
                    const newItem: Item = { id: item.id, code: item.login, name: item.name, count: item.public_repos };
                    return newItem;
                  }
                );
                response.items = parsedItems;

                return new GitHubResponse(response.total_count, response.items, page);
              })
              // ,catchError(this.handleError)
            );
        })
        // ,catchError(this.handleError)
      );
  }

  getUser(user: GitHubUser): Observable<GitHubUser> {
    const url = `${this.apiUrl}${this.apiUserUrl}/${user.login}`;
    return this.http.get<GitHubUser>(url);
  }
}
