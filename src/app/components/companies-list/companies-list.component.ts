import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../contracts/Item';
import { GitHubResponse } from '../../entities/GitHubResponse';
import { LoadingService } from '../../services/loading.service';
import { of, Subscription } from 'rxjs';
import { FilterService } from '../../services/filter.service';
import { GithubOrgsService } from '../../services/github-orgs.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  @Input() filter: string = '';
  companiesData!: GitHubResponse;
  companyItems: Item[] = [];

  hasError: boolean = false;
  errorMsg: string = '';

  private filterSubscription: Subscription;

  @Output() dataLoaded = new EventEmitter();

  constructor(private gitHubOrgService: GithubOrgsService,
    private loadingService: LoadingService,
    private filterService: FilterService) {

    this.filterSubscription = this.filterService
      .onChange()
      .subscribe((filter) => {
        this.companyItems = [];
        this.filter = filter;
        this.loadCompaniesData();
      });
  }

  ngOnInit(): void {
    this.loadCompaniesData();
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.filterSubscription.unsubscribe();
  }

  loadCompaniesData(page: number = 1): void {
    this.loadingService.toggleLoading(true);

    of(this.gitHubOrgService.getCompanies(this.filter, page)).subscribe({
      next: (observer) => {
        observer.subscribe(
          (data) => {
            // console.log('companies-list', data);
            this.companiesData = data;
            this.companyItems = [...this.companyItems, ...data.items];
            this.loadingService.toggleLoading(false);
            this.dataLoaded.emit(this.companiesData.total_count);
          });
      },
      error: (e) => {
        // console.error('loadCompaniesData ',e);
      },
      // complete: () => console.info('complete')
    });
  }

  showMoreCompanies() {
    this.loadCompaniesData(this.companiesData.page + 1);
  }
}
