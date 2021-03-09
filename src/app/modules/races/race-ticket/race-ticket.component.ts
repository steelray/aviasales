import { Component, OnInit, ChangeDetectionStrategy, Self } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgOnDestroy } from '@core/services/destroy.service';
import { SearchSearvice } from '@core/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-race-ticket',
  templateUrl: './race-ticket.component.html',
  styleUrls: ['./race-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class RaceTicketComponent implements OnInit {
  constructor(
    private searchService: SearchSearvice,
    private activatedRoute: ActivatedRoute,
    @Self() private onDestroy$: NgOnDestroy
  ) { }

  ngOnInit(): void {
    const { search_id, url } = this.activatedRoute.snapshot.params;
    this.searchService.flightSearchClick(search_id, +url).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => {
      window.location.href = res.url;
    });
  }

}
