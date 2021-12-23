import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubService } from '../../services/github.service';
import { FilterService } from '../../services/filter.service';
import { LoadingService } from '../../services/loading.service';

import { UsersListComponent } from './users-list.component';
import {} from 'jasmine';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GithubService, LoadingService, FilterService ],
      declarations: [ UsersListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
