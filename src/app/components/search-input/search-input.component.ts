import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  filter: string = 'vggg';
  isLoading: boolean = false;
  subscription: Subscription;

  constructor(private router: Router,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.loadingService
      .onToggle()
      .subscribe((value) => (this.isLoading = value));
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.filter = params['filter'];
    // });
    this.filter = this.route.snapshot.paramMap.get('filter')!;
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  search(event: string): void {
    this.router.navigate(['search',  event ]);
  }

}
