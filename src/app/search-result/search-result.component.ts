import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  filter: string = '';
  totalUsers: number = 0;
  totalCompanies: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private filterService: FilterService) {
    this.filter = this.route.snapshot.paramMap.get('filter')!;
    this.filterService.updateFilter(this.filter);
  }

  ngOnInit(): void {
    this.detectRouteChanges();
  }

  detectRouteChanges(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.filter = this.route.snapshot.paramMap.get('filter')!;
        this.filterService.updateFilter(this.filter);
      }
    });
  }

  onUserDataLoaded(totalItems: number) {
    this.totalUsers = totalItems;
  }

  onCompaniesDataLoaded(totalItems: number) {
    this.totalCompanies = totalItems;
  }
}
