import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from '../../services/filter.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  filter: string = '';
  isLoading: boolean = false;
  subscription: Subscription;

  private filterSubscription: Subscription;

  constructor(private router: Router,
    private loadingService: LoadingService,
    private filterService: FilterService
  ) {
    this.subscription = this.loadingService
      .onToggle()
      .subscribe((value) => (this.isLoading = value));

    this.filterSubscription = this.filterService
      .onChange()
      .subscribe((filter) => {
        this.filter = filter;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  search(event: string): void {
    this.router.navigate(['search',  event ]);
  }

}
