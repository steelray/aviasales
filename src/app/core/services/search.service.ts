import { BaseOverlayDispatcher } from '@angular/cdk/overlay/dispatchers/base-overlay-dispatcher';
import { Injectable } from '@angular/core';
import { IPlacesParams, ISearchResult } from '@core/interfaces/search.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchSearvice extends ApiService {
  flightSearch$: Observable<any>;
  searchResult$ = new BehaviorSubject<ISearchResult>(null);

  mock = false;
  flightSearch(params: any): Observable<any> {
    if (this.mock) {
      return this.http.get('/assets/flight-search.json').pipe(
        map((res: any) => res.result),
        // publishReplay(1),
        // refCount()
      );
    }
    return this.post(`travelpayouts.flight_search`, params).pipe(
      // publishReplay(1),
      // refCount()
    );
  }

  flightSearchResults(searchId: string): Observable<any> {
    if (this.mock) {
      return this.http.get('/assets/flight-search-result.json').pipe(
        map((res: any) => res.result),
        // publishReplay(1),
        // refCount()
      );
    }

    return this.post(`travelpayouts.flight_search_results`, { search_id: searchId }).pipe(
      // publishReplay(1),
      // refCount()
    );
  }

  places(params: IPlacesParams): Observable<any> {
    return this.post(`travelpayouts.places`, params);
  }


}
