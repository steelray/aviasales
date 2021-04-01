import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-race-buy-test',
  templateUrl: './race-buy-test.component.html',
  styleUrls: ['./race-buy-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceBuyTestComponent implements OnInit {
  link$: Observable<string>;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.link$ = this.httpClient.get('https://vendorlinkemulation.free.beeceptor.com/').pipe(
      map((res: any) => res.link)
    );
  }

}
