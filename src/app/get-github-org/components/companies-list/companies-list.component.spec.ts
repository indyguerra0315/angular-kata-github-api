import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../../../shared/services/loading.service';

import { CompaniesListComponent } from './companies-list.component';
import { FilterService } from '../../../shared/services/filter.service';
import { } from 'jasmine';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GithubOrgsService } from 'src/app/get-github-org/services/github-orgs.service';
import { GithubOrgFakeService } from '../../services/github-org-fake.service';


describe('CompaniesListComponent', () => {
  let component: CompaniesListComponent;
  let fixture: ComponentFixture<CompaniesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: GithubOrgsService, useClass: GithubOrgFakeService },
        LoadingService,
        FilterService
      ],
      declarations: [CompaniesListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set organizations', () => {
    component.filter = 'trekksoft';
    component.ngOnInit();
    expect(component.companyItems[0].code).toEqual('trekksoft');
  });
});
