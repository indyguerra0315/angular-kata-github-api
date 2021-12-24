import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService,
    private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.errorService.updateMessage('');
            this.loadingService.toggleLoading(false);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }

          this.errorService.updateMessage(errorMsg);
          this.loadingService.toggleLoading(false);
          return throwError(() => new Error(errorMsg));
        })
      )
  }
}
