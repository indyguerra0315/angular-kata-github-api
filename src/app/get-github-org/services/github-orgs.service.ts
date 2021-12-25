import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { GitHubOrganization } from '../contracts/GitHubOrganization';
import { GitHubResponse } from '../../shared/entities/GitHubResponse';
import { Item } from '../../shared/contracts/Item';

@Injectable({
  providedIn: 'root'
})
export class GithubOrgsService {

  private apiUrl = 'https://api.github.com';
  private apiSearchUrl = '/search/users';
  private apiOrganizationUrl = '/orgs';

  constructor(private http: HttpClient) { }

  getCompanies(filter: string, page: number = 1): Observable<GitHubResponse> {
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
                    const newItem: Item = { id: item.id, code: item.login, name: item.name, count: item.followers };
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

  getCompanyByLogin(companylogin: string): Observable<GitHubOrganization> {
    const url = `${this.apiUrl}${this.apiOrganizationUrl}/${companylogin}`;
    return this.http.get<any>(url)
      .pipe(
        map((response: any) => {
          const organizations: GitHubOrganization = {
            id: response.id,
            login: response.login,
            name: response.name,
            followers: response.followers
          };
          return organizations;
        })
      );
  }
}
