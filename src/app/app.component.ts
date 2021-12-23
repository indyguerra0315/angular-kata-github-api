import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-trekksoft-challenge';

  errorMsg: string = '';
  private errorSubscription: Subscription;

  constructor(private router: Router,
    private errorService: ErrorService) {

      this.errorSubscription = this.errorService
        .onChange()
        .subscribe((errorMsg) => {
          this.onError(errorMsg);
        });
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  resetError() {
    this.onError('');
  }

  onError(errormsg: string) {
    this.errorMsg = errormsg;
  }
}
