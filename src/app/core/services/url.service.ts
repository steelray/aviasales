import { Injectable } from '@angular/core';
import { prefix } from '@rxweb/reactive-form-validators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private prevUrl = new BehaviorSubject<string>(null);
  prevUrl$ = this.prevUrl.asObservable();

  setPreviousUrl(previousUrl: string): void {
    this.prevUrl.next(previousUrl);
  }
}