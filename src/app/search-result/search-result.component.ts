import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { GitHubResponse } from '../entities/GitHubResponse';
import { Item } from '../entities/Item';
import { GithubService } from '../services/github.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  companiesData!: GitHubResponse;
  filter: string = '';
  companyItems: Item[] = [];

  errorMsg: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private gitHubService: GithubService) {
  }

  ngOnInit(): void {
    this.getData();

    this.detectRouteChanges();
  }

  detectRouteChanges(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getData();
      }
    });
  }

  getData() : void {
    this.loadingService.toggleLoading(true);

    this.filter = this.route.snapshot.paramMap.get('filter')!;

    this.loadCompaniesData();
  }

  loadCompaniesData(page: number = 1): void {
    of(this.gitHubService.getCompanies(this.filter, page)).subscribe({
      next: (observer) => {
        observer.subscribe(
          (data) => {
          console.log(data);
          this.companiesData = data;
          this.companyItems = [...this.companyItems, ...data.items];
          this.loadingService.toggleLoading(false);
        });
      },
      error: (e) => console.error(e),
      // complete: () => console.info('complete')
    });
  }

  viewMoreCompanies() {
    this.loadCompaniesData(this.companiesData.page + 1);
  }
}
