import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../entities/Item';
import { GitHubResponse } from '../../entities/GitHubResponse';
import { GithubService } from '../../services/github.service';
import { LoadingService } from '../../services/loading.service';
import { of, Subject, Subscription } from 'rxjs';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() filter: string = '';

  userData!: GitHubResponse;
  usersItems: Item[] = [];

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
          this.usersItems = [];
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

    this.loadUsersData();
  }

  loadUsersData(page: number = 1): void {
    of(this.gitHubService.getUsers(this.filter, page)).subscribe({
      next: (observer) => {
        observer.subscribe(
          (data) => {
            console.log(data);
            this.userData = data;
            this.usersItems = [...this.usersItems, ...data.items];
            this.loadingService.toggleLoading(false);
            this.dataLoaded.emit(this.userData.total_count);
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

  showMoreUsers() {
    this.loadUsersData(this.userData.page + 1);
  }

  resetError() {
    this.onError(false, '');
  }

  onError(hasError: boolean, errormsg: string) {
    this.hasError = hasError;
    this.errorMsg = errormsg;
  }

}
