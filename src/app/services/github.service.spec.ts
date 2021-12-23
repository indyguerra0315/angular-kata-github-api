import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import {} from 'jasmine';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({ providers: [{ provide: GithubService, useValue: spy }] });
    service = TestBed.inject(GithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
