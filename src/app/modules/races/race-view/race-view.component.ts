import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { TRIP_CLASS } from '@core/enums/trip-class.enum';
import { IFlight, IRace, ISearchResult } from '@core/interfaces/search.interfaces';

@Component({
  selector: 'app-race-view',
  templateUrl: './race-view.component.html',
  styleUrls: ['./race-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceViewComponent implements OnInit {
  @Input() flight: IFlight;
  @Input() searchId: string;
  @Input() searchResult: ISearchResult;
  @Input() tripClass: TRIP_CLASS;
  @Input() resultTimeIsUp: boolean;
  @Output() backToList = new EventEmitter();
  @Output() buyClicked = new EventEmitter();
  @Output() updateResult = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  onBackToList(): void {
    this.backToList.emit();
  }

  viewDetails(event: Event, race: IRace): void {
    event.preventDefault();
    const detailsEL: HTMLElement = this.document.getElementById(race.number);
    if (detailsEL) {
      if (detailsEL.style.display === 'block') {
        detailsEL.style.display = 'none';
      } else {
        detailsEL.style.display = 'block';
      }
    }
  }

  onBuy(): void {
    this.buyClicked.emit(this.flight.terms.url);
  }

  onUpadteResult(): void {
    this.updateResult.emit(true);
  }

}
