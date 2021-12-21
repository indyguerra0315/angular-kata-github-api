import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../entities/Item';
import { GitHubResponse } from '../../entities/GitHubResponse';
import { GithubService } from '../../services/github.service';
import { LoadingService } from '../../services/loading.service';
import { of } from 'rxjs';

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

  constructor(private gitHubService: GithubService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getData();
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
        });
      },
      error: (e) => console.error(e),
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
