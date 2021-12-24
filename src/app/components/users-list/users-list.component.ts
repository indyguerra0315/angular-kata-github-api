import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../contracts/Item';
import { GitHubResponse } from '../../entities/GitHubResponse';
import { GithubService } from '../../services/github.service';
import { LoadingService } from '../../shared/services/loading.service';
import { of, Subscription } from 'rxjs';
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
        this.loadUsersData();
      });
  }

  ngOnInit(): void {
    this.loadUsersData();
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.filterSubscription.unsubscribe();
  }

  loadUsersData(page: number = 1): void {
    this.loadingService.toggleLoading(true);

    of(this.gitHubService.getUsers(this.filter, page)).subscribe({
      next: (observer) => {
        observer.subscribe(
          (data) => {
            // debugger;
            // console.log('user-list on load', data);
            this.userData = data;
            this.usersItems = [...this.usersItems, ...data.items];
            this.loadingService.toggleLoading(false);
            this.dataLoaded.emit(this.userData.total_count);
          });
      },
      error: (e) => {
        // debugger;
        // console.error('user-list on error', e);
      },
      // complete: () => console.info('complete')
    });
  }

  showMoreUsers() {
    this.loadUsersData(this.userData.page + 1);
  }

}
