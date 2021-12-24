import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private message: string = '';
  private subject = new Subject<string>();

  constructor() { }

  updateMessage(message: string): void {
    this.message = message;
    this.subject.next(this.message);
  }

  onChange(): Observable<string> {
    return this.subject.asObservable();
  }
}
