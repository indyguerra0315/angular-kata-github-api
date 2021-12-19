import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { GitHubUser } from '../entities/GitHubUser';
import { GithubUsersService } from '../services/github-users.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  users: GitHubUser[] = [];
  private filter: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private gitHubUser: GithubUsersService) {
  }

  ngOnInit(): void {
    this.getData();

    this.detectRouteChanges();
  }

  detectRouteChanges(): void{
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getData();
      }
    });
  }

  getData() : void {
    this.loadingService.toggleLoading(true);

    this.filter = this.route.snapshot.paramMap.get('filter')!;

    this.gitHubUser.getUsers(this.filter).subscribe((users) => {
      console.log(users.items);
      this.users = users.items;
      this.loadingService.toggleLoading(false);
    });
  }

  reset(): void {
    this.loadingService.toggleLoading(false);
    this.router.navigate(['']);
  }
}
