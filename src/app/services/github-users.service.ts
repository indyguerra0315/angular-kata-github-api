import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubUser } from '../entities/GitHubUser';
import { GitHubResponse } from '../entities/GitHubResponse';

@Injectable({
  providedIn: 'root'
})
export class GithubUsersService {
  private apiUrl = 'https://api.github.com';
  private apiSearchUrl = '/search/users';
  private apiUserUrl = '/users';

  constructor(private http: HttpClient) { }

  getUsers(filter: string, page: number = 1 ): Observable<GitHubResponse> {
    const url = `${this.apiUrl}${this.apiSearchUrl}?q=${filter} in:name type:user&per_page=4&page=${page}`;
    return this.http.get<GitHubResponse>(url);
  }

  getUser(user: GitHubUser): Observable<GitHubUser> {
    const url = `${this.apiUrl}${this.apiUserUrl}/${user.login}`;
    return this.http.get<GitHubUser>(url);
  }
}
