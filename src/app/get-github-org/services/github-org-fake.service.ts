import { Injectable } from '@angular/core';
import { GitHubResponse } from 'src/app/shared/entities/GitHubResponse';


import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubOrgFakeService {

  getCompanies(filter: string, page: number = 1): Observable<GitHubResponse> {
    return of(
      new GitHubResponse(
        1,
        [{
          id: 4305800,
          code: "trekksoft",
          name: 'TrekkSoft',
          count: 0
        }],
        1)
    );
  }
}
