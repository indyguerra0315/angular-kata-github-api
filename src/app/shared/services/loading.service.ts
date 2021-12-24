import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.subject.next(this.isLoading);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
