import { Component, OnInit, ChangeDetectionStrategy, Self } from '@angular/core';
import { IPrevUrl } from '@core/interfaces/prev-url.interface';
import { NgOnDestroy } from '@core/services/destroy.service';
import { UrlService } from '@core/services/url.service';
import { Observable } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]

})
export class RaceComponent implements OnInit {
  prevUrl$: Observable<IPrevUrl>;
  constructor(
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.prevUrl$ = this.urlService.prevUrl$.pipe(
      filter(url => !!url),
      map(url => {
        const urlArr = url.split('?');
        const prevUrl: IPrevUrl = { route: urlArr[0], queryParams: {} };
        if (urlArr.length > 1) {
          const params = new URLSearchParams(urlArr[1]);
          params.forEach((value, key) => {
            prevUrl.queryParams[key] = value;
          });
        }
        return prevUrl;
      })
    );

  }
}
