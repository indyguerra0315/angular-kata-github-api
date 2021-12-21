import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../entities/Item';
import { GitHubResponse } from '../../entities/GitHubResponse';
import { GithubService } from '../../services/github.service';
import { LoadingService } from '../../services/loading.service';
import { of, Subscription } from 'rxjs';
import { FilterService } from '../../services/filter.service';

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

  constructor(private gitHubService: GithubService,
    private loadingService: LoadingService,
    private filterService: FilterService) {
      this.filterSubscription = this.filterService
        .onChange()
        .subscribe((filter) => {
          this.companyItems = [];
          this.filter = filter;
          this.getData();
        });
    }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.filterSubscription.unsubscribe();
  }

  getData() : void {
    this.loadingService.toggleLoading(true);

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
          this.dataLoaded.emit(this.companiesData.total_count);
          this.resetError();
        });
      },
      error: (e) => {
        console.error(e);
        this.onError(true,'');
      },
      // complete: () => console.info('complete')
    });
  }

  showMoreCompanies() {
    this.loadCompaniesData(this.companiesData.page + 1);
  }

  resetError() {
    this.onError(false, '');
  }

  onError(hasError: boolean, errormsg: string) {
    this.hasError = hasError;
    this.errorMsg = errormsg;
  }
}
