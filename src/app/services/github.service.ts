import { Injectable } from '@angular/core';
import { Observable, throwError, switchMap, forkJoin } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { GitHubResponse } from '../entities/GitHubResponse';
import { Item } from '../entities/Item';
import { GitHubUser } from '../entities/GitHubUser';
import { GitHubOrganization } from '../entities/GitHubOrganization';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private apiSearchUrl = '/search/users';
  private apiUserUrl = '/users';
  private apiOrganizationUrl = '/orgs';

  constructor(private http: HttpClient) { }

  getUsers(filter: string, page: number = 1 ): Observable<GitHubResponse> {

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
                      const newItem:Item = {id:item.id, code:item.login, name:item.name, count:item.public_repos};
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

  getCompanies(filter: string, page: number = 1 ): Observable<GitHubResponse> {
    const url = `${this.apiUrl}${this.apiSearchUrl}?q=${filter} in:name type:org&per_page=4&page=${page}`;
    return this.http.get<any>(url)
      .pipe(
        switchMap((response: any) => {

            let companiesData = response.items.map((organization: any) => this.getCompanyByLogin(organization.login));

            return forkJoin(companiesData)
              .pipe(
                map((itemsMerged: any) => {

                  let parsedItems = itemsMerged.map(
                    (item: any) => {
                      const newItem:Item = {id:item.id, code:item.login, name:item.name, count:item.followers};
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

  getCompanyByLogin(companylogin: string): Observable<any> {
    const url = `${this.apiUrl}${this.apiOrganizationUrl}/${companylogin}`;
    return this.http.get<any>(url)
      .pipe(
        map((response: any) => {
          const organizations:GitHubOrganization = {id:response.id, login:response.login, name:response.name, followers:response.followers};
          return organizations;
        })
      );
  }
}
