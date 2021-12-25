import { TestBed, waitForAsync } from '@angular/core/testing';

import { GithubOrgsService } from './github-orgs.service';
import { } from 'jasmine';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GitHubResponse } from 'src/app/shared/entities/GitHubResponse';
import { GitHubOrganization } from '../contracts/GitHubOrganization';
import { of, Observable } from 'rxjs';

describe('GithubOrgsService', () => {
  let service: GithubOrgsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubOrgsService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GithubOrgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCompanyByLogin should get company data', () => {
    const filter: string = 'trekksoft';

    const organizations: GitHubOrganization = {
      id: 4305800,
      login: "trekksoft",
      name: 'TrekkSoft',
      followers: 0
    };

    service.getCompanyByLogin(filter).subscribe(data => {
      expect(data).toEqual(organizations);
    });

    const testRequest = httpTestingController.expectOne(`https://api.github.com/orgs/${filter}`);
    testRequest.flush(organizations);
  });
});
