import { Injectable } from '@angular/core';
import { getLangFromParams } from '@core/utils/get-lang.util';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  currentLang$ = new BehaviorSubject(null);

  setCurrentLang(): void {
    this.currentLang$.next(getLangFromParams());
  }
}
