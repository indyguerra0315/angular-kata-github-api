import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../../services/loading.service';

import { CompaniesListComponent } from './companies-list.component';
import { FilterService } from '../../services/filter.service';
import { } from 'jasmine';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GithubOrgsService } from 'src/app/services/github-orgs.service';

describe('CompaniesListComponent', () => {
  let component: CompaniesListComponent;
  let fixture: ComponentFixture<CompaniesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubOrgsService, LoadingService, FilterService],
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
});
