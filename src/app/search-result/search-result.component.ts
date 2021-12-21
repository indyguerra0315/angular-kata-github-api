import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { GithubService } from '../services/github.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  filter: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private gitHubService: GithubService) {
  }

  ngOnInit(): void {
    this.detectRouteChanges();
  }

  detectRouteChanges(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.filter = this.route.snapshot.paramMap.get('filter')!;
      }
    });
  }
}
