import { Injectable } from '@angular/core';
import { IPlacesParams } from '@core/interfaces/search.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchSearvice extends ApiService {
  flightSearch$ = new BehaviorSubject<any>(null);
  flightSearch(params: any): Observable<any> {

    return this.http.get('/assets/flight-search.json').pipe(
      map((res: any) => res.result),
      tap(res => this.flightSearch$.next(res))
    );
    return this.post(`travelpayouts.flight_search`, params).pipe(
      tap(res => this.flightSearch$.next(res))
    );
  }

  flightSearchResults(searchId: string): Observable<any> {
    return this.http.get('/assets/flight-search-result.json').pipe(
      map((res: any) => res.result)
    );
    return this.post(`travelpayouts.flight_search_results`, { search_id: searchId });
  }

  places(params: IPlacesParams): Observable<any> {
    return this.post(`travelpayouts.places`, params);
  }


}
