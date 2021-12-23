import { TestBed } from '@angular/core/testing';

import { GithubOrgsService } from './github-orgs.service';
import {} from 'jasmine';

describe('GithubOrgsService', () => {
  let service: GithubOrgsService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({ providers: [{ provide: GithubOrgsService, useValue: spy }] });
    service = TestBed.inject(GithubOrgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
