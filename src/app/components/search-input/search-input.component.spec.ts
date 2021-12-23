import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterService } from '../../services/filter.service';
import { LoadingService } from '../../services/loading.service';

import { SearchInputComponent } from './search-input.component';
import {} from 'jasmine';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule ],
      providers: [ LoadingService, FilterService ],
      declarations: [ SearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid form', () => {
    const fixture = TestBed.createComponent(SearchInputComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const userName = app.form.controls['filter'];
    userName.setValue('');

    expect(app.form.invalid).toBeTrue();
  });

  it('should return valid form', () => {
    const fixture = TestBed.createComponent(SearchInputComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    let userName = app.form.controls['filter'];
    userName.setValue('john');

    expect(app.form.invalid).toBeFalse();
  });
});
