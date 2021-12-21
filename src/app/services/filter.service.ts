import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filter: string = '';
  private subject = new Subject<string>();

  constructor() { }

  updateFilter(filter: string): void {
    this.filter = filter;
    this.subject.next(this.filter);
  }

  onChange(): Observable<string> {
    return this.subject.asObservable();
  }
}
