import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../entities/Item';
import { GitHubResponse } from '../../entities/GitHubResponse';
import { GithubService } from '../../services/github.service';
import { LoadingService } from '../../services/loading.service';
import { of } from 'rxjs';

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

  constructor(private gitHubService: GithubService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getData();
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
            this.resetError();
        });
      },
      error: (e) => {debugger;
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
