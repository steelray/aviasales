import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  error$ = new BehaviorSubject<string | null>(null);
}
