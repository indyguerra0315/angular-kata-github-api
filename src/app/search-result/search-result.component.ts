import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { GitHubResponse } from '../entities/GitHubResponse';
import { GithubService } from '../services/github.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  userData!: GitHubResponse;
  companiesData!: GitHubResponse;
  private filter: string = '';

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

    this.loadUsersData();
    this.loadCompaniesData();
  }

  loadUsersData(): void {
    of(this.gitHubService.getUsers(this.filter)).subscribe({
      next: (observer) => {
        observer.subscribe(
          (data) => {
            console.log(data);
            this.userData = data;
            this.loadingService.toggleLoading(false);
        });
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  loadCompaniesData(): void {
    of(this.gitHubService.getCompanies(this.filter)).subscribe({
      next: (observer) => {
        observer.subscribe(
          (data) => {
          console.log(data);
          this.companiesData = data;
          this.loadingService.toggleLoading(false);
        });
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
