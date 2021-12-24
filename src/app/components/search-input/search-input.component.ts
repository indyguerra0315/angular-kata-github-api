import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from '../../services/filter.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  isLoading: boolean = false;
  subscription: Subscription;

  private filterSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private filterService: FilterService
  ) {
    this.subscription = this.loadingService
      .onToggle()
      .subscribe((value) => (this.isLoading = value));

    this.filterSubscription = this.filterService
      .onChange()
      .subscribe((filter) => {
        this.form.controls['filter'].setValue(filter);
      });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filter: this.formBuilder.control('', Validators.compose([Validators.required]))
    });
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  search(): void {
    this.router.navigate(['search', this.form.value.filter]);
  }

}
